import { useEffect } from 'react';
import heroBg from '/assets/img/hero-bg.jpg';

function Home() {
  useEffect(() => {
    // Initialize Typed.js if available
    if (window.Typed && document.querySelector('.typed')) {
      const typed = new window.Typed('.typed', {
        strings: ['Software Developer', 'Software Engineer', 'AI Enthusiast', 'Full Stack Developer'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <section id="hero" className="hero section dark-background">
      <img src={heroBg} alt="" data-aos="fade-in" className="" />
      <div className="container ps-5 ms-5" data-aos="fade-up" data-aos-delay="100">
        <h2>Ieskandar Zulqarnain</h2>
        <p>
          I'm <span className="typed"></span>
        </p>
      </div>
    </section>
  );
}

export default Home;
