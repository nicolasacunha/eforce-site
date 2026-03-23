import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { Product } from "@/data/products";

interface HighlightsGridProps { product: Product; }

export function HighlightsGrid({ product }: HighlightsGridProps) {
  const highlights = product.highlights || [];
  const { t } = useTranslation();
  if (highlights.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8">{t("product.highlights")} — {product.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((h, i) => (
            <motion.div key={h.title} className="rounded-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <img src={h.image} alt={h.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-gray-900 font-semibold text-sm mb-1">{h.title}</h3>
                <p className="text-gray-500 text-sm">{h.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
