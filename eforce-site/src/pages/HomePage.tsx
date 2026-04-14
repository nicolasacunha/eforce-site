import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import SEO from "@/components/layout/SEO";
import HeroSection from "@/components/home/HeroSection";
import ProductShowcase from "@/components/home/ProductShowcase";
import ManifestoSection from "@/components/home/ManifestoSection";
import { GlowCard } from "@/components/ui/spotlight-card";

export default function HomePage() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <SEO title={t("seo.homeTitle")} description={t("seo.homeDescription")} lang={lang ?? "en"} path="" />
      <HeroSection />
      <ProductShowcase />
      <ManifestoSection />

      {/* Tech & Dealer CTA */}
      <section style={{ background: "#0a0a0a", padding: "clamp(6rem, 15vh, 12rem) clamp(1.5rem, 6vw, 6rem)" }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: "clamp(1rem, 3vw, 2rem)" }}>
          {[
            { route: `/${lang}/technology`, title: t("nav.technology"), sub: t("home.exploreModules") },
            { route: `/${lang}/dealers`,    title: t("nav.dealers"),    sub: t("home.findPartners") },
            { route: `/${lang}/story`,      title: t("nav.story"),      sub: t("home.discoverStory") },
            { route: `/${lang}/support`,    title: t("nav.support"),    sub: t("home.manualsAndCatalogs") },
          ].map(({ route, title, sub }) => (
            <div key={route} className="cursor-pointer h-full" onClick={() => navigate(route)}>
              <GlowCard
                customSize
                glowColor="orange"
                className="w-full h-full"
                style={{ padding: "clamp(2rem, 4vw, 3rem)" }}
              >
                <h3 style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", lineHeight: 1.6, fontWeight: 300, color: "rgba(255,255,255,0.95)" }}>
                  {title}
                </h3>
                <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)", marginTop: "0.75rem" }}>
                  {sub} →
                </p>
              </GlowCard>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
