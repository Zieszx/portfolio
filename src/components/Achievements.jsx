import { useRef } from 'react';
import { useScrollReveal } from '../lib/motion';
import { MagicCard } from './magicui/MagicCard';
import { AnimatedGradientText } from './magicui/AnimatedGradientText';

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

function Achievements() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useScrollReveal(headerRef);
  useScrollReveal(gridRef, { stagger: 0.1, delay: 0.1 });

  return (
    <section id="achievements" className="relative bg-bg py-24 dark:bg-bg-dark sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl">
          <AnimatedGradientText>Achievements</AnimatedGradientText>
          <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-ink dark:text-white sm:text-6xl">
            Recognition Along The Way.
          </h1>
          <p className="mt-4 text-ink/60 dark:text-white/60">
            Recognition and accomplishments throughout my academic and professional journey.
          </p>
        </div>

        {/* Achievement cards */}
        <div ref={gridRef} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {achievements.map((item, index) => (
            <MagicCard
              key={index}
              gradientColor={item.color}
              className="group flex h-full gap-5 border border-ink/10 border-l-4 bg-surface p-7 dark:border-white/10 dark:bg-surface-dark"
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
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
