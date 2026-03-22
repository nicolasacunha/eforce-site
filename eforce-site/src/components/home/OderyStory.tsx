import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function OderyStory() {
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();

  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#f5f3ef',
        padding: 'clamp(6rem, 15vh, 12rem) 0',
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: '80rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        <div
          className="grid items-center"
          style={{
            gridTemplateColumns: '1fr',
            gap: 'clamp(2rem, 6vw, 6rem)',
          }}
        >
          {/* Image */}
          <div
            ref={imageRef}
            className="overflow-hidden"
            style={{
              aspectRatio: '4 / 5',
              borderRadius: '0.75rem',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <motion.img
              src="/assets/images/kits/ef5v2/ef5v2-aerial.jpg"
              alt="EF5 V2 aerial view"
              style={{
                y: imageY,
                width: '100%',
                height: '110%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Text */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '0.15s',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: '#ff4a1c',
              }}
            >
              {t('odery.label')}
            </span>

            <h2
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: '#0a0a0a',
                marginTop: '1rem',
              }}
            >
              {t('odery.headline')}
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                fontWeight: 400,
                lineHeight: 1.75,
                color: 'rgba(0,0,0,0.5)',
                marginTop: '1.5rem',
                maxWidth: '30rem',
              }}
            >
              {t('odery.p1')}
            </p>

            <Link
              to={`/${lang ?? 'en'}/story`}
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
              {t('home.discoverHeritage')}
              <span
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                style={{ marginLeft: '0.5rem' }}
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive grid override */}
      <style>{`
        @media (min-width: 1024px) {
          section > div > .grid {
            grid-template-columns: 55% 45% !important;
          }
        }
      `}</style>
    </section>
  );
}
