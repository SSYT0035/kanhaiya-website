'use client';
import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const revealElements = () => {
      const elements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-clip, .reveal-blur'
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const delay = el.dataset.delay || '0';
              setTimeout(() => {
                el.classList.add('visible');
              }, parseInt(delay));
              observer.unobserve(el);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      elements.forEach((el) => observer.observe(el));
      return observer;
    };

    // Run immediately after paint
    let observer = revealElements();

    // Also handle dynamically added elements
    const mutation = new MutationObserver(() => {
      observer.disconnect();
      observer = revealElements();
    });

    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);
}
