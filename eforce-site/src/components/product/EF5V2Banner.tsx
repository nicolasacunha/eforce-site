import InteractiveShader from "@/components/ui/crystalline-cube";
import type { Product } from "@/data/products";

export function EF5V2Banner({ product }: { product: Product }) {
  return (
    <section
      style={{
        position: "relative",
        height: "clamp(480px, 58vh, 680px)",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* WebGL crystalline cube shader */}
      <InteractiveShader
        complexity={3.5}
        colorShift={0.15}
        lightIntensity={1.2}
        mouseInfluence={0.6}
      />

      {/* Dark overlay — more opaque on the left for text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.05) 100%)",
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
        <div style={{ flexShrink: 0, maxWidth: "400px" }}>
          <p
            style={{
              color: "rgba(200,180,255,0.7)",
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
            filter:
              "drop-shadow(0 0 80px rgba(160,100,255,0.3)) drop-shadow(0 0 30px rgba(80,30,160,0.5))",
          }}
        />
      </div>
    </section>
  );
}
