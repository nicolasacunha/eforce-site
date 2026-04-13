import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/layout/SEO';

export default function NewsPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang ?? 'en';

  return (
    <>
      <SEO
        title={`${t('nav.news')} | E-Force`}
        description="Latest news, product launches, and updates from E-Force Electronic Drums."
        lang={currentLang}
        path="news"
      />

      <section className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c" }}>
            {t('nav.news').toUpperCase()}
          </span>
          <h1 className="mt-4 font-display font-bold text-white" style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)", lineHeight: 0.92, letterSpacing: "-0.04em" }}>
            Em breve.
          </h1>
          <p className="mt-6 font-body" style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>
            Novidades chegando em breve.
          </p>
        </div>
      </section>
    </>
  );
}
