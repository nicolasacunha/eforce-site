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

      {/* Tech & Dealer CTA */}
      <section style={{ background: "#0a0a0a", padding: "clamp(6rem, 15vh, 12rem) clamp(1.5rem, 6vw, 6rem)" }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(1rem, 3vw, 2rem)" }}>
          <Link
            to={`/${lang}/technology`}
            className="group block"
            style={{
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "clamp(2rem, 4vw, 3rem)",
              transition: "border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,74,28,0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          >
            <h3
              style={{
                fontSize: "clamp(1rem, 2vw, 1.3rem)",
                lineHeight: 1.6,
                fontWeight: 300,
                color: "rgba(255,255,255,0.95)",
              }}
            >
              {t("nav.technology")}
            </h3>
            <p
              className="group-hover:text-[#ff4a1c]"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.25)",
                marginTop: "0.75rem",
                transition: "color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {t("tech.subtitle") || "Módulos F10 & F50"} →
            </p>
          </Link>
          <Link
            to={`/${lang}/dealers`}
            className="group block"
            style={{
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "clamp(2rem, 4vw, 3rem)",
              transition: "border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,74,28,0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          >
            <h3
              style={{
                fontSize: "clamp(1rem, 2vw, 1.3rem)",
                lineHeight: 1.6,
                fontWeight: 300,
                color: "rgba(255,255,255,0.95)",
              }}
            >
              {t("nav.dealers")}
            </h3>
            <p
              className="group-hover:text-[#ff4a1c]"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.25)",
                marginTop: "0.75rem",
                transition: "color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {t("dealers.subtitle") || "Encontrar o dealer mais próximo"} →
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
