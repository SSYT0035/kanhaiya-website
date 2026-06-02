'use client';
import { useEffect, useRef, useState } from 'react';

// Fabrication-themed cursor — welding crosshair
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const sparkRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const animFrame = useRef(null);
  const sparks = useRef([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    const sparkContainer = sparkRef.current;

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    // Spawn sparks on click
    const onMouseClick = (e) => {
      if (!sparkContainer) return;
      for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.4;
        const speed = 40 + Math.random() * 60;
        spark.style.cssText = `
          position: fixed;
          width: ${2 + Math.random() * 3}px;
          height: ${2 + Math.random() * 3}px;
          background: ${Math.random() > 0.5 ? '#ff9d00' : '#fff'};
          border-radius: 50%;
          pointer-events: none;
          z-index: 99997;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          transform: translate(-50%, -50%);
          opacity: 1;
        `;
        sparkContainer.appendChild(spark);
        let startTime = null;
        const duration = 400 + Math.random() * 300;
        const animate = (ts) => {
          if (!startTime) startTime = ts;
          const progress = (ts - startTime) / duration;
          if (progress >= 1) { spark.remove(); return; }
          const eased = 1 - Math.pow(progress, 2);
          spark.style.left = `${e.clientX + Math.cos(angle) * speed * progress}px`;
          spark.style.top = `${e.clientY + Math.sin(angle) * speed * progress}px`;
          spark.style.opacity = eased;
          requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    };

    const onMouseEnterLink = () => setIsHovering(true);
    const onMouseLeaveLink = () => setIsHovering(false);

    const animate = () => {
      // Trail follows with lag
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.08;
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.08;

      if (cursor) {
        cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (trail) {
        trail.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px)`;
      }
      animFrame.current = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('click', onMouseClick);

    const attachHoverListeners = () => {
      const els = document.querySelectorAll('a, button, [data-cursor]');
      els.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };
    attachHoverListeners();

    const mutationObs = new MutationObserver(attachHoverListeners);
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('click', onMouseClick);
      cancelAnimationFrame(animFrame.current);
      mutationObs.disconnect();
    };
  }, []);

  const size = isHovering ? 48 : 28;
  const dotSize = isClicking ? 8 : isHovering ? 5 : 3;
  const crossSize = isHovering ? 14 : 8;
  const color = isHovering ? '#ff9d00' : '#60a5fa';

  return (
    <>
      {/* Spark container */}
      <div ref={sparkRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99997 }} />

      {/* Lagging outer ring — welding target */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: `${size}px`,
          height: `${size}px`,
          marginLeft: `-${size / 2}px`,
          marginTop: `-${size / 2}px`,
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Outer ring */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0 }}>
          {/* Ring arc segments (welding target look — not a full circle) */}
          <circle
            cx={size / 2} cy={size / 2} r={size / 2 - 1.5}
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeDasharray={isHovering ? `${(size * Math.PI * 0.85).toFixed(1)} ${(size * Math.PI * 0.15).toFixed(1)}` : `${(size * Math.PI * 0.7).toFixed(1)} ${(size * Math.PI * 0.3).toFixed(1)}`}
            strokeDashoffset="0"
            style={{ opacity: 0.7, transition: 'all 0.25s' }}
          />
          {/* Inner ring */}
          <circle
            cx={size / 2} cy={size / 2} r={size / 2 - 5}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            style={{ opacity: 0.25 }}
          />
        </svg>
      </div>

      {/* Main cursor — sharp crosshair */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          marginLeft: '-12px',
          marginTop: '-12px',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          {/* Crosshair lines */}
          <line x1="12" y1={`${12 - crossSize}`} x2="12" y2="9" stroke={color} strokeWidth="1.2" opacity="0.9" />
          <line x1="12" y1="15" x2="12" y2={`${12 + crossSize}`} stroke={color} strokeWidth="1.2" opacity="0.9" />
          <line x1={`${12 - crossSize}`} y1="12" x2="9" y2="12" stroke={color} strokeWidth="1.2" opacity="0.9" />
          <line x1="15" y1="12" x2={`${12 + crossSize}`} y2="12" stroke={color} strokeWidth="1.2" opacity="0.9" />
          {/* Center dot */}
          <circle cx="12" cy="12" r={dotSize} fill={color} opacity={isClicking ? '1' : '0.95'} />
          {/* Corner brackets (industrial look) */}
          {isHovering && (
            <>
              <path d="M4 8 L4 4 L8 4" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
              <path d="M20 8 L20 4 L16 4" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
              <path d="M4 16 L4 20 L8 20" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
              <path d="M20 16 L20 20 L16 20" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
            </>
          )}
        </svg>
      </div>
    </>
  );
}
