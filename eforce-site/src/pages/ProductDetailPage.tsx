import { useState, useRef, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SEO from "@/components/layout/SEO";
import { getProductBySlug } from "@/data/products";
import type { Product } from "@/data/products";
import { StickyContextBar } from "@/components/product/StickyContextBar";
import { ModelSwitcher } from "@/components/product/ModelSwitcher";

/* ── animation helpers ──────────────────────────────── */
const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

function AnimatedSection({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── animated counter ──────────────────────────────── */
function CountUp({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
}


/* ── highlights fallback data ──────────────────────── */
const defaultHighlights = [
  { title: "Design.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { title: "Tecnologia.", description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { title: "Performance.", description: "Ut enim ad minim veniam, quis nostrud exercitation." },
  { title: "Acabamento.", description: "Duis aute irure dolor in reprehenderit in voluptate velit." },
];

/* ═══════════════════════════════════════════════════════
   SECTION 1 — HERO (Porsche-style warm gray bg)
   ═══════════════════════════════════════════════════════ */
function HeroSection({ product }: { product: Product }) {
  return (
    <section
      style={{
        background: "#ffffff",
        position: "relative",
        overflowX: "hidden",
        overflowY: "visible",
        padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 6rem) 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Background — video + gray top half */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: "35%",
          background: "#e0e0e0",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.75,
          }}
        >
          <source src="/assets/video/hero-loop.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Model name above the product */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease }}
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          overflow: "visible",
          fontSize: "clamp(4rem, 10vw, 9rem)",
          fontWeight: 800,
          fontStyle: "italic",
          color: "rgba(255,255,255,0.9)",
          lineHeight: 1,
          userSelect: "none",
          whiteSpace: "nowrap",
          letterSpacing: "-0.04em",
          marginBottom: "-8rem",
        }}
      >
        {product.name}
      </motion.div>

      {/* Product image */}
      <motion.img
        src={product.heroImage}
        alt={product.name}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.15 }}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "min(108vw, 1560px)",
          width: "100%",
          objectFit: "contain",
          filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.15))",
        }}
      />

    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 2 — KEY SPECS (left specs, right aerial image)
   ═══════════════════════════════════════════════════════ */
function KeySpecsSection({ product }: { product: Product }) {
  const [showTechPanel, setShowTechPanel] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  // Use PNG transparent if available, otherwise aerial/hero
  const hasNobg = product.galleryImages.some(img => img.includes("nobg"));
  const aerialImage = hasNobg
    ? product.galleryImages.find(img => img.includes("nobg"))!
    : product.galleryImages[1] || product.heroImage;
  const specs = product.specsHighlight.slice(0, 3);

  return (
    <section
      style={{
        background: "#fff",
        padding: "clamp(3rem, 6vh, 5rem) clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      <AnimatedSection>
        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "clamp(1rem, 3vw, 2rem)",
            alignItems: "center",
          }}
          className="max-md:!grid-cols-1"
        >
          {/* Left: specs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(2rem, 4vh, 3.5rem)", marginLeft: "auto", paddingRight: "clamp(1rem, 2vw, 2rem)", position: "relative", zIndex: 5 }}>
            {specs.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: "clamp(3rem, 8vw, 6rem)",
                    fontWeight: 300,
                    color: "#0a0a0a",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {/^\d+$/.test(s.value) ? <CountUp value={parseInt(s.value)} /> : s.value}
                  {s.unit && <span style={{ fontSize: "0.4em", marginLeft: "4px" }}>{s.unit}</span>}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "rgba(0,0,0,0.5)",
                    marginTop: "4px",
                    fontWeight: 400,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}

            {/* Button inside specs column */}
            <button
              onClick={() => setShowTechPanel(true)}
              style={{
                display: "inline-block",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: "#0a0a0a",
                background: "none",
                border: "1px solid rgba(0,0,0,0.3)",
                padding: "12px 28px",
                cursor: "pointer",
                borderRadius: "0",
                marginTop: "0.5rem",
              }}
            >
              Todos os detalhes t&eacute;cnicos
            </button>
          </div>

          {/* Right: product image — LARGE */}
          <div style={{ overflow: "visible", marginTop: "-2rem", marginBottom: "-2rem" }}>
            <img
              src={aerialImage}
              alt={`${product.name} view`}
              style={{ width: "200%", maxWidth: "none", objectFit: "contain", marginLeft: "-50%", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))" }}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Technical details panel — Porsche style */}
      <AnimatePresence>
      {showTechPanel && (
        <motion.div
          key="tech-panel-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: "flex",
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowTechPanel(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(12px)",
            }}
          />
          {/* Panel — slides in from right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              marginLeft: "auto",
              width: "min(600px, 90vw)",
              height: "100%",
              background: "#fff",
              overflowY: "auto",
              padding: "clamp(2rem, 4vw, 3rem)",
              boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <div>
                <div style={{ fontSize: "14px", color: "rgba(0,0,0,0.5)" }}>{product.name}</div>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#0a0a0a" }}>Dados t&eacute;cnicos</div>
              </div>
              <button
                onClick={() => setShowTechPanel(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#0a0a0a",
                  padding: "8px",
                }}
              >
                &times;
              </button>
            </div>

            {/* Product image */}
            <div style={{ background: "#f5f5f5", borderRadius: "8px", padding: "2rem", marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
              <img
                src={product.heroImage}
                alt={product.name}
                style={{ maxHeight: "200px", objectFit: "contain" }}
              />
            </div>

            {/* Specs overview card */}
            <div style={{ background: "#f5f5f5", borderRadius: "8px", padding: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                {product.specsHighlight.map((s) => (
                  <div key={s.label}>
                    <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)", marginBottom: "4px" }}>{s.label}</div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#0a0a0a" }}>
                      {s.value} {s.unit || ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accordion sections */}
            {[
              {
                title: "Módulo",
                items: [
                  ["Modelo", product.specsHighlight.find(s => s.label === "Módulo")?.value || "—"],
                  ["Sons", product.specsHighlight.find(s => s.label === "Sons")?.value || "—"],
                  ["Faixas de acompanhamento", product.specsHighlight.find(s => s.label === "Faixas")?.value || "—"],
                  ["Display", "LCD"],
                  ["Conexão USB", "Sim"],
                  ["MIDI", "USB-MIDI"],
                ],
              },
              {
                title: "Pads",
                items: [
                  ["Total de pads", product.specsHighlight.find(s => s.label === "Pads")?.value || "—"],
                  ["Snare", "8\" dual-zone mesh"],
                  ["Toms", "8\" mesh"],
                  ["Kick", "Pedal pad"],
                  ["Hi-hat", "10\" com pedal"],
                  ["Crash", "10\""],
                  ["Ride", "12\""],
                ],
              },
              {
                title: "Conectividade",
                items: [
                  ["Saída de áudio", "P10 estéreo (L/R)"],
                  ["Fone de ouvido", "P10 estéreo"],
                  ["USB", "Tipo B"],
                  ["Aux In", "P2 estéreo"],
                ],
              },
              {
                title: "Estrutura",
                items: [
                  ["Material do rack", "Aço tubular"],
                  ["Peso", "~25 kg"],
                  ["Alimentação", "Fonte DC 9V"],
                ],
              },
            ].map((section) => (
              <div key={section.title} style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === section.title ? null : section.title)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.25rem 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#0a0a0a",
                  }}
                >
                  {section.title}
                  <span style={{ fontSize: "18px", fontWeight: 300 }}>
                    {openAccordion === section.title ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                {openAccordion === section.title && (
                  <motion.div
                    key={section.title + "-content"}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden", paddingBottom: "1.25rem" }}
                  >
                    {section.items.map(([label, value], idx) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.25, delay: idx * 0.04 }}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 0",
                          fontSize: "14px",
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                        }}
                      >
                        <span style={{ color: "rgba(0,0,0,0.6)" }}>{label}</span>
                        <span style={{ fontWeight: 500, color: "#0a0a0a" }}>{value}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 4+5 — EDITORIAL: Porsche Boxster style
   Two photos side-by-side, right photo extends down,
   text on the left below the photos
   ═══════════════════════════════════════════════════════ */
function EditorialSection({ product }: { product: Product }) {
  const rightImage = product.galleryImages[3] || product.galleryImages[1] || product.heroImage;
  const bottomImage = product.galleryImages[5] || product.galleryImages[2] || product.heroImage;
  const headline = product.editorialHeadline || "Projetado para quem vive a m\u00fasica.";
  const body =
    product.editorialBody ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";


  return (
    <section style={{ background: "#fff", position: "relative" }}>
      {/* Large italic model logo */}
      <AnimatedSection>
        <div
          style={{
            textAlign: "center",
            fontSize: "clamp(4rem, 12vw, 10rem)",
            fontWeight: 800,
            fontStyle: "italic",
            color: "#0a0a0a",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            padding: "clamp(2rem, 4vh, 3rem) 0 clamp(1rem, 2vh, 2rem) 0",
          }}
        >
          {product.name}
        </div>
      </AnimatedSection>

      {/* Main photo — taller, narrower, with black bg starting at 50% */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(to bottom, #ffffff 50%, #0a0a0a 50%)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 6vw, 6rem)", overflow: "hidden", borderRadius: "20px" }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "clamp(400px, 50vw, 700px)",
              objectFit: "cover",
              display: "block",
              position: "relative",
              zIndex: 1,
              borderRadius: "12px",
            }}
          >
            <source src="/assets/video/hero-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Bottom row: text left + smaller photo right — black bg */}
      <div style={{ background: "#0a0a0a" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "clamp(3rem, 6vh, 5rem) clamp(1.5rem, 6vw, 6rem) 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "center",
          }}
          className="max-md:!grid-cols-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                fontWeight: 400,
                color: "#ffffff",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                margin: "0 0 clamp(1rem, 2vh, 1.5rem) 0",
              }}
            >
              {headline}
            </h2>
            <p
              style={{
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {body}
            </p>
          </motion.div>

          <div style={{ borderRadius: "16px", position: "relative", zIndex: 2, marginLeft: "clamp(0%, 10vw, 25%)", marginTop: "clamp(-2rem, -3vw, -5rem)", marginRight: "clamp(-1rem, -3vw, -5rem)" }}>
            <img
              src={rightImage}
              alt={`${product.name} detail`}
              style={{ width: "100%", height: "clamp(350px, 45vw, 600px)", objectFit: "cover", borderRadius: "16px" }}
            />
          </div>
        </div>

        {/* Second large photo — half black, half white bg */}
        <div style={{ background: "linear-gradient(to bottom, #0a0a0a 50%, #ffffff 50%)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 6vw, 6rem) clamp(3rem, 6vh, 4rem)" }}>
            <img
              src={bottomImage}
              alt={`${product.name} lifestyle`}
              style={{
                width: "100%",
                display: "block",
                marginLeft: "clamp(-15rem, -10vw, 0px)",
                marginTop: "-3rem",
                position: "relative",
                zIndex: 10,
                height: "clamp(220px, 25vw, 350px)",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 6 — HIGHLIGHTS CAROUSEL
   ═══════════════════════════════════════════════════════ */
function HighlightsCarousel({ product }: { product: Product }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Build cards from product highlights or gallery + fallback text */
  const cards = (() => {
    if (product.highlights && product.highlights.length > 0) {
      return product.highlights;
    }
    /* Fallback: use the DETAIL images (index 3+) from gallery, skip full-kit shots */
    const detailImages = product.galleryImages.filter(img => img.includes("detail") || img.includes("studio"));
    const imgs = detailImages.length >= 4 ? detailImages.slice(0, 4) : product.galleryImages.slice(-4);
    return imgs.map((img, i) => ({
      image: img,
      title: defaultHighlights[i]?.title || `Feature ${i + 1}.`,
      description: defaultHighlights[i]?.description || "",
    }));
  })();

  if (cards.length === 0) return null;

  return (
    <section
      style={{
        background: "#fff",
        padding: "clamp(5rem, 12vh, 10rem) 0",
      }}
    >
      <AnimatedSection>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 700,
            color: "#0a0a0a",
            margin: "0 0 1rem 0",
            paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
          }}
        >
          Destaques do {product.name}.
        </h2>

        {/* Arrow navigation */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", paddingRight: "clamp(1.5rem, 6vw, 6rem)", marginBottom: "clamp(1.5rem, 3vh, 2rem)" }}>
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" })}
            style={{ background: "none", border: "1px solid rgba(0,0,0,0.2)", width: "40px", height: "40px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" })}
            style={{ background: "none", border: "1px solid rgba(0,0,0,0.2)", width: "40px", height: "40px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Próximo"
          >
            →
          </button>
        </div>

        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: "clamp(20px, 3vw, 40px)",
            overflowX: "auto",
            paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
            paddingRight: "clamp(1.5rem, 6vw, 6rem)",
            paddingBottom: "1rem",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            cursor: "grab",
            userSelect: "none",
          }}
          className="no-scrollbar"
          onMouseDown={(e) => {
            e.preventDefault();
            const el = scrollRef.current;
            if (!el) return;
            el.style.cursor = "grabbing";
            el.style.scrollBehavior = "auto";
            el.style.scrollSnapType = "none";
            const startX = e.pageX;
            const scrollLeft = el.scrollLeft;
            const onMove = (ev: MouseEvent) => {
              ev.preventDefault();
              el.scrollLeft = scrollLeft - (ev.pageX - startX);
            };
            const onUp = () => {
              el.style.cursor = "grab";
              el.style.scrollBehavior = "smooth";
              el.style.scrollSnapType = "x mandatory";
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                flex: "0 0 auto",
                width: "clamp(380px, 45vw, 620px)",
                scrollSnapAlign: "start",
                position: "relative",
                overflow: "hidden",
                borderRadius: "12px",
              }}
            >
              {/* Full card image */}
              <img
                src={card.image}
                alt={card.title}
                draggable={false}
                style={{
                  width: "100%",
                  height: "clamp(350px, 40vw, 500px)",
                  objectFit: "cover",
                  display: "block",
                  pointerEvents: "none",
                }}
              />
              {/* Text overlay on the image */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                  padding: "clamp(2rem, 4vw, 3rem) 1.5rem 1.5rem",
                }}
              >
                <h3
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export default function ProductDetailPage() {
  const { model, lang } = useParams();
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const product = getProductBySlug(model || "");

  if (!product) {
    return <Navigate to={`/${lang}/line`} replace />;
  }

  return (
    <>
      <SEO
        title={`${product.name} | E-Force`}
        description={product.description}
        image={product.heroImage}
        lang={lang ?? "en"}
        path={`/kits/${product.slug}`}
      />

      <div className="bg-white min-h-screen">
        {/* Section 3: Sticky context bar (appears on scroll) */}
        <StickyContextBar
          product={product}
          onSwitchModel={() => setSwitcherOpen(true)}
        />

        {/* Section 1: Hero */}
        <HeroSection product={product} />

        {/* Section 2: Key Specs */}
        <KeySpecsSection product={product} />

        {/* Section 4+5: Editorial — horizontal photo + vertical overlap + text */}
        <EditorialSection product={product} />

        {/* Section 6: Highlights carousel */}
        <HighlightsCarousel product={product} />

      </div>

      <ModelSwitcher
        isOpen={switcherOpen}
        onClose={() => setSwitcherOpen(false)}
        currentProduct={product}
      />
    </>
  );
}
