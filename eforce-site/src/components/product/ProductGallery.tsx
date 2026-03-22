import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/data/products';

interface ProductGalleryProps {
  product: Product;
}

interface GalleryItem {
  src: string;
  alt: string;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    { src: product.heroImage, alt: `${product.name} — Full Kit` },
    { src: product.heroImage, alt: `${product.name} — Shell Detail` },
    { src: product.heroImage, alt: `${product.name} — Module` },
    { src: product.heroImage, alt: `${product.name} — Cymbal Detail` },
    { src: product.heroImage, alt: `${product.name} — In Context` },
  ];

  function handlePrev() {
    setSelectedIndex((prev) =>
      prev === null ? null : prev > 0 ? prev - 1 : galleryItems.length - 1,
    );
  }

  function handleNext() {
    setSelectedIndex((prev) =>
      prev === null ? null : prev < galleryItems.length - 1 ? prev + 1 : 0,
    );
  }

  return (
    <>
      {/* Horizontal scroll gallery */}
      <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {galleryItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="aspect-[4/3] w-80 flex-shrink-0 snap-center overflow-hidden rounded-xl bg-white md:w-96"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-contain p-6 transition-transform duration-700 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute right-6 top-6 text-white transition-colors hover:text-brand-orange"
              aria-label="Close"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Prev arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-6 text-white transition-colors hover:text-brand-orange"
              aria-label="Previous"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedIndex}
                src={galleryItems[selectedIndex].src}
                alt={galleryItems[selectedIndex].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="max-h-[80vh] max-w-4xl object-contain p-8"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Next arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-6 text-white transition-colors hover:text-brand-orange"
              aria-label="Next"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
