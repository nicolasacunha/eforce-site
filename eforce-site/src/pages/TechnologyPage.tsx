import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '@/components/layout/SEO';
import { GlowCard } from '@/components/ui/spotlight-card';
import { ModelsCTA } from '@/components/product/ModelsCTA';

export default function TechnologyPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang ?? 'en';

  const f50Specs = [
    { label: t('tech_page.f50.specs.display'), value: 'Touch 5"' },
    { label: t('tech_page.f50.specs.sounds'), value: '937' },
    { label: t('tech_page.f50.specs.factoryKits'), value: '50' },
    { label: t('tech_page.f50.specs.userKits'), value: '50' },
    { label: t('tech_page.f50.specs.playAlongs'), value: '15' },
    { label: t('tech_page.f50.specs.savedRec'), value: '10 performances' },
    { label: t('tech_page.f50.specs.padInputs'), value: '10' },
    { label: t('tech_page.f50.specs.reverbs'), value: t('tech_page.f50.specValues.reverbs') },
    { label: t('tech_page.f50.specs.memCard'), value: t('tech_page.f50.specValues.memCard') },
    { label: t('tech_page.f50.specs.output'), value: t('tech_page.f50.specValues.output') },
    { label: t('tech_page.f50.specs.bluetooth'), value: t('tech_page.f50.specValues.bluetooth') },
    { label: t('tech_page.f50.specs.usbMidi'), value: t('tech_page.f50.specValues.usbMidi') },
    { label: t('tech_page.f50.specs.equalizer'), value: t('tech_page.f50.specValues.equalizer') },
    { label: t('tech_page.f50.specs.otg'), value: t('tech_page.f50.specValues.otg') },
  ];

  const f50Conn: { label: string; title: string; desc: string; color: 'blue' | 'purple' | 'orange' | 'green' }[] = [
    { label: "WIRELESS", title: t('tech_page.f50.conn.wireless.title'), desc: t('tech_page.f50.conn.wireless.desc'), color: "blue" },
    { label: "RECORDING", title: t('tech_page.f50.conn.recording.title'), desc: t('tech_page.f50.conn.recording.desc'), color: "purple" },
    { label: "POWER", title: t('tech_page.f50.conn.power.title'), desc: t('tech_page.f50.conn.power.desc'), color: "orange" },
    { label: "EXPANSION", title: t('tech_page.f50.conn.expansion.title'), desc: t('tech_page.f50.conn.expansion.desc'), color: "green" },
  ];

  const f10Specs = [
    { label: t('tech_page.f10.specs.display'), value: 'LCD 128×64' },
    { label: t('tech_page.f10.specs.sounds'), value: '120' },
    { label: t('tech_page.f10.specs.factoryKits'), value: '15' },
    { label: t('tech_page.f10.specs.userKits'), value: '5' },
    { label: t('tech_page.f10.specs.playAlongs'), value: '33' },
    { label: t('tech_page.f10.specs.metronome'), value: t('tech_page.f10.specValues.metronome') },
    { label: t('tech_page.f10.specs.recording'), value: t('tech_page.f10.specValues.recording') },
    { label: t('tech_page.f10.specs.reverbs'), value: t('tech_page.f10.specValues.reverbs') },
    { label: t('tech_page.f10.specs.bluetooth'), value: t('tech_page.f10.specValues.bluetooth') },
    { label: t('tech_page.f10.specs.usbMidi'), value: t('tech_page.f10.specValues.usbMidi') },
    { label: t('tech_page.f10.specs.otg'), value: t('tech_page.f10.specValues.otg') },
    { label: t('tech_page.f10.specs.expansion'), value: t('tech_page.f10.specValues.expansion') },
  ];

  const f10Conn: { label: string; title: string; desc: string; color: 'blue' | 'purple' | 'orange' | 'green' }[] = [
    { label: "WIRELESS", title: t('tech_page.f10.conn.wireless.title'), desc: t('tech_page.f10.conn.wireless.desc'), color: "blue" },
    { label: "RECORDING", title: t('tech_page.f10.conn.recording.title'), desc: t('tech_page.f10.conn.recording.desc'), color: "purple" },
    { label: "POWER", title: t('tech_page.f10.conn.power.title'), desc: t('tech_page.f10.conn.power.desc'), color: "orange" },
    { label: "EXPANSION", title: t('tech_page.f10.conn.expansion.title'), desc: t('tech_page.f10.conn.expansion.desc'), color: "green" },
  ];

  return (
    <>
      <SEO
        title={`${t('nav.technology')} | E-Force`}
        description={t('tech_page.subtitle')}
        lang={currentLang}
        path="technology"
      />

      {/* SECTION 1 — Hero */}
      <section className="bg-[#0a0a0a] pt-24 pb-16 pt-32 md:pt-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c" }}
            className="inline-block"
          >
            {t('tech.label')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 font-display font-bold leading-tight text-white"
            style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)", lineHeight: 0.92, letterSpacing: "-0.04em" }}
          >
            {t('tech.headline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-3xl font-body"
            style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.5)" }}
          >
            {t('tech_page.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      {/* SECTION 2 — Módulos */}
      <section style={{ background: "#0a0a0a", padding: "clamp(4rem, 8vh, 7rem) 0" }}>
        <div className="mx-auto max-w-7xl px-6">

          {/* ── F50 ── */}
          <div style={{ marginBottom: "5rem" }}>
            <div style={{ marginBottom: "2rem" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c" }}>{t('tech_page.flagship')}</span>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 800, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.03em", marginTop: "0.5rem" }}>
                {t('tech_page.f50.title')}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", marginTop: "0.5rem" }}>{t('tech_page.f50.usedIn')}</p>
            </div>

            {/* Fotos F50 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}
              className="max-md:!grid-cols-1">
              <GlowCard customSize glowColor="orange" className="w-full overflow-hidden p-0" style={{ minHeight: "260px" }}>
                <img
                  src="/assets/images/modulos/f50-front.webp"
                  alt="F50 Module — front"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                />
              </GlowCard>
              <GlowCard customSize glowColor="orange" className="w-full overflow-hidden p-0" style={{ minHeight: "260px" }}>
                <img
                  src="/assets/images/modulos/f50-side.webp"
                  alt="F50 Module — connectors"
                  style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "inherit" }}
                />
              </GlowCard>
            </div>

            {/* Specs F50 */}
            <GlowCard customSize glowColor="orange" className="w-full p-8">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
                {f50Specs.map((s) => (
                  <div key={s.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "0.75rem" }}>
                    <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginBottom: "0.3rem" }}>{s.label}</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1.5rem" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{t('tech_page.availableIn')} </span>
                {["EF5 V2", "EF7 Eye Hybrid"].map((m) => (
                  <span key={m} style={{ display: "inline-block", background: "rgba(255,74,28,0.1)", color: "#ff4a1c", fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px", marginRight: "0.5rem", letterSpacing: "0.1em" }}>{m}</span>
                ))}
              </div>
            </GlowCard>

            {/* Vídeo F50 — TODO: substituir VIDEO_ID_F50 pelo link real */}
            <div style={{ margin: "2rem 0" }}>
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "4px" }}>
                <iframe
                  src="https://www.youtube.com/embed/VIDEO_ID_F50"
                  title="F50 Module — E-Force"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
            </div>

            {/* Conectividade F50 */}
            <div style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
              <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 700, color: "#fff" }}>{t('tech_page.f50.connectivityTitle')}</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {f50Conn.map((f) => (
                <GlowCard key={f.label} customSize glowColor={f.color} className="w-full p-8" style={{ minHeight: "240px" }}>
                  <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.25em", color: "#ff4a1c", display: "block", marginBottom: "1rem" }}>{f.label}</span>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: 0, marginBottom: "1rem" }}>{f.title}</h3>
                    <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0, marginTop: "auto" }}>{f.desc}</p>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>

          {/* ── F10 ── */}
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c" }}>{t('tech_page.essential')}</span>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 800, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.03em", marginTop: "0.5rem" }}>
                {t('tech_page.f10.title')}
              </h2>
            </div>

            {/* Fotos F10 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}
              className="max-md:!grid-cols-1">
              <GlowCard customSize glowColor="blue" className="w-full overflow-hidden p-0" style={{ minHeight: "260px" }}>
                <img
                  src="/assets/images/modulos/f10-front.webp"
                  alt="F10 Module — front"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                />
              </GlowCard>
              <GlowCard customSize glowColor="blue" className="w-full overflow-hidden p-0" style={{ minHeight: "260px" }}>
                <img
                  src="/assets/images/modulos/f10-main3.webp"
                  alt="F10 Module — perspective"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", borderRadius: "inherit" }}
                />
              </GlowCard>
              <GlowCard customSize glowColor="blue" className="w-full overflow-hidden p-0 max-md:hidden" style={{ minHeight: "260px" }}>
                <img
                  src="/assets/images/modulos/f10-detail.webp"
                  alt="F10 Module — detail"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", borderRadius: "inherit" }}
                />
              </GlowCard>
            </div>

            {/* Specs F10 */}
            <GlowCard customSize glowColor="blue" className="w-full p-8">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
                {f10Specs.map((s) => (
                  <div key={s.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "0.75rem" }}>
                    <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginBottom: "0.3rem" }}>{s.label}</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1.5rem" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{t('tech_page.availableIn')} </span>
                {["EF2 V1", "EF2 V2", "EF2 V3", "EF2 V4"].map((m) => (
                  <span key={m} style={{ display: "inline-block", background: "rgba(255,74,28,0.1)", color: "#ff4a1c", fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px", marginRight: "0.5rem", marginBottom: "0.35rem", letterSpacing: "0.1em" }}>{m}</span>
                ))}
              </div>
            </GlowCard>

            {/* Conectividade F10 */}
            <div style={{ marginTop: "2rem", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 700, color: "#fff" }}>{t('tech_page.f10.connectivityTitle')}</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {f10Conn.map((f) => (
                <GlowCard key={f.label} customSize glowColor={f.color} className="w-full p-8" style={{ minHeight: "240px" }}>
                  <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.25em", color: "#ff4a1c", display: "block", marginBottom: "1rem" }}>{f.label}</span>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: 0, marginBottom: "1rem" }}>{f.title}</h3>
                    <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0, marginTop: "auto" }}>{f.desc}</p>
                  </div>
                </GlowCard>
              ))}
            </div>

            {/* Vídeo F10 */}
            <div style={{ marginTop: "2rem", borderRadius: "16px", overflow: "hidden", aspectRatio: "16/9" }}>
              <iframe
                src="https://www.youtube.com/embed/80_h8FwbYz8"
                title="F10 Module — E-Force"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      {/* SECTION 4 — Craftsmanship */}
      <section style={{ background: "#0a0a0a", padding: "clamp(4rem, 8vh, 7rem) 0" }}>
        <div className="mx-auto max-w-7xl px-6">
          <GlowCard customSize glowColor="orange" className="w-full p-12 md:p-16">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 6vw, 6rem)", alignItems: "center" }}
              className="max-md:!grid-cols-1">
              <div>
                <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c" }}>{t('tech_page.craftsmanship.label')}</span>
                <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", fontWeight: 800, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.03em", marginTop: "0.75rem", marginBottom: "1.5rem" }}>
                  {t('tech_page.craftsmanship.title')}
                </h2>
                <p style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>
                  {t('tech_page.craftsmanship.p1')}
                </p>
                <p style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginTop: "1rem" }}>
                  {t('tech_page.craftsmanship.p2')}
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                {[
                  { value: "35+", label: t('tech_page.craftsmanship.stat1') },
                  { value: "7+", label: t('tech_page.craftsmanship.stat2') },
                ].map((s) => (
                  <div key={s.label} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem" }}>
                    <div style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>{s.value}</div>
                    <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginTop: "0.4rem" }}>{s.label}</div>
                  </div>
                ))}
                <div style={{ gridColumn: "1 / -1", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem" }}>
                  <div style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>4+</div>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginTop: "0.4rem" }}>{t('tech_page.craftsmanship.stat3')}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", marginTop: "0.3rem" }}>{t('tech_page.craftsmanship.stat3detail')}</div>
                </div>
              </div>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      <ModelsCTA />
    </>
  );
}
