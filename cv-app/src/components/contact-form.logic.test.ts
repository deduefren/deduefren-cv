import { describe, expect, it } from 'vitest';
import {
  initialContactFormValues,
  validateContactForm,
} from './contact-form.logic';

describe('contact-form.logic', () => {
  it('starts with empty values', () => {
    expect(initialContactFormValues).toEqual({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  });

  it('flags invalid contact data', () => {
    expect(validateContactForm({
      name: 'Al',
      email: 'not-an-email',
      phone: '1234567890123456',
      message: 'hey',
    })).toEqual({
      name: 'length',
      email: 'email',
      phone: 'length',
      message: 'length',
    });
  });

  it('accepts valid contact data', () => {
    expect(validateContactForm({
      name: 'Daniel Efren',
      email: 'daniel@example.com',
      phone: '123456789',
      message: 'Hello from the site',
    })).toEqual({});
  });
});