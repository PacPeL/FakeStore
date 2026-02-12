// src/components/layout/LanguageSwitcher.jsx
import { useState } from 'react';
import { useSettings } from '../../app/providers/SettingsProvider';

const LANG_LABELS = {
  pt: 'Português',
  es: 'Español',
  en: 'English'
};

export default function LanguageSwitcher() {
  const { lang, changeLang } = useSettings();
  const [open, setOpen] = useState(false);

  return (
    <div className="lang-switcher">
      <button
        className="lang-btn"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Idioma / Language"
      >
        🌐 {lang.toUpperCase()}
      </button>

      {open && (
        <ul className="lang-menu" role="listbox">
          {(['pt','es','en']).map(code => (
            <li key={code}>
              <button
                className={`lang-option ${code === lang ? 'is-active' : ''}`}
                role="option"
                aria-selected={code === lang}
                onClick={() => { changeLang(code); setOpen(false); }}
              >
                {LANG_LABELS[code]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}