import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface EditorialIntroProps { product: Product; }

export function EditorialIntro({ product }: EditorialIntroProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useTranslation();
  const shortName = product.name.split(" ")[0];
  const images = product.galleryImages || [];
  if (!product.editorialHeadline && images.length === 0) return null;

  return (
    <section className="bg-white" style={{ padding: "clamp(6rem, 15vh, 12rem) clamp(1.5rem, 6vw, 6rem)" }}>
      <div className="max-w-5xl mx-auto text-center">
        <div className="editorial-headline text-gray-900 mb-6">{shortName}</div>
        {product.editorialHeadline && (<h2 className="text-gray-900 text-xl md:text-2xl font-light mb-4">{product.editorialHeadline}</h2>)}
        {product.editorialBody && (<p className="text-gray-500 max-w-2xl mx-auto mb-12">{product.editorialBody}</p>)}
        {images.length > 0 && (
          <div className="relative">
            <motion.img key={currentImage} src={images[currentImage]} alt={`${product.name} gallery`} className="w-full rounded-lg max-h-[500px] object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
            {images.length > 1 && (
              <div className="flex justify-center gap-4 mt-4">
                <button onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)} className="text-gray-500 hover:text-gray-900 transition-colors">&larr; {t("product.previous")}</button>
                <span className="text-gray-400 text-sm">{currentImage + 1} / {images.length}</span>
                <button onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)} className="text-gray-500 hover:text-gray-900 transition-colors">{t("product.next")} &rarr;</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
