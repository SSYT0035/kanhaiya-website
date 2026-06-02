'use client';

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 2 }}>

      {/* Top accent */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 48px 36px' }}>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '50px', marginBottom: '56px' }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', letterSpacing: '0.05em', color: 'var(--accent)', lineHeight: 1 }}>KANHAIYA</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', lineHeight: 1 }}>ENGINEERING WORKS</div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem', lineHeight: 1.8, marginBottom: '24px' }}>
              Fabrication work in Vatva, Ahmedabad. Steel tanks, industrial equipment, vehicle body works. Call or WhatsApp us for a quote.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { label: 'FB', href: '#' },
                { label: 'IG', href: '#' },
                { label: 'WA', href: 'https://wa.me/919974227781', green: true },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
                  width: '34px', height: '34px',
                  borderRadius: '6px',
                  background: s.green ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.05)',
                  border: s.green ? '1px solid rgba(74,222,128,0.2)' : '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.6rem', fontWeight: 700,
                  color: s.green ? '#4ade80' : 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '22px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {[
                { label: 'Home', id: 'home' },
                { label: 'About Us', id: 'about' },
                { label: 'Our Products', id: 'products' },
                { label: 'Contact Us', id: 'contact' },
              ].map(link => (
                <a key={link.id} href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                  style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.25s, transform 0.25s', display: 'block' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '22px' }}>Products</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {['Steel Chemical Storage Tank', 'Mild Steel Tank', 'Industrial Mixture', 'Ribbon Blender', 'Screw Conveyor', 'Duplex Filter', 'ETP Plant'].map(p => (
                <span key={p} style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.82rem' }}>{p}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '22px' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <div style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>Address</div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>107, Raghuveer Industrial Estate Part 3, Near Vatva Railway Station, Ahmedabad 382445</div>
              </div>
              <div>
                <div style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>Phone</div>
                <a href="tel:+919879995358" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', display: 'block', transition: 'color 0.25s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
                >+91 9879995358</a>
                <a href="tel:+919974227781" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', display: 'block', marginTop: '3px', transition: 'color 0.25s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
                >+91 9974227781</a>
              </div>
              <div>
                <div style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>GST</div>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>24BGEPY3762E1ZB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '28px',
          display: 'flex', flexWrap: 'wrap', gap: '16px',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>
            © 2026 Kanhaiya Engineering Works. All rights reserved. GST Registered.
          </p>
          <a href="https://wa.me/919974227781" target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            color: '#4ade80', fontSize: '0.75rem', fontWeight: 600,
            textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.25s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
