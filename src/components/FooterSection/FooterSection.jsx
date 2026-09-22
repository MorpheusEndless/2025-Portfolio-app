// src/components/FooterSection/FooterSection.jsx
import { SOCIAL_LINKS } from '../Database/socialLinkData';
import logo from "../../images/FM.png";
import styles from './FooterSection.module.css';

export const FooterSection = () => {
  return (
    <footer className={styles.footerSection}>
      
      <div className={styles.sectionLine}></div>
      
      <div className={styles.socialContainer}>
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialIcon} ${styles[link.className]}`}
            aria-label={link.label}
          >
            <i className={link.icon}></i>
          </a>
        ))}
      </div>
      
      {/* Replace your existing <p> with this block */}
       <div className={styles.footerCta}>
           <h3 className={styles.ctaHeading}>Have a project in mind?</h3>
           <p className={styles.ctaText}>
             Send your brief, and let's craft a clean, intuitive, and enjoyable visual experience together.
           </p>
       </div>
      
      {/* LOGO CENTERED (Now sits below the paragraph) */}
      <div className={styles.logoContainer}>
        <img src={logo} alt="Website Logo" />
      </div>

      <p className={styles.copyrightText}>
        © 2026 All Rights Reserved...
      </p>
      
    </footer>
  );
};