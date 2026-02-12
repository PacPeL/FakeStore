// src/app/providers/SettingsProvider.jsx
import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import i18n, { setLang } from '../i18n';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [lang, setLanguage] = useState(() => i18n.language || 'pt');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    lang,
    changeLang: (l) => {
      setLanguage(l);
      setLang(l); // i18n + persistencia
    }
  }), [theme, lang]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}