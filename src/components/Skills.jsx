import { motion, useReducedMotion } from 'motion/react';
import { AnimatedGradientText } from './magicui/AnimatedGradientText';
import SpotlightCard from './ui/SpotlightCard';

/* ESLint here is not JSX-aware — alias motion so the import reads as used. */
const MotionDiv = motion.div;

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
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="skills relative bg-bg/70 py-24 dark:bg-bg-dark/70 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl">
          <AnimatedGradientText>Skills</AnimatedGradientText>
          <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-ink dark:text-white sm:text-6xl">
            Technical Expertise, By Category.
          </h1>
          {/* Plain <p>: this intro is above the fold, and ScrollReveal is only
              worth it for copy the reader scrolls down to. */}
          <p className="mt-4 text-ink/60 dark:text-white/60">
            My toolkit organised by category — from programming languages and frameworks to AI/ML, databases, tooling,
            and soft skills.
          </p>
        </div>

        {/* Category cards */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {skillCategories.map((cat, catIdx) => (
            <MotionDiv
              key={catIdx}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: (catIdx % 2) * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              className="h-full">
              <SpotlightCard className="h-full p-7">
                {/* Category header */}
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                    <i className={`bi ${cat.icon} text-lg`} aria-hidden="true"></i>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-ink dark:text-white">{cat.label}</h3>
                </div>

                {/* Progress bars — each fill grows when the card scrolls into view */}
                <div className="mt-7 flex flex-col gap-5">
                  {cat.skills.map((skill, skillIdx) => (
                    <div key={skillIdx}>
                      <div className="flex items-center justify-between text-sm font-medium text-ink dark:text-white">
                        <span>{skill.name}</span>
                        <span className="text-ink/50 dark:text-white/50">{skill.level}%</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
                        <MotionDiv
                          className="h-full rounded-full bg-accent"
                          role="progressbar"
                          aria-valuenow={skill.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={skill.name}
                          initial={reduceMotion ? false : { width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.9,
                            delay: reduceMotion ? 0 : 0.1 + skillIdx * 0.06,
                            ease: [0.22, 0.61, 0.36, 1],
                          }}
                          style={reduceMotion ? { width: `${skill.level}%` } : undefined}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
