'use client';
import { useEffect, useRef, useState } from 'react';

const STATS = [
  { end: 10, suffix: '+', label: 'Years of Experience' },
  { end: 500, suffix: '+', label: 'Projects Completed' },
  { end: 14, suffix: '', label: 'Product Types' },
  { end: 100, suffix: '%', label: 'Quality Assured' },
];

function useCountUp(end, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);
  return count;
}

function StatCard({ stat, index, started }) {
  const count = useCountUp(stat.end, 1800, started);
  return (
    <div className={`reveal-scale d-${index + 1}`} style={{
      padding: '28px 0',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      transition: 'border-color 0.3s',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(96,165,250,0.3)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
    >
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '2.8rem', lineHeight: 1,
        color: 'var(--accent)', letterSpacing: '0.02em',
      }}>
        {count}{stat.suffix}
      </div>
      <div style={{
        fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)',
        textTransform: 'uppercase', letterSpacing: '0.15em',
        fontWeight: 500, marginTop: '8px',
      }}>
        {stat.label}
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-clip').forEach(el => el.classList.add('visible'));
            setStatsStarted(true);
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ padding: '100px 0 100px', background: 'var(--dark-2)', position: 'relative' }}>
      {/* Animated top border line on scroll */}
      <div className="reveal-clip" style={{
        position: 'absolute', top: 0, left: '48px', right: '48px', height: '1px',
        background: 'linear-gradient(90deg, var(--accent), rgba(96,165,250,0.1), transparent)',
      }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <div className="section-label reveal-blur">About Us</div>
          <h2 className="section-title reveal-blur d-2">WHO WE <span className="orange-text">SERVE</span></h2>
          <div className="divider reveal-blur d-3" />
          <p className="reveal-blur d-4" style={{
            color: 'rgba(255,255,255,0.35)', maxWidth: '520px',
            lineHeight: 1.85, fontSize: '0.9rem', fontWeight: 300,
          }}>
            Kanhaiya Engineering Works is a fabrication unit in Vatva, Ahmedabad. We work with two kinds of customers. Here's what we do for each.
          </p>
        </div>

        {/* B2B / B2C Grid — MAIN STORY */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2px',
          marginBottom: '64px',
        }}>

          {/* B2B */}
          <div className="reveal-left d-1" style={{
            background: 'var(--dark-3)',
            border: '1px solid rgba(96,165,250,0.15)',
            borderRadius: '4px 0 0 4px',
            padding: '40px 36px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: '120px', height: '120px',
              background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)',
            }} />
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '3.5rem', color: 'var(--accent)',
              letterSpacing: '0.04em', lineHeight: 1, marginBottom: '6px',
            }}>B2B</div>
            <div style={{
              fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '24px',
            }}>Business to Business</div>

            <p style={{
              fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.85, fontWeight: 300, marginBottom: '28px',
            }}>
              We supply to factories, chemical plants, ETP contractors, and process industries. If you need tanks, conveyors, vessels or filtration equipment in bulk, we understand drawings, tolerances and delivery schedules.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Chemical plants, refineries and food processing factories',
                'Contractors who need fabricated parts for site installation',
                'Companies that want bulk orders with consistent quality',
                'Long-term clients who need maintenance and repeat work',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: 'var(--accent)', marginTop: '7px', flexShrink: 0
                  }} />
                  <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* B2C */}
          <div className="reveal-right d-2" style={{
            background: 'var(--dark-3)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '0 4px 4px 0',
            padding: '40px 36px',
          }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '3.5rem', color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.04em', lineHeight: 1, marginBottom: '6px',
            }}>B2C</div>
            <div style={{
              fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '24px',
            }}>Business to Consumer</div>

            <p style={{
              fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.85, fontWeight: 300, marginBottom: '28px',
            }}>
              We also work directly with individual buyers. Farmers who need tractor water tanks, vehicle owners who need custom body works, small shops needing MS structures. No order is too small if the requirement is clear.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Farmers who need water tanks for their tractors',
                'Truck and vehicle owners who need custom body fitting',
                'Small shop owners who need MS frames or sheds built',
                'Anyone who needs a one-time custom metal job done',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.25)', marginTop: '7px', flexShrink: 0
                  }} />
                  <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Details — secondary, not the headline */}
        <div className="reveal-blur d-3" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '0',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '40px',
          marginBottom: '64px',
        }}>
          {[
            { label: 'Location', value: 'Vatva, Ahmedabad, 382445' },
            { label: 'Phone', value: '+91 98799 95358 / +91 99742 27781' },
            { label: 'Specialization', value: 'MS & SS Fabrication · Heavy Engineering' },
            { label: 'Registration', value: 'GST Registered · 24BGEPY3762E1ZB' },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '20px 0',
              paddingRight: '32px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              paddingLeft: i > 0 ? '32px' : '0',
            }}>
              <div style={{
                fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '6px',
              }}>{item.label}</div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.6 }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0 24px' }}>
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} started={statsStarted} />
          ))}
        </div>

      </div>
    </section>
  );
}
