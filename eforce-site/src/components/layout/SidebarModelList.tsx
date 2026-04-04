import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { products } from "@/data/products";

interface SidebarModelListProps {
  onNavigate: () => void;
}

const COMING_SOON_IDS = ["ef6cafe", "ef7eye"];

export function SidebarModelList({ onNavigate }: SidebarModelListProps) {
  const { lang } = useParams();
  const { t } = useTranslation();
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
          {COMING_SOON_IDS.includes(product.id) ? (
            <div className="flex items-center justify-center h-64 -mx-6" style={{ width: "calc(100% + 3rem)", background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)" }}>
              <span
                className="text-2xl font-bold text-gray-400 tracking-widest uppercase"
                style={{ textShadow: "0 4px 16px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.10)" }}
              >
                {t("coming_soon")}
              </span>
            </div>
          ) : (
            <img
              src={product.menuImage ?? product.heroImage}
              alt={product.name}
              className="h-auto object-contain -mx-6"
              style={{
                width: "calc(100% + 3rem)",
                ...(product.id === "ef2v1" && { transform: "scale(1.8)", transformOrigin: "center" }),
                ...(product.id === "ef2v2" && { transform: "scale(1.35)", transformOrigin: "center" }),
                ...(product.id === "ef2v3" && { transform: "scale(1.40)", transformOrigin: "center" }),
                ...(product.id === "ef2v4" && { transform: "scale(0.95)", transformOrigin: "center" }),
              ...(product.id === "ef5v2" && { transform: "scale(1.57) translateX(5%)", transformOrigin: "center" }),
              }}
            />
          )}
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
