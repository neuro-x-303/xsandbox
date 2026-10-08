import React, { useState } from 'react';
import { signUpUser, signInUser } from '../services/authService';
import { X, KeyRound, Mail, User, Shield, Terminal, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!username || !password) {
          throw new Error('Please enter username/email and password.');
        }
        const user = await signInUser({ username, password });
        onAuthSuccess(user);
        onClose();
      } else if (mode === 'signup') {
        if (!email || !password) {
          throw new Error('Please enter valid email and password.');
        }
        const res = await signUpUser({ username: username || email, email, password });
        onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    const guestUser = {
      username: 'guest_developer',
      email: 'guest@xsandbox.io',
      isVerified: true,
      authProvider: 'XSandbox Engine'
    };
    onAuthSuccess(guestUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-surface border border-color rounded-2xl shadow-2xl overflow-hidden relative">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <Terminal className="w-5 h-5 text-cyan-300" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-200">
              XSandbox User Account
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            {mode === 'login' ? 'Sign In to XSandbox' : 'Create Your Account'}
          </h2>
          <p className="text-xs text-blue-100 mt-1">
            Cloud Code Execution & Interactive Learning Engine
          </p>
        </div>

        {/* Security Info Badge */}
        <div className="bg-blue-500/10 border-b border-blue-500/20 px-6 py-2 flex items-center justify-between text-[11px] text-blue-400 font-mono">
          <span>Local Engine & Environment</span>
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3" /> Encrypted Session
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl">
              {errorMsg}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Username / Identifier</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-muted" />
                <input
                  type="text"
                  required
                  placeholder="e.g. dev_coder"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-hover border border-color text-sm text-main focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-muted mb-1">
              {mode === 'login' ? 'Email address or Username' : 'Email Address'}
            </label>
            <div className="relative">
              {mode === 'login' ? <User className="w-4 h-4 absolute left-3 top-3 text-muted" /> : <Mail className="w-4 h-4 absolute left-3 top-3 text-muted" />}
              <input
                type={mode === 'login' ? 'text' : 'email'}
                required
                placeholder={mode === 'login' ? 'Username or email' : 'developer@domain.com'}
                value={mode === 'login' ? username : email}
                onChange={(e) => mode === 'login' ? setUsername(e.target.value) : setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-hover border border-color text-sm text-main focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-3 text-muted" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-hover border border-color text-sm text-main focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Mode Switcher & Guest Link */}
        <div className="px-6 py-4 bg-surface-hover border-t border-color flex flex-col items-center gap-2 text-xs">
          {mode === 'login' ? (
            <p className="text-muted">
              Don't have an account?{' '}
              <button onClick={() => setMode('signup')} className="text-blue-400 font-semibold hover:underline">
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-muted">
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-blue-400 font-semibold hover:underline">
                Sign In
              </button>
            </p>
          )}

          <div className="w-full border-t border-color/40 my-1" />

          <button
            onClick={handleGuestMode}
            className="text-muted hover:text-main text-[11px] font-medium transition-colors"
          >
            Continue as Guest / Local Session →
          </button>
        </div>

      </div>
    </div>
  );
}
