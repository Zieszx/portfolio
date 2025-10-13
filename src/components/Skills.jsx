function Skills() {
  const skillCategories = {
    'Programming Languages & Frameworks': [
      { name: 'C++', level: 80 },
      { name: 'Java', level: 95 },
      { name: 'JavaScript', level: 85 },
      { name: 'Python', level: 90 },
      { name: 'React.js', level: 85 },
      { name: 'Spring Boot', level: 90 },
    ],
    'Additional Technologies': [
      { name: 'Django', level: 80 },
      { name: 'Flutter (Dart)', level: 75 },
      { name: 'PHP', level: 70 },
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
    ],
    Databases: [
      { name: 'MySQL', level: 85 },
      { name: 'SQL', level: 85 },
      { name: 'Firebase Firestore', level: 80 },
    ],
    'Tools & Platforms': [
      { name: 'Git', level: 90 },
      { name: 'GitHub', level: 90 },
      { name: 'Visual Studio Code', level: 95 },
      { name: 'RESTful API', level: 85 },
      { name: 'OpenAI Console', level: 75 },
      { name: 'Anthropic Console', level: 75 },
    ],
    'Soft Skills': [
      { name: 'Problem-solving', level: 90 },
      { name: 'Teamwork', level: 85 },
      { name: 'Communication', level: 85 },
      { name: 'Debugging', level: 90 },
      { name: 'Testing', level: 80 },
    ],
  };

  return (
    <div className="container px-5">
      <section id="skills" className="skills section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Skills</h2>
          <p>My technical expertise organized by categories - from programming languages to tools and soft skills</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
            <div key={categoryIndex} className="mb-5">
              <h3 className="mb-4" style={{ color: 'var(--accent-color)', fontSize: '20px', fontWeight: '600' }}>
                {category}
              </h3>
              <div className="row skills-content skills-animation">
                <div className="col-12">
                  {skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="progress mb-3">
                      <span className="skill">
                        <span>{skill.name}</span>
                        <i className="val">{skill.level}%</i>
                      </span>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow={skill.level} aria-valuemin="0" aria-valuemax="100" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Skills;
