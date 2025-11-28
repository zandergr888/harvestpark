import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styles from './NewsletterSignup.module.css';

interface NewsletterFormData {
  email: string;
}

export default function NewsletterSignup() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterFormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: NewsletterFormData) => {
    // TODO: Integrate with Mailchimp or Supabase
    console.log('Newsletter signup:', data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className={styles.newsletter} id="newsletter">
      <div className={styles.container}>
        <h2>Stay in the Loop</h2>
        <p>Be the first to know about our café opening, special events, and exclusive offerings.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="your@email.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <button type="submit" className="btn-secondary">
              Subscribe
            </button>
          </div>
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </form>

        {submitted && (
          <div className={styles.successMessage}>
            Thank you for joining our waitlist!
          </div>
        )}
      </div>
    </section>
  );
}
