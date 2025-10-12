import { AchievementItem } from '../styles';

function Achievements() {
  const achievements = [
    {
      icon: 'bi-trophy',
      title: 'JPA PIDN Scholar',
      period: 'Sep 2021 - Aug 2024',
      description: 'Full scholarship recipient for outstanding academic performance throughout my degree program',
    },
    {
      icon: 'bi-award',
      title: "Dean's List Achievement",
      period: 'Every Semester (Sep 2020 - Aug 2024)',
      description: 'Consistent academic excellence with CGPA 3.96, maintaining top performance every semester',
    },
    {
      icon: 'bi-people',
      title: 'Head of RESAK Run Activity',
      period: 'March - May 2022',
      description: 'Led and managed sports activities including Senam Robic and Fun Run for college open day event',
    },
    {
      icon: 'bi-controller',
      title: 'E-Games Tournament Organizer',
      period: 'Sep - Dec 2022',
      description: 'Successfully organized and managed PUBG Mobile tournament as Activity Unit Committee Member',
    },
  ];

  return (
    <div className="container px-5">
      <section id="achievements" className="achievements section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Achievements</h2>
          <p>Recognition and accomplishments throughout my academic and professional journey</p>
        </div>

        <div className="container">
          <div className="row gy-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="col-lg-6 col-md-12" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100}`}>
                <AchievementItem className="d-flex">
                  <div className="icon">
                    <i className={achievement.icon}></i>
                  </div>
                  <div>
                    <h4 className="title">{achievement.title}</h4>
                    <h5 className="period">{achievement.period}</h5>
                    <p className="description">{achievement.description}</p>
                  </div>
                </AchievementItem>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Achievements;
