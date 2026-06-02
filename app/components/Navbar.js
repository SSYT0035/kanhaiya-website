'use client';
import { useState, useEffect } from 'react';
import { getGroupedProducts } from '../lib/products';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileDropdown, setMobileDropdown] = useState(false);
  
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  const groupedProducts = getGroupedProducts();

  useEffect(() => {
    if (!isHome) {
      setActiveSection(''); // Reset if not on home
      return;
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ['home', 'about', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) setActiveSection(id);
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Trigger once on mount
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products', hasDropdown: true },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id) => {
    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled || !isHome ? 'rgba(12,12,12,0.95)' : 'transparent',
        backdropFilter: scrolled || !isHome ? 'blur(20px)' : 'none',
        borderBottom: scrolled || !isHome ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        padding: scrolled || !isHome ? '14px 0' : '22px 0',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href={isHome ? "#home" : "/"} onClick={() => scrollTo('home')} style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.7rem',
                letterSpacing: '0.06em', color: 'var(--accent)',
              }}>KANHAIYA</span>
              <span style={{
                fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)', fontWeight: 600,
              }}>ENGINEERING WORKS</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="desktop-nav">
            {navLinks.map(link => {
              const href = isHome ? `#${link.id}` : (link.id === 'home' ? '/' : `/#${link.id}`);
              
              if (link.hasDropdown) {
                return (
                  <div key={link.id} className="dropdown-container" style={{ padding: '10px 0' }}>
                    <Link href="/products"
                      style={{
                        color: activeSection === link.id || pathname.startsWith('/products') ? 'var(--accent)' : 'rgba(255,255,255,0.45)',
                        fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.14em',
                        textTransform: 'uppercase', textDecoration: 'none',
                        transition: 'color 0.3s', position: 'relative', display: 'flex', alignItems: 'center', gap: '4px'
                      }}
                    >
                      {link.label}
                      <span style={{ fontSize: '0.6rem' }}>▼</span>
                    </Link>
                    
                    {/* The Mega Menu Dropdown */}
                    <div className="dropdown-menu">
                      {Object.entries(groupedProducts).map(([category, prods]) => (
                        <div key={category} className="dropdown-col">
                          <h4>{category}</h4>
                          {prods.map(p => (
                            <Link key={p.slug} href={`/products/${p.slug}`}>
                              {p.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link key={link.id} href={href}
                  onClick={(e) => { 
                    if (isHome) {
                      e.preventDefault(); 
                      scrollTo(link.id); 
                    }
                  }}
                  style={{
                    color: activeSection === link.id ? 'var(--accent)' : 'rgba(255,255,255,0.45)',
                    fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.14em',
                    textTransform: 'uppercase', textDecoration: 'none',
                    transition: 'color 0.3s', position: 'relative', paddingBottom: '4px',
                  }}
                >
                  {link.label}
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0,
                    width: activeSection === link.id ? '100%' : '0',
                    height: '1px', background: 'var(--accent)', transition: 'width 0.3s',
                  }} />
                </Link>
              );
            })}
            <a href="https://wa.me/919974227781" target="_blank" rel="noreferrer"
              className="orange-btn" style={{ padding: '9px 18px', fontSize: '0.72rem' }}>
              Get Quote
            </a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger-btn" style={{
            display: 'none', background: 'none',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: '5px',
            padding: '8px', color: 'white', flexDirection: 'column', gap: '5px', alignItems: 'center', cursor: 'pointer'
          }}>
            <span style={{ width: '20px', height: '1.5px', background: menuOpen ? 'var(--accent)' : 'white', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 4px)' : 'none' }} />
            <span style={{ width: '20px', height: '1.5px', background: menuOpen ? 'transparent' : 'white', display: 'block', transition: 'all 0.3s' }} />
            <span style={{ width: '20px', height: '1.5px', background: menuOpen ? 'var(--accent)' : 'white', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -4px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(12,12,12,0.98)', backdropFilter: 'blur(20px)',
        zIndex: 999, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '30px',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'all' : 'none',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        overflowY: 'auto',
        padding: '80px 20px 40px'
      }}>
        {navLinks.map((link, i) => {
          const href = isHome ? `#${link.id}` : (link.id === 'home' ? '/' : `/#${link.id}`);
          
          if (link.hasDropdown) {
            return (
              <div key={link.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div 
                  onClick={() => setMobileDropdown(!mobileDropdown)}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: '3rem',
                    letterSpacing: '0.08em', color: mobileDropdown ? 'var(--accent)' : 'white', 
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                    transition: `color 0.3s, transform 0.3s ${i * 0.07}s`,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
                  }}
                >
                  {link.label}
                  <span style={{ fontSize: '1rem', transform: mobileDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>▼</span>
                </div>
                
                {/* Mobile Dropdown items */}
                <div style={{ 
                  display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center',
                  maxHeight: mobileDropdown ? '1000px' : '0', overflow: 'hidden', 
                  transition: 'max-height 0.5s ease', opacity: mobileDropdown ? 1 : 0
                }}>
                  {Object.entries(groupedProducts).map(([category, prods]) => (
                    <div key={category} style={{ textAlign: 'center', marginTop: '16px' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>{category}</div>
                      {prods.map(p => (
                        <Link key={p.slug} href={`/products/${p.slug}`} onClick={() => setMenuOpen(false)}
                          style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '1rem', textDecoration: 'none', padding: '6px 0' }}
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                  
                  <Link href="/products" onClick={() => setMenuOpen(false)} style={{ color: 'white', marginTop: '12px', borderBottom: '1px solid white' }}>
                    View All Products
                  </Link>
                </div>
              </div>
            );
          }

          return (
            <Link key={link.id} href={href}
              onClick={(e) => { 
                if (isHome) {
                  e.preventDefault(); 
                  scrollTo(link.id); 
                } else {
                  setMenuOpen(false);
                }
              }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '3rem',
                letterSpacing: '0.08em', color: 'white', textDecoration: 'none',
                transition: `color 0.3s, transform 0.3s ${i * 0.07}s`,
                transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
              }}
            >{link.label}</Link>
          );
        })}
        
        <a href="https://wa.me/919974227781" target="_blank" rel="noreferrer" className="orange-btn" style={{ marginTop: '20px' }}>
          WhatsApp Us
        </a>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
