import React from 'react';
import BranchedMenu from './BranchedMenu';
import { useTheme } from '../context/ThemeContext';
import { 
  Terminal, 
  Code2, 
  Cpu, 
  Zap, 
  BookOpen, 
  ShieldCheck, 
  Play, 
  Sparkles,
  Layers,
  Flame,
  ArrowRight
} from 'lucide-react';

export default function LandingPage({ onSelectTab }) {
  const { branchedMenuColors } = useTheme();

  return (
    <div className="space-y-16 pb-16 animate-fadeIn">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 rounded-3xl bg-gradient-to-br from-blue-900/30 via-surface to-indigo-950/20 border border-color p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Cloud Sandbox Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Master <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">C & Python</span> with Interactive Online Compiler
            </h1>

            <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
              Complete A-Z structured notes, interactive code examples, and instant local execution engine.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onSelectTab('sandbox')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:scale-105 transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Launch Compiler</span>
              </button>

              <button
                onClick={() => onSelectTab('c-notes')}
                className="px-6 py-3 rounded-2xl bg-surface hover:bg-surface-hover border border-color text-main font-semibold text-sm transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Explore A-Z Notes</span>
              </button>
            </div>

            {/* Cloud Stats Badge */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-muted font-mono border-t border-color/40">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Instant Execution
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-400" /> C & Python Engine
              </span>
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" /> React Bits BranchedMenu
              </span>
            </div>
          </div>

          {/* Right Preview Card with Live BranchedMenu */}
          <div className="lg:col-span-5 bg-surface border border-color rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-color pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-muted ml-2">XSandbox Sidebar Navigation</span>
              </div>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono">
                Live Preview
              </span>
            </div>

            {/* Integrated BranchedMenu Component */}
            <div className="py-2 flex justify-center">
              <BranchedMenu
                items={[
                  {
                    label: 'C Notes (A-Z)',
                    children: [
                      { value: 'c-intro', label: '1. Introduction & Setup', icon: Terminal },
                      { value: 'c-variables', label: '2. Variables & Data Types', icon: Code2 },
                      { value: 'c-pointers', label: '7. Pointers & Memory', icon: Cpu }
                    ]
                  },
                  {
                    label: 'Python Notes (A-Z)',
                    children: [
                      { value: 'py-intro', label: '1. Python Environment', icon: Terminal },
                      { value: 'py-data-structures', label: '3. Lists & Dictionaries', icon: Layers },
                      { value: 'py-oop', label: '6. OOP & Classes', icon: Zap }
                    ]
                  }
                ]}
                defaultOpen={[0, 1]}
                defaultActive="c-intro"
                onSelect={(val) => onSelectTab(val.startsWith('c-') ? 'c-notes' : 'py-notes')}
                color={branchedMenuColors.color}
                accentColor={branchedMenuColors.accentColor}
                lineColor={branchedMenuColors.lineColor}
                width={260}
              />
            </div>
          </div>

        </div>
      </section>

      {/* Feature Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">Everything You Need to Learn & Code</h2>
          <p className="text-sm text-muted">
            Designed for programmers, students, and engineers with real-time compilation, memory stats, and structured guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-surface border border-color hover:border-blue-500/50 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Cloud-Based Online Compiler</h3>
            <p className="text-xs text-muted leading-relaxed">
              Compile C code using GCC and execute Python scripts instantly. Input custom stdin, view memory usage, execution time, and stdout logs.
            </p>
            <button onClick={() => onSelectTab('sandbox')} className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
              Open Compiler <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-surface border border-color hover:border-cyan-500/50 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">A-Z C & Python Notes</h3>
            <p className="text-xs text-muted leading-relaxed">
              In-depth tutorials covering syntax, data structures, pointers, dynamic memory, OOP, decorators, and system architecture.
            </p>
            <button onClick={() => onSelectTab('c-notes')} className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
              Browse Notes <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-surface border border-color hover:border-indigo-500/50 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Cloud Account System</h3>
            <p className="text-xs text-muted leading-relaxed">
              Secure authentication powered by Cloud User Pool (<code className="bg-black/20 px-1 py-0.5 rounded font-mono">ap-south-1_BCmlE1PVP</code>) with email/username sign-in and session sync.
            </p>
            <button onClick={onOpenAuth} className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              Sign In Account <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
