import styles from './Hero.module.css';
import coffeePouring from '../assets/coffee-pouring.webp';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.overlay}></div>
      <img
        src={coffeePouring}
        alt="Coffee Art"
        className={styles.backgroundImage}
      />
      <div className={styles.content}>
        <h1 className={styles.heading}>Coming Soon</h1>
        <p className={styles.subheading}>to Rockwall, Texas</p>
        <p className={styles.tagline}>Opening Winter 2026</p>
        <div className={styles.ctaButtons}>
          <button
            className="btn-secondary"
            onClick={() => scrollToSection('newsletter')}
          >
            Join the Waitlist
          </button>
          <button
            className="btn-primary"
            onClick={() => scrollToSection('contact')}
          >
            Book the Coffee Cart
          </button>
        </div>
      </div>
    </section>
  );
}
