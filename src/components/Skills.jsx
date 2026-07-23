import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../lib/motion';
import { MagicCard } from './magicui/MagicCard';
import { AnimatedGradientText } from './magicui/AnimatedGradientText';

const skillCategories = [
  {
    icon: 'bi-code-slash',
    label: 'Programming Languages & Frameworks',
    skills: [
      { name: 'Java', level: 95 },
      { name: 'Python', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 85 },
      { name: 'React.js', level: 85 },
      { name: 'Next.js', level: 85 },
      { name: 'Spring Boot', level: 90 },
      { name: 'C++', level: 80 },
    ],
  },
  {
    icon: 'bi-layers',
    label: 'Additional Technologies',
    skills: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'Laravel', level: 85 },
      { name: 'PHP', level: 85 },
      { name: 'Django', level: 80 },
      { name: 'Flutter (Dart)', level: 75 },
    ],
  },
  {
    icon: 'bi-database',
    label: 'Databases',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'SQL', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Firebase Firestore', level: 80 },
      { name: 'Supabase', level: 75 },
    ],
  },
  {
    icon: 'bi-robot',
    label: 'AI / ML',
    skills: [
      { name: 'OpenAI API', level: 90 },
      { name: 'Anthropic Claude', level: 85 },
      { name: 'FAISS Vector Search', level: 80 },
      { name: 'Vertex AI', level: 75 },
      { name: 'Groq Cloud', level: 75 },
    ],
  },
  {
    icon: 'bi-tools',
    label: 'Tools & Platforms',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'RESTful API', level: 85 },
      { name: 'Visual Studio Code', level: 95 },
      { name: 'Claude Code', level: 90 },
      { name: 'Drizzle ORM', level: 75 },
      { name: 'Socket.io', level: 75 },
      { name: 'NextAuth', level: 75 },
      { name: 'Cowork', level: 75 },
    ],
  },
  {
    icon: 'bi-people',
    label: 'Soft Skills',
    skills: [
      { name: 'Problem-Solving', level: 90 },
      { name: 'Debugging', level: 90 },
      { name: 'Teamwork', level: 85 },
      { name: 'Communication', level: 85 },
      { name: 'Testing', level: 80 },
    ],
  },
];

function Skills() {
  const gridRef = useRef(null);
  useScrollReveal(gridRef, { stagger: 0.1 });

  useEffect(() => {
    // Animate all progress bars from 0 → their target width after mount
    const timer = setTimeout(() => {
      document.querySelectorAll('.skills .progress-bar[data-target]').forEach((bar) => {
        bar.style.width = bar.getAttribute('data-target') + '%';
      });
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" className="skills relative bg-bg py-24 dark:bg-bg-dark sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl">
          <AnimatedGradientText>Skills</AnimatedGradientText>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-ink dark:text-white sm:text-5xl">
            Technical Expertise, By Category.
          </h1>
          <p className="mt-4 text-ink/60 dark:text-white/60">
            My toolkit organised by category — from programming languages and frameworks to AI/ML, databases,
            tooling, and soft skills.
          </p>
        </div>

        {/* Category cards */}
        <div ref={gridRef} className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {skillCategories.map((cat, catIdx) => (
            <MagicCard
              key={catIdx}
              className="group border border-ink/10 bg-surface p-7 dark:border-white/10 dark:bg-surface-dark">
              {/* Category header */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                  <i className={`bi ${cat.icon} text-lg`} aria-hidden="true"></i>
                </div>
                <h3 className="font-heading text-lg font-semibold text-ink dark:text-white">{cat.label}</h3>
              </div>

              {/* Progress bars */}
              <div className="mt-7 flex flex-col gap-5">
                {cat.skills.map((skill, skillIdx) => (
                  <div key={skillIdx}>
                    <div className="flex items-center justify-between text-sm font-medium text-ink dark:text-white">
                      <span>{skill.name}</span>
                      <span className="text-ink/50 dark:text-white/50">{skill.level}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
                      {/* width starts at 0; useEffect sets data-target value → triggers CSS transition */}
                      <div
                        className="progress-bar h-full rounded-full bg-accent transition-[width] duration-[900ms] ease-out"
                        role="progressbar"
                        aria-valuenow={skill.level}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        data-target={skill.level}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
