import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { products } from "@/data/products";
import { usePageTransition } from "@/context/TransitionContext";

interface SidebarModelListProps {
  onNavigate: () => void;
}

const COMING_SOON_IDS = ["ef7eye"];

export function SidebarModelList({ onNavigate }: SidebarModelListProps) {
  const { lang } = useParams();
  const { t } = useTranslation();
  const { navigateWithCurtain } = usePageTransition();
  return (
    <div className="flex flex-col gap-10">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => {
            if (COMING_SOON_IDS.includes(product.id)) return;
            onNavigate();
            navigateWithCurtain(`/${lang}/kits/${product.slug}`);
          }}
          className="group block cursor-pointer"
        >
          <h3 className="text-gray-900 font-bold text-xl mb-3 group-hover:text-brand-orange transition-colors">
            {product.name}
          </h3>
          {COMING_SOON_IDS.includes(product.id) ? (
            <div className="relative -mx-6" style={{ width: "calc(100% + 3rem)" }}>
              <img
                src={product.menuImage ?? product.heroImage}
                alt={product.name}
                className="h-auto object-contain w-full"
                style={{ opacity: 0.85 }}
              />
              <div style={{ position: "absolute", top: "0.75rem", left: "50%", transform: "translateX(-50%)" }}>
                <span className="font-bold tracking-widest uppercase" style={{ fontSize: "0.95rem", background: "rgba(255,255,255,0.92)", color: "rgba(0,0,0,0.6)", padding: "0.45rem 1.2rem", borderRadius: "999px", whiteSpace: "nowrap" }}>
                  {t("coming_soon")}
                </span>
              </div>
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
        </div>
      ))}
    </div>
  );
}
