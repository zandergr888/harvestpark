import styles from './SocialLinks.module.css';

export default function SocialLinks() {
  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/harvestpark.coffee/', icon: '📸' },
    { name: 'Facebook', url: 'https://www.facebook.com/people/Harvestparkcoffee/61580736117341/', icon: 'f' },
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
