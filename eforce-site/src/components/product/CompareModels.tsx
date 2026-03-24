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
      <h2 style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c", marginBottom: "1.5rem" }}>
        {t("product.whichKit")}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
        {otherModels.map((product) => (
          <Link
            key={product.id}
            to={`/${lang}/kits/${product.slug}`}
            className="min-w-[260px] max-w-[280px] flex-shrink-0 snap-start bg-[#111] rounded-lg border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.12)] transition-colors overflow-hidden"
          >
            <HoverVideoCard
              image={product.heroImage}
              videoSrc={product.videoPreview}
              alt={product.name}
              className="h-36"
            />
            <div className="p-4">
              <h3 className="text-white font-semibold text-sm">{product.name}</h3>
              <div className="flex gap-3 mt-2 text-xs text-[rgba(255,255,255,0.5)]">
                <span>{product.module}</span>
              </div>
              <div className="flex gap-4 mt-3 text-xs">
                <span className="text-[rgba(255,255,255,0.5)] hover:text-white transition-colors">
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
