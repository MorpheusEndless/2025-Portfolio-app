// src/components/AboutSection/AboutSection.jsx
import { useState } from 'react';
import { SERVICES } from '../Database/servicesData';
import styles from './AboutSection.module.css';

export const AboutSection = ({ 
  aboutSection1Ref, 
  aboutSection2Ref, 
  aboutSection3Ref, 
  aboutContainerRef 
}) => {
  const [activeService, setActiveService] = useState('uiux');

  return (
    <section id="about" className="section" ref={aboutContainerRef}>
      <div className={styles.aboutContainer}> {/* ← Local (hashed) */}
        
        {/* SECTION 1: Avatar Image - Use GLOBAL class for GSAP */}
        <div className="about-section1" ref={aboutSection1Ref}></div>

        {/* SECTION 2: About Me Text - Use GLOBAL class for GSAP */}
        <div className="about-section2" ref={aboutSection2Ref}>
          <h2>ABOUT ME</h2>
          <p>
            I'm a passionate frontend developer and UI/UX designer 
            focused on building clean, responsive, and meaningful user 
            experiences. I care deeply about how things look and feel, 
            and I turn ideas into polished interfaces that are both beautiful and intuitive. 
            My goal is simple: create products people enjoy using.
          </p>
        </div>

        {/* SECTION 3: Services Tabs */}
        <div className="about-section3" ref={aboutSection3Ref}>
          <h2>SERVICES</h2>
          
          <div className={styles.linksContainer}> {/* ← Local (hashed) */}
            {Object.keys(SERVICES).map((serviceKey) => (
              <button
                key={serviceKey}
                className={`service-btn ${activeService === serviceKey ? 'active' : ''}`} // ← Global class for GSAP
                onClick={() => setActiveService(serviceKey)}
              >
                {SERVICES[serviceKey].title}
              </button>
            ))}
          </div>

          <div className='service-content'> {/* ← Local (hashed) */}
            <h3>{SERVICES[activeService].title}</h3>
            <p>{SERVICES[activeService].content}</p>
          </div>
        </div>

      </div>
    </section>
  );
};