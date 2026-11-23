import { describe, expect, it } from 'vitest';
import { getInitialLanguage, normalizeLanguage, translate } from './i18n';

describe('i18n', () => {
  it('normalizes supported languages', () => {
    expect(normalizeLanguage('es-ES')).toBe('es');
    expect(normalizeLanguage('en-US')).toBe('en');
    expect(normalizeLanguage(undefined)).toBe('en');
  });

  it('falls back to key when translation is missing', () => {
    expect(translate('en', 'does.not.exist')).toBe('does.not.exist');
  });

  it('resolves nested translations', () => {
    expect(translate('en', 'contact.send-button')).not.toBe('contact.send-button');
  });

  it('defaults to english on server', () => {
    const originalNavigator = globalThis.navigator;

    try {
      Object.defineProperty(globalThis, 'navigator', {
        configurable: true,
        value: undefined,
      });

      expect(getInitialLanguage()).toBe('en');
    } finally {
      Object.defineProperty(globalThis, 'navigator', {
        configurable: true,
        value: originalNavigator,
      });
    }
  });
});