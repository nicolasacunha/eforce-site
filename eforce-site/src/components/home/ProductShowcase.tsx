import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { HoverVideoCard } from "@/components/ui/HoverVideoCard";

const featured = products.filter((p) =>
  ["ef2-v2", "ef5-v2", "ef7-eye-hybrid"].includes(p.slug)
);

export default function ProductShowcase() {
  const { lang } = useParams();
  const { t } = useTranslation();

  return (
    <section className="bg-brand-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-8">
          {t("showcase.label") || "Modelos em Destaque"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/${lang}/kits/${product.slug}`}
                className="group block bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-colors"
              >
                <HoverVideoCard
                  image={product.heroImage}
                  videoSrc={product.videoPreview}
                  alt={product.name}
                  className="h-48"
                />
                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg">{product.name}</h3>
                  {product.badge && (
                    <span className="text-brand-orange text-xs">{product.badge}</span>
                  )}
                  <p className="text-neutral-500 text-sm mt-1">{product.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to={`/${lang}/line`}
            className="text-brand-orange hover:text-white transition-colors text-sm tracking-wider"
          >
            {t("showcase.viewAll") || "Ver todos os modelos"} →
          </Link>
        </div>
      </div>
    </section>
  );
}
