import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useWorkAnimation = ({ workRef }) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heading = workRef.current.querySelector('[data-animate="work-heading"]');
      const filterWrapper = workRef.current.querySelector('[data-animate="work-filter-wrapper"]');
      const workItems = gsap.utils.toArray('.work-item', workRef.current);
      const workItemBgs = gsap.utils.toArray('.work-item-bg', workRef.current);

      // Initial states
      gsap.set(heading, { y: 80, opacity: 0 });
      gsap.set(filterWrapper, { x: 100, opacity: 0 });
      gsap.set(workItems, { opacity: 0, y: -80 });
      gsap.set(workItemBgs, { scale: 1.15 }); // zoomed-in start (Ken Burns reveal)

      const workTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: workRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      // Heading (from bottom) and filter row (from the right) animate
      // together, both starting at timeline position 0 — "scrolling
      // into position at the same time."
      workTimeline
        .to(heading, { y: 0, opacity: 1, duration: 0.8 }, 0)
        .to(filterWrapper, { x: 0, opacity: 1, duration: 0.8 }, 0)
        // Work items fade/slide in as before, starting slightly after
        // the heading/filter row settle.
        .to(
          workItems,
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.3 },
          0.5
        )
        // Each item's background image un-zooms in sync with that same
        // item's fade-in — same stagger, same start position, so the
        // zoom-out and the reveal happen together per card.
        .to(
          workItemBgs,
          { scale: 1, duration: 1.1, stagger: 0.3 },
          0.5
        );
    }, workRef.current);

    return () => ctx.revert();
  }, []);
};