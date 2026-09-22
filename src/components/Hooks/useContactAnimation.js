// src/hooks/useContactAnimation.js
import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useContactAnimation = ({ contactRef }) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Select contact elements scoped to the contact section
      const contactElements = gsap.utils.toArray(
        'h2, .form-input, .form-textarea, .submit-btn',
        contactRef.current
      );

      // Initial hidden state
      gsap.set(contactElements, { opacity: 0, y: 30 });

      // Timeline with ScrollTrigger
      const contactTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none none',
        },
      });

      // Animate elements with stagger
      contactTimeline.to(contactElements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, contactRef.current);

    return () => ctx.revert();
  }, []);
};