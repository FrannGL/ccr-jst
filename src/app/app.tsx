import { Footer } from "@/components/custom/footer/Footer";
import { Navbar } from "@/components/custom/navbar/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppRouter } from "@/router/app-router";

function App() {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <AppRouter />
        <Footer />
      </div>
    </TooltipProvider>
  );
}

export default App;
