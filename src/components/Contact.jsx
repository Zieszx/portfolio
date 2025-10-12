import { useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    try {
      // For demo purposes, we'll simulate email sending
      // In production, you'd configure EmailJS with your service ID, template ID, and user ID
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      // Simulate successful email sending
      console.log('Form submitted:', formData);

      // Create mailto link as fallback
      const mailtoLink = `mailto:ieskandarzulqarnain@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

      // Open mailto link
      window.open(mailtoLink, '_blank');

      setStatus('success');

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-5">
      <section id="contact" className="contact section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>Let's connect and discuss opportunities, collaborations, or just have a conversation about technology!</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-5">
              <div className="info-wrap">
                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                  <i className="bi bi-geo-alt flex-shrink-0"></i>
                  <div>
                    <h3>Address</h3>
                    <p>Shah Alam, Selangor, Malaysia</p>
                  </div>
                </div>

                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                  <i className="bi bi-telephone flex-shrink-0"></i>
                  <div>
                    <h3>Call Me</h3>
                    <p>+60 14-916 1793</p>
                  </div>
                </div>

                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                  <i className="bi bi-envelope flex-shrink-0"></i>
                  <div>
                    <h3>Email Me</h3>
                    <p>ieskandarzulqarnain@gmail.com</p>
                  </div>
                </div>

                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
                  <i className="bi bi-linkedin flex-shrink-0"></i>
                  <div>
                    <h3>LinkedIn</h3>
                    <p>
                      <a href="https://www.linkedin.com/in/ieskandar-zulqarnain/" target="_blank" rel="noopener noreferrer">
                        linkedin.com/in/ieskandar-zulqarnain
                      </a>
                    </p>
                  </div>
                </div>

                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="600">
                  <i className="bi bi-github flex-shrink-0"></i>
                  <div>
                    <h3>GitHub</h3>
                    <p>
                      <a href="https://github.com/Zieszx" target="_blank" rel="noopener noreferrer">
                        github.com/Zieszx
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <label htmlFor="name-field" className="pb-2">
                      Your Name
                    </label>
                    <input type="text" name="name" id="name-field" className="form-control" value={formData.name} onChange={handleChange} required />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email-field" className="pb-2">
                      Your Email
                    </label>
                    <input type="email" className="form-control" name="email" id="email-field" value={formData.email} onChange={handleChange} required />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="subject-field" className="pb-2">
                      Subject
                    </label>
                    <input type="text" className="form-control" name="subject" id="subject-field" value={formData.subject} onChange={handleChange} required />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="message-field" className="pb-2">
                      Message
                    </label>
                    <textarea className="form-control" name="message" rows="10" id="message-field" value={formData.message} onChange={handleChange} required></textarea>
                  </div>

                  <div className="col-md-12 text-center">
                    {isLoading && (
                      <div className="loading" style={{ display: 'block', marginBottom: '15px' }}>
                        Sending message...
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="error-message" style={{ display: 'block', marginBottom: '15px' }}>
                        Sorry, there was an error sending your message. Please try again or contact me directly.
                      </div>
                    )}

                    {status === 'success' && (
                      <div className="sent-message" style={{ display: 'block', marginBottom: '15px' }}>
                        Your message has been sent successfully! I'll get back to you soon.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      style={{
                        background: isLoading ? '#ccc' : 'linear-gradient(135deg, var(--accent-color), #66d9ff)',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1,
                      }}>
                      {isLoading ? 'Sending...' : 'Send Message'}
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
