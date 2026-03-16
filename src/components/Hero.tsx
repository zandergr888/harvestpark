import styles from './Hero.module.css';

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
      <video
        className={styles.backgroundImage}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/HPCH Video.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.heading}>Coming Soon</h1>
        <p className={styles.subheading}>to Rockwall, Texas</p>
        <p className={styles.tagline}>Opening Spring 2027</p>
        <div className={styles.ctaButtons}>
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
