import styles from './About.module.css';
import teamPhoto from '../assets/harvestpark-team.webp';

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Our Story</h2>
          <p>
            <strong>Coffee as a craft. Hospitality as a calling.</strong>
          </p>
          <p>
            We believe that coffee has always been more than just a conduit of caffeine; it's a craft, a culture. Our vision is that the beans become a means of provision. Your morning ritual deserves the value and quality we bring to every specialty brew.
          </p>
          <p>
            Harvestpark started in Summer 2026 from an entrepreneurial dream. Making tasty lattes and being servants to others is what we do best, and we can't wait to see where this journey takes us!
          </p>
          <p>
            Our coffee cart is available now for catering and events across the DFW area, while we prepare our permanent café to open Spring 2027 in Rockwall.
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
