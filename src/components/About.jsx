import { useState, useEffect, useRef } from 'react';
import profileImg from '../assets/my-profile-img.jpg';

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
  { icon: 'bi-code-square',      end: 10,   decimals: 0, label: 'Projects Completed', sub: 'personal & professional', delay: 100 },
  { icon: 'bi-journal-richtext', end: 1,    decimals: 0, label: 'Years Experience',   sub: 'professional development', delay: 200 },
  { icon: 'bi-award',            end: 8,    decimals: 0, label: "Dean's List",         sub: 'consecutive semesters',    delay: 300 },
  { icon: 'bi-mortarboard',      end: 3.96, decimals: 2, label: 'CGPA',               sub: 'out of 4.00',              delay: 400 },
];

function About() {
  const age = computeAge(2001, 12, 9);

  return (
    <div className="container px-4 px-md-5">
      {/* ── About Section ── */}
      <section id="about" className="about section">
        <div className="container section-title" data-aos="fade-up">
          <h2>About</h2>
          <p>A passionate and self-motivated Software Developer with over a year of professional experience in full-stack development, R&amp;D software projects, and AI-driven solutions.</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4 justify-content-center">
            {/* Profile image */}
            <div className="col-lg-4 d-flex justify-content-center align-items-start" data-aos="fade-right" data-aos-delay="150">
              <div className="profile-img-wrapper">
                <img src={profileImg} className="img-fluid about-profile-img" alt="Ieskandar Zulqarnain" />
                <div className="profile-img-ring" aria-hidden="true"></div>
              </div>
            </div>

            {/* Content */}
            <div className="col-lg-8 content" data-aos="fade-left" data-aos-delay="150">
              <h2>Software Developer &amp; Engineer</h2>
              <p className="fst-italic py-3">
                I am a Software Developer and Software Engineer with expertise in full-stack development, specialising in Java, JavaScript, Python, and AI-driven solutions. My career began with internships at leading technology companies, evolving into full-time roles where I deliver scalable, high-impact applications.
              </p>
              <div className="row">
                <div className="col-lg-6">
                  <ul>
                    <li><i className="bi bi-chevron-right"></i> <strong>Name:</strong> <span>Ieskandar Zulqarnain Ghazali</span></li>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>GitHub:</strong>{' '}
                      <span><a href="https://github.com/Zieszx" target="_blank" rel="noopener noreferrer">github.com/Zieszx</a></span>
                    </li>
                    <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+60 14-916 1793</span></li>
                    <li><i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>Shah Alam, Selangor</span></li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul>
                    <li><i className="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>9 December 2001</span></li>
                    <li><i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>{age} years old</span></li>
                    <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>Bachelor of Computer Science</span></li>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>Email:</strong>{' '}
                      <span><a href="mailto:ieskandarzulqarnain@gmail.com">ieskandarzulqarnain@gmail.com</a></span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="py-3">
                I hold a Bachelor of Software Engineering (Computer Science) from Universiti Teknologi Malaysia, graduating with a GPA of 3.96 and earning Dean&apos;s List recognition every semester. I&apos;m passionate about coding, technology, and creating innovative solutions that make an impact, with a particular interest in AI and machine learning applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Section — custom CountUp, no PureCounter dependency ── */}
      <section id="stats" className="stats section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            {stats.map((s, i) => (
              <div key={i} className="col-lg-3 col-md-6 col-6" data-aos="zoom-in" data-aos-delay={s.delay}>
                <div className="stats-item">
                  <i className={`bi ${s.icon}`}></i>
                  <CountUp end={s.end} decimals={s.decimals} duration={1600} />
                  <p><strong>{s.label}</strong> <span>{s.sub}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
