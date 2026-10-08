import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Terminal, 
  BookOpen, 
  Code2, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  ShieldCheck, 
  Sparkles,
  Search
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  searchQuery,
  setSearchQuery
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-opacity-80 border-b border-color transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Logo */}
        <div 
          onClick={() => setActiveTab('landing')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-surface rounded-[10px] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                XSandbox
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-muted flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3 h-3 text-emerald-400 inline" /> XSandbox Compiler Engine
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xs relative items-center">
          <Search className="w-4 h-4 absolute left-3 text-muted" />
          <input
            type="text"
            placeholder="Search C & Python Notes (A-Z)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-surface border border-color text-sm text-main placeholder-muted focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'landing' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25' 
                : 'text-muted hover:text-main hover:bg-surface'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('c-notes')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'c-notes' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25' 
                : 'text-muted hover:text-main hover:bg-surface'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>C Notes</span>
          </button>

          <button
            onClick={() => setActiveTab('py-notes')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'py-notes' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25' 
                : 'text-muted hover:text-main hover:bg-surface'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Python Notes</span>
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'sandbox' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/25' 
                : 'text-muted hover:text-main hover:bg-surface'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span className="font-semibold">Compiler</span>
          </button>
        </nav>

        {/* Right Actions: Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Light/Dark Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-xl bg-surface border border-color text-main hover:bg-surface-hover transition-all"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
