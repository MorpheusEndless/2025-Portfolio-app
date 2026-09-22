import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { DevPanel } from './panels/DevPanel';
import { WorkOverlay } from './WorkOverlay';
import { useWorkAnimation } from '../Hooks/useWorkAnimation';
import styles from './WorkSection.module.css';

const TABS = [
  { key: 'brands', label: 'Brands' },
  { key: 'dev', label: 'Dev' },
  { key: 'ui-ux', label: 'UI/UX' },
  { key: 'designs', label: 'Designs' },
];

const DEFAULT_CENTERED_KEYS = ['dev', 'ui-ux'];

export const WorkSection = ({ workRef }) => {
  const [activeTab, setActiveTab] = useState('dev');
  const [originRect, setOriginRect] = useState(null);
  const buttonRefs = useRef({});
  const scrollerRef = useRef(null);

  useWorkAnimation({ workRef });

  const measureRect = (node) => {
    const rect = node.getBoundingClientRect();
    return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
  };

  const scrollButtonToCenter = (node) => {
    const scroller = scrollerRef.current;
    if (!scroller || !node) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    const nodeLeftInScroller = nodeRect.left - scrollerRect.left + scroller.scrollLeft;
    const nodeCenter = nodeLeftInScroller + nodeRect.width / 2;

    const targetScrollLeft = nodeCenter - scroller.clientWidth / 2;

    scroller.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: 'smooth',
    });
  };

  const handleTabClick = (key, event) => {
    if (key !== 'dev') {
      buttonRefs.current[key] = event.currentTarget;
      setOriginRect(measureRect(event.currentTarget));
    }
    setActiveTab(key);
    scrollButtonToCenter(event.currentTarget);
  };

  const handleClose = () => setActiveTab('dev');

  useEffect(() => {
    if (activeTab === 'dev') return;
    const handleResize = () => {
      const node = buttonRefs.current[activeTab];
      if (node) setOriginRect(measureRect(node));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const centerTargetButtons = () => {
      const targetNodes = DEFAULT_CENTERED_KEYS
        .map((key) => buttonRefs.current[key])
        .filter(Boolean);

      if (targetNodes.length < 2) return;

      scroller.scrollLeft = 0;

      const scrollerRect = scroller.getBoundingClientRect();

      const lefts = targetNodes.map(
        (node) => node.getBoundingClientRect().left - scrollerRect.left
      );
      const rights = targetNodes.map(
        (node) => node.getBoundingClientRect().right - scrollerRect.left
      );

      const groupLeft = Math.min(...lefts);
      const groupRight = Math.max(...rights);
      const groupCenter = groupLeft + (groupRight - groupLeft) / 3;

      const viewportWidth = scroller.clientWidth;
      const targetScrollLeft = groupCenter - viewportWidth / 2.5;

      scroller.scrollLeft = Math.max(0, targetScrollLeft);
    };

    requestAnimationFrame(centerTargetButtons);
    if (document.fonts?.ready) {
      document.fonts.ready.then(centerTargetButtons);
    }

    window.addEventListener('resize', centerTargetButtons);
    return () => window.removeEventListener('resize', centerTargetButtons);
  }, []);

  return (
    <section id="work" className="section" ref={workRef}>
      <h2 data-animate="work-heading">WORK</h2>

      <div className={styles.filterButtonsWrapper} data-animate="work-filter-wrapper">
        <div className={styles.filterButtons} ref={scrollerRef}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              ref={(node) => {
                if (node) buttonRefs.current[tab.key] = node;
              }}
              className={`${styles.filterButton} ${
                activeTab === tab.key ? styles.filterButtonActive : ''
              }`}
              onClick={(e) => handleTabClick(tab.key, e)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <DevPanel />

      <WorkOverlay activeTab={activeTab} originRect={originRect} onRequestClose={handleClose} />
    </section>
  );
};