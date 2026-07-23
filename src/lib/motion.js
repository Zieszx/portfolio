import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function registerGSAP() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

// Fade + rise reveal on scroll-into-view, replaces data-aos="fade-up".
export function useScrollReveal(ref, { y = 24, delay = 0, stagger = 0 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger > 0 ? el.children : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: 'power2.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref, y, delay, stagger]);
}
