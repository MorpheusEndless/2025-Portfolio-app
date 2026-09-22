// src/components/Home.jsx
import { useRef } from 'react';
import { LoaderSection } from './LoaderSection/LoaderSection';
import { HeroSection } from './HeroSection/HeroSection';
import { AboutSection } from './AboutSection/AboutSection';
import { WorkSection } from './WorkSection/WorkSection';
import { ContactSection } from './ContactSection/ContactSection';
import { FooterSection } from './FooterSection/FooterSection';
import { useIntroAnimation } from './Hooks/useIntroAnimation';
import { useWorkAnimation } from './Hooks/useWorkAnimation';
import { useContactAnimation } from './Hooks/useContactAnimation';

export const Home = ({ navRef }) => {
  const homeRef = useRef(null);
  const h2Ref = useRef(null);
  const pRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  useIntroAnimation({ navRef, homeRef, h2Ref, pRef });
  useWorkAnimation({ workRef });
  useContactAnimation({ contactRef });

  return (
    <div className="page-container">
      <LoaderSection />
      <HeroSection homeRef={homeRef} h2Ref={h2Ref} pRef={pRef} />
      <AboutSection />
      <WorkSection workRef={workRef} />
      <ContactSection contactRef={contactRef} />
      <FooterSection />
    </div>
  );
};