import gsap from 'gsap';

export const createTypewriterChars = (element, text, cursorClass) => {
  if (!element || typeof text !== 'string') return { charSpans: [], cursor: null };

  element.innerHTML = '';

  const charSpans = [];
  const words = text.split(/(\s+)/);

  words.forEach((word) => {
    if (word.trim() === '') {
      element.appendChild(document.createTextNode(word));
    } else {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';

      for (const char of word) {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.style.display = 'inline';
        charSpan.style.opacity = '0';
        wordSpan.appendChild(charSpan);
        charSpans.push(charSpan);
      }
      element.appendChild(wordSpan);
    }
  });

  const cursor = document.createElement('span');
  cursor.className = cursorClass;
  cursor.textContent = '|';
  cursor.style.opacity = '0'; // hidden until the timeline actually starts
  element.appendChild(cursor);

  return { charSpans, cursor };
};

export const animateTypewriterChars = (charSpans, cursor, durationPerChar = 0.03) => {
  const tl = gsap.timeline();

  if (charSpans.length === 0) return tl;

  if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
  charSpans[0].parentNode.insertBefore(cursor, charSpans[0]);

  charSpans.forEach((span, i) => {
    tl.to(span, { opacity: 1, duration: durationPerChar, ease: 'none' }, i * durationPerChar);
  });

  tl.eventCallback('onStart', () => {
    if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
    charSpans[0].parentNode.insertBefore(cursor, charSpans[0]);
    gsap.set(cursor, { opacity: 1 }); // reveal cursor right as typing begins
  });

  tl.eventCallback('onUpdate', () => {
    const progress = tl.progress();
    const index = Math.min(Math.floor(progress * charSpans.length), charSpans.length - 1);

    if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
    const parent = charSpans[index].parentNode;
    parent.insertBefore(cursor, charSpans[index].nextSibling);
  });

  tl.eventCallback('onComplete', () => {
    if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
    charSpans[charSpans.length - 1].parentNode.appendChild(cursor);

    // Fade the cursor out 3 seconds after typing finishes, then remove it.
    gsap.to(cursor, {
      opacity: 0,
      duration: 0.4,
      delay: 0.5,
      onComplete: () => {
        if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
      },
    });
  });

  return tl;
};