import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import { normalizeLanguage } from './i18n';
import './styles.css';
import './react-overrides.css';

declare global {
  interface Window {
    __INITIAL_LANGUAGE__?: string;
  }
}

const initialLanguage = normalizeLanguage(window.__INITIAL_LANGUAGE__);

hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <App initialLanguage={initialLanguage} />
  </React.StrictMode>,
);
