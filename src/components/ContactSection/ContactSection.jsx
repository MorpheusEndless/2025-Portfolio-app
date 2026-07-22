// src/components/ContactSection/ContactSection.jsx
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../utils/emailjsConfig';
import styles from './ContactSection.module.css'; // ← Changed import

export const ContactSection = () => {
  const formRef = useRef();
  const [formSent, setFormSent] = useState(false);

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
          alert("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send message, please try again.");
        }
      );
  };

  return (
    <section id="contact" className="section"> {/* ← 'section' is global */}
      <div className={styles.contactContainer}> {/* ← Local */}
        <h2>Contact</h2>
        
        <form className={styles.contactForm} ref={formRef} onSubmit={sendEmail}> {/* ← Local */}
          <div className={styles.inputGroup}> {/* ← Local */}
            
            <div className={styles.inputPair}> {/* ← Local */}
              <input 
                type="text" 
                name="first_name"
                placeholder="First Name" 
                className="form-input" // ← GSAP target (global)
                required
              />
              <input 
                type="text" 
                name="last_name"
                placeholder="Last Name" 
                className="form-input" // ← GSAP target (global)
                required
              />
            </div>
            
            <div className={styles.inputPair}> {/* ← Local */}
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                className="form-input" // ← GSAP target (global)
                required
              />
              <input 
                type="tel" 
                name="mobile"
                placeholder="Mobile" 
                className="form-input" // ← GSAP target (global)
              />
            </div>
          </div>
          
          <textarea 
            name="message"
            placeholder="Message" 
            className="form-textarea" // ← GSAP target (global)
            required
          ></textarea>
          
          <button type="submit" className="submit-btn"> {/* ← GSAP target (global) */}
            Send
          </button>
        </form>
      </div>
    </section>
  );
};