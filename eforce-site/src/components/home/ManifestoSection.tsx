import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type React from 'react';

/* ─── Main component ─────────────────────────────────────────── */

export default function ManifestoSection() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const text = t('manifesto.text');
  const tokens = i18n.language === 'zh' ? text.split('') : text.split(' ');

  return (
    <>
      {/* Section divider — top */}
      <div
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          height: '1px',
        }}
      />

      <section
        className="relative overflow-hidden"
        style={{
          background: '#0a0a0a',
          padding: 'clamp(6rem, 15vh, 12rem) clamp(1.5rem, 6vw, 6rem)',
        }}
      >
        {/* ── Manifesto text — word-by-word reveal ───────────────── */}
        <div ref={containerRef} className="max-w-5xl mx-auto text-center">
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              lineHeight: 1.6,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {tokens.map((token, i) => (
              <span
                key={i}
                className={`manifesto-word inline-block ${i18n.language === 'zh' ? '' : 'mr-[0.3em]'} ${revealed ? 'manifesto-word--visible' : ''}`}
                style={{ '--word-index': i } as React.CSSProperties}
              >
                {token}
              </span>
            ))}
          </p>
        </div>

        {/* ── Word reveal styles ──────────────────────────────────── */}
        <style>{`
          .manifesto-word {
            opacity: 0;
            color: rgba(255,255,255,0.1);
            transition:
              opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              color 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            transition-delay: calc(var(--word-index) * 50ms);
          }
          .manifesto-word--visible {
            opacity: 1;
            color: rgba(255,255,255,0.5);
          }
          @media (prefers-reduced-motion: reduce) {
            .manifesto-word {
              opacity: 1 !important;
              color: rgba(255,255,255,0.5) !important;
              transition: none !important;
            }
          }
        `}</style>
      </section>

      {/* Section divider — bottom */}
      <div
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          height: '1px',
        }}
      />
    </>
  );
}
