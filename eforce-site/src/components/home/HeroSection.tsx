import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

export default function HeroSection() {
  const { t } = useTranslation();
  const { lang } = useParams();

  return (
    <ScrollExpandMedia
      mediaSrc="/assets/images/kits/ef5v2/ef5v2-dramatic.jpg"
      videoSrc="/assets/video/hero-loop.mp4"
      title={t("hero.headline")}
      scrollToExpand={t("hero.scrollToExplore") || "Scroll to explore"}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-body text-neutral-500" style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", fontWeight: 300, lineHeight: 1.6 }}>
          {t("hero.sub")}
        </p>
        <Link
          to={`/${lang}/line`}
          className="mt-8 inline-flex items-center gap-2 text-brand-orange hover:text-white transition-colors text-sm tracking-wider"
        >
          {t("hero.cta")} →
        </Link>
      </div>
    </ScrollExpandMedia>
  );
}
