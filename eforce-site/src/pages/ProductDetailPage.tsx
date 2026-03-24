import { useState, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import SEO from "@/components/layout/SEO";
import { getProductBySlug } from "@/data/products";
import type { Product } from "@/data/products";
import { StickyContextBar } from "@/components/product/StickyContextBar";
import { ModelSwitcher } from "@/components/product/ModelSwitcher";
import CompareModels from "@/components/product/CompareModels";
import InTheBox from "@/components/product/InTheBox";

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
        background: "#e8e6e1",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(6rem, 12vh, 10rem) clamp(1.5rem, 6vw, 6rem) clamp(3rem, 6vh, 5rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "90vh",
        justifyContent: "center",
      }}
    >
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
            fontSize: "clamp(10rem, 30vw, 28rem)",
            fontWeight: 800,
            fontStyle: "italic",
            color: "rgba(0,0,0,0.08)",
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
            maxWidth: "min(85vw, 1000px)",
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
              border: "1px solid rgba(0,0,0,0.25)",
              borderRadius: "999px",
              padding: "4px 14px",
              color: "rgba(0,0,0,0.6)",
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
              background: "#0a0a0a",
              color: "#fff",
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
              color: "#0a0a0a",
              border: "1px solid rgba(0,0,0,0.3)",
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
  const aerialImage = product.galleryImages.length > 1 ? product.galleryImages[1] : product.galleryImages[0] || product.heroImage;
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
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "center",
          }}
          className="max-md:!grid-cols-1"
        >
          {/* Left: specs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(2rem, 4vh, 3.5rem)" }}>
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

          {/* Right: aerial image — LARGE, overflowing like Porsche */}
          <div style={{ overflow: "visible" }}>
            <img
              src={aerialImage}
              alt={`${product.name} aerial view`}
              style={{ width: "120%", maxWidth: "none", objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))" }}
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
   SECTION 4 — EDITORIAL WITH MODEL LOGO
   ═══════════════════════════════════════════════════════ */
function EditorialLogoSection({ product }: { product: Product }) {
  const prefix = getModelPrefix(product.name);
  const lifestyleImage = product.galleryImages[2] || product.galleryImages[0] || product.heroImage;

  return (
    <section style={{ background: "#fff", padding: "clamp(4rem, 10vh, 8rem) 0 0 0" }}>
      <AnimatedSection>
        {/* Large italic model logo */}
        <div
          style={{
            textAlign: "center",
            fontSize: "clamp(4rem, 12vw, 10rem)",
            fontWeight: 800,
            fontStyle: "italic",
            color: "#0a0a0a",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: "clamp(2rem, 5vh, 4rem)",
          }}
        >
          {prefix}
        </div>

        {/* Full-bleed lifestyle photo */}
        <div style={{ width: "100%", overflow: "hidden" }}>
          <img
            src={lifestyleImage}
            alt={`${product.name} lifestyle`}
            style={{ width: "100%", height: "clamp(300px, 50vw, 600px)", objectFit: "cover" }}
          />
        </div>
      </AnimatedSection>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 5 — TWO-COLUMN TEXT + IMAGE
   ═══════════════════════════════════════════════════════ */
function TwoColumnEditorial({ product }: { product: Product }) {
  // Use detail/studio close-ups for the editorial section
  const details = product.galleryImages.filter(img => img.includes("detail") || img.includes("studio"));
  const img1 = details[0] || product.galleryImages[2] || product.heroImage;
  const img2 = details[1] || product.galleryImages[3] || product.heroImage;
  const headline = product.editorialHeadline || "Projetado para quem vive a m\u00fasica.";
  const body =
    product.editorialBody ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

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
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "45% 55%",
            gap: "clamp(2rem, 4vw, 4rem)",
            alignItems: "center",
          }}
          className="max-md:!grid-cols-1"
        >
          {/* Left: two stacked photos */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2vh, 1.5rem)" }}>
            <img
              src={img1}
              alt={`${product.name} detail`}
              style={{ width: "100%", height: "clamp(180px, 25vw, 320px)", objectFit: "cover" }}
            />
            <img
              src={img2}
              alt={`${product.name} detail`}
              style={{ width: "85%", height: "clamp(140px, 20vw, 260px)", objectFit: "cover" }}
            />
          </div>

          {/* Right: text */}
          <div>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "#0a0a0a",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                margin: "0 0 clamp(1rem, 2vh, 1.5rem) 0",
              }}
            >
              {headline}
            </h2>
            <p
              style={{
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                color: "rgba(0,0,0,0.6)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {body}
            </p>
          </div>
        </div>
      </AnimatedSection>
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
            margin: "0 0 clamp(2rem, 4vh, 3rem) 0",
            paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
          }}
        >
          Destaques do {product.name}.
        </h2>

        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: "clamp(1rem, 2vw, 1.5rem)",
            overflowX: "auto",
            paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
            paddingRight: "clamp(1.5rem, 6vw, 6rem)",
            paddingBottom: "1rem",
            scrollSnapType: "x mandatory",
          }}
          className="no-scrollbar"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                flex: "0 0 auto",
                width: "clamp(280px, 30vw, 380px)",
                scrollSnapAlign: "start",
              }}
            >
              {/* Card image with title overlay */}
              <div style={{ position: "relative", overflow: "hidden", borderRadius: "0" }}>
                <img
                  src={card.image}
                  alt={card.title}
                  style={{
                    width: "100%",
                    height: "clamp(220px, 28vw, 340px)",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {/* Dark gradient overlay at bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "1.25rem",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                    }}
                  >
                    {card.title}
                  </span>
                </div>
              </div>
              {/* Description below */}
              <p
                style={{
                  fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
                  color: "rgba(0,0,0,0.55)",
                  lineHeight: 1.6,
                  marginTop: "0.75rem",
                }}
              >
                {card.description}
              </p>
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

        {/* Section 4: Editorial with model logo */}
        <EditorialLogoSection product={product} />

        {/* Section 5: Two-column text + image */}
        <TwoColumnEditorial product={product} />

        {/* Section 6: Highlights carousel */}
        <HighlightsCarousel product={product} />

        {/* Section 7: In the Box */}
        {product.inTheBox.length > 0 && (
          <section
            className="bg-gray-50"
            style={{ padding: "clamp(6rem, 15vh, 12rem) clamp(1.5rem, 6vw, 6rem)" }}
            id="specs"
          >
            <div className="max-w-5xl mx-auto">
              <InTheBox product={product} />
            </div>
          </section>
        )}

        {/* Section 7: Compare models */}
        <section
          style={{ padding: "clamp(6rem, 15vh, 12rem) clamp(1.5rem, 6vw, 6rem)" }}
          id="dealers"
        >
          <div className="max-w-7xl mx-auto">
            <CompareModels currentProduct={product} />
          </div>
        </section>
      </div>

      <ModelSwitcher
        isOpen={switcherOpen}
        onClose={() => setSwitcherOpen(false)}
        currentProduct={product}
      />
    </>
  );
}
