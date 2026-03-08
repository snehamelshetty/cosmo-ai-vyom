import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SoundTherapyPage from "./pages/SoundTherapyPage";
import FitnessTrainerPage from "./pages/FitnessTrainerPage";
import PsychologicalSupportPage from "./pages/PsychologicalSupportPage";
import FatiguePredictionPage from "./pages/FatiguePredictionPage";
import HealthMonitoringPage from "./pages/HealthMonitoringPage";
import BeforeAfterSpacePage from "./pages/BeforeAfterSpacePage";
import MissionVehiclesPage from "./pages/MissionVehiclesPage";
import GalaxyMapPage from "./pages/GalaxyMapPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sound-therapy" element={<SoundTherapyPage />} />
          <Route path="/fitness-trainer" element={<FitnessTrainerPage />} />
          <Route path="/psychological-support" element={<PsychologicalSupportPage />} />
          <Route path="/fatigue-prediction" element={<FatiguePredictionPage />} />
          <Route path="/health-monitoring" element={<HealthMonitoringPage />} />
          <Route path="/before-after-space" element={<BeforeAfterSpacePage />} />
          <Route path="/mission-vehicles" element={<MissionVehiclesPage />} />
          <Route path="/galaxy-map" element={<GalaxyMapPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
