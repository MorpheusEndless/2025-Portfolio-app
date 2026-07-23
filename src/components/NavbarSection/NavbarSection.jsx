// NavbarSection.jsx
import React, { useState, forwardRef } from 'react';
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
      <div className={styles.logoContainer}> 
        <a href="#home" onClick={() => handleNavigation('home')}>
          <img src={logo} alt="Website Logo" />
        </a>
      </div>

     
      <ul className={styles.desktopMenu}>
        {['home', 'about', 'work', 'services', 'contact'].map((item) => (
          <li key={item}>
            <a
              href={`#${item}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(item);
              }}
              className="nav-link"
            >
              // {item}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Toggle */}
      <button 
        className={`${styles.hamMenu} ${isOpen ? styles.hamMenuActive : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span className={styles.hamMenuLine}></span>
        <span className={styles.hamMenuLine}></span>
      </button>

      {/* Mobile Menu */}
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
              >
                // {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
});