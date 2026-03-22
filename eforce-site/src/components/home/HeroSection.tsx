import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { lang } = useParams();
  const { t } = useTranslation();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/video/hero-loop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      <motion.div
        className="relative z-10 text-center text-white px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-300 mb-4">
          Electronic Drums
        </p>
        <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl tracking-[0.15em] mb-6">
          E-FORCE
        </h1>
        <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-lg mx-auto">
          {t("hero.sub")}
        </p>
        <Link
          to={`/${lang}/line`}
          className="inline-flex items-center gap-2 text-brand-orange hover:text-white transition-colors text-sm tracking-wider"
        >
          {t("hero.cta")} →
        </Link>
      </motion.div>
    </section>
  );
}
