import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

export default function HeroSection() {
  const { t } = useTranslation();
  const { lang } = useParams();

  return (
    <ScrollExpandMedia
      mediaSrc="/assets/images/kits/ef5v2/ef5v2-dramatic.jpg"
      videoSrc="/assets/video/hero-loop.mp4"
      title={t('hero.headline')}
      scrollToExpand="Scroll to explore"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p
          className="font-body"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'rgba(0,0,0,0.5)',
          }}
        >
          {t('hero.sub')}
        </p>

        <Link
          to={`/${lang}/line`}
          className="group mt-10 inline-flex items-center gap-2"
          style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#ff4a1c',
          }}
        >
          {t('hero.cta1')}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </div>
    </ScrollExpandMedia>
  );
}
