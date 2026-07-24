import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useScrollReveal } from '../lib/motion';
import { AnimatedGradientText } from './magicui/AnimatedGradientText';
import SpotlightCard from './ui/SpotlightCard';
import MotionButton from './ui/MotionButton';
import LetsWorkSection from './ui/LetsWorkSection';

/* Aliased at module scope so the `motion` import counts as used for lint. */
const MotionDiv = motion.div;

const revealViewport = { once: true, amount: 0.3 };
const riseIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] } },
};
const staggerParent = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const socials = [
  { href: 'https://github.com/Zieszx', icon: 'bi-github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/ieskandar-zulqarnain/', icon: 'bi-linkedin', label: 'LinkedIn' },
  { href: 'https://instagram.com/zieskandar_', icon: 'bi-instagram', label: 'Instagram' },
  { href: 'mailto:ieskandarzulqarnain@gmail.com', icon: 'bi-envelope', label: 'Email' },
  { href: 'https://wa.me/60149161793', icon: 'bi-whatsapp', label: 'WhatsApp' },
];

const renderRouterLink = ({ href, className, children, ...rest }) => (
  <Link to={href} className={className} {...rest}>
    {children}
  </Link>
);

const contactInfo = [
  { icon: 'bi-geo-alt-fill', title: 'Address', content: 'Shah Alam, Selangor, Malaysia', link: null },
  { icon: 'bi-telephone-fill', title: 'Call Me', content: '+60 14-916 1793', link: 'tel:+60149161793' },
  { icon: 'bi-envelope-fill', title: 'Email Me', content: 'ieskandarzulqarnain@gmail.com', link: 'mailto:ieskandarzulqarnain@gmail.com' },
  { icon: 'bi-linkedin', title: 'LinkedIn', content: 'ieskandar-zulqarnain', link: 'https://www.linkedin.com/in/ieskandar-zulqarnain/' },
  { icon: 'bi-github', title: 'GitHub', content: 'github.com/Zieszx', link: 'https://github.com/Zieszx' },
  { icon: 'bi-whatsapp', title: 'WhatsApp', content: '+60 14-916 1793', link: 'https://wa.me/60149161793' },
];

const inputClass =
  'w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink/45 ' +
  'transition-[border-color,box-shadow,background-color] duration-200 hover:border-accent/40 ' +
  'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-0 ' +
  'dark:border-white/20 dark:bg-surface-dark dark:text-white dark:placeholder:text-white/40';

const labelClass = 'mb-2 block text-sm font-medium text-ink dark:text-white';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const headerRef = useRef(null);

  useScrollReveal(headerRef);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate brief delay then open email client
    await new Promise((r) => setTimeout(r, 800));

    try {
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const mailto = `mailto:ieskandarzulqarnain@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailto, '_blank');
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section id="contact" className="relative bg-bg/70 py-24 dark:bg-bg-dark/70 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl">
          <AnimatedGradientText>Contact</AnimatedGradientText>
          <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-ink dark:text-white sm:text-6xl">
            Let&apos;s Connect.
          </h1>
          <p className="mt-4 text-ink/60 dark:text-white/60">
            Let&apos;s connect and discuss opportunities, collaborations, or just talk about technology!
          </p>
        </div>

        {/* Info + form */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Contact info */}
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={staggerParent}
            className="flex flex-col gap-4 lg:col-span-5">
            {contactInfo.map((item, i) => (
              <MotionDiv key={i} variants={riseIn}>
                <SpotlightCard className="h-full p-5">
                  {/* SpotlightCard wraps children in its own div, so the flex row
                      lives one level in rather than on the card itself. */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-lg text-accent dark:bg-accent/15">
                      <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-ink dark:text-white">{item.title}</h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-sm text-ink/60 transition-colors hover:text-accent dark:text-white/60">
                          {item.content}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-ink/60 dark:text-white/60">{item.content}</p>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </MotionDiv>
            ))}
          </MotionDiv>

          {/* Contact form */}
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={riseIn}
            className="lg:col-span-7">
            <SpotlightCard
              as="form"
              onSubmit={handleSubmit}
              className="p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name-field" className={labelClass}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name-field"
                    className={inputClass}
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email-field" className={labelClass}>
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email-field"
                    className={inputClass}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="subject-field" className={labelClass}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject-field"
                    className={inputClass}
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message-field" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message-field"
                    className={`${inputClass} resize-none`}
                    rows="8"
                    placeholder="Write your message here…"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="sm:col-span-2 text-center">
                  {status === 'loading' && (
                    <p className="mb-4 text-sm text-ink/60 dark:text-white/60">Opening your email client…</p>
                  )}
                  {status === 'error' && (
                    <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                      Something went wrong. Please email me directly at ieskandarzulqarnain@gmail.com
                    </p>
                  )}
                  {status === 'success' && (
                    <p className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400">
                      Your email client has been opened. Thank you for reaching out!
                    </p>
                  )}

                  <MotionButton
                    type="submit"
                    icon={status === 'loading' ? 'bi-hourglass-split' : 'bi-send'}
                    disabled={status === 'loading'}
                    className="w-full py-3.5 sm:w-auto">
                    {status === 'loading' ? 'Opening…' : 'Send Message'}
                  </MotionButton>
                </div>
              </div>
            </SpotlightCard>
          </MotionDiv>
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <LetsWorkSection
        ctaLabel="See my work"
        ctaHref="/portfolio"
        secondaryLabel="What I do"
        secondaryHref="/services"
        socials={socials}
        renderLink={renderRouterLink}
      />
    </>
  );
}

export default Contact;
