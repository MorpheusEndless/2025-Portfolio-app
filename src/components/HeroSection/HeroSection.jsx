import React from "react";
import styles from './HeroSection.module.css'; 

export const HeroSection = ({ homeRef, h2Ref, pRef }) => {
  return (
    <section id="home" className="section" ref={homeRef}> 
      <h2 ref={h2Ref}>FORTUNE MOYO</h2>
      <p ref={pRef}>FREELANCER, FRONT END AND A UI/UX DESIGNER</p>
    </section>
  );
};