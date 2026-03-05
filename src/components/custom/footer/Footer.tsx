import { FooterLink } from './FooterLink';
import { FooterTitle } from './FooterTitle';

export function Footer() {
  return (
    <footer className="w-full mt-auto border-t-neutral-200 border-t-2">
      <div className="bg-[#f2f2f2] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-90 pb-4 sm:pb-6 pt-6 sm:pt-8 md:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 max-w-full">
          <div>
            <FooterTitle>Trámites</FooterTitle>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4">
              <li>
                <FooterLink href="https://www.argentina.gob.ar/turnos">Turnos</FooterLink>
              </li>
              <li>
                <FooterLink href="https://www.argentina.gob.ar/jefatura/innovacion-publica/administrativa/tramites-a-distancia">
                  Trámites a distancia
                </FooterLink>
              </li>
              <li>
                <FooterLink href="https://www.argentina.gob.ar/miargentina/mesadeayuda">
                  Atención a la ciudadanía
                </FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <FooterTitle>Acerca de la República Argentina</FooterTitle>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4">
              <li>
                <FooterLink href="https://www.argentina.gob.ar/pais">Nuestro país</FooterLink>
              </li>
              <li>
                <FooterLink href="https://www.argentina.gob.ar/normativa">Leyes argentinas</FooterLink>
              </li>
              <li>
                <FooterLink href="https://www.argentina.gob.ar/organismos">Organismos</FooterLink>
              </li>
              <li>
                <FooterLink href="https://www.argentina.gob.ar/jefatura/mapa-del-estado">Mapa del Estado</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <FooterTitle>Acerca de Argentina.gob.ar</FooterTitle>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4">
              <li>
                <FooterLink href="https://www.argentina.gob.ar/acerca">Acerca de este sitio</FooterLink>
              </li>
              <li>
                <FooterLink href="https://www.argentina.gob.ar/terminos-y-condiciones">
                  Términos y condiciones
                </FooterLink>
              </li>
              <li>
                <FooterLink href="https://www.argentina.gob.ar/sugerencias">Sugerencias</FooterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-jst-500 border-t-3 border-[#e7ba61] py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-100">
        <div className="w-full flex flex-col md:flex-row items-center justify-between">
          <div className="text-white text-sm opacity-80"></div>
        </div>
      </div>
    </footer>
  );
}
