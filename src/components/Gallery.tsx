import { useEffect, useState } from 'react';
import styles from './Gallery.module.css';
import coffeePouring from '../assets/coffee-pouring.webp';
import coffeeBeans from '../assets/coffee-beans.webp';
import espressoMachine from '../assets/espresso-machine.webp';
import teamPhoto from '../assets/harvestpark-team.webp';

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Harvestpark brand photography
    const brandImages = [
      coffeePouring,
      coffeeBeans,
      espressoMachine,
      teamPhoto,
      'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1495474472645-4c71bcdd2151?w=400&h=400&fit=crop',
    ];
    setImages(brandImages);
  }, []);

  return (
    <section className={styles.gallery} id="gallery">
      <div className={styles.container}>
        <h2>Gallery</h2>
        <div className={styles.masonryGrid}>
          {images.map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
              />
              <div className={styles.overlay}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
