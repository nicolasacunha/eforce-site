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

return (
    <>
      <SEO
        title="Technology | E-Force"
        description="Explore the technology behind E-Force electronic drums — the F10 and F50 modules, Bluetooth MIDI, OTG recording, USB-C power, and premium build quality."
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
            Dois módulos poderosos. Uma filosofia: dar ao baterista controle total sobre o seu som.
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
              <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c" }}>FLAGSHIP</span>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 800, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.03em", marginTop: "0.5rem" }}>
                Módulo F50
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", marginTop: "0.5rem" }}>Utilizado na EF5 V2 e EF7</p>
            </div>

            {/* Fotos F50 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}
              className="max-md:!grid-cols-1">
              <GlowCard customSize glowColor="orange" className="w-full overflow-hidden p-0" style={{ minHeight: "260px" }}>
                <img
                  src="/assets/images/modulos/f50-front.webp"
                  alt="Módulo F50 — frente"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                />
              </GlowCard>
              <GlowCard customSize glowColor="orange" className="w-full overflow-hidden p-0" style={{ minHeight: "260px" }}>
                <img
                  src="/assets/images/modulos/f50-side.webp"
                  alt="Módulo F50 — conectores"
                  style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "inherit" }}
                />
              </GlowCard>
            </div>

            {/* Specs F50 */}
            <GlowCard customSize glowColor="orange" className="w-full p-8">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
                {[
                  { label: "Display", value: "Touch 5\"" },
                  { label: "Sons", value: "937" },
                  { label: "Kits de fábrica", value: "50" },
                  { label: "Kits de usuário", value: "50" },
                  { label: "Play-along tracks", value: "15" },
                  { label: "Gravações salvas", value: "10 performances" },
                  { label: "Entradas para pads", value: "10" },
                  { label: "Reverbs", value: "23 tipos" },
                  { label: "Cartão de memória", value: "Sim — samples" },
                  { label: "Saída", value: "Estéreo" },
                  { label: "Bluetooth", value: "MIDI + Áudio" },
                  { label: "USB MIDI", value: "Sim" },
                  { label: "Equalizador", value: "Sim" },
                  { label: "OTG", value: "Gravação direta em celular" },
                ].map((s) => (
                  <div key={s.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "0.75rem" }}>
                    <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginBottom: "0.3rem" }}>{s.label}</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1.5rem" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Disponível em — </span>
                {["EF5 V2", "EF7 Eye Hybrid"].map((m) => (
                  <span key={m} style={{ display: "inline-block", background: "rgba(255,74,28,0.1)", color: "#ff4a1c", fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px", marginRight: "0.5rem", letterSpacing: "0.1em" }}>{m}</span>
                ))}
              </div>
            </GlowCard>

            {/* Conectividade F50 */}
            <div style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
              <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 700, color: "#fff" }}>Conectividade e expansão.</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {[
                { label: "WIRELESS", title: "Bluetooth MIDI + Áudio", desc: "Transmita trilhas direto para o módulo. Conecte fones sem fio para prática silenciosa. Envie MIDI para o DAW sem cabos.", color: "blue" as const },
                { label: "RECORDING", title: "OTG — Gravação direta", desc: "Conecte o celular via USB OTG e grave na hora. Compatível com qualquer app de gravação em iOS ou Android.", color: "purple" as const },
                { label: "POWER", title: "Alimentação USB-C", desc: "Funciona com qualquer powerbank, laptop ou carregador USB-C. Ideal para shows ao ar livre e ensaio em qualquer lugar.", color: "orange" as const },
                { label: "EXPANSION", title: "10 entradas + Slot SD", desc: "10 entradas independentes para pads e pratos. Slot para cartão SD para importação de samples personalizados.", color: "green" as const },
              ].map((f) => (
                <GlowCard key={f.label} customSize glowColor={f.color} className="w-full p-8 flex flex-col gap-4" style={{ minHeight: "240px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.25em", color: "#ff4a1c" }}>{f.label}</span>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: 0 }}>{f.title}</h3>
                  <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0, flexGrow: 1 }}>{f.desc}</p>
                </GlowCard>
              ))}
            </div>
          </div>

          {/* ── F10 ── */}
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c" }}>ESSENCIAL</span>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 800, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.03em", marginTop: "0.5rem" }}>
                Módulo F10
              </h2>
            </div>

            {/* Fotos F10 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}
              className="max-md:!grid-cols-1">
              <GlowCard customSize glowColor="blue" className="w-full overflow-hidden p-0" style={{ minHeight: "260px" }}>
                <img
                  src="/assets/images/modulos/f10-front.webp"
                  alt="Módulo F10 — frente"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                />
              </GlowCard>
              <GlowCard customSize glowColor="blue" className="w-full overflow-hidden p-0" style={{ minHeight: "260px" }}>
                <img
                  src="/assets/images/modulos/f10-detail.webp"
                  alt="Módulo F10 — detalhe"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                />
              </GlowCard>
              <GlowCard customSize glowColor="blue" className="w-full overflow-hidden p-0" style={{ minHeight: "260px" }}>
                <img
                  src="/assets/images/modulos/f10-main3.webp"
                  alt="Módulo F10 — perspectiva"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", borderRadius: "inherit" }}
                />
              </GlowCard>
            </div>

            {/* Specs F10 */}
            <GlowCard customSize glowColor="blue" className="w-full p-8">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
                {[
                  { label: "Display", value: "LCD 128×64" },
                  { label: "Sons", value: "120" },
                  { label: "Kits de fábrica", value: "15" },
                  { label: "Kits de usuário", value: "5" },
                  { label: "Play-along tracks", value: "33" },
                  { label: "Metrônomo", value: "Sim" },
                  { label: "Gravação", value: "Sim" },
                  { label: "Reverbs", value: "5 tipos" },
                  { label: "Bluetooth", value: "MIDI + Áudio" },
                  { label: "USB MIDI", value: "Sim" },
                  { label: "OTG", value: "Gravação direta" },
                  { label: "Expansão", value: "Mais um pad ou crash" },
                ].map((s) => (
                  <div key={s.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "0.75rem" }}>
                    <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginBottom: "0.3rem" }}>{s.label}</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1.5rem" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Disponível em — </span>
                {["EF2 V1", "EF2 V2", "EF2 V3", "EF2 V4"].map((m) => (
                  <span key={m} style={{ display: "inline-block", background: "rgba(255,74,28,0.1)", color: "#ff4a1c", fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px", marginRight: "0.5rem", marginBottom: "0.35rem", letterSpacing: "0.1em" }}>{m}</span>
                ))}
              </div>
            </GlowCard>

            {/* Conectividade F10 */}
            <div style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
              <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 700, color: "#fff" }}>Conectividade essencial.</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {[
                { label: "WIRELESS", title: "Bluetooth MIDI + Áudio", desc: "Transmita trilhas direto para o módulo. Conecte fones sem fio para prática silenciosa. Envie MIDI para o DAW sem cabos.", color: "blue" as const },
                { label: "RECORDING", title: "OTG — Gravação direta", desc: "Conecte o celular via USB OTG e grave na hora. O módulo aparece como interface de áudio USB.", color: "purple" as const },
                { label: "POWER", title: "Alimentação USB-C", desc: "Funciona com qualquer powerbank, laptop ou carregador USB-C. Ideal para prática em qualquer lugar.", color: "orange" as const },
                { label: "EXPANSION", title: "Porta de expansão", desc: "Porta extra para adicionar mais um pad de prato ou de tom.", color: "green" as const },
              ].map((f) => (
                <GlowCard key={f.label} customSize glowColor={f.color} className="w-full p-8" style={{ minHeight: "240px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", height: "100%" }}>
                    <div style={{ height: "16px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.25em", color: "#ff4a1c" }}>{f.label}</span>
                    </div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: 0 }}>{f.title}</h3>
                    <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0, flexGrow: 1 }}>{f.desc}</p>
                  </div>
                </GlowCard>
              ))}
            </div>

            {/* Vídeo F10 */}
            <div style={{ marginTop: "2rem", borderRadius: "16px", overflow: "hidden", aspectRatio: "16/9" }}>
              <iframe
                src="https://www.youtube.com/embed/80_h8FwbYz8"
                title="Módulo F10 — E-Force"
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

      {/* SECTION 4 — Craftsmanship (retângulo horizontal largo) */}
      <section style={{ background: "#0a0a0a", padding: "clamp(4rem, 8vh, 7rem) 0" }}>
        <div className="mx-auto max-w-7xl px-6">
          <GlowCard customSize glowColor="orange" className="w-full p-12 md:p-16">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 6vw, 6rem)", alignItems: "center" }}
              className="max-md:!grid-cols-1">
              <div>
                <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c" }}>CRAFTSMANSHIP</span>
                <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", fontWeight: 800, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.03em", marginTop: "0.75rem", marginBottom: "1.5rem" }}>
                  Construído para durar.
                </h2>
                <p style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>
                  Cada kit E-Force é fabricado com a mesma atenção ao detalhe que define os instrumentos acústicos Odery. Racks reforçados, ferragens de nível profissional e peles mesh desenvolvidas para suportar milhares de horas de uso.
                </p>
                <p style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginTop: "1rem" }}>
                  Não é apenas tecnologia. Não é apenas estética. É a compreensão genuína de o que faz um baterista se sentir conectado ao seu instrumento.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                {[
                  { value: "35+", label: "Anos produzindo baterias." },
                  { value: "7+", label: "Modelos disponíveis." },
                ].map((s) => (
                  <div key={s.label} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem" }}>
                    <div style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>{s.value}</div>
                    <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginTop: "0.4rem" }}>{s.label}</div>
                  </div>
                ))}
                <div style={{ gridColumn: "1 / -1", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem" }}>
                  <div style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>4+</div>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginTop: "0.4rem" }}>Países envolvidos no desenvolvimento.</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", marginTop: "0.3rem" }}>Brasil, China, Canadá e Estados Unidos</div>
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
