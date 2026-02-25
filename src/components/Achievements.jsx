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
  return (
    <div className="container px-4 px-md-5">
      <section id="achievements" className="achievements section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Achievements</h2>
          <p>Recognition and accomplishments throughout my academic and professional journey.</p>
        </div>

        <div className="container">
          <div className="row gy-4">
            {achievements.map((item, index) => (
              <div key={index} className="col-lg-6 col-md-12" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100}`}>
                <div className="achievement-item" style={{ borderLeftColor: item.color }}>
                  <div className="icon" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)` }}>
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <div className="achievement-body">
                    <h4 className="title">{item.title}</h4>
                    <h5 className="period" style={{ color: item.color }}>{item.period}</h5>
                    <p className="description">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Achievements;
