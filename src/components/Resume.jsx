import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import resumePdf from '/assets/resume/IESKANDARZULQARNAIN_Resume.pdf';
import { useScrollReveal } from '../lib/motion';
import { cn } from '../lib/cn';
import { AnimatedGradientText } from './magicui/AnimatedGradientText';

/* ── Timeline entry — shared visual language for education + experience ── */
function TimelineDot() {
  return (
    <span
      className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-bg dark:ring-bg-dark"
      aria-hidden="true"
    />
  );
}

const timelineItemClasses = 'relative border-l-2 border-ink/10 py-1 pl-6 dark:border-white/10';
const itemTitleClasses = 'font-heading text-base font-semibold text-ink dark:text-white';
const itemDateClasses = 'mt-0.5 text-sm font-medium text-accent';
const itemOrgClasses = 'mt-1 text-sm italic text-ink/60 dark:text-white/60';
const bulletListClasses = 'mt-3 space-y-2 text-sm leading-relaxed text-ink/70 dark:text-white/70';

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2">
      <i className="bi bi-chevron-right mt-0.5 shrink-0 text-accent" aria-hidden="true"></i>
      <span>{children}</span>
    </li>
  );
}

function Resume() {
  const [isDownloading, setIsDownloading] = useState(false);

  const headerRef = useRef(null);
  const summaryRef = useRef(null);
  const experienceRef = useRef(null);

  useScrollReveal(headerRef);
  useScrollReveal(summaryRef, { stagger: 0.1, delay: 0.1 });
  useScrollReveal(experienceRef, { stagger: 0.08, delay: 0.15 });

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
    <section id="resume" className="relative bg-bg py-24 dark:bg-bg-dark sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl">
          <AnimatedGradientText>Resume</AnimatedGradientText>
          <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-ink dark:text-white sm:text-6xl">
            My Professional Journey.
          </h1>
          <p className="mt-4 text-ink/60 dark:text-white/60">
            Education, experience, and key achievements in software development — from client-facing platforms
            to AI-driven tools.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={handleDownloadResume}
              disabled={isDownloading}
              className={cn(
                'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5',
                'bg-accent font-medium text-white transition-all hover:-translate-y-0.5',
                'hover:shadow-[0_8px_25px_rgba(0,180,216,0.35)] disabled:pointer-events-none disabled:opacity-70'
              )}>
              <i className={`bi ${isDownloading ? 'bi-hourglass-split' : 'bi-download'}`} aria-hidden="true"></i>
              {isDownloading ? 'Downloading…' : 'Download Resume'}
            </button>

            <button
              onClick={handlePreviewResume}
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-7 py-3.5',
                'font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white',
                'hover:shadow-[0_8px_25px_rgba(0,180,216,0.3)] dark:border-white/15 dark:text-white'
              )}>
              <i className="bi bi-eye" aria-hidden="true"></i>
              Preview Resume
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-12">
          {/* Left column — Summary + Education */}
          <div ref={summaryRef} className="flex flex-col gap-12">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-ink dark:text-white">Summary</h2>
              <div className="mt-6">
                <h3 className={itemTitleClasses}>Ieskandar Zulqarnain</h3>
                <p className="mt-2 italic leading-relaxed text-ink/70 dark:text-white/70">
                  Software Engineer with two years of professional experience delivering full-stack web
                  applications, R&amp;D software, and AI features. Works across enterprise stacks (Java/Spring
                  Boot, PHP/Laravel, and the in-house SOAD framework) and modern JavaScript (React.js and
                  Next.js/TypeScript).
                </p>
                <ul className="mt-4 space-y-2 text-sm text-ink/60 dark:text-white/60">
                  <li className="flex items-center gap-2">
                    <i className="bi bi-geo-alt text-accent" aria-hidden="true"></i>
                    Shah Alam, Selangor, Malaysia
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="bi bi-telephone text-accent" aria-hidden="true"></i>
                    +60 14-916 1793
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="bi bi-envelope text-accent" aria-hidden="true"></i>
                    ieskandarzulqarnain@gmail.com
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-ink dark:text-white">Education</h2>
              <div className="mt-6 flex flex-col gap-8">
                <div className={timelineItemClasses}>
                  <TimelineDot />
                  <h4 className={itemTitleClasses}>Bachelor of Computer Science (Software Engineering)</h4>
                  <h5 className={itemDateClasses}>Oct 2020 – Oct 2024</h5>
                  <p className={itemOrgClasses}>Universiti Teknologi Malaysia (UTM)</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-white/70">
                    CGPA: 3.96 — Dean&apos;s List every semester. Specialised in Data Structures &amp; Algorithms,
                    Databases, Software Engineering, and Real-Time Software Engineering.
                  </p>
                </div>

                <div className={timelineItemClasses}>
                  <TimelineDot />
                  <h4 className={itemTitleClasses}>Science Stream Module</h4>
                  <h5 className={itemDateClasses}>Apr 2019 – Apr 2020</h5>
                  <p className={itemOrgClasses}>Kelantan Matriculation College (KMKt)</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-white/70">CGPA: 3.96</p>
                </div>

                <div className={timelineItemClasses}>
                  <TimelineDot />
                  <h4 className={itemTitleClasses}>Science Stream SPM</h4>
                  <h5 className={itemDateClasses}>Jan 2017 – Dec 2018</h5>
                  <p className={itemOrgClasses}>Sekolah Menengah Kebangsaan Pahi</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-white/70">Results: 3A+ 4A 1A- 1C+</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — Professional Experience */}
          <div ref={experienceRef}>
            <h2 className="font-heading text-2xl font-semibold text-ink dark:text-white">Professional Experience</h2>

            <div className="mt-6 flex flex-col gap-8">
              {/* Webgeaz — Software Engineer / Software Developer */}
              <div className={timelineItemClasses}>
                <TimelineDot />
                <h4 className={itemTitleClasses}>Software Engineer</h4>
                <h5 className={itemDateClasses}>Apr 2026 – Present</h5>
                <h4 className={cn('pt-2', itemTitleClasses)}>Software Developer</h4>
                <h5 className={itemDateClasses}>Aug 2024 – Mar 2026</h5>
                <p className={itemOrgClasses}>Webgeaz Sdn Bhd</p>
                <ul className={bulletListClasses}>
                  <Bullet>
                    Built a Personal Evaluation module using the OpenAI API, with timesheet data pulled from the
                    Oceztra system, to help generate staff evaluations
                  </Bullet>
                  <Bullet>
                    Developed Dashboard PIWN for JAWHAR to track ongoing Wakaf, Zakat, and Haji tasks, moving the
                    team off manual filing and Excel
                  </Bullet>
                  <Bullet>Built AUDEZIA (audit management) and INXEPTA (e-commerce) client systems on the SOAD framework with MySQL</Bullet>
                  <Bullet>
                    Added AI code prediction to the SOAD framework using LLM APIs from several providers, and built
                    a reusable base template for new projects
                  </Bullet>
                  <Bullet>Built the Ezy Booking System (EzApp) with React.js and the SOAD framework, with PWA support for mobile</Bullet>
                  <Bullet>Run internal AI training sessions, helping colleagues use AI tools effectively</Bullet>
                </ul>
              </div>

              {/* Freelance — Nuvera / Meet Nuvera */}
              <div className={timelineItemClasses}>
                <TimelineDot />
                <h4 className={itemTitleClasses}>Part-Time Software Developer · Sole Developer</h4>
                <h5 className={itemDateClasses}>Jan 2025 – Present</h5>
                <p className={itemOrgClasses}>Freelance</p>
                <ul className={bulletListClasses}>
                  <Bullet>
                    <strong className="text-ink dark:text-white">Nuvera (NuveraRose)</strong> — MLM e-commerce
                    platform (Laravel 10/PHP): sole developer of a platform helping members earn passive income
                    selling beauty products, with a member base mostly in Africa. Built the member, genealogy,
                    role/permission, auditing, reporting (Excel &amp; PDF), and product-management modules. Live
                    in production.
                  </Bullet>
                  <Bullet>
                    <strong className="text-ink dark:text-white">Meet Nuvera</strong> (formerly Meet Valorra) —
                    dating app (Next.js, TypeScript, PostgreSQL): sole developer of a dating app with matching,
                    swipe, profiles, and real-time chat, built with Drizzle ORM, NextAuth, and Socket.io, deployed
                    on a Contabo VPS.
                  </Bullet>
                </ul>
              </div>

              {/* AIBIG — content unchanged */}
              <div className={timelineItemClasses}>
                <TimelineDot />
                <h4 className={itemTitleClasses}>Full Stack Developer (Internship)</h4>
                <h5 className={itemDateClasses}>Oct 2023 – Feb 2024</h5>
                <p className={itemOrgClasses}>Institute For Artificial Intelligence And Big Data (AIBIG, UMK)</p>
                <ul className={bulletListClasses}>
                  <Bullet>Developed AIBIG Main Website using Spring Boot MVC with MySQL integration</Bullet>
                  <Bullet>Built AIBIG Research Assessment System (AIRAS) using Django with MySQL</Bullet>
                  <Bullet>Created RESTful APIs using Python and Java for internal usage</Bullet>
                  <Bullet>Implemented JavaScript plugins for enhanced functionality</Bullet>
                  <Bullet>Collaborated with AIBIG staff on system development and troubleshooting</Bullet>
                </ul>
              </div>

              {/* DreamEDGE — content unchanged */}
              <div className={timelineItemClasses}>
                <TimelineDot />
                <h4 className={itemTitleClasses}>Software Engineer (Internship)</h4>
                <h5 className={itemDateClasses}>Aug 2022</h5>
                <p className={itemOrgClasses}>DreamEDGE</p>
                <ul className={bulletListClasses}>
                  <Bullet>Created Software Testing Documentation (STD) for KAWBRA unmanned ground vehicle</Bullet>
                  <Bullet>Assisted with Arduino and Raspberry Pi troubleshooting and rewiring</Bullet>
                  <Bullet>Fixed Arduino code and helped with hardware integration</Bullet>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
