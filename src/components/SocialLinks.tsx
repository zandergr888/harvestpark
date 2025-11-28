import styles from './SocialLinks.module.css';

export default function SocialLinks() {
  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com', icon: '📸' },
    { name: 'Facebook', url: 'https://facebook.com', icon: 'f' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '𝕏' },
  ];

  return (
    <div className={styles.socialLinks}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={link.name}
          className={styles.link}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
