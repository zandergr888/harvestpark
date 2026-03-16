import styles from './Offerings.module.css';

export default function Offerings() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.offerings} id="offerings">
      <div className={styles.container}>
        <h2>What We Offer</h2>
        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <img
                src="/image 10.jpeg"
                alt="Coffee Cart Catering Service"
                loading="lazy"
              />
            </div>
            <div className={styles.cardContent}>
              <h3>Coffee Cart Catering</h3>
              <p className={styles.badge}>Available Now</p>
              <p>
                Bring Harvestpark's Mobile Espresso Bar to your parties, school events,
                weddings, corporate gatherings, and special occasions!
              </p>
              <button
                className="btn-secondary"
                onClick={() => scrollToSection('contact')}
              >
                Request a Quote
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardImage}>
              <img
                src="/future cafe photo.PNG"
                alt="Future Harvestpark Café Experience"
                loading="lazy"
              />
            </div>
            <div className={styles.cardContent}>
              <h3>Future Café</h3>
              <p className={styles.badge}>Opening Spring 2027</p>
              <p>
                Coming to Rockwall, TX: a hospitality-focused Coffeehouse featuring
                a roastery, house-made syrups, and pickleball courts.
              </p>
              <a
                href="https://www.instagram.com/harvestpark.coffee/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-secondary">Stay Updated</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
