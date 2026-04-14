import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SidebarTechnologyListProps {
  onNavigate: () => void;
}

const modules = [
  {
    id: "f50",
    titleKey: "tech_page.f50.title",
    image: "/assets/images/modules/f50.webp",
    route: "technology",
  },
  {
    id: "f10",
    titleKey: "tech_page.f10.title",
    image: "/assets/images/modules/f10.webp",
    route: "technology",
  },
];

export function SidebarTechnologyList({ onNavigate }: SidebarTechnologyListProps) {
  const { t } = useTranslation();
  const { lang } = useParams();

  return (
    <div className="flex flex-col gap-10">
      {modules.map((mod) => (
        <Link
          key={mod.id}
          to={`/${lang}/${mod.route}`}
          onClick={onNavigate}
          className="group block"
        >
          <h3 className="text-gray-900 font-bold text-xl mb-3 group-hover:text-brand-orange transition-colors">
            {t(mod.titleKey)}
          </h3>
          <img
            src={mod.image}
            alt={t(mod.titleKey)}
            className="h-auto object-contain -mx-6"
            style={{
              width: "calc(100% + 3rem)",
              ...(mod.id === "f10" && { transform: "scale(1.3)", transformOrigin: "center" }),
              ...(mod.id === "f50" && { transform: "scale(1.1)", transformOrigin: "center" }),
            }}
          />
        </Link>
      ))}
    </div>
  );
}
