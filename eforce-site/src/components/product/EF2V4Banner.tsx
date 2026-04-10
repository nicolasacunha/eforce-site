import type { Product } from "@/data/products";

export function EF2V4Banner({ product }: { product: Product }) {
  return (
    <section
      style={{
        position: "relative",
        height: "clamp(480px, 58vh, 680px)",
        overflow: "hidden",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(2rem, 8vw, 7rem)",
      }}
    >
      {/* Left: text */}
      <div style={{ flexShrink: 0, maxWidth: "380px" }}>
        <p
          style={{
            color: "rgba(140,180,255,0.7)",
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
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))",
        }}
      />
    </section>
  );
}
