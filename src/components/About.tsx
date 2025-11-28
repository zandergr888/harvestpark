import styles from './About.module.css';
import teamPhoto from '../assets/harvestpark-team.webp';

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Our Story</h2>
          <p>
            At harvestpark coffeehouse, we believe in serving only the finest coffee. Each cup is crafted using premium beans sourced from renowned roasters, ensuring a rich and satisfying experience. Custom house-made syrups are our specialty.
          </p>
          <p>
            Born from a passion for exceptional coffee and warm hospitality, we're
            bringing artisanal brews and handcrafted experiences to the heart of
            Rockwall. Our coffee cart is available now for catering and events, while
            we prepare our permanent café to open Fall 2026.
          </p>
          <p>
            Every cup tells a story. Every visit creates a memory. Welcome to the
            harvest of life's finest moments.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={teamPhoto}
            alt="Harvestpark Team with Coffee Cart"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
