import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { executeCode } from '../services/compilerEngine';
import SyntaxHighlighter from './SyntaxHighlighter';
import { 
  Play, 
  RotateCcw, 
  Trash2, 
  Download, 
  Terminal, 
  Clock, 
  HardDrive, 
  Code2,
  FileCode2,
  Files,
  Palette,
  Type,
  Cloud,
  CornerDownLeft
} from 'lucide-react';

const EDITOR_THEMES = {
  'dark-studio': {
    name: 'Dark Studio',
    bg: '#1e1e1e',
    sidebarBg: '#252526',
    headerBg: '#2d2d2d',
    tabActive: '#1e1e1e',
    statusBar: '#0891b2',
    editorText: '#d4d4d4',
    lineNumber: '#858585'
  },
  'deep-cyber': {
    name: 'Deep Cyber',
    bg: '#0f172a',
    sidebarBg: '#1e293b',
    headerBg: '#1e293b',
    tabActive: '#0f172a',
    statusBar: '#3b82f6',
    editorText: '#f8fafc',
    lineNumber: '#64748b'
  },
  'monokai': {
    name: 'Monokai Dark',
    bg: '#2d2a2e',
    sidebarBg: '#221f22',
    headerBg: '#221f22',
    tabActive: '#2d2a2e',
    statusBar: '#eab308',
    editorText: '#fcfcfa',
    lineNumber: '#727072'
  },
  'light-clean': {
    name: 'Light Clean',
    bg: '#ffffff',
    sidebarBg: '#f6f8fa',
    headerBg: '#f6f8fa',
    tabActive: '#ffffff',
    statusBar: '#2563eb',
    editorText: '#24292f',
    lineNumber: '#8c959f'
  }
};

const FONT_COLOR_THEMES = {
  'full-syntax': { name: 'Full Syntax Colors (Multi-Color)', color: null },
  'emerald': { name: 'Neon Emerald', color: '#10b981' },
  'cyan': { name: 'Cyan Blue', color: '#06b6d4' },
  'amber': { name: 'Amber Gold', color: '#f59e0b' },
  'purple': { name: 'Purple Synth', color: '#a855f7' },
  'classic': { name: 'Classic White', color: '#e2e8f0' }
};

const CODE_TEMPLATES = {
  c: [
    {
      title: 'Inline Scanf Input',
      code: `#include <stdio.h>

int main() {
    int a;
    printf("Enter number: ");
    scanf("%d", &a);
    printf("\\n%d\\n", a);
    return 0;
}`
    },
    {
      title: 'Bubble Sort Algorithm',
      code: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    
    bubbleSort(arr, n);
    
    printf("Sorted array:   ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    
    return 0;
}`
    }
  ],
  python: [
    {
      title: 'Inline input() Prompt',
      code: `# XSandbox Python Interactive Input

name = input("Enter your name: ")
print(f"Hello {name}!")`
    }
  ]
};

export default function CompilerSandbox({ initialLanguage = 'c', initialCode = '' }) {
  const [language, setLanguage] = useState(initialLanguage);
  const [themeKey, setThemeKey] = useState('dark-studio');
  const [fontColorKey, setFontColorKey] = useState('full-syntax');
  const [code, setCode] = useState(initialCode || CODE_TEMPLATES.c[0].code);
  
  // Interactive Terminal Input state
  const [terminalInputText, setTerminalInputText] = useState('');
  const [historyInputs, setHistoryInputs] = useState([]);

  const [mobileView, setMobileView] = useState('editor');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [isCompiling, setIsCompiling] = useState(false);
  const [outputResult, setOutputResult] = useState({
    stdout: 'Welcome to XSandbox Studio!\nClick "Run Code" to compile and execute.',
    stderr: '',
    exitCode: 0,
    executionTimeMs: 0,
    memoryMb: '0.0',
    provider: 'XSandbox Engine'
  });

  const editorScrollRef = useRef(null);
  const highlighterScrollRef = useRef(null);
  const lineNumbersScrollRef = useRef(null);
  const terminalConsoleRef = useRef(null);

  const activeTheme = EDITOR_THEMES[themeKey];
  const customFontColor = FONT_COLOR_THEMES[fontColorKey].color;
  const currentFileName = language === 'c' ? 'main.c' : 'script.py';

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      setLanguage(initialLanguage);
    }
  }, [initialCode, initialLanguage]);

  const handleScroll = (e) => {
    const { scrollTop, scrollLeft } = e.target;
    if (highlighterScrollRef.current) {
      highlighterScrollRef.current.scrollTop = scrollTop;
      highlighterScrollRef.current.scrollLeft = scrollLeft;
    }
    if (lineNumbersScrollRef.current) {
      lineNumbersScrollRef.current.scrollTop = scrollTop;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newCode = code.substring(0, selectionStart) + '    ' + code.substring(selectionEnd);
      setCode(newCode);
      setTimeout(() => {
        if (editorScrollRef.current) {
          editorScrollRef.current.selectionStart = selectionStart + 4;
          editorScrollRef.current.selectionEnd = selectionStart + 4;
        }
      }, 0);
    }
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(CODE_TEMPLATES[newLang][0].code);
    setHistoryInputs([]);
  };

  const handleRunCode = async (providedInput = null) => {
    setIsCompiling(true);
    setMobileView('terminal');

    const combinedStdin = providedInput !== null 
      ? providedInput 
      : historyInputs.join('\n');

    const result = await executeCode(language, code, combinedStdin);
    setOutputResult(result);
    setIsCompiling(false);

    if (result.exitCode === 0) {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
    }

    setTimeout(() => {
      if (terminalConsoleRef.current) {
        terminalConsoleRef.current.scrollTop = terminalConsoleRef.current.scrollHeight;
      }
    }, 50);
  };

  // Submit input right inline!
  const handleTerminalInputSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!terminalInputText.trim()) return;

      const newHistory = [...historyInputs, terminalInputText];
      setHistoryInputs(newHistory);
      setTerminalInputText('');
      
      handleRunCode(newHistory.join('\n'));
    }
  };

  const lineCount = code.split('\n').length;
  const lineNumbersArray = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="rounded-2xl border border-color shadow-2xl overflow-hidden animate-fadeIn flex flex-col min-h-[620px] font-sans">
      
      {/* Studio Header Bar */}
      <div 
        className="px-4 py-2.5 flex items-center justify-between border-b border-white/10 select-none text-xs"
        style={{ backgroundColor: activeTheme.headerBg, color: activeTheme.editorText }}
      >
        {/* Left Window Controls & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition-opacity" />
          </div>
          <span className="font-mono text-xs opacity-75 hidden sm:inline flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            XSandbox Studio - {currentFileName} ({language.toUpperCase()})
          </span>
        </div>

        {/* Mobile Pane Switcher */}
        <div className="flex lg:hidden items-center bg-black/30 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setMobileView('editor')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all flex items-center gap-1 ${
              mobileView === 'editor' ? 'bg-blue-600 text-white shadow' : 'opacity-60'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" /> Editor
          </button>
          <button
            onClick={() => setMobileView('terminal')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all flex items-center gap-1 ${
              mobileView === 'terminal' ? 'bg-blue-600 text-white shadow' : 'opacity-60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" /> Terminal
          </button>
        </div>

        {/* Controls: IDE Theme, Font Color & Run */}
        <div className="flex flex-wrap items-center gap-2">
          
          <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded-lg border border-white/10">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={themeKey}
              onChange={(e) => setThemeKey(e.target.value)}
              className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer"
              style={{ color: activeTheme.editorText }}
            >
              {Object.entries(EDITOR_THEMES).map(([k, t]) => (
                <option key={k} value={k} className="bg-slate-900 text-white">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded-lg border border-white/10">
            <Type className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={fontColorKey}
              onChange={(e) => setFontColorKey(e.target.value)}
              className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer"
              style={{ color: activeTheme.editorText }}
            >
              {Object.entries(FONT_COLOR_THEMES).map(([k, f]) => (
                <option key={k} value={k} className="bg-slate-900 text-white">
                  Font Theme: {f.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => handleRunCode()}
            disabled={isCompiling}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            {isCompiling ? (
              <span className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-white" />
            )}
            <span>Run Code</span>
          </button>
        </div>
      </div>

      {/* Main Studio Workbench Body */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Activity Bar */}
        <div 
          className="w-12 flex-none flex flex-col items-center py-3 border-r border-white/10 select-none hidden sm:flex"
          style={{ backgroundColor: activeTheme.sidebarBg, color: activeTheme.editorText }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-xl mb-4 transition-colors ${sidebarOpen ? 'bg-white/10 text-white' : 'opacity-50 hover:opacity-100'}`}
            title="Toggle Explorer"
          >
            <Files className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleLanguageChange(language === 'c' ? 'python' : 'c')}
            className="p-2 rounded-xl mb-4 opacity-70 hover:opacity-100 transition-colors"
            title={`Switch to ${language === 'c' ? 'Python' : 'C'}`}
          >
            {language === 'c' ? <Code2 className="w-5 h-5 text-cyan-400" /> : <FileCode2 className="w-5 h-5 text-emerald-400" />}
          </button>
        </div>

        {/* Explorer Sidebar */}
        {sidebarOpen && (
          <div 
            className="w-56 flex-none border-r border-white/10 p-3 space-y-4 hidden md:block select-none text-xs"
            style={{ backgroundColor: activeTheme.sidebarBg, color: activeTheme.editorText }}
          >
            <div className="font-bold uppercase tracking-wider text-[10px] opacity-60 px-2">
              EXPLORER: XSANDBOX
            </div>

            <div className="space-y-1">
              <div className="px-2 py-1 text-[11px] opacity-70 font-semibold uppercase">
                Languages
              </div>
              <button
                onClick={() => handleLanguageChange('c')}
                className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all ${
                  language === 'c' ? 'bg-blue-600/30 text-blue-400 font-bold border border-blue-500/30' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>C (GCC Compiler)</span>
              </button>

              <button
                onClick={() => handleLanguageChange('python')}
                className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all ${
                  language === 'python' ? 'bg-emerald-600/30 text-emerald-400 font-bold border border-emerald-500/30' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Python 3.x Engine</span>
              </button>
            </div>

            <div className="space-y-1 pt-2">
              <div className="px-2 py-1 text-[11px] opacity-70 font-semibold uppercase">
                Presets
              </div>
              {CODE_TEMPLATES[language].map((tmpl, idx) => (
                <button
                  key={idx}
                  onClick={() => setCode(tmpl.code)}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-xs opacity-75 hover:opacity-100 hover:bg-white/5 truncate block transition-colors"
                >
                  📄 {tmpl.title}
                </button>
              ))}
            </div>

          </div>
        )}

        {/* Center Workbench Layout */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Code Editor Pane */}
          <div 
            className={`flex-1 flex-col overflow-hidden ${
              mobileView === 'editor' ? 'flex' : 'hidden lg:flex'
            }`}
            style={{ backgroundColor: activeTheme.bg }}
          >
            {/* Active Tab Header */}
            <div 
              className="flex items-center border-b border-white/10 px-2 overflow-x-auto select-none"
              style={{ backgroundColor: activeTheme.headerBg }}
            >
              <div 
                className="px-4 py-2 border-r border-white/10 text-xs font-mono flex items-center gap-2 font-semibold"
                style={{ backgroundColor: activeTheme.tabActive, color: activeTheme.editorText }}
              >
                {language === 'c' ? <Code2 className="w-3.5 h-3.5 text-cyan-400" /> : <FileCode2 className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{currentFileName}</span>
              </div>
            </div>

            {/* Dual Layer Editor Canvas */}
            <div className="flex-1 flex overflow-hidden relative font-mono text-xs sm:text-sm">
              
              {/* Line Numbers Column */}
              <div 
                ref={lineNumbersScrollRef}
                className="w-12 py-3 text-right pr-3 select-none border-r border-white/10 flex-none opacity-40 font-mono text-xs overflow-hidden"
                style={{ backgroundColor: activeTheme.bg, color: activeTheme.lineNumber }}
              >
                {lineNumbersArray.map((n) => (
                  <div key={n} className="h-6 leading-6">{n}</div>
                ))}
              </div>

              {/* Synchronized Code Layer & Interactive Textarea */}
              <div className="flex-1 relative overflow-hidden">
                
                {/* Underneath Syntax Highlighted Code Layer */}
                <div 
                  ref={highlighterScrollRef}
                  className="absolute inset-0 p-3 overflow-hidden pointer-events-none font-mono text-xs sm:text-sm leading-6"
                >
                  <SyntaxHighlighter code={code} language={language} customFontColor={customFontColor} />
                </div>

                {/* Overlaid Interactive Textarea for User Typing */}
                <textarea
                  ref={editorScrollRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onScroll={handleScroll}
                  spellCheck="false"
                  className="absolute inset-0 w-full h-full p-3 bg-transparent text-transparent caret-white focus:outline-none resize-none font-mono text-xs sm:text-sm leading-6 border-none select-text whitespace-pre overflow-auto"
                  style={{ tabSize: 4 }}
                />
              </div>

            </div>
          </div>

          {/* Interactive Terminal Output Console */}
          <div 
            className={`w-full lg:w-96 flex-none border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col ${
              mobileView === 'terminal' ? 'flex' : 'hidden lg:flex'
            }`}
            style={{ backgroundColor: activeTheme.sidebarBg }}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-xs select-none">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Interactive Terminal Output
                </span>
              </div>

              <button
                onClick={() => {
                  setOutputResult({ stdout: '', stderr: '', exitCode: 0, executionTimeMs: 0, memoryMb: '0.0', provider: 'XSandbox Engine' });
                  setHistoryInputs([]);
                }}
                className="opacity-60 hover:opacity-100 p-1 text-xs text-muted hover:text-red-400"
                title="Clear Terminal Logs"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Native Terminal Output Log Stream with Borderless Inline Input */}
            <div 
              ref={terminalConsoleRef} 
              onClick={() => {
                const activeInput = terminalConsoleRef.current?.querySelector('input');
                if (activeInput) activeInput.focus();
              }}
              className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1 bg-black/80 min-h-[260px] flex flex-col cursor-text select-text"
            >
              {(() => {
                const rawStdout = outputResult.stdout || '';
                const rawStderr = outputResult.stderr || '';
                
                // If there's an error, show stderr
                if (rawStderr) {
                  return (
                    <pre className="whitespace-pre-wrap text-red-400 bg-red-950/40 p-3 rounded-lg border border-red-900/50 leading-relaxed font-mono text-xs">
                      {rawStderr}
                    </pre>
                  );
                }

                if (!rawStdout && historyInputs.length === 0) {
                  return (
                    <div className="text-slate-500 italic text-xs">
                      Click "Run Code" to start execution...
                    </div>
                  );
                }

                // Helper parser to extract prompts and outputs line-by-line
                const parseSegments = () => {
                  let remaining = rawStdout;
                  const segments = [];
                  let inputIdx = 0;

                  while (remaining.length > 0) {
                    // Match prompt text like "Enter number: ", "Input: ", "? ", etc.
                    const promptMatch = remaining.match(/^([\s\S]*?(?:Enter[^\n:]*:|[A-Za-z0-9_ ]+:\s*|\?\s*|> \s*))/i);

                    if (promptMatch && promptMatch[1] && promptMatch[1].trim().length > 0) {
                      const promptText = promptMatch[1];
                      remaining = remaining.slice(promptText.length);

                      const hasAssignedInput = inputIdx < historyInputs.length;
                      const assignedInput = hasAssignedInput ? historyInputs[inputIdx] : null;

                      if (hasAssignedInput) {
                        inputIdx++;
                        segments.push({
                          type: 'answered_prompt',
                          text: promptText,
                          input: assignedInput
                        });
                      } else {
                        // Active prompt waiting for input
                        segments.push({
                          type: 'active_prompt',
                          text: promptText
                        });
                        // Stop rendering subsequent outputs until user enters input
                        break;
                      }
                    } else {
                      // Normal output line
                      const nextNewline = remaining.indexOf('\n');
                      if (nextNewline !== -1) {
                        const lineText = remaining.slice(0, nextNewline);
                        remaining = remaining.slice(nextNewline + 1);
                        if (lineText.trim()) {
                          segments.push({ type: 'output_line', text: lineText });
                        }
                      } else {
                        if (remaining.trim()) {
                          segments.push({ type: 'output_line', text: remaining });
                        }
                        remaining = '';
                      }
                    }
                  }

                  return segments;
                };

                const segments = parseSegments();

                return (
                  <div className="space-y-1 leading-relaxed font-mono text-xs">
                    {segments.map((seg, idx) => {
                      if (seg.type === 'answered_prompt') {
                        return (
                          <div key={idx} className="flex flex-wrap items-center font-mono text-xs text-slate-200">
                            <SyntaxHighlighter code={seg.text} language={language} customFontColor={customFontColor} />
                            <span className="text-emerald-400 font-bold ml-1">{seg.input}</span>
                          </div>
                        );
                      }

                      if (seg.type === 'active_prompt') {
                        return (
                          <div key={idx} className="flex flex-wrap items-center font-mono text-xs text-slate-200">
                            <SyntaxHighlighter code={seg.text} language={language} customFontColor={customFontColor} />
                            <input
                              type="text"
                              autoFocus
                              value={terminalInputText}
                              onChange={(e) => setTerminalInputText(e.target.value)}
                              onKeyDown={handleTerminalInputSubmit}
                              className="bg-transparent border-none outline-none font-mono text-xs text-emerald-400 caret-emerald-400 p-0 m-0 ml-1 focus:ring-0 focus:outline-none"
                              style={{ width: `${Math.max(terminalInputText.length + 1, 3)}ch` }}
                            />
                          </div>
                        );
                      }

                      return (
                        <div key={idx} className="flex flex-wrap items-center font-mono text-xs text-slate-200">
                          <SyntaxHighlighter code={seg.text} language={language} customFontColor={customFontColor} />
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Status Bar */}
      <div 
        className="px-4 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-mono select-none text-white shadow-inner"
        style={{ backgroundColor: activeTheme.statusBar }}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-semibold">
            <Terminal className="w-3 h-3" /> {language.toUpperCase()}
          </span>
          <span className="hidden sm:inline">Ln {lineCount}, Col 1</span>
          <span className="hidden md:inline">Spaces: 4</span>
          <span className="hidden md:inline">Font Theme: {FONT_COLOR_THEMES[fontColorKey].name}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {outputResult.executionTimeMs}ms
          </span>
          <span className="flex items-center gap-1 hidden sm:inline">
            <HardDrive className="w-3 h-3" /> {outputResult.memoryMb} MB
          </span>
          <span className="flex items-center gap-1 font-bold bg-black/20 px-2 py-0.5 rounded">
            <Cloud className="w-3 h-3" /> {outputResult.provider || 'Cloud Sandbox Engine'}
          </span>
        </div>
      </div>

    </div>
  );
}
