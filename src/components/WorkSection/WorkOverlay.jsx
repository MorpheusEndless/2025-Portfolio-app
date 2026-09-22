import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { BrandsPanel } from './panels/BrandsPanel';
import { UiUxPanel } from './panels/UiUxPanel';
import { DesignsPanel } from './panels/DesignsPanel';
import styles from './WorkOverlay.module.css';

const PANEL_COMPONENTS = {
  brands: BrandsPanel,
  'ui-ux': UiUxPanel,
  designs: DesignsPanel,
};

const FALLBACK_RECT = () => ({
  top: window.innerHeight / 2,
  left: window.innerWidth / 2,
  width: 0,
  height: 0,
});

export const WorkOverlay = ({ activeTab, originRect, onRequestClose }) => {
  const backdropRef = useRef(null);
  const morphRef = useRef(null);
  const contentRef = useRef(null);
  const wasOpenRef = useRef(false);
  const ctxRef = useRef(null);

  const [renderedKey, setRenderedKey] = useState(null);
  const isOpen = activeTab !== 'dev' && !!PANEL_COMPONENTS[activeTab];

  useEffect(() => {
    if (isOpen) setRenderedKey(activeTab);
  }, [isOpen, activeTab]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onRequestClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onRequestClose]);

  // Context created ONCE, on mount only — cleaned up ONLY on unmount.
  // This is the fix: no more per-tween-run ctx.revert() wiping out the
  // fullscreen state before the close animation gets a chance to read it.
  useLayoutEffect(() => {
    if (!backdropRef.current) return;
    ctxRef.current = gsap.context(() => {}, backdropRef);
    return () => {
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, []);

  // Drives the actual open/switch/close tweens — no context creation here,
  // just direct gsap calls against the persistent refs.
  useLayoutEffect(() => {
    const backdrop = backdropRef.current;
    const morph = morphRef.current;
    const content = contentRef.current;
    if (!backdrop || !morph || !content) return;

    const wasOpen = wasOpenRef.current;
    const rect = originRect || FALLBACK_RECT();

    if (isOpen && !wasOpen) {
      // CLOSED → OPEN
      gsap.set(backdrop, { pointerEvents: 'auto' });
      gsap.set(morph, {
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: 999,
        overflow: 'hidden',
      });
      gsap.set(content, { autoAlpha: 0 });

      gsap
        .timeline()
        .to(backdrop, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' }, 0)
        .to(
          morph,
          {
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            borderRadius: 0,
            duration: 0.6,
            ease: 'power4.inOut',
          },
          0
        )
        .to(content, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 0.35);
    } else if (isOpen && wasOpen) {
      // OPEN → OPEN (switched tabs while already fullscreen)
      gsap.fromTo(
        content,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    } else if (!isOpen && wasOpen) {
      // OPEN → CLOSED — this now works, because `morph` still holds its
      // real fullscreen inline styles from the open tween above; nothing
      // has reverted them out from under us.
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(backdrop, { pointerEvents: 'none' });
            setRenderedKey(null);
          },
        })
        .to(content, { autoAlpha: 0, duration: 0.2, ease: 'power2.in' }, 0)
        .to(
          morph,
          {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            borderRadius: 999,
            duration: 0.5,
            ease: 'power4.inOut',
          },
          0.2
        )
        .to(backdrop, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, 0.45);
    }

    wasOpenRef.current = isOpen;
  }, [isOpen, activeTab, originRect]);

  const PanelComponent = renderedKey ? PANEL_COMPONENTS[renderedKey] : null;

  return createPortal(
    <div className={styles.backdrop} ref={backdropRef} aria-hidden={!isOpen}>
      <div className={styles.morph} ref={morphRef}>
        <div className={styles.contentWrapper} ref={contentRef}>
          <button
            className={styles.closeButton}
            onClick={onRequestClose}
            aria-label="Close and return to work section"
          >
            ✕
          </button>
          <div className={styles.overlayContent}>{PanelComponent && <PanelComponent />}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};