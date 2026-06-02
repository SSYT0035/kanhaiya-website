'use client';
import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      height: '2px',
      width: `${progress}%`,
      background: 'linear-gradient(90deg, var(--accent-dark), var(--accent))',
      zIndex: 10000,
      transition: 'width 0.05s linear',
      pointerEvents: 'none',
    }} />
  );
}
