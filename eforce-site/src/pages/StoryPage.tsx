import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, type Variants } from 'framer-motion';
import SEO from '@/components/layout/SEO';
import { GlowCard } from '@/components/ui/spotlight-card';
import { ModelsCTA } from '@/components/product/ModelsCTA';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const viewport = { once: true, margin: "-80px" };

export default function StoryPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang ?? 'en';

  const timelineItems = t('story.timeline', { returnObjects: true }) as { year: string; text: string }[];

  return (
    <>
      <SEO
        title={t('story.seoTitle')}
        description={t('story.seoDescription')}
        lang={currentLang}
        path="story"
      />

      {/* SECTION — Anatomia da Marca */}
      <section style={{ background: "#0a0a0a", padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "start",
          }} className="max-md:!grid-cols-1">

            {/* Coluna esquerda */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              <motion.img
                variants={fadeIn}
                src="/assets/images/brand/logo-anatomia.webp"
                alt="Logo anatomy grid"
                loading="lazy"
                style={{ width: "100%", display: "block", borderRadius: "4px", marginBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}
              />
              <motion.p
                variants={fadeLeft}
                style={{ fontSize: "clamp(1rem, 1.6vw, 1.5rem)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8500A", margin: "0 0 clamp(1rem, 2vh, 1.5rem) 0", lineHeight: 1 }}
              >
                {t('story.brandAnatomyLabel')}
              </motion.p>
              <div style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.7)", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <motion.p variants={fadeUp} style={{ margin: 0 }}>
                  {t('story.brandAnatomyP1')}
                </motion.p>
                <motion.p variants={fadeUp} style={{ margin: 0 }}>
                  {t('story.brandAnatomyP2')}
                </motion.p>
                <motion.p variants={fadeUp} style={{ margin: 0 }}>
                  {t('story.brandAnatomyP3')}
                </motion.p>
              </div>
            </motion.div>

            {/* Coluna direita — rascunho grande */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              style={{ position: "sticky", top: "6rem" }}
            >
              <img
                src="/assets/images/brand/logo-rascunho.webp"
                alt="E-Force logo sketch"
                loading="lazy"
                style={{ width: "100%", display: "block", borderRadius: "4px" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION — Vídeo da Marca */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        style={{ background: "#0a0a0a", padding: "0 0 clamp(4rem, 8vh, 7rem)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 6vw, 5rem)" }}>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "12px" }}>
            <iframe
              src="https://www.youtube.com/embed/wcPBaeA1k9M"
              title="E-Force — Brand Story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </div>
      </motion.section>

      {/* SECTION — Timeline */}
      <section style={{ background: "#0a0a0a", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative" }}>
          {/* Linha vertical */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewport}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,0.08)", transformOrigin: "top" }}
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            style={{ display: "flex", flexDirection: "column", gap: "clamp(2.5rem, 5vh, 4rem)" }}
          >
            {Array.isArray(timelineItems) && timelineItems.map(({ year, text }) => (
              <motion.div
                key={year}
                variants={fadeLeft}
                style={{ paddingLeft: "clamp(1.5rem, 4vw, 3rem)", position: "relative" }}
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={viewport}
                  transition={{ duration: 0.4, delay: 0.2, ease: "backOut" }}
                  style={{ position: "absolute", left: "-5px", top: "6px", width: "10px", height: "10px", borderRadius: "50%", background: year === "2026" ? "#E8500A" : "rgba(255,255,255,0.25)", border: year === "2026" ? "none" : "1px solid rgba(255,255,255,0.4)" }}
                />
                <span style={{ fontFamily: "monospace", fontSize: "clamp(0.75rem, 0.9vw, 0.85rem)", color: "#E8500A", fontWeight: 600, letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>{year}</span>
                <p style={{ margin: 0, fontSize: "clamp(0.9rem, 1.05vw, 1rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.65)" }}>{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION — Filosofia */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        style={{ background: "#0a0a0a", padding: "0 clamp(1.5rem, 6vw, 5rem) clamp(4rem, 8vh, 7rem)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <GlowCard
            glowColor="orange"
            customSize
            style={{ width: "100%", padding: "clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3.5rem)" }}
          >
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8500A", marginBottom: "1.2rem" }}>
                {t('story.philosophyLabel')}
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 400, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}>
                {t('story.philosophyHeadline')}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "clamp(0.9rem, 1.05vw, 1rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}>
                <p style={{ margin: 0 }}>{t('story.philosophyP1')}</p>
                <p style={{ margin: 0 }}>{t('story.philosophyP2')}</p>
                <p style={{ margin: 0 }}>{t('story.philosophyP3')}</p>
              </div>
            </div>
          </GlowCard>
        </div>
      </motion.section>

      <ModelsCTA />
    </>
  );
}
