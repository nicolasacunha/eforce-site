import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Overlay } from "@/components/ui/Overlay";
import { SidebarModelList } from "./SidebarModelList";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type Category = "modelos" | "tecnologia" | "historia" | "dealers" | "suporte";

const categories: { key: Category; labelKey: string; route: string }[] = [
  { key: "modelos", labelKey: "nav.line", route: "line" },
  { key: "tecnologia", labelKey: "nav.technology", route: "technology" },
  { key: "historia", labelKey: "nav.story", route: "story" },
  { key: "dealers", labelKey: "nav.dealers", route: "dealers" },
  { key: "suporte", labelKey: "nav.support", route: "support" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("modelos");
  const { lang } = useParams();
  const { t } = useTranslation();

  return (
    <Overlay isOpen={isOpen} onClose={onClose} side="left" ariaLabel="Menu de navega\u00E7\u00E3o">
      <div className="flex h-full w-[90vw] max-w-4xl">
        <div className="w-2/5 bg-[#111] p-6 flex flex-col">
          <button
            onClick={onClose}
            className="self-end text-white text-2xl mb-8 hover:text-[rgba(255,255,255,0.5)] transition-colors"
            aria-label="Fechar menu"
          >
            &#x2715;
          </button>
          <nav className="flex flex-col gap-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex justify-between items-center py-4 border-b border-[rgba(255,255,255,0.08)] text-left text-base transition-colors ${
                  activeCategory === cat.key ? "text-white font-semibold" : "text-[rgba(255,255,255,0.5)] hover:text-white"
                }`}
              >
                {t(cat.labelKey)}
                <span className="text-[rgba(255,255,255,0.25)]">&rarr;</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="w-3/5 bg-[#0a0a0a] p-6 overflow-y-auto">
          {activeCategory === "modelos" ? (
            <SidebarModelList onNavigate={onClose} />
          ) : (
            <Link
              to={`/${lang}/${categories.find((c) => c.key === activeCategory)?.route}`}
              onClick={onClose}
              className="text-[rgba(255,255,255,0.5)] hover:text-white transition-colors"
            >
              {t(categories.find((c) => c.key === activeCategory)?.labelKey || "")} &rarr;
            </Link>
          )}
        </div>
      </div>
    </Overlay>
  );
}
