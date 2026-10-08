import React, { useState, useMemo } from 'react';
import BranchedMenu from './BranchedMenu';
import SyntaxHighlighter from './SyntaxHighlighter';
import { useTheme } from '../context/ThemeContext';
import { C_NOTES } from '../data/cNotes';
import { PYTHON_NOTES } from '../data/pythonNotes';
import { 
  Play, 
  Copy, 
  Check, 
  BookOpen, 
  Terminal, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Code,
  CheckCircle2,
  BookmarkCheck,
  Layers
} from 'lucide-react';

export default function NotesView({ language = 'c', onOpenSandbox, searchQuery = '' }) {
  const { branchedMenuColors } = useTheme();
  const notesData = language === 'c' ? C_NOTES : PYTHON_NOTES;
  
  const [activeTopicId, setActiveTopicId] = useState(notesData[0]?.id || '');
  const [copiedSectionIndex, setCopiedSectionIndex] = useState(null);

  // Filter notes based on global search query
  const filteredNotes = useMemo(() => {
    if (!searchQuery) return notesData;
    const q = searchQuery.toLowerCase();
    return notesData.filter(
      n => n.title.toLowerCase().includes(q) || 
           n.summary.toLowerCase().includes(q) || 
           n.category.toLowerCase().includes(q)
    );
  }, [notesData, searchQuery]);

  const activeTopic = useMemo(() => {
    return filteredNotes.find(n => n.id === activeTopicId) || filteredNotes[0] || notesData[0];
  }, [filteredNotes, notesData, activeTopicId]);

  // Group topics & subtopics for BranchedMenu
  const menuItems = useMemo(() => {
    const categories = Array.from(new Set(notesData.map(n => n.category)));
    return categories.map(cat => ({
      label: cat,
      children: notesData
        .filter(n => n.category === cat)
        .flatMap(n => [
          {
            value: n.id,
            label: `${n.letter}. ${n.title}`,
            icon: Code
          },
          ...(n.sections || []).map((sec, sIdx) => ({
            value: `${n.id}::sec-${sIdx}`,
            label: `  ↳ ${sec.title}`,
            icon: ChevronRight
          }))
        ])
    }));
  }, [notesData]);

  const handleSelectTopicOrSubtopic = (val) => {
    if (typeof val === 'string' && val.includes('::sec-')) {
      const [topicId, secId] = val.split('::');
      setActiveTopicId(topicId);
      setTimeout(() => {
        const el = document.getElementById(`${topicId}-${secId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } else {
      setActiveTopicId(val);
    }
  };

  const handleCopyCode = (codeText, index) => {
    if (codeText) {
      navigator.clipboard.writeText(codeText);
      setCopiedSectionIndex(index);
      setTimeout(() => setCopiedSectionIndex(null), 2000);
    }
  };

  const handleRunInSandbox = (codeText) => {
    if (codeText) {
      onOpenSandbox(language, codeText);
    }
  };

  const currentIndex = notesData.findIndex(n => n.id === activeTopic?.id);
  const isC = language === 'c';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn font-sans">
      
      {/* Left Sidebar Menu using BranchedMenu */}
      <aside className="lg:col-span-4 bg-surface border border-color rounded-2xl p-5 shadow-xl sticky top-20">
        <div className="flex items-center justify-between border-b border-color pb-3 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className={`w-5 h-5 ${isC ? 'text-cyan-400' : 'text-emerald-400'}`} />
            <h2 className="font-extrabold text-base tracking-tight">
              {isC ? 'C Curriculum Topics & Subtopics' : 'Python Curriculum Topics'}
            </h2>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-hover text-muted font-bold">
            {notesData.length} Topics
          </span>
        </div>

        {/* Integrated React Bits BranchedMenu */}
        <div className="py-2 overflow-x-auto">
          <BranchedMenu
            items={menuItems}
            defaultOpen={[0, 1, 2, 3, 4, 5, 6]}
            defaultActive={activeTopicId}
            activeValue={activeTopicId}
            onSelect={handleSelectTopicOrSubtopic}
            color={branchedMenuColors.color}
            accentColor={branchedMenuColors.accentColor}
            lineColor={branchedMenuColors.lineColor}
            width={300}
            rowHeight={36}
          />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:col-span-8 bg-surface border border-color rounded-2xl p-6 sm:p-8 shadow-xl space-y-8">
        
        {activeTopic && (
          <>
            {/* Header Title Section */}
            <div className="space-y-3 border-b border-color pb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  isC ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {activeTopic.category}
                </span>
                <span className="text-xs font-mono text-muted uppercase flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" /> Letter {activeTopic.letter} • {isC ? 'GCC C Compiler Standard' : 'Python 3.x Engine'}
                </span>
              </div>

              <h1 className={`text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r ${
                isC ? 'from-cyan-400 via-blue-400 to-indigo-300' : 'from-emerald-400 via-teal-300 to-cyan-300'
              } bg-clip-text text-transparent`}>
                {activeTopic.letter}. {activeTopic.title}
              </h1>

              <p className="text-sm text-muted leading-relaxed font-medium">
                {activeTopic.summary}
              </p>
            </div>

            {/* Sections Loop (Headings, Subheadings & Bullet Points) */}
            <div className="space-y-8">
              {activeTopic.sections && activeTopic.sections.map((section, sIdx) => (
                <div key={sIdx} id={`${activeTopic.id}-sec-${sIdx}`} className="space-y-4 bg-black/20 p-5 sm:p-6 rounded-2xl border border-white/5 shadow-sm scroll-mt-24">
                  
                  {/* Styled Section Heading */}
                  <div className="space-y-1">
                    <h3 className={`text-lg sm:text-xl font-extrabold flex items-center gap-2 ${
                      isC ? 'text-cyan-400 dark:text-cyan-300' : 'text-emerald-400 dark:text-emerald-300'
                    }`}>
                      <span className={`w-2 h-5 rounded-full ${isC ? 'bg-cyan-400' : 'bg-emerald-400'}`} />
                      {section.title}
                    </h3>
                    {section.subTitle && (
                      <p className="text-xs sm:text-sm font-medium text-slate-400 pl-4">
                        {section.subTitle}
                      </p>
                    )}
                  </div>

                  {/* Bullet Points List with Glowing Icons */}
                  {section.points && section.points.length > 0 && (
                    <div className="space-y-2.5 pt-1 pl-2">
                      {section.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-3">
                          <span className={`w-2 h-2 rounded-full mt-2 flex-none shadow-sm ${
                            isC ? 'bg-cyan-400 shadow-cyan-400/80' : 'bg-emerald-400 shadow-emerald-400/80'
                          }`} />
                          <p className="text-xs sm:text-sm text-main leading-relaxed font-normal">
                            {pt}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Interactive Code Snippet Box */}
                  {section.code && (
                    <div className="space-y-2 pt-3">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 rounded-t-xl border border-slate-800 text-slate-300 text-xs">
                        <span className="font-mono flex items-center gap-2 font-semibold">
                          <Terminal className={`w-3.5 h-3.5 ${isC ? 'text-cyan-400' : 'text-emerald-400'}`} />
                          {isC ? 'main.c' : 'script.py'}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyCode(section.code, `${sIdx}`)}
                            className="flex items-center gap-1 hover:text-white px-2.5 py-1 rounded bg-slate-800 transition-colors text-[11px]"
                          >
                            {copiedSectionIndex === `${sIdx}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{copiedSectionIndex === `${sIdx}` ? 'Copied' : 'Copy'}</span>
                          </button>

                          <button
                            onClick={() => handleRunInSandbox(section.code)}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-white font-semibold transition-all shadow-md text-xs ${
                              isC ? 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
                            }`}
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Run in Sandbox</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-4 rounded-b-xl bg-slate-950 border border-t-0 border-slate-800 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed shadow-inner">
                        <SyntaxHighlighter code={section.code} language={language} />
                      </div>
                    </div>
                  )}

                  {/* Expected Output Box */}
                  {section.expectedOutput && (
                    <div className="p-4 rounded-xl bg-surface border border-color space-y-1.5">
                      <span className="text-xs font-semibold text-muted flex items-center gap-1.5 font-mono">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Expected Console Output:
                      </span>
                      <pre className="text-xs font-mono text-emerald-400 whitespace-pre-wrap bg-black/60 p-3 rounded-lg border border-white/5">
                        {section.expectedOutput}
                      </pre>
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Key Takeaways Card */}
            {activeTopic.keyTakeaways && (
              <div className={`p-6 rounded-2xl border space-y-3 ${
                isC ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-emerald-500/5 border-emerald-500/20'
              }`}>
                <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                  isC ? 'text-cyan-400' : 'text-emerald-400'
                }`}>
                  <BookmarkCheck className="w-4 h-4" /> Core Concept Takeaways
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-main">
                  {activeTopic.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-none ${isC ? 'text-cyan-400' : 'text-emerald-400'}`} />
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-color pt-6">
              <button
                disabled={currentIndex <= 0}
                onClick={() => setActiveTopicId(notesData[currentIndex - 1]?.id)}
                className="px-4 py-2.5 rounded-xl bg-surface-hover border border-color text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface transition-all flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Topic
              </button>

              <button
                disabled={currentIndex >= notesData.length - 1}
                onClick={() => setActiveTopicId(notesData[currentIndex + 1]?.id)}
                className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-lg ${
                  isC ? 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/25' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25'
                }`}
              >
                Next Topic <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

      </main>

    </div>
  );
}
