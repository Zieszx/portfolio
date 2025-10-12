import { useEffect } from 'react';
import profileImg from '/assets/img/my-profile-img.jpg';
import { StatsItem } from '../styles';

function About() {
  useEffect(() => {
    // Initialize PureCounter if available
    if (window.PureCounter) {
      new window.PureCounter();
    }
  }, []);

  return (
    <div className="container px-5">
      {/* About Section */}
      <section id="about" className="about section">
        <div className="container section-title" data-aos="fade-up">
          <h2>About</h2>
          <p>A passionate and self-motivated Software Developer with over a year of professional experience in full-stack development, R&D software projects, and AI-driven solutions.</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-4">
              <img src={profileImg} className="img-fluid" alt="Ieskandar Zulqarnain" />
            </div>
            <div className="col-lg-8 content">
              <h2>Software Developer & Engineer</h2>
              <p className="fst-italic py-3">
                I am a Software Developer and Software Engineer with expertise in full-stack development, specializing in Java, JavaScript, Python, and AI-driven solutions. My career began with internships at leading technology companies, evolving into full-time roles where I deliver scalable, high-impact applications.
              </p>
              <div className="row">
                <div className="col-lg-6">
                  <ul>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>Name:</strong> <span>Ieskandar Zulqarnain Ghazali</span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>Website:</strong> <span>github.com/Zieszx</span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+60 14-916 1793</span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>Shah Alam, Selangor</span>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>9 December 2001</span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>24</span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>Bachelor of Computer Science</span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>ieskandarzulqarnain@gmail.com</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="py-3">
                I hold a Bachelor of Software Engineering (Computer Science) from Universiti Teknologi Malaysia, graduating with a GPA of 3.96 and earning Dean's List recognition every semester. I'm passionate about coding, technology, and creating innovative solutions that make an impact, with a particular interest in AI and machine learning
                applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-code-square"></i>
                <span data-purecounter-start="0" data-purecounter-end="10" data-purecounter-duration="1" className="purecounter">
                  10
                </span>
                <p>
                  <strong>Projects Completed</strong> <span>personal & professional</span>
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-journal-richtext"></i>
                <span data-purecounter-start="0" data-purecounter-end="1" data-purecounter-duration="1" className="purecounter">
                  1
                </span>
                <p>
                  <strong>Years Experience</strong> <span>professional development</span>
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-award"></i>
                <span data-purecounter-start="0" data-purecounter-end="8" data-purecounter-duration="1" className="purecounter">
                  8
                </span>
                <p>
                  <strong>Dean's List</strong> <span>consecutive semesters</span>
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-mortarboard"></i>
                <span data-purecounter-start="0" data-purecounter-end="3.96" data-purecounter-duration="1" data-purecounter-decimals="2" className="purecounter"></span>
                <p>
                  <strong>CGPA</strong> <span>out of 4.00</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
