import React, { useState,forwardRef } from 'react';
import logo from "../images/FM.png"
import "./Navbar.css";

export const Navbar = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleNavigation = (id) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <nav className='navbar' ref={ref}>
      <div className="logo-container">
        <a href="#home" onClick={() => handleNavigation('home')}>
          <img src={logo} alt="Website Logo" />
        </a>
      </div>

      {/* Desktop Menu */}
      <ul className="desktop-menu">
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
        className={`ham-menu ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span className="ham-menu__line"></span>
        <span className="ham-menu__line"></span>
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
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