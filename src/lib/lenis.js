import gsap from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initLenis() {
  const lenis = new Lenis({
    autoRaf: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const raf = (time) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
  };
}
