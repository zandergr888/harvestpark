import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styles from './ContactForm.module.css';

interface ContactFormData {
  name: string;
  email: string;
  eventType: string;
  date?: string;
  message: string;
}

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: ContactFormData) => {
    // TODO: Integrate with email service or Supabase
    console.log('Contact form submitted:', data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h2>Get in Touch</h2>
          <p>Interested in booking our coffee cart or have questions? We'd love to hear from you.</p>

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

            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>

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
