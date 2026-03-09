export function Breadcrumb() {
  return (
    <div className="bg-[#333] border-t-[3px] border-[#e7ba61]">
      <div className="w-full app-container-wide">
        <nav className="flex items-center space-x-1 sm:space-x-2 py-1.5 text-xs font-medium flex-wrap">
          <a
            href="https://www.argentina.gob.ar/economia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-neutral-400 transition-colors"
          >
            Ministerio de Economía
          </a>
          <span className="text-gray-400 shrink-0">/</span>
          <a
            href="https://www.argentina.gob.ar/transporte"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-neutral-400 transition-colors"
          >
            Transporte
          </a>
          <span className="text-gray-400 shrink-0">/</span>
          <a
            href="https://www.argentina.gob.ar/jst"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-neutral-400 transition-colors"
          >
            Junta de Seguridad en el Transporte (JST)
          </a>
          <span className="text-gray-400 shrink-0">/</span>
        </nav>
      </div>
    </div>
  );
}
