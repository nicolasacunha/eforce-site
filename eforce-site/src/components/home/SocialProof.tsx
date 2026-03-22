import { useParams } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const pressLogos = [
  'DRUMEO',
  'MODERN DRUMMER',
  'MUSIC RADAR',
  'SWEETWATER',
  'THOMANN',
] as const;

export default function SocialProof() {
  const { lang: _lang } = useParams<{ lang: string }>();
  void _lang;
  const { ref: quoteRef, isVisible: quoteVisible } = useScrollReveal(0.15);
  const { ref: logosRef, isVisible: logosVisible } = useScrollReveal(0.05);

  return (
    <section
      style={{
        backgroundColor: '#f5f3ef',
        padding: 'clamp(6rem, 15vh, 12rem) 0',
      }}
    >
      <div
        className="mx-auto text-center"
        style={{
          maxWidth: '56rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        {/* Editorial quote */}
        <div
          ref={quoteRef}
          style={{
            opacity: quoteVisible ? 1 : 0,
            transform: quoteVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <blockquote>
            <p
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#0a0a0a',
                lineHeight: 1.5,
              }}
            >
              &ldquo;The feel. The look. The sound. In a class of its own.&rdquo;
            </p>
          </blockquote>

          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#0a0a0a',
              marginTop: '2rem',
            }}
          >
            Carlos Mendes
          </p>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(0,0,0,0.35)',
              marginTop: '0.25rem',
            }}
          >
            Session Drummer&ensp;&mdash;&ensp;S&atilde;o Paulo
          </p>
        </div>

        {/* Press logos */}
        <div
          ref={logosRef}
          className="flex justify-center items-center flex-wrap"
          style={{
            marginTop: '5rem',
            gap: 'clamp(1.5rem, 4vw, 4rem)',
            opacity: logosVisible ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '0.6s',
          }}
        >
          {pressLogos.map((name) => (
            <span
              key={name}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(0,0,0,0.12)',
                cursor: 'default',
                userSelect: 'none',
                transition: 'color 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLSpanElement).style.color = 'rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLSpanElement).style.color = 'rgba(0,0,0,0.12)';
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
