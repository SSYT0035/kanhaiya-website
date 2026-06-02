'use client';
import { useEffect, useRef } from 'react';
import { products } from '../lib/products';
import Link from 'next/link';

function ProductCard({ product, index }) {
  return (
    <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
      <div
        className={`reveal-scale d-${(index % 7) + 1}`}
        style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '28px 0 24px',
          transition: 'border-color 0.25s, transform 0.25s',
          cursor: 'pointer',
          height: '100%',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(96,165,250,0.35)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div style={{ fontSize: '1.6rem', marginBottom: '12px' }}>{product.icon}</div>
        <h3 style={{
          fontSize: '0.88rem', fontWeight: 700, letterSpacing: '0.05em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)',
          marginBottom: '8px', lineHeight: 1.4,
        }}>
          {product.name}
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.28)', lineHeight: 1.7, marginBottom: '12px' }}>
          {product.shortDesc}
        </p>
        <div style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          View Specs →
        </div>
      </div>
    </Link>
  );
}

export default function Products() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" ref={sectionRef} style={{ padding: '100px 0', background: 'var(--dark)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <div className="section-label reveal">What We Make</div>
          <h2 className="section-title reveal">OUR <span className="orange-text">PRODUCTS</span></h2>
          <div className="divider reveal" />
          <p className="reveal" style={{ color: 'rgba(255,255,255,0.3)', maxWidth: '460px', lineHeight: 1.8, fontSize: '0.9rem' }}>
            Industrial grade, heavy-duty fabrication tailored to your exact specifications. Click any product to see full specifications.
          </p>
        </div>

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px 32px' }}>
          {products.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="reveal" style={{
          marginTop: '60px', paddingTop: '48px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px',
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>View Full Catalog</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>Browse all products with detailed specifications and features.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/products" className="orange-btn">All Products</Link>
            <a href="https://wa.me/919974227781" target="_blank" rel="noreferrer" className="outline-btn">WhatsApp Inquiry</a>
          </div>
        </div>
      </div>
    </section>
  );
}
