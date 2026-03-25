import { useState, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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

/* ── helper: extract model prefix (e.g. "EF2" from "EF2 V3") ── */
function getModelPrefix(name: string) {
  const match = name.match(/^(EF\d+)/i);
  return match ? match[1].toUpperCase() : name.split(" ")[0].toUpperCase();
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
function HeroSection({ product, onSwitchModel }: { product: Product; onSwitchModel: () => void }) {
  const prefix = getModelPrefix(product.name);
  return (
    <section
      style={{
        background: "#ffffff",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 6rem) clamp(1rem, 2vh, 2rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Background image — top rectangle only, behind everything */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: "50%",
          backgroundImage: `url(/assets/images/kits/ef2v3/ef2v3-fundo.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.7,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Container for overlapping text + image (like Porsche 718) */}
      <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Giant model prefix — centered, BEHIND the product */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "clamp(8rem, 22vw, 20rem)",
            fontWeight: 800,
            fontStyle: "italic",
            color: "rgba(0,0,0,0.75)",
            lineHeight: 0.85,
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            letterSpacing: "-0.04em",
            zIndex: 1,
          }}
          aria-hidden
        >
          {prefix}
        </motion.div>

        {/* Product image — ON TOP of the text, large */}
        <motion.img
          src={product.heroImage}
          alt={product.name}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "min(90vw, 1300px)",
            width: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.15))",
          }}
        />
      </div>

      {/* Model name + module badge + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.35 }}
        style={{ position: "relative", zIndex: 2, textAlign: "center", marginTop: "clamp(1.5rem, 3vh, 2.5rem)" }}
      >
        <h1
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 400,
            color: "#0a0a0a",
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {product.name}
        </h1>

        {/* Module badge pill */}
        <div style={{ marginTop: "0.75rem" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "999px",
              padding: "4px 14px",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {product.module}
          </span>
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
          <button
            onClick={onSwitchModel}
            style={{
              background: "#ffffff",
              color: "#0a0a0a",
              border: "none",
              padding: "12px 28px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              cursor: "pointer",
              borderRadius: "0",
            }}
          >
            Mudar de modelo
          </button>
          <a
            href="#dealers"
            style={{
              background: "transparent",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.4)",
              padding: "12px 28px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              textDecoration: "none",
              cursor: "pointer",
              borderRadius: "0",
            }}
          >
            Encontrar dealer
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 2 — KEY SPECS (left specs, right aerial image)
   ═══════════════════════════════════════════════════════ */
function KeySpecsSection({ product }: { product: Product }) {
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
        padding: "clamp(5rem, 12vh, 10rem) clamp(1.5rem, 6vw, 6rem)",
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
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(2rem, 4vh, 3.5rem)", marginLeft: "auto", paddingRight: "clamp(1rem, 2vw, 2rem)" }}>
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
                  {s.value}
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

        {/* All technical details button */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", marginTop: "clamp(2rem, 4vh, 3rem)" }}>
          <a
            href="#specs"
            style={{
              display: "inline-block",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "#0a0a0a",
              border: "1px solid rgba(0,0,0,0.3)",
              padding: "12px 28px",
              textDecoration: "none",
              borderRadius: "0",
            }}
          >
            Todos os detalhes t&eacute;cnicos
          </a>
        </div>
      </AnimatedSection>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 4+5 — EDITORIAL: Porsche Boxster style
   Two photos side-by-side, right photo extends down,
   text on the left below the photos
   ═══════════════════════════════════════════════════════ */
function EditorialSection({ product }: { product: Product }) {
  const prefix = getModelPrefix(product.name);
  const rightImage = product.galleryImages[3] || product.galleryImages[1] || product.heroImage;
  const headline = product.editorialHeadline || "Projetado para quem vive a m\u00fasica.";
  const body =
    product.editorialBody ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

  const mainImgRef = useRef(null);
  const secondImgRef = useRef(null);
  const { scrollYProgress: mainProgress } = useScroll({ target: mainImgRef, offset: ["start end", "end start"] });
  const { scrollYProgress: secondProgress } = useScroll({ target: secondImgRef, offset: ["start end", "end start"] });
  const mainY = useTransform(mainProgress, [0, 1], [60, -60]);
  const secondY = useTransform(secondProgress, [0, 1], [60, -60]);

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
            padding: "clamp(4rem, 10vh, 8rem) 0 clamp(2rem, 4vh, 3rem) 0",
          }}
        >
          {prefix}
        </div>
      </AnimatedSection>

      {/* Main photo — taller, narrower, with black bg starting at 50% */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(to bottom, #ffffff 50%, #0a0a0a 50%)",
        }}
      >
        <div ref={mainImgRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 6vw, 6rem)", overflow: "hidden" }}>
          <motion.img
            src="/assets/images/kits/ef2v3/ef2v3-editorial-main.jpg"
            alt={`${product.name} lifestyle`}
            style={{
              width: "100%",
              height: "clamp(300px, 35vw, 550px)",
              objectFit: "cover",
              display: "block",
              position: "relative",
              zIndex: 1,
              y: mainY,
              scale: 1.15,
            }}
          />
        </div>
      </div>

      {/* Bottom row: text left + smaller photo right — black bg */}
      <div style={{ background: "#0a0a0a" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "clamp(3rem, 6vh, 5rem) clamp(1.5rem, 6vw, 6rem)",
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

          <div ref={secondImgRef} style={{ overflow: "hidden", borderRadius: "4px" }}>
            <motion.img
              src={rightImage}
              alt={`${product.name} detail`}
              style={{ width: "100%", height: "clamp(250px, 30vw, 400px)", objectFit: "cover", y: secondY, scale: 1.15 }}
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
            gap: "6px",
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
                width: "clamp(320px, 40vw, 520px)",
                scrollSnapAlign: "start",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Full card image */}
              <img
                src={card.image}
                alt={card.title}
                draggable={false}
                style={{
                  width: "100%",
                  height: "clamp(320px, 40vw, 500px)",
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
        <HeroSection product={product} onSwitchModel={() => setSwitcherOpen(true)} />

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
