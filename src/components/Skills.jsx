import { useEffect } from 'react';

const skillCategories = [
  {
    icon: 'bi-code-slash',
    label: 'Programming Languages & Frameworks',
    skills: [
      { name: 'Java', level: 95 },
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'React.js', level: 85 },
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
      { name: 'Django', level: 80 },
      { name: 'Flutter (Dart)', level: 75 },
      { name: 'PHP', level: 85 },
    ],
  },
  {
    icon: 'bi-database',
    label: 'Databases',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'SQL', level: 85 },
      { name: 'Firebase Firestore', level: 80 },
    ],
  },
  {
    icon: 'bi-tools',
    label: 'Tools & Platforms',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'RESTful API', level: 85 },
      { name: 'Visual Studio Code', level: 95 },
      { name: 'OpenAI Console', level: 75 },
      { name: 'Anthropic Console', level: 75 },
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
    <div className="container px-4 px-md-5">
      <section id="skills" className="skills section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Skills</h2>
          <p>My technical expertise organised by category — from programming languages to tools and soft skills.</p>
        </div>

        <div className="container">
          <div className="row gy-5">
            {skillCategories.map((cat, catIdx) => (
              <div key={catIdx} className="col-lg-6" data-aos="fade-up" data-aos-delay={`${(catIdx % 2) * 100 + 100}`}>
                {/* Category header */}
                <div className="skill-category-header">
                  <i className={`bi ${cat.icon}`}></i>
                  <span>{cat.label}</span>
                </div>

                {/* Progress bars */}
                <div className="skills-content">
                  {cat.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="progress mb-3">
                      <span className="skill">
                        <span>{skill.name}</span>
                        <i className="val">{skill.level}%</i>
                      </span>
                      <div className="progress-bar-wrap">
                        {/* width starts at 0; useEffect sets data-target value → triggers CSS transition */}
                        <div className="progress-bar" role="progressbar" aria-valuenow={skill.level} aria-valuemin="0" aria-valuemax="100" data-target={skill.level} style={{ width: 0 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Skills;
