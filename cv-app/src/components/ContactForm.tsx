import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import {
  initialContactFormValues,
  validateContactForm,
  type ContactFormValues,
} from './contact-form.logic';

type Translate = (key: string) => string;

type SubmitResult = {
  statusCode: number;
  message: string;
} | null;

export default function ContactForm({ t }: { t: Translate }) {
  const [values, setValues] = useState<ContactFormValues>(initialContactFormValues);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormValues, boolean>>>({});
  const [submitResult, setSubmitResult] = useState<SubmitResult>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errors = useMemo(() => validateContactForm(values), [values]);
  const isValid = Object.keys(errors).length === 0;

  function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function touchField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/PostContactForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as SubmitResult;
      setSubmitResult(payload);

      if (payload && payload.statusCode === 0) {
        setValues(initialContactFormValues);
        setTouched({});
      }
    } catch (error) {
      setSubmitResult({
        statusCode: -4,
        message: error instanceof Error ? error.message : 'Unexpected error',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function controlClass(field: keyof ContactFormValues): string {
    if (!touched[field]) {
      return 'form-control';
    }

    return errors[field] ? 'form-control is-invalid' : 'form-control is-valid';
  }

  return (
    <div className="container">
      <div className="text-center">
        <h2 className="section-heading text-uppercase">{t('contact.title')}</h2>
        <h3 className="section-subheading text-muted">{t('contact.subtitle')}</h3>
      </div>
      <form id="contactForm" noValidate onSubmit={onSubmit}>
        <div className="row align-items-stretch mb-5">
          <div className="col-md-6">
            <div className="form-group">
              <input
                className={controlClass('name')}
                id="name"
                name="name"
                type="text"
                placeholder={t('contact.name')}
                value={values.name}
                onChange={updateField}
                onBlur={touchField}
              />
              {touched.name && errors.name === 'required' ? <div className="invalid-feedback">{t('contact.name-validation')}</div> : null}
              {touched.name && errors.name === 'length' ? <div className="invalid-feedback">{t('contact.name-validation-length')}</div> : null}
            </div>
            <div className="form-group">
              <input
                className={controlClass('email')}
                id="email"
                name="email"
                type="email"
                placeholder={t('contact.email')}
                value={values.email}
                onChange={updateField}
                onBlur={touchField}
              />
              {touched.email && errors.email === 'required' ? <div className="invalid-feedback">{t('contact.email-validation-required')}</div> : null}
              {touched.email && errors.email === 'email' ? <div className="invalid-feedback">{t('contact.email-validation-invalid')}</div> : null}
            </div>
            <div className="form-group mb-md-0">
              <input
                className={controlClass('phone')}
                id="phone"
                name="phone"
                type="tel"
                placeholder={t('contact.phone')}
                value={values.phone}
                onChange={updateField}
                onBlur={touchField}
              />
              {touched.phone && errors.phone === 'length' ? <div className="invalid-feedback">{t('contact.phone-validation-length')}</div> : null}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group form-group-textarea mb-md-0">
              <textarea
                className={controlClass('message')}
                id="message"
                name="message"
                placeholder={t('contact.message')}
                value={values.message}
                onChange={updateField}
                onBlur={touchField}
              />
              {touched.message && errors.message === 'required' ? <div className="invalid-feedback">{t('contact.message-validation')}</div> : null}
              {touched.message && errors.message === 'length' ? <div className="invalid-feedback">{t('contact.message-validation-length')}</div> : null}
            </div>
          </div>
        </div>
        {submitResult?.statusCode === 0 ? (
          <div id="submitSuccessMessage">
            <div className="text-center text-white mb-3">
              <div className="fw-bolder">{t('contact.send-success')}</div>
            </div>
          </div>
        ) : null}
        {submitResult && submitResult.statusCode < 0 ? (
          <div id="submitErrorMessage">
            <div className="text-center text-danger mb-3">
              {t('contact.send-error')} {submitResult.statusCode === -4 ? submitResult.message : t(`contact.${submitResult.message}`)}
            </div>
          </div>
        ) : null}
        <div className="text-center">
          <button className="btn btn-primary btn-xl text-uppercase" id="submitButton" type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? '...' : t('contact.send-button')}
          </button>
        </div>
      </form>
    </div>
  );
}
