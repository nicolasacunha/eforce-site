import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface KeySpecsProps {
  product: Product;
}

export function KeySpecs({ product }: KeySpecsProps) {
  const specs = product.specsHighlight || [];
  if (specs.length === 0) return null;

  return (
    <section className="border-t border-b border-gray-200 py-12 px-6">
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
            <div className="specs-number text-gray-900">
              {spec.value}
              {spec.unit && (
                <span className="text-lg text-gray-500 ml-1">{spec.unit}</span>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
              {spec.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
