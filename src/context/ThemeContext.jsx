import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('xsandbox_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('xsandbox_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const branchedMenuColors = theme === 'dark' ? {
    color: '#f5f5f5',
    accentColor: '#60a5fa',
    lineColor: '#3f3f46'
  } : {
    color: '#0f172a',
    accentColor: '#2563eb',
    lineColor: '#94a3b8'
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, branchedMenuColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
