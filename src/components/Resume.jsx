import { useState } from 'react';
import Swal from 'sweetalert2';
import resumePdf from '/assets/resume/IESKANDARZULQARNAIN_Resume.pdf';

function Resume() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadResume = async () => {
    setIsDownloading(true);

    try {
      // Download the actual PDF resume
      const link = document.createElement('a');
      link.href = resumePdf;
      link.download = 'IESKANDARZULQARNAIN_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success feedback
      setTimeout(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Resume downloaded successfully!',
          icon: 'success',
          confirmButtonColor: 'var(--accent-color)',
          timer: 3000,
          timerProgressBar: true,
        });
      }, 100);
    } catch (error) {
      console.error('Error downloading resume:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Error downloading resume. Please try again.',
        icon: 'error',
        confirmButtonColor: 'var(--accent-color)',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePreviewResume = () => {
    // Open resume in new tab for preview
    window.open(resumePdf, '_blank');
  };

  return (
    <div className="container px-5">
      <section id="resume" className="resume section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Resume</h2>
          <p>My professional journey showcasing education, experience, and key achievements in software development</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap pt-3">
            <button
              onClick={handleDownloadResume}
              disabled={isDownloading}
              className="btn btn-primary"
              style={{
                background: isDownloading ? '#ccc' : 'linear-gradient(135deg, var(--accent-color), #66d9ff)',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 25px',
                fontSize: '16px',
                fontWeight: '500',
                color: 'white',
                cursor: isDownloading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                opacity: isDownloading ? 0.7 : 1,
              }}
              onMouseOver={(e) => {
                if (!isDownloading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 180, 216, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (!isDownloading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}>
              <i className={`bi ${isDownloading ? 'bi-hourglass-split' : 'bi-download'}`}></i>
              {isDownloading ? 'Downloading...' : 'Download Resume'}
            </button>

            <button
              onClick={handlePreviewResume}
              className="btn btn-outline-primary"
              style={{
                border: '2px solid var(--accent-color)',
                borderRadius: '8px',
                padding: '12px 25px',
                fontSize: '16px',
                fontWeight: '500',
                color: 'var(--accent-color)',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'var(--accent-color)';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 180, 216, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--accent-color)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
              <i className="bi bi-eye"></i>
              Preview Resume
            </button>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <h3 className="resume-title">Summary</h3>
              <div className="resume-item pb-0">
                <h4>Ieskandar Zulqarnain</h4>
                <p>
                  <em>Passionate and self-motivated Software Developer with over a year of professional experience in full-stack development, R&D software projects, and AI-driven solutions. Eager to contribute technical skills and problem-solving abilities to innovative projects.</em>
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
                <h5>Oct 2020 - Oct 2024</h5>
                <p>
                  <em>Universiti Teknologi Malaysia (UTM)</em>
                </p>
                <p>CGPA: 3.96 - Dean's List every semester. Specialized in Data Structures & Algorithms, Databases, Software Engineering, and Real-Time Software Engineering.</p>
              </div>

              <div className="resume-item">
                <h4>Science Stream Module</h4>
                <h5>Apr 2019 - Apr 2020</h5>
                <p>
                  <em>Kelantan Matriculation College (KMKt)</em>
                </p>
                <p>CGPA: 3.96</p>
              </div>

              <div className="resume-item">
                <h4>Science Stream SPM</h4>
                <h5>Jan 2017 - Dec 2018</h5>
                <p>
                  <em>Sekolah Menengah Kebangsaan Pahi</em>
                </p>
                <p>Results: 3A+ 4A 1A- 1C+</p>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <h3 className="resume-title">Professional Experience</h3>
              <div className="resume-item">
                <h4>Software Developer</h4>
                <h5>Aug 2024 - Present</h5>
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
                <h5>Oct 2023 - Feb 2024</h5>
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
