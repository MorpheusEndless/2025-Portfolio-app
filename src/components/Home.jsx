// src/components/Home.jsx
import { useRef } from 'react';
import { HeroSection } from './HeroSection/HeroSection';
import { AboutSection } from './AboutSection/AboutSection';
import { WorkSection } from './WorkSection/WorkSection';
import { ContactSection } from './ContactSection/ContactSection';
import { FooterSection } from './FooterSection/FooterSection';
import { useScrollAnimation } from './Hooks/useSrollAnimation';

export const Home = ({ navRef }) => {
  // Refs
  const aboutSection1Ref = useRef();
  const aboutSection2Ref = useRef();
  const aboutSection3Ref = useRef();
  const aboutContainerRef = useRef();
  const spinnerRef = useRef();
  const homeRef = useRef();
  const h2Ref = useRef();
  const pRef = useRef();

  // All GSAP logic is now in this custom hook
  useScrollAnimation({
    navRef,
    homeRef,
    h2Ref,
    pRef,
    spinnerRef,
    aboutSection1Ref,
    aboutSection2Ref,
    aboutSection3Ref,
    aboutContainerRef
  });

  return (
    <div className="page-container">
      <div className="loading-spinner" ref={spinnerRef}></div>
      <HeroSection homeRef={homeRef} h2Ref={h2Ref} pRef={pRef} />
      <AboutSection 
        aboutSection1Ref={aboutSection1Ref}
        aboutSection2Ref={aboutSection2Ref}
        aboutSection3Ref={aboutSection3Ref}
        aboutContainerRef={aboutContainerRef}
      />
      <WorkSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};