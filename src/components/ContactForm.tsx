import { useForm } from 'react-hook-form';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactForm.module.css';

interface ContactFormData {
  name: string;
  email: string;
  eventType: string;
  date?: string;
  message: string;
}

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    try {
      setError('');
      setIsLoading(true);

      // Send email via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          event_type: data.eventType,
          event_date: data.date || 'Not specified',
          message: data.message,
          to_email: 'contact@harvestpark.coffee',
        }
      );

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('EmailJS error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h2>Get in Touch</h2>
          <p>Interested in booking our coffee cart or have questions? We'd love to hear from you.</p>

          <div className={styles.infoBox}>
            <h3>Stay Caffeinated!</h3>
            <p>
              Have a comment or a question? Ready to schedule our coffee cart? Use the form below or email us and we can send you a customized quote - catering packages start at $695 for up to 50 people. Send us a message, and we will get back to you shortly.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="eventType">Event Type *</label>
              <select
                id="eventType"
                {...register('eventType', { required: 'Event type is required' })}
              >
                <option value="">Select an event type</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate Event</option>
                <option value="private">Private Party</option>
                <option value="other">Other</option>
              </select>
              {errors.eventType && <p className={styles.error}>{errors.eventType.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="date">Event Date</label>
              <input
                type="date"
                id="date"
                {...register('date')}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                placeholder="Tell us more about your event..."
                rows={5}
                {...register('message', { required: 'Message is required' })}
              ></textarea>
              {errors.message && <p className={styles.error}>{errors.message.message}</p>}
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {error && <div className={styles.errorMessage}>{error}</div>}
          {submitted && (
            <div className={styles.successMessage}>
              Thanks for reaching out! We'll get back to you soon.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
