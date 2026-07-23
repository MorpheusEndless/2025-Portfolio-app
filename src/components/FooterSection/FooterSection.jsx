// src/components/FooterSection/FooterSection.jsx
import { SOCIAL_LINKS } from '../Database/socialLinkData';
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
      <p>Let's connect! Feel free to reach out for collaboration or inquiries.</p>
    </footer>
  );
};