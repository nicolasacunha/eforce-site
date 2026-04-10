import RetroGrid from "@/components/ui/retro-grid";
import type { Product } from "@/data/products";

export function EF2V2Banner({ product }: { product: Product }) {
  return (
    <section
      style={{
        position: "relative",
        height: "clamp(480px, 58vh, 680px)",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* Retro grid canvas background */}
      <div style={{ position: "absolute", inset: 0 }}>
        <RetroGrid gridColor="#ff2266" showScanlines glowEffect />
      </div>

      {/* Side vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.05) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(2rem, 8vw, 7rem)",
          zIndex: 2,
        }}
      >
        {/* Left: text */}
        <div style={{ flexShrink: 0, maxWidth: "380px" }}>
          <p
            style={{
              color: "rgba(255,80,120,0.8)",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              margin: "0 0 1rem 0",
              fontWeight: 500,
            }}
          >
            {product.tagline}
          </p>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
              fontWeight: 800,
              fontStyle: "italic",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              margin: "0 0 1.5rem 0",
            }}
          >
            {product.name}
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(0.85rem, 1vw, 1rem)",
              lineHeight: 1.6,
              margin: 0,
              maxWidth: "300px",
            }}
          >
            {product.description}
          </p>
        </div>

        {/* Right: product image */}
        <img
          src={product.heroImage}
          alt={product.name}
          style={{
            height: "clamp(320px, 85%, 580px)",
            maxWidth: "55%",
            objectFit: "contain",
            flexShrink: 1,
            filter: "drop-shadow(0 0 80px rgba(255,30,80,0.3)) drop-shadow(0 0 30px rgba(180,10,50,0.5))",
          }}
        />
      </div>
    </section>
  );
}
