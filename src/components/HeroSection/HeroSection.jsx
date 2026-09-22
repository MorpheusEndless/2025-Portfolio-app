// src/components/HeroSection/HeroSection.jsx
import React from "react";
import './HeroSection.css';

export const HeroSection = ({ homeRef, h2Ref, pRef }) => {
  return (
    <section id="home" className="section" ref={homeRef}>
      {/* Add a wrapper class for the text group */}
      <div className="heroTextGroup">
        <h2 ref={h2Ref} className="hero-h2">FORTUNE MOYO</h2>
        <p ref={pRef} className="hero-p">FREELANCER, FRONT END AND A VISUAL DESIGNER...</p>
      </div>
    </section>
  );
};