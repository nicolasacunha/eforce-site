import { Link, useParams } from "react-router-dom";
import { products } from "@/data/products";

interface SidebarModelListProps {
  onNavigate: () => void;
}

export function SidebarModelList({ onNavigate }: SidebarModelListProps) {
  const { lang } = useParams();
  return (
    <div className="flex flex-col gap-10">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/${lang}/kits/${product.slug}`}
          onClick={onNavigate}
          className="group block"
        >
          <h3 className="text-gray-900 font-bold text-xl mb-3 group-hover:text-brand-orange transition-colors">
            {product.name}
          </h3>
          <img
            src={product.heroImage}
            alt={product.name}
            className="w-full h-auto object-contain"
            style={{ maxHeight: "200px" }}
          />
          <div className="mt-3">
            <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2.5 py-1 rounded">
              {product.module}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
