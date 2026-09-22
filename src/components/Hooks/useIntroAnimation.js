// src/hooks/useIntroAnimation.js
import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useIntroAnimation = ({ navRef, homeRef, h2Ref, pRef }) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // === Helper: split text into words, then characters inside word spans ===
      const splitText = (element) => {
        if (!element) return [];

        const words = element.textContent.split(/(\s+)/); // keeps spaces as separate tokens
        element.innerHTML = '';

        const allChars = [];

        words.forEach((word) => {
          if (word.trim() === '') {
            // It's a space (or multiple spaces) – just append as a normal text node
            element.appendChild(document.createTextNode(word));
          } else {
            // Create a wrapper span for the whole word (unbreakable)
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';

            // Split the word into characters
            word.split('').forEach((char) => {
              const charSpan = document.createElement('span');
              charSpan.textContent = char;
              charSpan.style.display = 'inline-block';
              charSpan.style.opacity = '0';
              wordSpan.appendChild(charSpan);
              allChars.push(charSpan);
            });

            element.appendChild(wordSpan);
          }
        });

        return allChars;
      };

      const h2Chars = splitText(h2Ref.current);
      const pChars = splitText(pRef.current);

      // === Cursor element (created once, reused) ===
      const cursor = document.createElement('span');
      cursor.className = 'typewriter-cursor';
      cursor.textContent = '|';
      cursor.style.display = 'inline-block';
      cursor.style.opacity = '0';
      const cursorElement = cursor;

      // === Initial states ===
      gsap.set(navRef.current, { y: -80, opacity: 0, visibility: 'visible' });
      gsap.set(homeRef.current, { opacity: 0, visibility: 'visible' });
      gsap.set(h2Chars, { opacity: 0, y: 30, rotateX: -15 });
      gsap.set(pChars, { opacity: 0 });

      // === Loader element ===
      const loader = document.querySelector('.loaderWrapper');

      // === Master timeline for intro ===
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.1,
      });

      // Phase 0: Wait for loader animation (CSS) to finish (7s total)
      tl.to({}, { duration: 6.5 });

      // Phase 1: Hide loader
      tl.call(() => {
        if (loader) loader.classList.add('hidden');
      })
      .to(loader, {
        opacity: 0,           // fade out completely
        duration: 0.9,
        ease: 'power2.5.inOut',
        onComplete: () => {
          if (loader) loader.style.display = 'none';
        },
      });

      // Phase 2: Background reveal
      tl.to(homeRef.current, {
        opacity: 1,
        duration: 3.5,
        ease: 'power2.inOut',
      }, '-=0.2');

      // Phase 3: Navbar slide down
      tl.add(() => {
        if (navRef.current) navRef.current.style.display = 'flex';
      }, '-=0.3')
      .to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.3');

      // Phase 4: H2 character stagger
      tl.to(h2Chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power1.out',
      });

      // Phase 5: Paragraph typewriter with cursor
      tl.call(() => {
        cursorElement.style.opacity = '1';
        // Insert cursor before the first child of pRef
        pRef.current.insertBefore(cursorElement, pRef.current.firstChild);
      }, [], '-=0.1')
      .to(pChars, {
        opacity: 1,
        duration: 0.1,
        stagger: 0.06,
        ease: 'none',
        onUpdate: function() {
          const progress = this.progress();
          const totalChars = pChars.length;
          const currentIndex = Math.floor(progress * totalChars);

          // Remove cursor from its current position
          if (cursorElement.parentNode) {
            cursorElement.parentNode.removeChild(cursorElement);
          }

          if (currentIndex < pChars.length) {
            const charSpan = pChars[currentIndex];
            const parent = charSpan.parentNode; // wordSpan or pRef if not wrapped
            const nextSibling = charSpan.nextSibling;
            parent.insertBefore(cursorElement, nextSibling);
          } else {
            pRef.current.appendChild(cursorElement);
          }
        },
        onComplete: () => {
          if (cursorElement.parentNode) {
            cursorElement.parentNode.removeChild(cursorElement);
          }
          pRef.current.appendChild(cursorElement);
          setTimeout(() => {
            cursorElement.style.transition = 'opacity 0.5s ease';
            cursorElement.style.opacity = '0';
            setTimeout(() => {
              cursorElement.style.display = 'none';
            }, 500);
          }, 15000);
        },
      }, '-=0.1');

      // === Home section pinning ===
      ScrollTrigger.create({
        trigger: homeRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: false,
      });
    }, homeRef.current); // scope all selectors and animations to homeRef

    // Cleanup: revert everything created inside this context
    return () => ctx.revert();
  }, []); // Run only once on mount
};