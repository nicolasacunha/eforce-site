import { Canvas } from "@react-three/fiber";
import { ShaderPlane, EnergyRing } from "@/components/ui/background-paper-shaders";
import type { Product } from "@/data/products";

function Scene() {
  return (
    <>
      <ShaderPlane position={[-1.2, 0, 0]} color1="#04111f" color2="#0d4a6e" />
      <ShaderPlane position={[0, 0.4, -0.5]} color1="#071a2e" color2="#0a7a9e" />
      <ShaderPlane position={[1.0, -0.3, -1]} color1="#020d18" color2="#06304a" />
      <EnergyRing radius={1.4} position={[0.5, 0, -0.5]} />
      <EnergyRing radius={0.9} position={[-0.8, 0.2, 0]} />
    </>
  );
}

export function EF2V3Banner({ product }: { product: Product }) {
  return (
    <section
      style={{
        position: "relative",
        height: "clamp(480px, 58vh, 680px)",
        overflow: "hidden",
        background: "#020d18",
      }}
    >
      {/* Three.js canvas */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 3], fov: 60 }}
          style={{ width: "100%", height: "100%" }}
          gl={{ alpha: true, antialias: false }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Dark left overlay for text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(2,13,24,0.8) 0%, rgba(2,13,24,0.3) 55%, transparent 100%)",
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
              color: "rgba(120,200,240,0.7)",
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
            filter: "drop-shadow(0 0 80px rgba(40,140,200,0.25)) drop-shadow(0 0 30px rgba(10,80,130,0.4))",
          }}
        />
      </div>
    </section>
  );
}
