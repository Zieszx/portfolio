import { useState } from 'react';

const contactInfo = [
  { icon: 'bi-geo-alt-fill', title: 'Address', content: 'Shah Alam, Selangor, Malaysia', link: null },
  { icon: 'bi-telephone-fill', title: 'Call Me', content: '+60 14-916 1793', link: 'tel:+60149161793' },
  { icon: 'bi-envelope-fill', title: 'Email Me', content: 'ieskandarzulqarnain@gmail.com', link: 'mailto:ieskandarzulqarnain@gmail.com' },
  { icon: 'bi-linkedin', title: 'LinkedIn', content: 'ieskandar-zulqarnain', link: 'https://www.linkedin.com/in/ieskandar-zulqarnain/' },
  { icon: 'bi-github', title: 'GitHub', content: 'github.com/Zieszx', link: 'https://github.com/Zieszx' },
  { icon: 'bi-whatsapp', title: 'WhatsApp', content: '+60 14-916 1793', link: 'https://wa.me/60149161793' },
];

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

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
    <div className="container px-4 px-md-5">
      <section id="contact" className="contact section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>Let&apos;s connect and discuss opportunities, collaborations, or just talk about technology!</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            {/* Contact info */}
            <div className="col-lg-5">
              <div className="info-wrap">
                {contactInfo.map((item, i) => (
                  <div key={i} className="info-item d-flex" data-aos="fade-up" data-aos-delay={`${(i + 2) * 80}`}>
                    <i className={`bi ${item.icon} flex-shrink-0`}></i>
                    <div>
                      <h3>{item.title}</h3>
                      {item.link ? (
                        <p>
                          <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                            {item.content}
                          </a>
                        </p>
                      ) : (
                        <p>{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="col-lg-7">
              <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <label htmlFor="name-field" className="pb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name-field"
                      className="form-control"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email-field" className="pb-2">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email-field"
                      className="form-control"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="subject-field" className="pb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      id="subject-field"
                      className="form-control"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="message-field" className="pb-2">Message</label>
                    <textarea
                      name="message"
                      id="message-field"
                      className="form-control"
                      rows="8"
                      placeholder="Write your message here…"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 text-center">
                    {status === 'loading' && (
                      <div className="loading" style={{ display: 'block', marginBottom: 12 }}>
                        Opening your email client…
                      </div>
                    )}
                    {status === 'error' && (
                      <div className="error-message" style={{ display: 'block', marginBottom: 12 }}>
                        Something went wrong. Please email me directly at ieskandarzulqarnain@gmail.com
                      </div>
                    )}
                    {status === 'success' && (
                      <div className="sent-message" style={{ display: 'block', marginBottom: 12 }}>
                        Your email client has been opened. Thank you for reaching out!
                      </div>
                    )}

                    <button type="submit" disabled={status === 'loading'}>
                      {status === 'loading' ? (
                        <><i className="bi bi-hourglass-split me-2"></i>Opening…</>
                      ) : (
                        <><i className="bi bi-send-fill me-2"></i>Send Message</>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
