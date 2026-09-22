import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../Database/servicesData';
import styles from './AboutSection.module.css';
import { useAboutAnimation } from '../Hooks/useAboutAnimation';
import { createTypewriterChars, animateTypewriterChars } from '../utils/typewriter';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_TEXT =
  "I'm a passionate frontend developer and Visual designer focused on building clean, responsive, and meaningful user experiences. I care deeply about how things look and feel, and I turn ideas into polished interfaces that are both beautiful and intuitive. My goal is simple: create products people enjoy using...";

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('dev');
  const serviceKeys = Object.keys(SERVICES);

  const sectionRef = useRef(null);
  const tabListRef = useRef(null);
  const tabSliderRef = useRef(null);
  const tabPanelRef = useRef(null);

  useEffect(() => {
    const activeButton = tabListRef.current?.querySelector(`.${styles.tabActive}`);
    const slider = tabSliderRef.current;
    if (activeButton && slider) {
      slider.style.transform = `translateX(${activeButton.offsetLeft}px)`;
      slider.style.width = `${activeButton.offsetWidth}px`;
    }
  }, [activeTab]);

  useAboutAnimation(sectionRef, ABOUT_TEXT);

  const handleTabClick = (key) => {
    setActiveTab(key);

    setTimeout(() => {
      const panel = tabPanelRef.current;
      if (!panel) return;
      const paragraph = panel.querySelector('p');
      if (!paragraph) return;

      gsap.killTweensOf(panel.querySelectorAll('span'));

      // Remove every cursor node anywhere on the page — guarantees no
      // orphan from a prior typewriter run survives.
      document.querySelectorAll('.about-cursor').forEach((el) => el.remove());

      const { charSpans, cursor } = createTypewriterChars(
        paragraph,
        SERVICES[key].content,
        'about-cursor'
      );
      gsap.set(charSpans, { opacity: 0 });
      animateTypewriterChars(charSpans, cursor, 0.03);
    }, 0);
  };

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className={styles.aboutContainer}>
        <div className={styles.decoTopRight} data-animate="deco-top-right"></div>
        <div className={styles.decoBottomLeft} data-animate="deco-bottom-left"></div>

        <div className={styles.aboutHeading} data-animate="heading">
          <h2 className={styles.aboutTag}>ABOUT</h2>
          <h2 className={styles.meTag}>ME</h2>
        </div>

        <div className={styles.aboutCenterLeft} data-animate="pillar-avatar">
          <div className={styles.bluePillar} data-animate="pillar"></div>
          <div className={styles.avatarWrapper} data-animate="avatar">
            <div className={styles.avatar}></div>
          </div>
        </div>

        <div className={styles.aboutText} data-animate="about-text">
          <p>{ABOUT_TEXT}</p>
        </div>

        <div className={styles.aboutServices} id="services">
          <h2 data-animate="services-title">SERVICES</h2>
          <div
            className={styles.tabList}
            role="tablist"
            aria-label="Services"
            ref={tabListRef}
            data-animate="tab-list"
          >
            {serviceKeys.map((key) => {
              const service = SERVICES[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={service.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${service.id}`}
                  id={`tab-${service.id}`}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                  onClick={() => handleTabClick(key)}
                  data-animate="tab-button"
                >
                  {service.title}
                </button>
              );
            })}
            <div className={styles.tabSlider} ref={tabSliderRef} data-animate="tab-slider"></div>
          </div>

          <div
            className={styles.tabPanel}
            ref={tabPanelRef}
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            <p data-animate="tab-panel-text">{SERVICES[activeTab].content}</p>
          </div>
        </div>
      </div>
    </section>
  );
};