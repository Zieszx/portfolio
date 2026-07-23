import { useState, useRef } from 'react';
import { useScrollReveal } from '../lib/motion';
import { AnimatedGradientText } from './magicui/AnimatedGradientText';
import { ShimmerButton } from './magicui/ShimmerButton';

const contactInfo = [
  { icon: 'bi-geo-alt-fill', title: 'Address', content: 'Shah Alam, Selangor, Malaysia', link: null },
  { icon: 'bi-telephone-fill', title: 'Call Me', content: '+60 14-916 1793', link: 'tel:+60149161793' },
  { icon: 'bi-envelope-fill', title: 'Email Me', content: 'ieskandarzulqarnain@gmail.com', link: 'mailto:ieskandarzulqarnain@gmail.com' },
  { icon: 'bi-linkedin', title: 'LinkedIn', content: 'ieskandar-zulqarnain', link: 'https://www.linkedin.com/in/ieskandar-zulqarnain/' },
  { icon: 'bi-github', title: 'GitHub', content: 'github.com/Zieszx', link: 'https://github.com/Zieszx' },
  { icon: 'bi-whatsapp', title: 'WhatsApp', content: '+60 14-916 1793', link: 'https://wa.me/60149161793' },
];

const inputClass =
  'w-full rounded-xl border border-ink/15 bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink/40 transition-colors ' +
  'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 ' +
  'dark:border-white/15 dark:bg-bg-dark dark:text-white dark:placeholder:text-white/30';

const labelClass = 'mb-2 block text-sm font-medium text-ink dark:text-white';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const headerRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  useScrollReveal(headerRef);
  useScrollReveal(infoRef, { stagger: 0.08, delay: 0.1 });
  useScrollReveal(formRef, { delay: 0.15 });

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
    <section id="contact" className="relative bg-bg py-24 dark:bg-bg-dark sm:py-32">
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
          <div ref={infoRef} className="flex flex-col gap-4 lg:col-span-5">
            {contactInfo.map((item, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 rounded-2xl border border-ink/10 bg-surface p-5 transition-colors hover:border-accent/40 dark:border-white/10 dark:bg-surface-dark">
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
            ))}
          </div>

          {/* Contact form */}
          <div ref={formRef} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-ink/10 bg-surface p-6 dark:border-white/10 dark:bg-surface-dark sm:p-8">
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

                  <ShimmerButton type="submit" disabled={status === 'loading'} className="w-full sm:w-auto">
                    {status === 'loading' ? (
                      <>
                        <i className="bi bi-hourglass-split" aria-hidden="true"></i>
                        Opening…
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send-fill" aria-hidden="true"></i>
                        Send Message
                      </>
                    )}
                  </ShimmerButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
