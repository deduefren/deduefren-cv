export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const initialContactFormValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const trimmedName = values.name.trim();
  if (trimmedName.length < 3 || trimmedName.length > 80) {
    errors.name = trimmedName.length === 0 ? 'required' : 'length';
  }

  const trimmedEmail = values.email.trim();
  if (trimmedEmail.length === 0) {
    errors.email = 'required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'email';
  }

  if (values.phone.trim().length > 15) {
    errors.phone = 'length';
  }

  const trimmedMessage = values.message.trim();
  if (trimmedMessage.length < 5 || trimmedMessage.length > 1000) {
    errors.message = trimmedMessage.length === 0 ? 'required' : 'length';
  }

  return errors;
}