import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Overlay } from "@/components/ui/Overlay";
import { products } from "@/data/products";
import type { Product } from "@/data/products";

interface ModelSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  currentProduct: Product;
}

export function ModelSwitcher({ isOpen, onClose, currentProduct }: ModelSwitcherProps) {
  const { lang } = useParams();
  const { t } = useTranslation();

  return (
    <Overlay isOpen={isOpen} onClose={onClose} side="right" ariaLabel="Mudar de modelo">
      <div className="h-full w-[85vw] max-w-md bg-[#111] p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white font-semibold text-lg">
            {t("product.switchModel") || "Mudar de modelo"}
          </h2>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:text-[rgba(255,255,255,0.5)] transition-colors"
            aria-label="Fechar"
          >
            &#10005;
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/${lang}/kits/${product.slug}`}
              onClick={onClose}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                product.id === currentProduct.id
                  ? "border-brand-orange bg-[#1a1a1a]"
                  : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]"
              }`}
            >
              <img
                src={product.heroImage}
                alt={product.name}
                className="w-24 h-14 object-contain flex-shrink-0"
              />
              <div className="flex-1">
                <div className="text-white text-sm font-semibold">{product.name}</div>
                <div className="flex gap-3 mt-1 text-xs text-[rgba(255,255,255,0.5)]">
                  <span>{product.module}</span>
                </div>
              </div>
              {product.id === currentProduct.id && (
                <span className="text-brand-orange text-xs">{t("product.current") || "Atual"}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </Overlay>
  );
}
