import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/layout/SEO';
import { ModelsCTA } from '@/components/product/ModelsCTA';

interface Country {
  id: string;
  flag: string;
  continent: string;
  url: string;
}

const countries: Country[] = [
  {
    id: 'brazil',
    flag: '🇧🇷',
    continent: 'southAmerica',
    url: 'https://odery.com.br/onde-comprar/',
  },
];

export default function DealersPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang ?? 'pt';

  const uniqueContinents = [...new Set(countries.map((c) => c.continent))];

  return (
    <>
      <SEO
        title={t('dealers.seoTitle')}
        description={t('dealers.seoDescription')}
        lang={currentLang}
        path="dealers"
      />

      {/* Hero */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(7rem, 14vh, 11rem) clamp(1.5rem, 6vw, 5rem) clamp(4rem, 8vh, 6rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#E8500A', marginBottom: '1rem' }}>
            {t('nav.dealers')}
          </p>
          <h1 style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)', fontWeight: 700, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.04em', margin: 0 }}>
            {t('dealers.headline')}
          </h1>
          <p style={{ marginTop: 'clamp(1.5rem, 3vh, 2rem)', fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', maxWidth: '540px' }}>
            {t('dealers.subtitle')}
          </p>
        </div>
      </section>

      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

      {/* Countries by continent */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 6vw, 5rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 6vh, 5rem)' }}>
          {uniqueContinents.map((continentId) => (
            <div key={continentId}>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem' }}>
                {t(`dealers.continent${continentId.charAt(0).toUpperCase() + continentId.slice(1)}`)}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                {countries
                  .filter((c) => c.continent === continentId)
                  .map((country) => (
                    <a
                      key={country.id}
                      href={country.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1.25rem 1.5rem',
                        background: '#111',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        transition: 'border-color 0.2s, background 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = '#E8500A';
                        (e.currentTarget as HTMLAnchorElement).style.background = '#161616';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)';
                        (e.currentTarget as HTMLAnchorElement).style.background = '#111';
                      }}
                    >
                      <span style={{ fontSize: '2rem', lineHeight: 1 }}>{country.flag}</span>
                      <span style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
                        {t(`dealers.country${country.id.charAt(0).toUpperCase() + country.id.slice(1)}`)}
                      </span>
                      <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>↗</span>
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ModelsCTA />
    </>
  );
}
