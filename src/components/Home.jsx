import { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { Navbar } from './Navbar';
import "./Navbar.css";

const SERVICE_CONTENT = {
  uiux: {
    title: "UI/UX ",
    content: "Designing engaging and user-friendly web and mobile interfaces, crafted with modern, industry-leading design software to ensure precision and visual appeal."
  },
  dev: {
    title: "Dev",
    content: "Full-stack development services leveraging cutting-edge technologies to build scalable, efficient, and maintainable web applications."
  },
  design: {
    title: "Design",
    content: "Professional graphic design services including logo creation, branding, custom illustrations, and impactful marketing materials.."
  }
};

export const Home = () => {
  const aboutSection1Ref = useRef();
  const aboutSection2Ref = useRef();
  const aboutSection3Ref = useRef();
  const aboutContainerRef = useRef();
  const [isLoading, setIsLoading] = useState(typeof window !== 'undefined');
  const [activeService, setActiveService] = useState('uiux');
  const spinnerRef = useRef();
  const homeRef = useRef();
  const navRef = useRef();
  const h2Ref = useRef();
  const pRef = useRef();
  const formRef = useRef();
  const [formSent, setFormSent] = useState(false);
  
  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs
      .sendForm(
        'service_95kf10i',
        'template_23eiipx',
        formRef.current,
        'dy3_yHID_KrK69unx'
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
  


  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    gsap.set([navRef.current, h2Ref.current, pRef.current], { 
      y: -100, 
      opacity: 0,
      visibility: 'hidden'
    });
    gsap.set(homeRef.current, { opacity: 0 });
    gsap.set(spinnerRef.current, { display: 'block' });

    tl.to(spinnerRef.current, {
      rotation: 720,
      duration: 2,
      repeat: 1,
      transformOrigin: "center"
    })
    tl.to(homeRef.current, { 
      opacity: 1,
      visibility: 'visible',
      duration: 1.8
    },  "-=0.5")
    .add(() => {
      const nav = document.querySelector('.navbar');
      nav.style.display = 'flex';
      gsap.set(nav, { y: -100, opacity: 0, visibility: 'visible' });
    })
    .to('.navbar', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power4.out'
    })
    .to(h2Ref.current, {
      y: 0,
      opacity: 1,
      visibility: 'visible',
      duration: 1.8
    }, "-=0.2")
    .to(pRef.current, {
      y: 0,
      opacity: 1,
      visibility: 'visible',
      duration: 0.9
    })
    .to(spinnerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        gsap.set(spinnerRef.current, { display: 'none' });
        setIsLoading(false);
      }
    });

    ScrollTrigger.create({
      trigger: homeRef.current,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: false,
      markers: false
    });

    gsap.set([aboutSection1Ref.current, aboutSection2Ref.current, aboutSection3Ref.current], {
      opacity: 0,
      y: 50
    });

    const aboutTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top center+=100',
        end: 'bottom center',
        toggleActions: 'play none none reverse',
        markers: false
      }
    });

    aboutTimeline
      .to(aboutSection1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(aboutSection2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3')
      .to(aboutSection3Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3');

    const textElements = gsap.utils.toArray('#about h2, #about p, .service-btn, .service-content');
    gsap.set(textElements, { opacity: 0, y: 30 });
    
    aboutTimeline.to(textElements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out'
    }, '-=0.5');

    const workItems = gsap.utils.toArray('.work-item');
    gsap.set(workItems, {
      opacity: 0,
      y: -80
    });
  
    const workTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#work',
        start: 'top center+=100',
        toggleActions: 'play none none none',
        markers: false
      }
    });
  
    workTimeline.to(workItems, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.3,
      ease: 'power3.out'
    });

    // Contact Form Animation
const contactElements = gsap.utils.toArray('#contact h2, .form-input, .form-textarea, .submit-btn');
gsap.set(contactElements, { opacity: 0, y: 30 });

const contactTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: '#contact',
    start: 'top center+=100',
    toggleActions: 'play none none none',
    markers: false
  }
});

contactTimeline.to(contactElements, {
  opacity: 1,
  y: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power2.out'
});

    return () => {
      tl.kill();
      aboutTimeline.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.clearMatchMedia();
      ScrollTrigger.refresh();
      contactTimeline.kill();
    };
  }, []);

  return (
    <div className="page-container">
      <div className="loading-spinner" ref={spinnerRef}></div>
      <Navbar ref={navRef} />
      
        <>
          <section id="home" className="section" ref={homeRef}>
            <h2 ref={h2Ref}>FORTUNE MOYO</h2>
            <p ref={pRef}>FREELANCER, FRONT END AND A UI/UX DESIGNER</p>
          </section>

          <section id="about" className="section" ref={aboutContainerRef}>
            <div className="about-container">
              <div className="about-section1" ref={aboutSection1Ref}></div>
              <div className="about-section2" ref={aboutSection2Ref}>
                <h2>ABOUT ME</h2>
                <p>
                  I'm a passionate frontend developer and UI/UX designer 
                  focused on building clean, responsive, and meaningful user 
                  experiences. I care deeply about how things look and feel, 
                  and I turn ideas into polished interfaces that are both beautiful and intuitive. 
                  My goal is simple: create products people enjoy using.
                </p>
              </div>
              <div className="about-section3" ref={aboutSection3Ref}>
                <h2>SERVICES</h2>
                <div className="links-container">
                  {Object.keys(SERVICE_CONTENT).map((serviceKey) => (
                    <button
                      key={serviceKey}
                      className={`service-btn ${activeService === serviceKey ? 'active' : ''}`}
                      onClick={() => setActiveService(serviceKey)}
                    >
                      {SERVICE_CONTENT[serviceKey].title}
                    </button>
                  ))}
                </div>
                <div className="service-content">
                  <h3>{SERVICE_CONTENT[activeService].title}</h3>
                  <p>{SERVICE_CONTENT[activeService].content}</p>
                </div>
              </div>
            </div>
          </section>

          <section id="work" className="section">
          <div className="work-container">
              <h2>WORK</h2>
              <div className="work-item" id="work-item-1">
              <a href="https://genesiss-real-estate.netlify.app/">
                <div class="work-info">
                  <h3>Genesis</h3>
                  <p>Project description goes here</p>
                </div>
              </a>
                
              </div>
              <div className="work-item" id="work-item-2">
              <a href="">
                <div class="work-info">
                  <h3>Project Title</h3>
                  <p>Project description goes here</p>
                </div>
              </a>
              </div>
              <div className="work-item" id="work-item-3">
              <a href="">
                <div class="work-info">
                  <h3>Project Title</h3>
                  <p>Project description goes here</p>
                </div>
              </a>
              </div>
              <div className="work-item" id="work-item-4">
              <a href="">
                <div class="work-info">
                  <h3>Project Title</h3>
                  <p>Project description goes here</p>
                </div>
              </a>
              </div>
            </div>
          </section>

          <section id="contact" className="section">
  <div className="contact-container">
    <h2>Contact</h2>
    <form className="contact-form" ref={formRef} onSubmit={sendEmail}>
  <div className="input-group">
    <div className="input-pair">
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
    <div className="input-pair">
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
  <button type="submit" className="submit-btn">Send</button>
</form>


  </div>
</section>

        </>
     <footer className="footer-section">
     <div className="section-line"></div>
  <div className="social-container">
    <a 
      href="https://wa.me/your-number" 
      target="_blank" 
      rel="noopener noreferrer"
      className="social-icon whatsapp"
      aria-label="WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
    
    <a
      href="https://linkedin.com/in/your-profile"
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon linkedin"
      aria-label="LinkedIn"
    >
      <i className="fab fa-linkedin-in"></i>
    </a>

    <a
      href="https://github.com/your-username"
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon github"
      aria-label="GitHub"
    >
      <i className="fab fa-github"></i>
    </a>

    <a
      href="mailto:your@email.com"
      className="social-icon email"
      aria-label="Email"
    >
      <i className="far fa-envelope"></i>
    </a>
  </div>
  <p>Let’s connect! Feel free to reach out for collaboration or inquiries.</p>
     </footer> 
    </div>
  );
};