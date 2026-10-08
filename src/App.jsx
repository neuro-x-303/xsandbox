import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import NotesView from './components/NotesView';
import CompilerSandbox from './components/CompilerSandbox';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'c-notes' | 'py-notes' | 'sandbox'
  const [sandboxLanguage, setSandboxLanguage] = useState('c');
  const [sandboxInitialCode, setSandboxInitialCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenSandboxWithCode = (lang, code) => {
    setSandboxLanguage(lang);
    setSandboxInitialCode(code);
    setActiveTab('sandbox');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-main text-main flex flex-col selection:bg-blue-500 selection:text-white transition-colors duration-200">
        
        {/* Top Header Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Tab 1: Landing Page */}
          {activeTab === 'landing' && (
            <LandingPage
              onSelectTab={(tab) => setActiveTab(tab)}
            />
          )}

          {/* Tab 2: C Programming Notes */}
          {activeTab === 'c-notes' && (
            <NotesView
              language="c"
              searchQuery={searchQuery}
              onOpenSandbox={handleOpenSandboxWithCode}
            />
          )}

          {/* Tab 3: Python Programming Notes */}
          {activeTab === 'py-notes' && (
            <NotesView
              language="python"
              searchQuery={searchQuery}
              onOpenSandbox={handleOpenSandboxWithCode}
            />
          )}

          {/* Tab 4: Cloud Compiler Sandbox */}
          {activeTab === 'sandbox' && (
            <CompilerSandbox
              initialLanguage={sandboxLanguage}
              initialCode={sandboxInitialCode}
            />
          )}

        </main>

        {/* Footer */}
        <footer className="border-t border-color bg-surface py-8 text-xs text-muted mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                X
              </div>
              <span className="font-bold text-main">XSandbox Platform</span>
              <span>— Interactive C & Python Learning Ecosystem</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 font-mono text-[11px]">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Engine: GCC & Python3 Sandbox
              </span>
              <span className="flex items-center gap-1 text-blue-400">
                <Terminal className="w-3.5 h-3.5" /> Local Interactive Terminal
              </span>
            </div>

            <p className="flex items-center gap-1">
              Built with React, Vite & Node.js
            </p>

          </div>
        </footer>

        {/* Cloud Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={(user) => setCurrentUser(user)}
        />

      </div>
    </ThemeProvider>
  );
}
