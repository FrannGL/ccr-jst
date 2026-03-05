import { Route, Routes } from "react-router-dom";

import { HomePage } from "@/pages/home-page";
import { SucesoPage } from "@/pages/suceso-page";
import { NuevoSucesoPage } from "@/pages/nuevo-suceso-page";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/nuevo-suceso" element={<NuevoSucesoPage />} />
      <Route path="/sucesos/:id" element={<SucesoPage />} />
    </Routes>
  );
}
