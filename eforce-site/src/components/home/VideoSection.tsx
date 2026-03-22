import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function VideoSection() {
  const { lang: _lang } = useParams<{ lang: string }>();
  void _lang;
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section
      style={{
        backgroundColor: '#f7f7f7',
        padding: 0,
      }}
    >
      <div
        className="relative w-full overflow-hidden aspect-video xl:aspect-[21/9]"
        style={{ backgroundColor: '#f7f7f7' }}
      >
        {/* Center content */}
        <div
          ref={ref}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.85)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <button
            type="button"
            className="group flex items-center justify-center"
            style={{
              width: '5rem',
              height: '5rem',
              borderRadius: '9999px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.4)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Play video"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              style={{ width: '1.25rem', height: '1.25rem', color: '#0a0a0a', marginLeft: '2px' }}
              aria-hidden="true"
            >
              <path d="M6 4l10 6-10 6V4z" fill="currentColor" />
            </svg>
          </button>

          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: 'rgba(0,0,0,0.25)',
              marginTop: '1.5rem',
              userSelect: 'none',
            }}
          >
            {t('home.watchFilm')}
          </span>
        </div>
      </div>
    </section>
  );
}
