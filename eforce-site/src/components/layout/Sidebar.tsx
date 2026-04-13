import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Overlay } from "@/components/ui/Overlay";
import { SidebarModelList } from "./SidebarModelList";
import { SidebarTechnologyList } from "./SidebarTechnologyList";
import { SidebarSupportList } from "./SidebarSupportList";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type Category = "modelos" | "tecnologia" | "historia" | "dealers" | "suporte";

const categories: { key: Category; labelKey: string; route: string; directLink?: boolean }[] = [
  { key: "modelos", labelKey: "nav.line", route: "line" },
  { key: "tecnologia", labelKey: "nav.technology", route: "technology" },
  { key: "historia", labelKey: "nav.story", route: "story", directLink: true },
  { key: "dealers", labelKey: "nav.dealers", route: "dealers" },
  { key: "suporte", labelKey: "nav.support", route: "support" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("modelos");
  const { lang } = useParams();
  const { t } = useTranslation();

  return (
    <Overlay isOpen={isOpen} onClose={onClose} side="left" ariaLabel="Menu de navega\u00E7\u00E3o">
      <div className="flex h-full w-[90vw] max-w-4xl overflow-hidden">
        {/* Left: categories — white bg like Porsche */}
        <div className="w-2/5 bg-white p-6 flex flex-col border-r border-gray-200">
          <button
            onClick={onClose}
            className="self-end text-gray-900 text-2xl mb-8 hover:text-gray-500 transition-colors"
            aria-label="Fechar menu"
          >
            &#x2715;
          </button>
          <nav className="flex flex-col gap-0">
            {categories.map((cat) =>
              cat.directLink ? (
                <Link
                  key={cat.key}
                  to={`/${lang}/${cat.route}`}
                  onClick={onClose}
                  className="flex justify-between items-center py-4 border-b border-gray-200 text-left text-base text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {t(cat.labelKey)}
                  <span className="text-gray-400">›</span>
                </Link>
              ) : (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex justify-between items-center py-4 border-b border-gray-200 text-left text-base transition-colors ${
                    activeCategory === cat.key ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {t(cat.labelKey)}
                  <span className="text-gray-400">›</span>
                </button>
              )
            )}
            <a
              href="https://odery.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex justify-between items-center py-4 border-b border-gray-200 text-base text-gray-500 hover:text-gray-900 transition-colors"
            >
              Odery Drums
              <span className="text-gray-400">↗</span>
            </a>
          </nav>
        </div>
        {/* Right: content — light bg, scrollable */}
        <div className="w-3/5 bg-gray-50 p-6 overflow-y-auto overflow-x-hidden">
          {activeCategory === "modelos" ? (
            <SidebarModelList onNavigate={onClose} />
          ) : activeCategory === "tecnologia" ? (
            <SidebarTechnologyList onNavigate={onClose} />
          ) : activeCategory === "suporte" ? (
            <SidebarSupportList onNavigate={onClose} />
          ) : (
            <Link
              to={`/${lang}/${categories.find((c) => c.key === activeCategory)?.route}`}
              onClick={onClose}
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              {t(categories.find((c) => c.key === activeCategory)?.labelKey || "")} &rarr;
            </Link>
          )}
        </div>
      </div>
    </Overlay>
  );
}
