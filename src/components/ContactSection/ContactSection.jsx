// src/components/ContactSection/ContactSection.jsx
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../utils/emailjsConfig';
import styles from './ContactSection.module.css'; 

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
    <section id="contact" className="section"> 
      <div className={styles.contactContainer}> 
        <h2>Contact</h2>
        
        <form className={styles.contactForm} ref={formRef} onSubmit={sendEmail}> 
          <div className={styles.inputGroup}> 
            
            <div className={styles.inputPair}> 
              <input 
                type="text" 
                name="first_name"
                placeholder="First Name" 
                className="form-input" 
                required
              />
              <input 
                type="text" 
                name="last_name"
                placeholder="Last Name" 
                className="form-input" 
                required
              />
            </div>
            
            <div className={styles.inputPair}> 
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                className="form-input" 
                required
              />
              <input 
                type="tel" 
                name="mobile"
                placeholder="Mobile" 
                className="form-input" 
              />
            </div>
          </div>
          
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
    </section>
  );
};