import styles from './About.module.css';
import teamPhoto from '../assets/harvestpark-team.webp';

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Our Story</h2>
          <p>
            Harvestpark Coffeehouse is more than just a place to get your morning
            coffee—it's a sanctuary for connection, creativity, and the simple joy of
            craftsmanship.
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
