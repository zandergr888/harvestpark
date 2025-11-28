import styles from './Offerings.module.css';
import teamPhoto from '../assets/harvestpark-team.webp';
import espressoMachine from '../assets/espresso-machine.webp';

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
                src={teamPhoto}
                alt="Coffee Cart Catering Service"
                loading="lazy"
              />
            </div>
            <div className={styles.cardContent}>
              <h3>Coffee Cart Catering</h3>
              <p className={styles.badge}>Available Now</p>
              <p>
                Bring Harvestpark's artisanal coffee experience to your events,
                weddings, corporate gatherings, and special occasions.
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
                src={espressoMachine}
                alt="Future Harvestpark Café Experience"
                loading="lazy"
              />
            </div>
            <div className={styles.cardContent}>
              <h3>Future Café</h3>
              <p className={styles.badge}>Opening Fall 2026</p>
              <p>
                Coming to Rockwall: a destination café experience featuring premium
                single-origin coffee, Custom house-made syrups are our specialty.
              </p>
              <button
                className="btn-secondary"
                onClick={() => scrollToSection('newsletter')}
              >
                Stay Updated
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
