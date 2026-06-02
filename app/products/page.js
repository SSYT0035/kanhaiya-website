'use client';
import { getGroupedProducts } from '../lib/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProductsIndex() {
  const groupedProducts = getGroupedProducts();

  return (
    <>
      <Navbar />
      
      <main style={{ minHeight: '100vh', background: 'var(--dark)' }}>
        {/* Header */}
        <section style={{ 
          padding: '160px 48px 60px', 
          background: 'var(--dark-2)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
            <div className="section-label">Our Catalog</div>
            <h1 className="section-title">ALL <span className="orange-text">PRODUCTS</span></h1>
            <div className="divider" style={{ margin: '16px auto 36px' }} />
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
              All products we make in our Vatva workshop. Click any item to see full details, materials and specifications.
            </p>
          </div>
        </section>

        {/* Product Grid by Category */}
        <section style={{ padding: '80px 48px', maxWidth: '1280px', margin: '0 auto' }}>
          {Object.entries(groupedProducts).map(([category, prods]) => (
            <div key={category} style={{ marginBottom: '80px' }}>
              <h2 style={{ 
                fontSize: '1.8rem', fontWeight: 700, color: 'white', 
                marginBottom: '32px', paddingBottom: '12px',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}>
                {category}
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                {prods.map(product => (
                  <a href={`/products/${product.slug}`} key={product.slug} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'var(--dark-3)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                      padding: '32px 24px',
                      height: '100%',
                      transition: 'transform 0.3s, border-color 0.3s',
                      cursor: 'pointer',
                    }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.borderColor = 'rgba(96,165,250,0.35)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{product.icon}</div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '12px', lineHeight: 1.3 }}>{product.name}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: '20px' }}>{product.tagline}</p>
                      
                      <div style={{ 
                        fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', 
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        display: 'flex', alignItems: 'center', gap: '8px'
                      }}>
                        View Details <span>→</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      
      <Footer />
    </>
  );
}
