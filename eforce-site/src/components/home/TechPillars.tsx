import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TechFeature {
  heroNumber: string;
  titleKey: string;
  descKey: string;
  isLast?: boolean;
}

const features: TechFeature[] = [
  {
    heroNumber: '937',
    titleKey: 'tech.f10f50.title',
    descKey: 'tech.f10f50.desc',
  },
  {
    heroNumber: '0ms',
    titleKey: 'tech.bluetooth.title',
    descKey: 'tech.bluetooth.desc',
  },
  {
    heroNumber: '1',
    titleKey: 'tech.otg.title',
    descKey: 'tech.otg.desc',
  },
  {
    heroNumber: '5V',
    titleKey: 'tech.usbc.title',
    descKey: 'tech.usbc.desc',
    isLast: true,
  },
];

function TechFeatureRow({ feature, index }: { feature: TechFeature; index: number }) {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useTranslation();

  return (
    <div
      ref={ref}
      className="flex flex-col items-start md:flex-row"
      style={{
        gap: 'clamp(1.5rem, 4vw, 4rem)',
        paddingTop: 'clamp(2rem, 4vh, 4rem)',
        paddingBottom: 'clamp(2rem, 4vh, 4rem)',
        borderBottom: feature.isLast ? 'none' : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Hero number */}
      <div
        className="shrink-0"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: `${index * 0.15}s`,
        }}
      >
        <span
          style={{
            fontSize: 'clamp(4rem, 10vw, 9rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            color: '#ff4a1c',
          }}
        >
          {feature.heroNumber}
        </span>
      </div>

      {/* Text */}
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: `${index * 0.15 + 0.15}s`,
          paddingTop: '0.5rem',
        }}
      >
        <h3
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.95)',
          }}
        >
          {t(feature.titleKey)}
        </h3>
        <p
          style={{
            fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
            fontWeight: 400,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.5)',
            marginTop: '0.5rem',
          }}
        >
          {t(feature.descKey)}
        </p>
      </div>
    </div>
  );
}

export default function TechPillars() {
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section
      style={{
        backgroundColor: '#0a0a0a',
        padding: 'clamp(6rem, 15vh, 12rem) 0',
      }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="mx-auto text-center"
        style={{
          maxWidth: '48rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
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
          {t('tech.label')}
        </span>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 4rem)',
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: 'rgba(255,255,255,0.95)',
            marginTop: '1rem',
          }}
        >
          {t('tech.headline')}
        </h2>
      </div>

      {/* Features — vertical stack */}
      <div
        className="mx-auto"
        style={{
          maxWidth: '64rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          marginTop: 'clamp(3rem, 6vh, 6rem)',
        }}
      >
        {features.map((feature, i) => (
          <TechFeatureRow key={feature.heroNumber} feature={feature} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div
        className="text-center"
        style={{ marginTop: 'clamp(2rem, 4vh, 4rem)' }}
      >
        <Link
          to={`/${lang ?? 'en'}/technology`}
          className="group inline-flex items-center"
          style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#ff4a1c',
            textDecoration: 'none',
          }}
        >
          {t('tech.cta')}
          <span
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            style={{ marginLeft: '0.5rem' }}
          >
            &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}
