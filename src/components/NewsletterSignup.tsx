import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from './NewsletterSignup.module.css';

interface NewsletterFormData {
  email: string;
}

// Initialize Supabase
const supabase = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
  ? createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    )
  : null;

export default function NewsletterSignup() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterFormData>();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      setError('');
      
      if (!supabase) {
        setError('Service not available. Please try again later.');
        return;
      }

      // Call Supabase Edge Function
      const { data: result, error } = await supabase.functions.invoke('handle-newsletter', {
        body: {
          email: data.email,
        },
      });

      if (error) {
        throw error;
      }

      console.log('Newsletter signup:', data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to subscribe. Please try again.');
    }
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
          {error && <p className={styles.error}>{error}</p>}
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
