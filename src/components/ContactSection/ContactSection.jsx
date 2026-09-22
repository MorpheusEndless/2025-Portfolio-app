// src/components/ContactSection/ContactSection.jsx
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../utils/emailjsConfig';
import contactBg from '../../images/contact.webp';
import { useScrollFilterToggle } from '../Hooks/useScrollFilterToggle';
import styles from './ContactSection.module.css';

export const ContactSection = ({ contactRef }) => {
  const formRef = useRef();
  const glassRef = useRef();
  const [formSent, setFormSent] = useState(false);

  // Toggles an .is-scrolling class on the section while the page is being
  // scrolled, so the CSS can temporarily swap the expensive SVG refraction
  // filter for a cheap plain blur during that window only.
  useScrollFilterToggle(contactRef);

  const handlePointerMove = (e) => {
    const el = glassRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--pointer-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--pointer-y', `${e.clientY - rect.top}px`);
  };

  const handlePointerEnter = () => glassRef.current?.classList.add('isActive');
  const handlePointerLeave = () => glassRef.current?.classList.remove('isActive');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormSent(true);
          e.target.reset();
          alert('Message sent successfully!');
        },
        (error) => {
          console.log(error.text);
          alert('Failed to send message, please try again.');
        }
      );
  };

  return (
    <section id="contact" className="section" ref={contactRef}>
      {/* ------------------------------------------------------------------
          Refraction filter — visible depth bend with a clear chromatic
          fringe. scale=60 gives a noticeable warp at the panel edges;
          ±7px RGB offset makes the colour split read clearly.
          ------------------------------------------------------------------ */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
        style={{ position: 'absolute' }}
      >
        <filter
          id="glass-refraction"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.001 0.002"
            numOctaves="2"
            seed="7"
            result="noise"
          />

          <feGaussianBlur in="noise" stdDeviation="4" result="smoothNoise" />

          <feDisplacementMap
            in="SourceGraphic"
            in2="smoothNoise"
            scale="60"
            xChannelSelector="R"
            yChannelSelector="G"
            result="refracted"
          />

          <feColorMatrix
            in="refracted"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="chR"
          />
          <feColorMatrix
            in="refracted"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="chG"
          />
          <feColorMatrix
            in="refracted"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="chB"
          />

          <feOffset in="chR" dx="7" dy="0" result="chR2" />
          <feOffset in="chB" dx="-7" dy="0" result="chB2" />

          <feBlend in="chR2" in2="chG" mode="screen" result="rg" />
          <feBlend in="rg" in2="chB2" mode="screen" />
        </filter>
      </svg>

      <div className={styles.contactContainer}>
        <h2>Contact</h2>

        {/* Shared wrapper: bounds of this element = bounds of the form.
            The image fills it via inset: 0; the form sits on top. */}
        <div className={styles.formWrapper}>
          <div className={styles.bgWrapper}>
            <img
              src={contactBg}
              alt=""
              className={styles.bgImage}
              aria-hidden="true"
            />
          </div>

          <form
            className={styles.contactForm}
            ref={formRef}
            onSubmit={sendEmail}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          >
            <div
              ref={glassRef}
              className={styles.glassHighlight}
              aria-hidden="true"
            />

            <input
              type="text"
              name="first_name"
              placeholder="Enter Name"
              className="form-input"
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile"
              className="form-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
              required
            />

            <textarea
              name="message"
              placeholder="Message"
              className="form-textarea"
              required
            ></textarea>

            <button type="submit" className="submit-btn">
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};