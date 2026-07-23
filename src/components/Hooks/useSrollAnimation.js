import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollAnimation = ({
  navRef,
  homeRef,
  h2Ref,
  pRef,
  spinnerRef,
  aboutSection1Ref,
  aboutSection2Ref,
  aboutSection3Ref,
  aboutContainerRef
}) => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ===== LOADING ANIMATION =====
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    gsap.set([navRef.current, h2Ref.current, pRef.current], {
      y: -100,
      opacity: 0,
      visibility: 'hidden'
    });
    gsap.set(homeRef.current, { opacity: 0 });
    gsap.set(spinnerRef.current, { display: 'block' });

    tl.to(spinnerRef.current, {
      rotation: 720,
      duration: 2,
      repeat: 1,
      transformOrigin: "center"
    })
    .to(homeRef.current, {
      opacity: 1,
      visibility: 'visible',
      duration: 1.8
    }, "-=0.5")
    .add(() => {
      const nav = document.querySelector('.navbar');
      nav.style.display = 'flex';
      gsap.set(nav, { y: -100, opacity: 0, visibility: 'visible' });
    })
    .to('.navbar', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power4.out'
    })
    .to(h2Ref.current, {
      y: 0,
      opacity: 1,
      visibility: 'visible',
      duration: 1.8
    }, "-=0.2")
    .to(pRef.current, {
      y: 0,
      opacity: 1,
      visibility: 'visible',
      duration: 0.9
    })
    .to(spinnerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        gsap.set(spinnerRef.current, { display: 'none' });
      }
    });

    // ===== SCROLL TRIGGER: HOME SECTION =====
    ScrollTrigger.create({
      trigger: homeRef.current,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: false,
      markers: false
    });

    // ===== ABOUT SECTION =====
    gsap.set([aboutSection1Ref.current, aboutSection2Ref.current, aboutSection3Ref.current], {
      opacity: 0,
      y: 50
    });

    const aboutTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top center+=100',
        end: 'bottom center',
        toggleActions: 'play none none reverse',
        markers: false
      }
    });

    aboutTimeline
      .to(aboutSection1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(aboutSection2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3')
      .to(aboutSection3Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3');

    const textElements = gsap.utils.toArray('#about h2, #about p, .service-btn, .service-content');
    gsap.set(textElements, { opacity: 0, y: 30 });
    aboutTimeline.to(textElements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out'
    }, '-=0.5');

    // ===== WORK SECTION =====
    const workItems = gsap.utils.toArray('.work-item');
    gsap.set(workItems, {
      opacity: 0,
      y: -80
    });

    const workTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#work',
        start: 'top center+=100',
        toggleActions: 'play none none none',
        markers: false
      }
    });

    workTimeline.to(workItems, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.3,
      ease: 'power3.out'
    });

    // ===== CONTACT SECTION =====
    const contactElements = gsap.utils.toArray('#contact h2, .form-input, .form-textarea, .submit-btn');
    gsap.set(contactElements, { opacity: 0, y: 30 });

    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: 'top center+=100',
        toggleActions: 'play none none none',
        markers: false
      }
    });

    contactTimeline.to(contactElements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out'
    });

    // ===== CLEANUP =====
    return () => {
      tl.kill();
      aboutTimeline.kill();
      workTimeline.kill();
      contactTimeline.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.clearMatchMedia();
      ScrollTrigger.refresh();
    };
  }, []);
};