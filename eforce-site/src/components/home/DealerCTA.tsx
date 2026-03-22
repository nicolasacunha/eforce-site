import type { FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function DealerCTA() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const { ref, isVisible } = useScrollReveal(0.1);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section
      style={{
        backgroundColor: '#0a0a0a',
        padding: 'clamp(6rem, 15vh, 12rem) 0',
      }}
    >
      <div
        ref={ref}
        className="mx-auto text-center"
        style={{
          maxWidth: '42rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Stacked headline */}
        <h2
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 4rem)',
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
          }}
        >
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.5)' }}>
            {t('home.experience')}
          </span>
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.95)' }}>
            E-Force
          </span>
        </h2>

        {/* CTA */}
        <Link
          to={`/${lang ?? 'en'}/dealers`}
          className="group inline-flex items-center"
          style={{
            marginTop: '2.5rem',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#ff4a1c',
            textDecoration: 'none',
          }}
        >
          <span>{t('cta.dealer')}</span>
          <span
            className="inline-block transition-transform duration-500 group-hover:translate-x-2"
            style={{ marginLeft: '0.5rem' }}
          >
            &rarr;
          </span>
        </Link>

        {/* Section divider */}
        <div
          className="section-divider mx-auto"
          style={{ marginTop: '5rem', width: '4rem' }}
        />

        {/* Newsletter — minimal */}
        <p
          style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.25)',
            marginTop: '2.5rem',
          }}
        >
          {t('home.stayInformed')}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex items-end mx-auto"
          style={{
            gap: '1rem',
            maxWidth: '24rem',
            marginTop: '1rem',
          }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            style={{
              flex: 1,
              background: 'transparent',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              fontSize: 'clamp(0.8rem, 1vw, 0.875rem)',
              padding: '0.5rem 0',
              outline: 'none',
              transition: 'border-color 0.4s',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderBottomColor = '#ff4a1c';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)';
            }}
          />
          <button
            type="submit"
            className="group inline-flex items-center shrink-0"
            style={{
              background: 'none',
              border: 'none',
              color: '#ff4a1c',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              transition: 'color 0.5s',
            }}
          >
            <span>{t('home.subscribe')}</span>
            <span
              className="inline-block transition-transform duration-500 group-hover:translate-x-1"
              style={{ marginLeft: '0.25rem' }}
            >
              &rarr;
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}
