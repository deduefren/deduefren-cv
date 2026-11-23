import en from './assets/i18n/en.json';
import es from './assets/i18n/es.json';

export type Language = 'en' | 'es';

const translations = {
  en,
  es,
} as const;

interface TranslationTree {
  [key: string]: string | TranslationTree;
}

export function getInitialLanguage(): Language {
  if (typeof navigator === 'undefined') {
    return 'en';
  }

  const browserLanguage = navigator.language.slice(0, 2).toLowerCase();
  return browserLanguage === 'es' ? 'es' : 'en';
}

export function normalizeLanguage(value: string | undefined): Language {
  if (!value) {
    return 'en';
  }

  const normalized = value.slice(0, 2).toLowerCase();
  return normalized === 'es' ? 'es' : 'en';
}

function resolveValue(node: TranslationTree | string, keyParts: string[], index: number): string | undefined {
  if (typeof node === 'string') {
    return index === keyParts.length ? node : undefined;
  }

  const remainingKey = keyParts.slice(index).join('.');
  const directMatch = node[remainingKey];
  if (typeof directMatch === 'string') {
    return directMatch;
  }

  const currentKey = keyParts[index];
  const nextNode = node[currentKey];
  if (!nextNode) {
    return undefined;
  }

  return resolveValue(nextNode as TranslationTree | string, keyParts, index + 1);
}

export function translate(language: Language, key: string): string {
  const resolved = resolveValue(translations[language] as TranslationTree, key.split('.'), 0);
  return resolved ?? key;
}
