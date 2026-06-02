'use client';
import { useEffect, useState, useRef } from 'react';

const BG_IMAGES = [
  '/hero1.jpg',
  '/hero2.jpg',
  '/hero3.jpg',
  '/hero4.jpg',
];

const PROCESSES = ['WELDING', 'BENDING', 'CUTTING', 'FORMING', 'ROLLING'];

const TICKER_ITEMS = [
  'Steel Chemical Storage Tank', 'Mild Steel Tank', 'Tractor Water Tank',
  'Duplex Filter', 'Industrial Silensor', 'Ribbon Blender',
  'Screw Conveyor', 'Pressure Vessel', 'ETP Plant', 'MS Frame', 'Vehicle Body Works',
];

const CAPABILITIES = [
  { label: 'Welding', detail: 'MIG · TIG · Arc', icon: '⚡' },
  { label: 'Material', detail: 'MS · SS 304 · SS 316', icon: '🔩' },
  { label: 'Capacity', detail: '500L to 1,00,000L+', icon: '📐' },
  { label: 'Standards', detail: 'IS 2825 · ASME Sec VIII', icon: '✓' },
];

// Canvas particle system for welding sparks
function SparkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let particles = [];
    let raf;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const spawnCluster = () => {
      const x = Math.random() * w * 0.6 + w * 0.1;
      const y = Math.random() * h * 0.5 + h * 0.2;
      const count = 4 + Math.floor(Math.random() * 6);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 1.2;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          life: 1,
          decay: 0.008 + Math.random() * 0.012,
          size: 1 + Math.random() * 2,
          color: Math.random() > 0.4 ? '#ff8c00' : '#ffffff',
          tail: [],
        });
      }
    };

    // Spawn clusters over time
    const spawnInterval = setInterval(spawnCluster, 800);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      particles = particles.filter(p => p.life > 0);

      particles.forEach(p => {
        p.tail.unshift({ x: p.x, y: p.y, life: p.life });
        if (p.tail.length > 6) p.tail.pop();

        // Draw tail
        p.tail.forEach((t, i) => {
          const alpha = (p.life * t.life * (1 - i / p.tail.length)) * 0.6;
          ctx.beginPath();
          ctx.arc(t.x, t.y, p.size * (1 - i / p.tail.length) * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        });

        // Draw spark
        ctx.globalAlpha = p.life * 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gravity
        p.life -= p.decay;
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      clearInterval(spawnInterval);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none', zIndex: 2,
        opacity: 0.5,
      }}
    />
  );
}

// Animated scan line
function ScanLine() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2,
      pointerEvents: 'none', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.15), transparent)',
        animation: 'scanLine 6s linear infinite',
      }} />
    </div>
  );
}

// Grid overlay
function GridOverlay() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
      backgroundImage: `
        linear-gradient(rgba(96,165,250,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(96,165,250,0.03) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px',
      maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
    }} />
  );
}

export default function Hero() {
  const [currentBg, setCurrentBg] = useState(0);
  const [processIdx, setProcessIdx] = useState(0);
  const [processVisible, setProcessVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % BG_IMAGES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessVisible(false);
      setTimeout(() => {
        setProcessIdx(prev => (prev + 1) % PROCESSES.length);
        setProcessVisible(true);
      }, 350);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" ref={heroRef} style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: 'var(--dark)',
    }}>

      {/* === PARALLAX BACKGROUND IMAGES === */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: `translateY(${scrollY * 0.35}px) scale(1.05)`,
        willChange: 'transform',
        zIndex: 0,
      }}>
        {BG_IMAGES.map((img, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === currentBg ? 0.45 : 0,
            transition: 'opacity 2.5s ease-in-out',
            animation: i === currentBg ? 'kenBurns 14s ease-out forwards' : 'none',
          }} />
        ))}
      </div>

      {/* Layered dark gradient — stronger */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `
          linear-gradient(180deg, rgba(9,9,9,0.3) 0%, rgba(9,9,9,0.0) 30%, rgba(9,9,9,0.7) 100%),
          linear-gradient(100deg, rgba(9,9,9,1) 28%, rgba(9,9,9,0.5) 65%, rgba(9,9,9,0.72) 100%)
        `,
      }} />

      {/* Grid overlay */}
      <GridOverlay />

      {/* Canvas sparks */}
      {mounted && <SparkCanvas />}

      {/* Scan line */}
      <ScanLine />

      {/* Left accent stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '2px', height: '100%', zIndex: 4,
        background: 'linear-gradient(to bottom, transparent 5%, var(--accent) 40%, rgba(96,165,250,0.3) 80%, transparent 100%)',
        opacity: 0.5,
      }} />

      {/* Corner brackets - top left */}
      <div className="hide-on-mobile" style={{ position: 'absolute', top: '80px', left: '44px', zIndex: 4, opacity: 0.3, animation: 'fadeInDown 1s 0.5s ease both' }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M0 14 L0 0 L14 0" stroke="#60a5fa" strokeWidth="1.5"/>
        </svg>
      </div>
      {/* Corner brackets - top right */}
      <div className="hide-on-mobile" style={{ position: 'absolute', top: '80px', right: '44px', zIndex: 4, opacity: 0.2, animation: 'fadeInDown 1s 0.7s ease both' }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M28 14 L28 0 L14 0" stroke="#60a5fa" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Vertical coordinate labels */}
      <div className="hide-on-mobile" style={{
        position: 'absolute', right: '20px', top: '50%', zIndex: 4,
        transform: 'translateY(-50%) rotate(90deg)',
        fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(96,165,250,0.2)',
        fontFamily: 'monospace', textTransform: 'uppercase',
        animation: 'fadeInDown 1s 0.8s ease both',
      }}>
        VATVA · AHMEDABAD · 382445
      </div>

      {/* =========== MAIN CONTENT =========== */}
      <div className="hero-main-grid" style={{
        flex: 1,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 48px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '60px',
        alignItems: 'center',
        paddingTop: '160px',
        paddingBottom: '80px',
        position: 'relative',
        zIndex: 5,
      }}>

        {/* ====== LEFT: TEXT CONTENT ====== */}
        <div style={{ maxWidth: '640px' }}>

          {/* Live badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '28px',
            animation: 'fadeInUp 0.6s ease both',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '100px',
            padding: '5px 14px 5px 10px',
          }}>
            <span style={{
              width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80',
              boxShadow: '0 0 0 3px rgba(74,222,128,0.15), 0 0 8px #4ade80',
              animation: 'pulse-dot 2s infinite',
            }} />
            <span style={{ fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
              Workshop Active · Vatva, Ahmedabad
            </span>
          </div>

          {/* Main headline — each word animates separately */}
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            lineHeight: 0.9,
            letterSpacing: '0.02em',
            marginBottom: '0px',
          }}>
            <span style={{
              display: 'block',
              fontSize: 'clamp(3rem, 7vw, 6.2rem)',
              color: 'rgba(255,255,255,0.93)',
              animation: 'slideInLeft 0.9s 0.1s cubic-bezier(0.16,1,0.3,1) both',
              opacity: 0,
            }}>PRECISION</span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(3rem, 7vw, 6.2rem)',
              color: 'var(--accent)',
              animation: 'slideInLeft 0.9s 0.22s cubic-bezier(0.16,1,0.3,1) both',
              opacity: 0,
              WebkitTextStroke: '1px rgba(96,165,250,0.3)',
            }}>METAL</span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(3rem, 7vw, 6.2rem)',
              color: 'rgba(255,255,255,0.93)',
              animation: 'slideInLeft 0.9s 0.34s cubic-bezier(0.16,1,0.3,1) both',
              opacity: 0,
            }}>FABRICATION</span>
          </h1>

          {/* Live process word */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            marginBottom: '28px', marginTop: '20px',
            animation: 'fadeInUp 0.7s 0.5s ease both',
            opacity: 0, animationFillMode: 'forwards',
          }}>
            <div style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Workshop</span>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1.3rem', color: 'var(--accent)',
              letterSpacing: '0.14em',
              opacity: processVisible ? 1 : 0,
              transform: processVisible ? 'translateY(0) scaleY(1)' : 'translateY(10px) scaleY(0.8)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              display: 'inline-block',
            }}>
              {PROCESSES[processIdx]}
            </span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(96,165,250,0.2), transparent)', maxWidth: '80px' }} />
          </div>

          <p style={{
            fontSize: '0.92rem',
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.9,
            maxWidth: '480px',
            marginBottom: '36px',
            fontWeight: 300,
            animation: 'fadeInUp 0.7s 0.55s ease both',
            opacity: 0, animationFillMode: 'forwards',
          }}>
            We make Steel Chemical Storage Tanks, MS Tanks, Industrial Mixers, Ribbon Blenders, Screw Conveyors, Duplex Filters, ETP Plant components and Vehicle Body Works. All work is done in our Vatva workshop in Ahmedabad.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '10px',
            animation: 'fadeInUp 0.7s 0.65s ease both',
            opacity: 0, animationFillMode: 'forwards',
            marginBottom: '48px',
          }}>
            <a href="/products" className="orange-btn">Browse Products</a>
            <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="outline-btn">Get a Quote</a>
            <a href="https://wa.me/919974227781" target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)',
              background: 'rgba(74,222,128,0.04)', padding: '11px 20px',
              borderRadius: '4px', fontSize: '0.82rem', fontWeight: 500,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'border-color 0.25s, background 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.4)'; e.currentTarget.style.background = 'rgba(74,222,128,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.2)'; e.currentTarget.style.background = 'rgba(74,222,128,0.04)'; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: '0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            animation: 'fadeInUp 0.7s 0.75s ease both',
            opacity: 0, animationFillMode: 'forwards',
          }}>
            {[
              { val: '14+', label: 'Products' },
              { val: '10+', label: 'Years' },
              { val: 'B2B', label: '& B2C' },
            ].map((s, i) => (
              <div key={s.val} style={{
                flex: 1, padding: '20px 0',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                paddingLeft: i > 0 ? '24px' : '0',
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '1.8rem', lineHeight: 1,
                  color: 'var(--accent)', letterSpacing: '0.03em',
                }}>{s.val}</div>
                <div style={{
                  fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  marginTop: '5px', fontWeight: 500,
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ====== RIGHT: FABRICATION CAPABILITIES CARD ====== */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '2px',
          animation: 'slideInRight 1s 0.4s cubic-bezier(0.16,1,0.3,1) both',
          opacity: 0,
          minWidth: '210px',
        }} className="hero-capabilities">

          <div style={{
            fontSize: '0.56rem', fontWeight: 600, letterSpacing: '0.24em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)',
            marginBottom: '12px', paddingLeft: '16px',
          }}>Capabilities</div>

          {CAPABILITIES.map((cap) => (
            <div key={cap.label} style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '3px',
              padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: '12px',
              transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(96,165,250,0.06)';
                e.currentTarget.style.borderColor = 'rgba(96,165,250,0.2)';
                e.currentTarget.style.transform = 'translateX(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span style={{ fontSize: '0.88rem', opacity: 0.6 }}>{cap.icon}</span>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.05em' }}>{cap.label}</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)', marginTop: '2px', letterSpacing: '0.04em' }}>{cap.detail}</div>
              </div>
            </div>
          ))}

          {/* Standards block */}
          <div style={{
            background: 'rgba(96,165,250,0.03)',
            border: '1px solid rgba(96,165,250,0.1)',
            borderRadius: '3px',
            padding: '12px 16px',
            marginTop: '4px',
          }}>
            <div style={{ fontSize: '0.56rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px', opacity: 0.8 }}>Standards</div>
            {['IS 2825 / IS 2062', 'ASME Sec. VIII Div 1', 'NDT · RT · Hydro Test'].map(std => (
              <div key={std} style={{
                fontSize: '0.67rem', color: 'rgba(255,255,255,0.32)',
                paddingTop: '3px', fontFamily: 'monospace', letterSpacing: '0.03em',
              }}>{std}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== TICKER ===== */}
      <div className="ticker-wrap" style={{ position: 'relative', zIndex: 5 }}>
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-60px) skewX(-3deg); }
          100% { opacity: 1; transform: translateX(0) skewX(0); }
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes scanLine {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @media (max-width: 900px) {
          .hero-capabilities { display: none !important; }
          .hide-on-mobile { display: none !important; }
        }
        @media (max-width: 600px) {
          .hero-main-grid { 
            grid-template-columns: 1fr !important; 
            padding: 120px 24px 60px !important; 
          }
        }
      `}</style>
    </section>
  );
}
