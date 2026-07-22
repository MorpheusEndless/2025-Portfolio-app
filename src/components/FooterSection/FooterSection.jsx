// src/components/FooterSection/FooterSection.jsx
import { SOCIAL_LINKS } from '../Database/socialLinkData';
import styles from './FooterSection.module.css'; // ← Changed import

export const FooterSection = () => {
  return (
    <footer className={styles.footerSection}> {/* ← Local */}
      <div className={styles.sectionLine}></div> {/* ← Local */}
      <div className={styles.socialContainer}> {/* ← Local */}
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialIcon} ${styles[link.className]}`} // ← Local (bracket notation for dynamic classes)
            aria-label={link.label}
          >
            <i className={link.icon}></i> {/* ← FontAwesome classes stay GLOBAL (third-party) */}
          </a>
        ))}
      </div>
      <p>Let's connect! Feel free to reach out for collaboration or inquiries.</p>
    </footer>
  );
};