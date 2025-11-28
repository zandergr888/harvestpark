import SocialLinks from './SocialLinks';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h3>Harvestpark Coffeehouse</h3>
          <p>Coming to Rockwall, Texas Fall 2026</p>
          
          <SocialLinks />
        </div>

        <div className={styles.links}>
          <a href="#privacy">Privacy Policy</a>
          <span>•</span>
          <a href="#terms">Terms of Service</a>
        </div>

        <p className={styles.copyright}>
          © {currentYear} Harvestpark Coffeehouse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
