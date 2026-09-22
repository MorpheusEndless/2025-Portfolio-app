import React, { useState, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import logo from "../../images/FM.png";
import styles from './NavbarSection.module.css';

export const NavbarSection = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (id) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <nav className="navbar" ref={ref}>
      
      {/* SVG FILTER DEFINITION */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
        <filter id="liquid-glass-navbar" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="4" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="3" result="smoothNoise" />
          <feDisplacementMap in="SourceGraphic" in2="smoothNoise" scale="30" xChannelSelector="R" yChannelSelector="G" result="refracted" />
        </filter>
      </svg>

      <div className={styles.logoContainer}> 
        <a href="#home" onClick={() => handleNavigation('home')}>
          <img src={logo} alt="Website Logo" />
        </a>
      </div>

      <ul className={styles.desktopMenu}>
        {['home', 'about', 'work', 'services'].map((item) => (
          <li key={item}>
            <a
              href={`#${item}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(item);
              }}
              className="nav-link"
              aria-label={`Navigate to ${item} section`}
            >
             // {item}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          handleNavigation('contact');
        }}
        className={styles.contactBtn}
        aria-label="Navigate to contact section"
      >
        Contact
      </a>

      <button 
        className={`${styles.hamMenu} ${isOpen ? styles.hamMenuActive : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className={styles.hamMenuLine}></span>
        <span className={styles.hamMenuLine}></span>
      </button>

      {/* Mobile Menu — portaled to <body> so it escapes the navbar's
          backdrop-filter containing block. Rendered from here so the
          state and styles stay in one place. */}
      {createPortal(
        <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuActive : ''}`}>
          <ul>
            {['home', 'about', 'work', 'services', 'contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item);
                  }}
                  className="mobile-nav-link"
                  aria-label={`Navigate to ${item} section`}
                >
                 // {item}
                </a>
              </li>
            ))}
          </ul>
        </div>,
        document.body
      )}
    </nav>
  );
});