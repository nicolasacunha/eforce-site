import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const shortName = product.name.split(" ")[0];

  return (
    <section className="relative flex flex-col items-center justify-center py-24 md:py-32 overflow-hidden bg-white">
      <div className="text-giant absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none whitespace-nowrap" style={{ color: "#0a0a0a" }}>
        {shortName}
      </div>
      <motion.img
        src={product.heroImage}
        alt={product.name}
        className="relative z-10 max-w-md md:max-w-lg lg:max-w-xl w-full h-auto object-contain"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.div
        className="relative z-10 text-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h1 className="text-gray-900 text-2xl md:text-4xl font-bold">{product.name}</h1>
        <p className="text-gray-500 text-sm md:text-base mt-2">{product.tagline}</p>
        <span className="inline-block mt-3 bg-gray-100 text-brand-orange text-xs px-3 py-1 rounded-full">
          {product.module}
        </span>
      </motion.div>
    </section>
  );
}
