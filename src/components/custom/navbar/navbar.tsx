import { Link } from "react-router-dom";

import logoArgentina from "@/assets/images/logo_argentina-azul.svg";

import { Breadcrumb } from "./breadcrumb";

export function Navbar() {
  return (
    <header className="w-full border-b bg-white">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center app-container-wide py-3">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={logoArgentina}
                alt="Argentina"
                className="h-8 sm:h-10 md:h-12 lg:h-13 w-auto"
              />
            </Link>
          </div>
        </div>

        <Breadcrumb />
      </div>
    </header>
  );
}
