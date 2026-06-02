import { getProductBySlug, products } from '../../lib/products';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.name} | Kanhaiya Engineering Works`,
    description: product.longDesc.substring(0, 160) + '...',
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      
      <main style={{ minHeight: '100vh', background: 'var(--dark)' }}>
        {/* Product Hero */}
        <section style={{ 
          position: 'relative', 
          padding: '160px 48px 80px', 
          background: 'var(--dark-2)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden'
        }}>
          {/* Subtle background element */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(ellipse at 80% 20%, rgba(96,165,250,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          
          <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '24px'
            }}>
              <span style={{ opacity: 0.6 }}>Products</span>
              <span style={{ opacity: 0.3 }}>/</span>
              <span>{product.category}</span>
            </div>
            
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: 'white',
              marginBottom: '16px'
            }}>
              {product.name.split(' ').map((word, i, arr) => (
                i === arr.length - 1 ? <span key={i} className="orange-text">{word}</span> : <span key={i}>{word} </span>
              ))}
            </h1>
            
            <p style={{
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.8,
              maxWidth: '700px',
              marginBottom: '40px'
            }}>
              {product.longDesc}
            </p>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href={`https://wa.me/919974227781?text=Hi, I am interested in ${encodeURIComponent(product.name)}`} target="_blank" rel="noreferrer" className="orange-btn">
                Get a Quote
              </a>
              <a href="tel:+919879995358" className="outline-btn">
                Call Now
              </a>
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 48px', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '60px', alignItems: 'start' }}>
            
            {/* Left Col - Details */}
            <div>
              {/* Specs */}
              <div style={{ marginBottom: '60px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '24px' }}>Technical Specifications</h3>
                <div style={{ background: 'var(--dark-3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                  {product.specs.map((spec, i) => (
                    <div key={i} style={{ 
                      display: 'flex', 
                      padding: '16px 20px', 
                      borderBottom: i < product.specs.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)'
                    }}>
                      <div style={{ width: '40%', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{spec.label}</div>
                      <div style={{ width: '60%', fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Grid */}
              <div style={{ marginBottom: '60px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '24px' }}>Key Features</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                  {product.features.map((feature, i) => (
                    <div key={i} style={{ 
                      background: 'var(--dark-3)', padding: '24px', borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '16px', alignItems: 'flex-start'
                    }}>
                      <div style={{ color: 'var(--accent)', marginTop: '2px' }}>✓</div>
                      <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{feature}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col - Applications & Industries */}
            <div>
              <div style={{ position: 'sticky', top: '120px' }}>
                <div style={{ background: 'var(--dark-3)', padding: '32px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '20px' }}>Ideal Applications</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {product.applications.map((app, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)' }} />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: 'var(--dark-3)', padding: '32px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '20px' }}>Industries Served</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {product.industries.map((ind, i) => (
                      <span key={i} style={{ 
                        fontSize: '0.75rem', padding: '6px 12px', borderRadius: '4px',
                        background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)',
                        border: '1px solid rgba(255,255,255,0.08)'
                      }}>
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
