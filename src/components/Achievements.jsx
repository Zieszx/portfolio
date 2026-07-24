import { useRef } from 'react';
import { motion } from 'motion/react';
import { useScrollReveal } from '../lib/motion';
import { AnimatedGradientText } from './magicui/AnimatedGradientText';
import SpotlightCard from './ui/SpotlightCard';

/* ESLint here is not JSX-aware — alias motion so the import reads as used. */
const MotionDiv = motion.div;

const achievements = [
  {
    icon: 'bi-trophy-fill',
    title: 'JPA PIDN Scholar',
    period: 'Sep 2021 – Aug 2024',
    description: 'Full scholarship recipient for outstanding academic performance throughout the degree programme.',
    color: '#f59e0b',
  },
  {
    icon: 'bi-award-fill',
    title: "Dean's List Achievement",
    period: 'Every Semester (Sep 2020 – Aug 2024)',
    description: 'Consistent academic excellence with CGPA 3.96, maintaining top-tier performance for 8 consecutive semesters.',
    color: '#8b5cf6',
  },
  {
    icon: 'bi-people-fill',
    title: 'Head of RESAK Run Activity',
    period: 'March – May 2022',
    description: 'Led and managed sports activities including Senam Robic and Fun Run for the college open day event.',
    color: '#10b981',
  },
  {
    icon: 'bi-controller',
    title: 'E-Games Tournament Organiser',
    period: 'Sep – Dec 2022',
    description: 'Successfully organised and managed a PUBG Mobile tournament as Activity Unit Committee Member.',
    color: '#ef4444',
  },
];

/* Tint the spotlight with each entry's own accent, held low so the four cards
   still read as one family. */
function spotlightFor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 0.20)`;
}

function Achievements() {
  const headerRef = useRef(null);

  useScrollReveal(headerRef);

  return (
    <section id="achievements" className="relative bg-bg/70 py-24 dark:bg-bg-dark/70 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl">
          <AnimatedGradientText>Achievements</AnimatedGradientText>
          <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-ink dark:text-white sm:text-6xl">
            Recognition Along The Way.
          </h1>
          {/* Plain <p>: this intro is above the fold, and ScrollReveal is only
              worth it for copy the reader scrolls down to. */}
          <p className="mt-4 text-ink/60 dark:text-white/60">
            Recognition and accomplishments throughout my academic and professional journey.
          </p>
        </div>

        {/* Achievement cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {achievements.map((item, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: (index % 2) * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              className="h-full">
              <SpotlightCard
                spotlightColor={spotlightFor(item.color)}
                className="h-full border-l-4 p-7 [&>div:last-child]:flex [&>div:last-child]:h-full [&>div:last-child]:gap-5"
                style={{ borderLeftColor: item.color }}>
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl text-white shadow-md"
                  style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)` }}>
                  <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold text-ink dark:text-white">{item.title}</h4>
                  <h5 className="mt-1 text-sm font-semibold" style={{ color: item.color }}>
                    {item.period}
                  </h5>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60 dark:text-white/60">{item.description}</p>
                </div>
              </SpotlightCard>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
