import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface KeySpecsProps {
  product: Product;
}

export function KeySpecs({ product }: KeySpecsProps) {
  const specs = product.specsHighlight || [];
  if (specs.length === 0) return null;

  return (
    <section className="border-t border-b border-[rgba(255,255,255,0.08)] py-12 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
        {specs.map((spec, i) => (
          <motion.div
            key={spec.label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div style={{
              fontSize: "clamp(4rem, 10vw, 9rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.85,
              color: "white",
            }}>
              {spec.value}
              {spec.unit && (
                <span style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.5)", marginLeft: "0.25rem" }}>{spec.unit}</span>
              )}
            </div>
            <div style={{
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#ff4a1c",
              marginTop: "0.25rem",
            }}>
              {spec.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
