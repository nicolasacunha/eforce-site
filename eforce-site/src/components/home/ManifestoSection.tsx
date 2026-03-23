import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type React from 'react';

/* ─── Hero number stat ──────────────────────────────────────── */

function HeroNumber({
  value,
  label,
  highlight,
  delay,
  small,
}: {
  value: string;
  label: string;
  highlight?: boolean;
  delay: number;
  small?: boolean;
}) {
  const reveal = useScrollReveal(0.15);

  return (
    <div
      ref={reveal.ref}
      className="flex flex-col items-center"
      style={{
        opacity: reveal.isVisible ? 1 : 0,
        transform: reveal.isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <span
        style={{
          fontSize: small ? 'clamp(2rem, 6vw, 5rem)' : 'clamp(4rem, 10vw, 9rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 0.85,
          color: highlight ? '#ff4a1c' : 'rgba(255,255,255,0.95)',
        }}
      >
        {value}
      </span>
      <span
        className="mt-3"
        style={{
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.25)',
        }}
      >
        {label}
      </span>
    </div>
  );
}

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

        {/* ── Section divider ────────────────────────────────────── */}
        <div
          className="mt-24 mx-auto"
          style={{
            maxWidth: '80%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            height: '1px',
          }}
        />

        {/* ── Hero numbers strip ─────────────────────────────────── */}
        <div
          className="mt-24 grid grid-cols-2 lg:grid-cols-4 justify-items-center"
          style={{ gap: 'clamp(2rem, 8vw, 6rem)' }}
        >
          <HeroNumber value="937" label={t('home.stats.sounds')} highlight delay={0} />
          <HeroNumber value="F50" label="Module" delay={150} />
          <HeroNumber value="3" label={t('home.stats.finishesCount')} delay={300} />
          <HeroNumber value="USB-C" label="Power" delay={450} small />
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
