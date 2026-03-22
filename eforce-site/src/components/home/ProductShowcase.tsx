import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { HoverVideoCard } from "@/components/ui/HoverVideoCard";

export default function ProductShowcase() {
  const { lang } = useParams();
  const { t } = useTranslation();

  return (
    <section className="bg-brand-black">
      {products.map((product, i) => (
        <Link
          key={product.id}
          to={`/${lang}/kits/${product.slug}`}
          className="group block border-b border-neutral-800 last:border-b-0"
        >
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
            <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16`}>
              {/* Image */}
              <motion.div
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <HoverVideoCard
                  image={product.heroImage}
                  videoSrc={product.videoPreview}
                  alt={product.name}
                  className="w-full h-64 md:h-80 rounded-lg"
                />
              </motion.div>

              {/* Info */}
              <motion.div
                className={`w-full md:w-1/2 ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h2 className="text-white font-bold text-3xl md:text-5xl mb-3 group-hover:text-brand-orange transition-colors">
                  {product.name}
                </h2>
                <p className="text-neutral-500 text-base md:text-lg mb-4 max-w-md">
                  {product.tagline}
                </p>
                <div className={`flex items-center gap-3 mb-6 ${i % 2 === 0 ? "" : "md:justify-end"}`}>
                  <span className="bg-neutral-800 text-brand-orange text-xs px-3 py-1 rounded-full">
                    {product.module}
                  </span>
                  {product.badge && (
                    <span className="bg-brand-orange/15 text-brand-orange text-xs px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                {/* Key specs */}
                {product.specsHighlight && product.specsHighlight.length > 0 && (
                  <div className={`flex gap-8 mb-6 ${i % 2 === 0 ? "" : "md:justify-end"}`}>
                    {product.specsHighlight.slice(0, 3).map((spec) => (
                      <div key={spec.label} className={i % 2 === 0 ? "text-left" : "md:text-right"}>
                        <div className="text-white text-2xl font-light">{spec.value}</div>
                        <div className="text-neutral-600 text-xs uppercase tracking-wider">{spec.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                <span className="text-brand-orange text-sm group-hover:text-white transition-colors">
                  {t("showcase.viewModel") || "Explorar modelo"} →
                </span>
              </motion.div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
