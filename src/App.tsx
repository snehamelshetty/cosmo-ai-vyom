import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import FeaturesPage from "./pages/FeaturesPage";
import AboutPage from "./pages/AboutPage";
import SoundTherapyPage from "./pages/SoundTherapyPage";
import FitnessTrainerPage from "./pages/FitnessTrainerPage";
import PsychologicalSupportPage from "./pages/PsychologicalSupportPage";
import FatiguePredictionPage from "./pages/FatiguePredictionPage";
import HealthMonitoringPage from "./pages/HealthMonitoringPage";
import MentalHealthPage from "./pages/MentalHealthPage";
import PhysicalHealthPage from "./pages/PhysicalHealthPage";
import BeforeAfterSpacePage from "./pages/BeforeAfterSpacePage";
import MissionVehiclesPage from "./pages/MissionVehiclesPage";
import GalaxyMapPage from "./pages/GalaxyMapPage";
import SkyViewerPage from "./pages/SkyViewerPage";
import MoodJournalPage from "./pages/MoodJournalPage";
import CrewCommunicationPage from "./pages/CrewCommunicationPage";
import EnvironmentMonitoringPage from "./pages/EnvironmentMonitoringPage";
import AIAssistantPage from "./pages/AIAssistantPage";

const queryClient = new QueryClient();

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: "easeInOut" as const },
};

const P = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageTransition}>
        <Routes location={location}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<P><Index /></P>} />
          <Route path="/features" element={<P><FeaturesPage /></P>} />
          <Route path="/about" element={<P><AboutPage /></P>} />
          <Route path="/sound-therapy" element={<P><SoundTherapyPage /></P>} />
          <Route path="/fitness-trainer" element={<P><FitnessTrainerPage /></P>} />
          <Route path="/psychological-support" element={<P><PsychologicalSupportPage /></P>} />
          <Route path="/fatigue-prediction" element={<P><FatiguePredictionPage /></P>} />
          <Route path="/health-monitoring" element={<P><HealthMonitoringPage /></P>} />
          <Route path="/mental-health" element={<P><MentalHealthPage /></P>} />
          <Route path="/physical-health" element={<P><PhysicalHealthPage /></P>} />
          <Route path="/before-after-space" element={<P><BeforeAfterSpacePage /></P>} />
          <Route path="/mission-vehicles" element={<P><MissionVehiclesPage /></P>} />
          <Route path="/galaxy-map" element={<P><GalaxyMapPage /></P>} />
          <Route path="/sky-viewer" element={<P><SkyViewerPage /></P>} />
          <Route path="/mood-journal" element={<P><MoodJournalPage /></P>} />
          <Route path="/crew-communication" element={<P><CrewCommunicationPage /></P>} />
          <Route path="/environment-monitoring" element={<P><EnvironmentMonitoringPage /></P>} />
          <Route path="/ai-assistant" element={<P><AIAssistantPage /></P>} />
          <Route path="/crew-management" element={<P><CrewManagementPage /></P>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const handleLoadComplete = useCallback(() => setLoading(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence>
          {loading && <LoadingScreen onComplete={handleLoadComplete} />}
        </AnimatePresence>
        <BrowserRouter>
          <AuthProvider>
            <AnimatedRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
