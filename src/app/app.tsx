import { AppRouter } from "@/router/app-router";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Footer } from "@/components/custom/footer/Footer";
import { Navbar } from "@/components/custom/navbar/navbar";

function App() {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <AppRouter />
        </main>
        <Footer />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export default App;
