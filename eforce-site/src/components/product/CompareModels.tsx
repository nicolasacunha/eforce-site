import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { HoverVideoCard } from "@/components/ui/HoverVideoCard";

interface CompareModelsProps {
  currentProduct: Product;
}

export default function CompareModels({ currentProduct }: CompareModelsProps) {
  const { lang } = useParams();
  const { t } = useTranslation();

  const otherModels = products
    .filter((p) => p.id !== currentProduct.id)
    .sort((a, b) => Math.abs(a.priceValue - currentProduct.priceValue) - Math.abs(b.priceValue - currentProduct.priceValue));

  return (
    <div>
      <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
        {t("product.whichKit")}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
        {otherModels.map((product) => (
          <Link
            key={product.id}
            to={`/${lang}/kits/${product.slug}`}
            className="min-w-[260px] max-w-[280px] flex-shrink-0 snap-start bg-neutral-900 rounded-lg border border-neutral-800 hover:border-neutral-600 transition-colors overflow-hidden"
          >
            <HoverVideoCard
              image={product.heroImage}
              videoSrc={product.videoPreview}
              alt={product.name}
              className="h-36"
            />
            <div className="p-4">
              <h3 className="text-white font-semibold text-sm">{product.name}</h3>
              {product.badge && (
                <span className="text-brand-orange text-xs">{product.badge}</span>
              )}
              <div className="flex gap-3 mt-2 text-xs text-neutral-500">
                <span>{product.module}</span>
                <span>{product.price}</span>
              </div>
              <div className="flex gap-4 mt-3 text-xs">
                <span className="text-neutral-400 hover:text-white transition-colors">
                  {t("product.allSpecs")}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4">
        <span className="text-xs text-brand-orange cursor-pointer hover:text-white transition-colors">
          {t("product.compareDetail")}
        </span>
      </div>
    </div>
  );
}
