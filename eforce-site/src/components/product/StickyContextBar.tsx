import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/data/products";

interface StickyContextBarProps {
  product: Product;
  onSwitchModel: () => void;
}

export function StickyContextBar({ product, onSwitchModel }: StickyContextBarProps) {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="sticky-bar flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200"
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          exit={{ y: -60 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <span className="text-gray-900 font-semibold text-sm">{product.name}</span>
          <div className="flex items-center gap-4">
            <button
              onClick={onSwitchModel}
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
            >
              {t("product.switchModel") || "Mudar de modelo"}
            </button>
            <a
              href="#dealers"
              className="bg-brand-orange text-white text-sm px-4 py-1.5 rounded hover:bg-orange-600 transition-colors"
            >
              {t("product.findDealer") || "Encontrar Dealer"}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
