'use client';
import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', product: '', msg: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-clip').forEach(el => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.product || !form.msg) {
      alert('Kripya saari jankari bharein! (Please fill all fields)');
      return;
    }
    setSending(true);
    const phone = '919974227781';
    const text = `*INQUIRY FOR KANHAIYA ENGINEERING WORKS*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Product Needed:* ${encodeURIComponent(form.product)}%0A*Message:* ${encodeURIComponent(form.msg)}`;
    setTimeout(() => {
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 600);
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px',
    padding: '14px 18px',
    color: 'white',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
    fontFamily: "'Inter', sans-serif",
  };

  const contactDetails = [
    {
      label: 'Address',
      value: '107, Raghuveer Industrial Estate Part 3,\nNear Vatva Railway Station, Ahmedabad – 382445',
      link: 'https://maps.google.com/?q=Vatva,Ahmedabad',
    },
    {
      label: 'Phone',
      value: '+91 9879995358\n+91 9974227781',
      link: 'tel:+919879995358',
    },
    {
      label: 'GST Number',
      value: '24BGEPY3762E1ZB',
      link: null,
    },
    {
      label: 'WhatsApp',
      value: '+91 9974227781',
      link: 'https://wa.me/919974227781',
      green: true,
    },
  ];

  return (
    <section id="contact" ref={sectionRef} style={{ padding: '100px 0', background: 'var(--dark-2)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <div className="section-label reveal-blur">Let's Connect</div>
          <h2 className="section-title reveal-blur d-2">GET IN <span className="orange-text">TOUCH</span></h2>
          <div className="divider reveal-blur d-3" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'start' }}>

          {/* Left - Contact Info */}
          <div className="reveal-left">
            <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '40px', lineHeight: 1.8, fontSize: '0.92rem' }}>
              Call us or send a WhatsApp message with your requirement. We will get back to you as soon as possible.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {contactDetails.map((item, i) => (
                <div key={i} style={{ padding: '22px 0', borderBottom: i < contactDetails.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <div style={{ fontSize: '0.66rem', color: item.green ? '#4ade80' : 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '7px' }}>
                    {item.label}
                  </div>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noreferrer"
                      style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.7, textDecoration: 'none', whiteSpace: 'pre-line', display: 'block', transition: 'color 0.25s' }}
                      onMouseEnter={e => e.target.style.color = item.green ? '#4ade80' : 'var(--accent)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
                    >{item.value}</a>
                  ) : (
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', fontFamily: 'monospace', letterSpacing: '0.05em' }}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Map */}
            <div style={{ marginTop: '36px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', height: '180px' }}>
              <iframe
                title="Kanhaiya Engineering Works Location"
                src="https://maps.google.com/maps?q=Vatva+Industrial+Area,+Ahmedabad&output=embed&z=14"
                width="100%" height="100%" frameBorder="0"
                style={{ filter: 'invert(90%) hue-rotate(190deg) contrast(0.8)', display: 'block' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right - WhatsApp Form */}
          <div className="reveal-right">
            <div style={{
              background: 'var(--dark-3)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px',
              padding: '36px 32px',
              position: 'relative',
            }}>
              {/* Top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--accent), transparent)', borderRadius: '12px 12px 0 0' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '7px', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)' }}>WhatsApp Inquiry</h3>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)', marginTop: '2px' }}>Sends directly to our WhatsApp</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '7px' }}>Your Name *</label>
                  <input type="text" id="wa_name" placeholder="e.g. Ramesh Patel"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'rgba(96,165,250,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(96,165,250,0.08)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '7px' }}>Product Needed *</label>
                  <input type="text" id="wa_product" placeholder="e.g. Steel Chemical Storage Tank"
                    value={form.product} onChange={e => setForm({ ...form, product: e.target.value })}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'rgba(96,165,250,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(96,165,250,0.08)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '7px' }}>Your Requirements *</label>
                  <textarea id="wa_msg" rows={4}
                    placeholder="Describe requirements, dimensions, material, quantity..."
                    value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(96,165,250,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(96,165,250,0.08)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                <button type="submit" style={{
                  width: '100%',
                  background: sent ? 'rgba(74,222,128,0.15)' : 'rgba(74,222,128,0.9)',
                  border: sent ? '1px solid rgba(74,222,128,0.4)' : 'none',
                  color: sent ? '#4ade80' : '#0c0c0c',
                  fontWeight: 700, padding: '16px', borderRadius: '6px',
                  fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  transition: 'all 0.3s', cursor: 'pointer',
                  opacity: sending ? 0.8 : 1,
                }}>
                  {sent ? '✅ Opening WhatsApp...' : sending ? '⏳ Preparing...' : 'Send on WhatsApp'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
