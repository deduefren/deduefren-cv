import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { Language, normalizeLanguage } from './i18n';

export function detectLanguage(acceptLanguageHeader: string | undefined): Language {
  if (!acceptLanguageHeader) {
    return 'en';
  }

  const first = acceptLanguageHeader.split(',')[0]?.trim();
  return normalizeLanguage(first);
}

export function render(initialLanguage: Language): string {
  return renderToString(
    <React.StrictMode>
      <App initialLanguage={initialLanguage} />
    </React.StrictMode>,
  );
}
