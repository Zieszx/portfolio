import { useState } from 'react';
import Swal from 'sweetalert2';
import resumePdf from '/assets/resume/IESKANDARZULQARNAIN_Resume.pdf';

function Resume() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadResume = async () => {
    setIsDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = resumePdf;
      link.download = 'IESKANDARZULQARNAIN_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        Swal.fire({
          title: 'Downloaded!',
          text: 'Resume downloaded successfully.',
          icon: 'success',
          confirmButtonColor: 'var(--accent-color)',
          timer: 3000,
          timerProgressBar: true,
        });
      }, 100);
    } catch {
      Swal.fire({
        title: 'Oops!',
        text: 'Could not download resume. Please try again.',
        icon: 'error',
        confirmButtonColor: 'var(--accent-color)',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePreviewResume = () => window.open(resumePdf, '_blank');

  return (
    <div className="container px-4 px-md-5">
      <section id="resume" className="resume section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Resume</h2>
          <p>My professional journey — education, experience, and key achievements in software development.</p>

          <div className="resume-actions d-flex justify-content-center gap-3 flex-wrap pt-3">
            <button
              onClick={handleDownloadResume}
              disabled={isDownloading}
              className="resume-btn resume-btn-primary"
              onMouseOver={(e) => {
                if (!isDownloading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 180, 216, 0.35)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
              <i className={`bi ${isDownloading ? 'bi-hourglass-split' : 'bi-download'}`}></i>
              {isDownloading ? 'Downloading…' : 'Download Resume'}
            </button>

            <button
              onClick={handlePreviewResume}
              className="resume-btn resume-btn-outline"
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--accent-color)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 180, 216, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--accent-color)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
              <i className="bi bi-eye"></i>
              Preview Resume
            </button>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {/* Left column — Summary + Education */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <h3 className="resume-title">Summary</h3>
              <div className="resume-item pb-0">
                <h4>Ieskandar Zulqarnain</h4>
                <p>
                  <em>Passionate and self-motivated Software Developer with over a year of professional experience in full-stack development, R&amp;D software projects, and AI-driven solutions. Eager to contribute technical skills and problem-solving abilities to innovative projects.</em>
                </p>
                <ul>
                  <li>Shah Alam, Selangor, Malaysia</li>
                  <li>+60 14-916 1793</li>
                  <li>ieskandarzulqarnain@gmail.com</li>
                </ul>
              </div>

              <h3 className="resume-title">Education</h3>
              <div className="resume-item">
                <h4>Bachelor of Computer Science (Software Engineering)</h4>
                <h5>Oct 2020 – Oct 2024</h5>
                <p>
                  <em>Universiti Teknologi Malaysia (UTM)</em>
                </p>
                <p>CGPA: 3.96 — Dean&apos;s List every semester. Specialised in Data Structures &amp; Algorithms, Databases, Software Engineering, and Real-Time Software Engineering.</p>
              </div>

              <div className="resume-item">
                <h4>Science Stream Module</h4>
                <h5>Apr 2019 – Apr 2020</h5>
                <p>
                  <em>Kelantan Matriculation College (KMKt)</em>
                </p>
                <p>CGPA: 3.96</p>
              </div>

              <div className="resume-item">
                <h4>Science Stream SPM</h4>
                <h5>Jan 2017 – Dec 2018</h5>
                <p>
                  <em>Sekolah Menengah Kebangsaan Pahi</em>
                </p>
                <p>Results: 3A+ 4A 1A- 1C+</p>
              </div>
            </div>

            {/* Right column — Professional Experience */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <h3 className="resume-title">Professional Experience</h3>

              <div className="resume-item">
                <h4>Software Developer</h4>
                <h5>Aug 2024 – Present</h5>
                <p>
                  <em>Webgeaz Sdn Bhd</em>
                </p>
                <ul>
                  <li>Developed Dashboard PIWN system for JAWHAR to monitor Wakaf, Zakat, and Haji tasks</li>
                  <li>Created AI code prediction system for SOAD framework using RESTful APIs</li>
                  <li>Built Ezapp booking management system using React.js and SOAD framework</li>
                  <li>Applied PWA concepts to enhance user experience</li>
                  <li>Improved SOAD framework by creating reusable base templates</li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>Full Stack Developer (Internship)</h4>
                <h5>Oct 2023 – Feb 2024</h5>
                <p>
                  <em>Institute For Artificial Intelligence And Big Data (AIBIG, UMK)</em>
                </p>
                <ul>
                  <li>Developed AIBIG Main Website using Spring Boot MVC with MySQL integration</li>
                  <li>Built AIBIG Research Assessment System (AIRAS) using Django with MySQL</li>
                  <li>Created RESTful APIs using Python and Java for internal usage</li>
                  <li>Implemented JavaScript plugins for enhanced functionality</li>
                  <li>Collaborated with AIBIG staff on system development and troubleshooting</li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>Software Engineer (Internship)</h4>
                <h5>Aug 2022</h5>
                <p>
                  <em>DreamEDGE</em>
                </p>
                <ul>
                  <li>Created Software Testing Documentation (STD) for KAWBRA unmanned ground vehicle</li>
                  <li>Assisted with Arduino and Raspberry Pi troubleshooting and rewiring</li>
                  <li>Fixed Arduino code and helped with hardware integration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resume;
