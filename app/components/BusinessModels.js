'use client';
import { useEffect, useRef } from 'react';

export default function BusinessModels() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const reveals = document.querySelectorAll('.b2b-reveal');
    reveals.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ 
      padding: '100px 48px', 
      background: 'var(--dark-2)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div className="b2b-reveal reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-label">Our Operations</div>
          <h2 className="section-title">SERVING <span className="orange-text">EVERY</span> SECTOR</h2>
          <div className="divider" style={{ margin: '16px auto 0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          
          {/* B2B Section */}
          <div className="b2b-reveal reveal-left" style={{
            background: 'var(--dark-3)',
            border: '1px solid var(--border-accent)',
            borderRadius: '12px',
            padding: '48px 36px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, right: 0, width: '150px', height: '150px',
              background: 'radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(96,165,250,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.8rem', color: 'var(--accent)'
              }}>🏢</div>
              <div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>B2B</h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>Business to Business</div>
              </div>
            </div>
            
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '32px', fontSize: '0.95rem' }}>
              We partner with large scale manufacturing plants, refineries, and construction companies to deliver heavy-duty industrial fabrication. Our B2B services ensure compliance with strict industry standards and large volume handling.
            </p>
            
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Large Scale Chemical Storage Tanks', 'Industrial ETP Plants & Machinery', 'Bulk Orders for Pipes & Fittings', 'Annual Maintenance Contracts (AMC)'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)' }}>
                  <span style={{ color: 'var(--accent)', marginTop: '2px' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* B2C Section */}
          <div className="b2b-reveal reveal-right" style={{
            background: 'var(--dark-3)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '48px 36px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.8rem', color: 'white'
              }}>👥</div>
              <div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>B2C</h3>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>Business to Consumer</div>
              </div>
            </div>
            
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '32px', fontSize: '0.95rem' }}>
              We cater directly to individual consumers, farmers, and small business owners providing customized fabrication solutions. Get industrial-grade quality for your personal or small-scale commercial needs.
            </p>
            
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Tractor Water Tanks for Agriculture', 'Custom Vehicle Body Works', 'Small Capacity MS Storage Tanks', 'Custom Metal Framing & Sheds'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
