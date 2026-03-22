import { Link, useParams } from "react-router-dom";
import { products } from "@/data/products";
import { HoverVideoCard } from "@/components/ui/HoverVideoCard";

interface SidebarModelListProps {
  onNavigate: () => void;
}

export function SidebarModelList({ onNavigate }: SidebarModelListProps) {
  const { lang } = useParams();
  return (
    <div className="flex flex-col gap-8">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/${lang}/kits/${product.slug}`}
          onClick={onNavigate}
          className="group block"
        >
          <h3 className="text-white font-bold text-xl mb-3 group-hover:text-brand-orange transition-colors">
            {product.name}
          </h3>
          <HoverVideoCard
            image={product.heroImage}
            videoSrc={product.videoPreview}
            alt={product.name}
            className="w-full h-40 rounded-md"
          />
          <div className="mt-2">
            <span className="inline-block bg-neutral-800 text-neutral-300 text-xs px-2.5 py-1 rounded">
              {product.module}
            </span>
            {product.badge && (
              <span className="inline-block bg-brand-orange/15 text-brand-orange text-xs px-2.5 py-1 rounded ml-2">
                {product.badge}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
