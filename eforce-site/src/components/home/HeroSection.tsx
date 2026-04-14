import { useTranslation } from "react-i18next";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <ScrollExpandMedia
      mediaSrc="/assets/images/kits/ef5v2/ef5v2-hero-scroll.webp"
      videoSrc="/assets/video/hero-loop.mp4"
      title={t("hero.headline")}
      scrollToExpand={t("hero.scrollToExplore") || "Scroll to explore"}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-body text-neutral-500" style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", fontWeight: 300, lineHeight: 1.6 }}>
          {t("hero.sub")}
        </p>
      </div>
    </ScrollExpandMedia>
  );
}
