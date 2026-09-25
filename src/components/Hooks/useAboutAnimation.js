import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createTypewriterChars, animateTypewriterChars } from '../utils/typewriter';

gsap.registerPlugin(ScrollTrigger);

export const useAboutAnimation = (sectionRef, aboutText) => {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.getAll()
      .filter((st) => st.trigger === section)
      .forEach((st) => st.kill());

    const ctx = gsap.context(() => {
      const decoTopRight = section.querySelector('[data-animate="deco-top-right"]');
      const decoBottomLeft = section.querySelector('[data-animate="deco-bottom-left"]');
      const pillar = section.querySelector('[data-animate="pillar"]');
      const avatarWrapper = section.querySelector('[data-animate="avatar"]');
      const heading = section.querySelector('[data-animate="heading"]');
      const headingH2s = heading ? heading.querySelectorAll('h2') : [];
      const aboutTextP = section.querySelector('[data-animate="about-text"] p');
      const servicesTitle = section.querySelector('[data-animate="services-title"]');
      const tabList = section.querySelector('[data-animate="tab-list"]');
      const tabButtons = tabList ? tabList.querySelectorAll('button') : [];
      const tabSlider = section.querySelector('[data-animate="tab-slider"]');
      const tabPanelP = section.querySelector('[data-animate="tab-panel-text"]');

      const aboutType = createTypewriterChars(aboutTextP, aboutText, 'about-cursor');
      gsap.set(aboutType.charSpans, { opacity: 0 });

      document.querySelectorAll('.about-cursor').forEach((el) => el.remove());
      const initialTabContent = tabPanelP.textContent;
      const tabType = createTypewriterChars(tabPanelP, initialTabContent, 'about-cursor');
      gsap.set(tabType.charSpans, { opacity: 0 });

      gsap.set([decoTopRight, decoBottomLeft], { opacity: 0 });
      gsap.set(servicesTitle, { y: '-100%', opacity: 0 });
      gsap.set(tabButtons, { y: -50, opacity: 0 });
      gsap.set(tabSlider, { opacity: 0 });
      gsap.set(tabList, { borderBottomColor: 'transparent' });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1101px)',
          isMobile: '(max-width: 1100px)',
        },
        (context) => {
          const { isDesktop } = context.conditions;

          if (isDesktop) {
            gsap.set(pillar, { y: '-100%' });
            gsap.set(avatarWrapper, { x: '100%', opacity: 0 });
            if (headingH2s.length >= 2) {
              gsap.set(headingH2s[0], { x: '-100%', opacity: 0 });
              gsap.set(headingH2s[1], { x: '-100%', opacity: 0 });
            }
          } else {
            gsap.set(headingH2s, { y: '-100%', opacity: 0 });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top center+=100',
              end: 'bottom center',
              toggleActions: 'play none none none',
            },
            defaults: { ease: 'power3.out' },
          });

          tl.to([decoTopRight, decoBottomLeft], { opacity: 1, duration: 0.8, stagger: 0.2 });

          if (isDesktop) {
            // Same label AND same easing curve — this is what actually
            // makes them visually move together. Matching start time
            // alone isn't enough if the easing curves differ, since
            // different curves have different velocity at t=0.
            tl.addLabel('pillarAvatarStart', '>')
              .to(pillar, { y: '0%', duration: 1, ease: 'power3.out' }, 'pillarAvatarStart')
              .to(
                avatarWrapper,
                { x: '0%', opacity: 1, duration: 0.8, ease: 'power3.out' },
                'pillarAvatarStart'
              )
              .to(headingH2s[0], { x: '0%', opacity: 1, duration: 0.4 })
              .to(headingH2s[1], { x: '0%', opacity: 1, duration: 0.4 });
          } else {
            tl.to(headingH2s, { y: '0%', opacity: 1, duration: 0.6, stagger: 0 });
          }

          tl.add(animateTypewriterChars(aboutType.charSpans, aboutType.cursor, 0.03))
            .to(servicesTitle, { y: '0%', opacity: 1, duration: 0.6 })
            .to(tabButtons, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 })
            .to(tabSlider, { opacity: 1, duration: 0.3 })
            .to(tabList, { borderBottomColor: '#333333', duration: 0.3 }, '-=0.1')
            .add(animateTypewriterChars(tabType.charSpans, tabType.cursor, 0.03), '-=0.2');
        }
      );
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [sectionRef, aboutText]);
};