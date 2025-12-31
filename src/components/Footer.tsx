import { useState } from 'react';
import SocialLinks from './SocialLinks';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showModal, setShowModal] = useState<'privacy' | 'terms' | null>(null);

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal('privacy');
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal('terms');
  };

  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h3>Harvestpark Coffeehouse</h3>
          <p>Coming to Rockwall, Texas Fall 2026</p>
          
          <SocialLinks />
        </div>

        <div className={styles.links}>
          <a href="#privacy" onClick={handlePrivacyClick}>Privacy Policy</a>
          <span>•</span>
          <a href="#terms" onClick={handleTermsClick}>Terms of Service</a>
        </div>

        <p className={styles.copyright}>
          © {currentYear} Harvestpark Coffeehouse. All rights reserved.
        </p>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>×</button>
            
            {showModal === 'privacy' && (
              <div>
                <h2>Privacy Policy</h2>
                <p><strong>Effective Date: January 1, 2026</strong></p>
                <p>Harvestpark Coffeehouse is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.</p>
                
                <h3>Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you sign up for our newsletter or contact us through our website.</p>
                
                <h3>How We Use Your Information</h3>
                <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and send you promotional materials (with your consent).</p>
                
                <h3>Data Security</h3>
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                
                <h3>Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us at info@harvestparkcoffeehouse.com</p>
              </div>
            )}

            {showModal === 'terms' && (
              <div>
                <h2>Terms of Service</h2>
                <p><strong>Effective Date: January 1, 2026</strong></p>
                <p>Welcome to Harvestpark Coffeehouse. These Terms of Service govern your use of our website and services.</p>
                
                <h3>Acceptance of Terms</h3>
                <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                
                <h3>Use License</h3>
                <p>Permission is granted to temporarily download one copy of the materials (information or software) on Harvestpark Coffeehouse's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
                
                <h3>Disclaimer</h3>
                <p>The materials on Harvestpark Coffeehouse's website are provided on an 'as is' basis. Harvestpark Coffeehouse makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                
                <h3>Limitations</h3>
                <p>In no event shall Harvestpark Coffeehouse or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption).</p>
                
                <h3>Contact Us</h3>
                <p>If you have any questions about these Terms of Service, please contact us at info@harvestparkcoffeehouse.com</p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
