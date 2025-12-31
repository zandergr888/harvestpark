import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from './NewsletterSignup.module.css';

interface NewsletterFormData {
  email: string;
}

// Initialize Supabase (fallback to hardcoded values if env vars not available)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://sxfahukoleoqihoueodx.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4ZmFodWtvbGVvcWlob3Vlb2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NDU1MjcsImV4cCI6MjA4MDAyMTUyN30.OD-Uag1mFea_dIyRIy_BMxkgu0c0LhfXheY9E33UTPE';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function NewsletterSignup() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterFormData>();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      setError('');

      // Call Supabase Edge Function
      const { error } = await supabase.functions.invoke('handle-newsletter', {
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
