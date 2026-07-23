import { useState, useEffect, useRef } from 'react';
import profileImg from '../assets/my-profile-img.jpg';
import { useScrollReveal } from '../lib/motion';
import { AnimatedGradientText } from './magicui/AnimatedGradientText';

/* ── Custom count-up animation — replaces PureCounter for reliability ── */
function CountUp({ end, decimals = 0, duration = 1600 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const endVal = parseFloat(end);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const startTime = performance.now();

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = endVal * eased;

            setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current));

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setCount(decimals > 0 ? parseFloat(endVal.toFixed(decimals)) : endVal);
            }
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, decimals, duration]);

  return (
    <span ref={ref} className="counter-value">
      {decimals > 0 ? count.toFixed(decimals) : count}
    </span>
  );
}

/* ── Dynamic age from DOB ────────────────────────────────────── */
function computeAge(year, month, day) {
  const today = new Date();
  const birth = new Date(year, month - 1, day);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

const stats = [
  { icon: 'bi-code-square',      end: 15,   decimals: 0, label: 'Projects Completed', sub: 'personal & professional' },
  { icon: 'bi-journal-richtext', end: 2,    decimals: 0, label: 'Years Experience',   sub: 'professional development' },
  { icon: 'bi-award',            end: 8,    decimals: 0, label: "Dean's List",         sub: 'consecutive semesters' },
  { icon: 'bi-mortarboard',      end: 3.96, decimals: 2, label: 'CGPA',               sub: 'out of 4.00' },
];

function About() {
  const age = computeAge(2001, 12, 9);

  const headerRef = useRef(null);
  const bodyRef = useRef(null);
  const statsRef = useRef(null);

  useScrollReveal(headerRef);
  useScrollReveal(bodyRef, { stagger: 0.12, delay: 0.1 });
  useScrollReveal(statsRef, { stagger: 0.1 });

  return (
    <>
      {/* ── About Section ── */}
      <section id="about" className="relative bg-bg py-24 dark:bg-bg-dark sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div ref={headerRef} className="max-w-2xl">
            <AnimatedGradientText>About</AnimatedGradientText>
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-ink dark:text-white sm:text-5xl">
              Get To Know Me.
            </h1>
            <p className="mt-4 text-ink/60 dark:text-white/60">
              A Software Engineer with two years of professional experience delivering full-stack web applications,
              R&amp;D software, and AI features across enterprise stacks and modern JavaScript.
            </p>
          </div>

          {/* Profile + bio */}
          <div ref={bodyRef} className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Profile image */}
            <div className="flex justify-center lg:col-span-4 lg:justify-start">
              <div className="relative inline-block">
                <img
                  src={profileImg}
                  alt="Ieskandar Zulqarnain"
                  className="block w-full max-w-[300px] rounded-2xl border-[3px] border-accent/30 shadow-[0_8px_32px_rgba(0,180,216,0.18)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,180,216,0.28)]"
                />
                <div
                  className="pointer-events-none absolute -inset-2 animate-spin rounded-[22px] border-2 border-dashed border-accent/30"
                  style={{ animationDuration: '18s' }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-8">
              <h2 className="font-heading text-2xl font-semibold text-ink dark:text-white">
                Software Developer &amp; Engineer
              </h2>
              <p className="mt-4 italic leading-relaxed text-ink/70 dark:text-white/70">
                I am a Software Engineer with two years of professional experience across enterprise stacks
                (Java/Spring Boot, PHP/Laravel, and the in-house SOAD framework) and modern JavaScript (React.js and
                Next.js/TypeScript). I&apos;ve taken systems from requirements through to deployment for government,
                e-commerce, audit, and network-marketing clients, and regularly integrate the OpenAI and Anthropic
                APIs — I also run internal AI training sessions for colleagues.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                <ul className="space-y-3 text-sm text-ink/70 dark:text-white/70">
                  <li className="flex items-start gap-2">
                    <i className="bi bi-chevron-right mt-0.5 text-accent" aria-hidden="true"></i>
                    <span>
                      <strong className="text-ink dark:text-white">Name:</strong> Ieskandar Zulqarnain Ghazali
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="bi bi-chevron-right mt-0.5 text-accent" aria-hidden="true"></i>
                    <span>
                      <strong className="text-ink dark:text-white">GitHub:</strong>{' '}
                      <a
                        href="https://github.com/Zieszx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent transition-colors hover:underline">
                        github.com/Zieszx
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="bi bi-chevron-right mt-0.5 text-accent" aria-hidden="true"></i>
                    <span>
                      <strong className="text-ink dark:text-white">Phone:</strong> +60 14-916 1793
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="bi bi-chevron-right mt-0.5 text-accent" aria-hidden="true"></i>
                    <span>
                      <strong className="text-ink dark:text-white">City:</strong> Shah Alam, Selangor
                    </span>
                  </li>
                </ul>
                <ul className="space-y-3 text-sm text-ink/70 dark:text-white/70">
                  <li className="flex items-start gap-2">
                    <i className="bi bi-chevron-right mt-0.5 text-accent" aria-hidden="true"></i>
                    <span>
                      <strong className="text-ink dark:text-white">Birthday:</strong> 9 December 2001
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="bi bi-chevron-right mt-0.5 text-accent" aria-hidden="true"></i>
                    <span>
                      <strong className="text-ink dark:text-white">Age:</strong> {age} years old
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="bi bi-chevron-right mt-0.5 text-accent" aria-hidden="true"></i>
                    <span>
                      <strong className="text-ink dark:text-white">Degree:</strong> Bachelor of Computer Science
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="bi bi-chevron-right mt-0.5 text-accent" aria-hidden="true"></i>
                    <span>
                      <strong className="text-ink dark:text-white">Email:</strong>{' '}
                      <a
                        href="mailto:ieskandarzulqarnain@gmail.com"
                        className="text-accent transition-colors hover:underline">
                        ieskandarzulqarnain@gmail.com
                      </a>
                    </span>
                  </li>
                </ul>
              </div>

              <p className="mt-8 leading-relaxed text-ink/60 dark:text-white/60">
                I hold a Bachelor of Software Engineering (Computer Science) from Universiti Teknologi Malaysia,
                graduating with a GPA of 3.96 and earning Dean&apos;s List recognition every semester. I&apos;m
                passionate about coding, technology, and creating innovative solutions that make an impact, with a
                particular interest in AI and machine learning applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Section — custom CountUp, no PureCounter dependency ── */}
      <section id="stats" className="relative bg-surface py-20 dark:bg-surface-dark">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div ref={statsRef} className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-ink/10 bg-bg p-6 text-center dark:border-white/10 dark:bg-bg-dark">
                <i className={`bi ${s.icon} text-2xl text-accent`} aria-hidden="true"></i>
                <div className="mt-3 font-heading text-3xl font-bold text-ink dark:text-white">
                  <CountUp end={s.end} decimals={s.decimals} duration={1600} />
                </div>
                <p className="mt-2 text-sm font-semibold text-ink dark:text-white">{s.label}</p>
                <p className="text-xs text-ink/50 dark:text-white/50">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
