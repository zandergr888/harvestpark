import styles from './Gallery.module.css';

const images = [
  '/image 11.jpeg',
  '/image 2.jpeg',
  '/image 3.jpeg',
  '/image 4.jpeg',
  '/image 5.jpeg',
  '/image 6.jpeg',
  '/image 7.jpeg',
  '/image 8.jpeg',
];

export default function Gallery() {

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
