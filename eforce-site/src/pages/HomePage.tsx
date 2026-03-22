import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import SEO from "@/components/layout/SEO";
import HeroSection from "@/components/home/HeroSection";
import ProductShowcase from "@/components/home/ProductShowcase";
import ManifestoSection from "@/components/home/ManifestoSection";

export default function HomePage() {
  const { t } = useTranslation();
  const { lang } = useParams();

  return (
    <>
      <SEO title={t("seo.homeTitle")} description={t("seo.homeDescription")} lang={lang ?? "en"} path="" />
      <HeroSection />
      <ProductShowcase />
      <ManifestoSection />

      {/* Tech CTA */}
      <section className="bg-brand-black py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to={`/${lang}/technology`}
            className="bg-neutral-900 rounded-lg p-8 border border-neutral-800 hover:border-neutral-600 transition-colors group"
          >
            <h3 className="text-white text-xl font-semibold mb-2">{t("nav.technology")}</h3>
            <p className="text-neutral-500 text-sm group-hover:text-neutral-400 transition-colors">
              {t("tech.subtitle") || "Módulos F10 & F50"} →
            </p>
          </Link>
          <Link
            to={`/${lang}/dealers`}
            className="bg-neutral-900 rounded-lg p-8 border border-neutral-800 hover:border-neutral-600 transition-colors group"
          >
            <h3 className="text-white text-xl font-semibold mb-2">{t("nav.dealers")}</h3>
            <p className="text-neutral-500 text-sm group-hover:text-neutral-400 transition-colors">
              {t("dealers.subtitle") || "Encontrar o dealer mais próximo"} →
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
