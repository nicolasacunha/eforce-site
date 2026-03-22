import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { products } from "@/data/products";
import { HoverVideoCard } from "@/components/ui/HoverVideoCard";

interface SidebarModelListProps {
  onNavigate: () => void;
}

export function SidebarModelList({ onNavigate }: SidebarModelListProps) {
  const { lang } = useParams();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
        {t("nav.line")}
      </div>
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/${lang}/kits/${product.slug}`}
          onClick={onNavigate}
          className="flex items-center gap-3 p-3 rounded-lg border border-neutral-800 hover:border-neutral-600 transition-colors"
        >
          <HoverVideoCard
            image={product.heroImage}
            videoSrc={product.videoPreview}
            alt={product.name}
            className="w-24 h-14 rounded-md flex-shrink-0"
          />
          <div>
            <div className="text-sm font-semibold text-white">{product.name}</div>
            <div className="text-xs text-neutral-500">
              {product.badge && (
                <span className="text-brand-orange mr-2">{product.badge}</span>
              )}
              {product.module}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
