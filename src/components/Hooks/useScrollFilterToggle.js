import { useEffect } from 'react';

// Temporarily disables expensive backdrop-filter effects while scrolling,
// then restores them once scrolling stops. Keeps the resting-state visual
// effect fully intact, but avoids paying its per-frame cost during scroll.
export const useScrollFilterToggle = (targetRef, { delay = 150 } = {}) => {
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    let scrollTimeout;

    const handleScroll = () => {
      target.classList.add('is-scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        target.classList.remove('is-scrolling');
      }, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [targetRef, delay]);
};