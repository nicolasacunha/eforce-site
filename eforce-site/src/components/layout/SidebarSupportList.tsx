import { Link, useParams } from "react-router-dom";

interface SidebarSupportListProps {
  onNavigate: () => void;
}

const manuais = [
  { name: "EF2 V1", img: "/assets/images/kits/ef2v1-manual.webp", href: "/assets/manuais/manual-ef2v1.pdf" },
  { name: "EF2 V2", img: "/assets/images/kits/ef2v2-manual.webp", href: "/assets/manuais/manual-ef2v2.pdf" },
  { name: "EF2 V3", img: "/assets/images/kits/ef2v3-manual.webp", href: "/assets/manuais/manual-ef2v3.pdf" },
  { name: "EF2 V4", img: "/assets/images/kits/ef2v4-manual.webp", href: "/assets/manuais/manual-ef2v4.pdf" },
  { name: "EF5 V2", img: "/assets/images/kits/ef5v2-manual.webp", href: "/assets/manuais/manual-ef5v2.pdf" },
];

export function SidebarSupportList({ onNavigate }: SidebarSupportListProps) {
  const { lang } = useParams();

  return (
    <div className="flex flex-col gap-10">

      {/* Manuais */}
      <div>
        <Link
          to={`/${lang}/support`}
          onClick={onNavigate}
          className="group block"
        >
          <h3 className="text-gray-900 font-bold text-xl mb-4 group-hover:text-brand-orange transition-colors">
            Manuais
          </h3>
        </Link>
        <div className="flex flex-col gap-3">
          {manuais.map((item) => (
            <a
              key={item.name}
              href={item.href}
              download
              className="flex items-center gap-3 group"
            >
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="w-12 h-12 object-contain shrink-0 rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-brand-orange transition-colors">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400">Manual do Usuário — PDF</p>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-brand-orange transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Garantia */}
      <div>
        <h3 className="text-gray-900 font-bold text-xl mb-4">Garantia</h3>
        <a
          href="/assets/manuais/garantia_eforce.pdf"
          download
          className="flex items-center gap-3 group"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded shrink-0">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 group-hover:text-brand-orange transition-colors">Garantia E-Force</p>
            <p className="text-xs text-gray-400">Política de Garantia — PDF</p>
          </div>
          <svg className="w-4 h-4 text-gray-400 group-hover:text-brand-orange transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
          </svg>
        </a>
      </div>

      {/* Contato */}
      <div>
        <h3 className="text-gray-900 font-bold text-xl mb-4">Contato</h3>
        <div className="flex flex-col gap-3">
          <a
            href="mailto:eforce@odery.com.br"
            onClick={onNavigate}
            className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span className="text-gray-700 font-medium text-sm">eforce@odery.com.br</span>
          </a>
        </div>
      </div>

    </div>
  );
}
