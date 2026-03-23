import { Link, useParams } from "react-router-dom";
import { HoverVideoCard } from "@/components/ui/HoverVideoCard";
import type { Product } from "@/data/products";

interface ModelCardProps {
  product: Product;
}

export function ModelCard({ product }: ModelCardProps) {
  const { lang } = useParams();

  return (
    <Link
      to={`/${lang}/kits/${product.slug}`}
      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-400 transition-colors group"
    >
      <HoverVideoCard
        image={product.heroImage}
        videoSrc={product.videoPreview}
        alt={product.name}
        className="w-32 h-16 md:w-40 md:h-20 rounded-md flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-gray-900 font-semibold">{product.name}</h3>
          {product.badge && (
            <span className="text-brand-orange text-xs">{product.badge}</span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
          <span>{product.module}</span>
          <span>·</span>
          <span>{product.specsHighlight?.[0]?.value} {product.specsHighlight?.[0]?.label}</span>
        </div>
      </div>
      <span className="text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity text-lg">
        →
      </span>
    </Link>
  );
}
