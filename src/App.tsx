import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
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

const queryClient = new QueryClient();

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: "easeInOut" as const },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageTransition}>
        <Routes location={location}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/features" element={<ProtectedRoute><FeaturesPage /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
          <Route path="/sound-therapy" element={<ProtectedRoute><SoundTherapyPage /></ProtectedRoute>} />
          <Route path="/fitness-trainer" element={<ProtectedRoute><FitnessTrainerPage /></ProtectedRoute>} />
          <Route path="/psychological-support" element={<ProtectedRoute><PsychologicalSupportPage /></ProtectedRoute>} />
          <Route path="/fatigue-prediction" element={<ProtectedRoute><FatiguePredictionPage /></ProtectedRoute>} />
          <Route path="/health-monitoring" element={<ProtectedRoute><HealthMonitoringPage /></ProtectedRoute>} />
          <Route path="/mental-health" element={<ProtectedRoute><MentalHealthPage /></ProtectedRoute>} />
          <Route path="/physical-health" element={<ProtectedRoute><PhysicalHealthPage /></ProtectedRoute>} />
          <Route path="/before-after-space" element={<ProtectedRoute><BeforeAfterSpacePage /></ProtectedRoute>} />
          <Route path="/mission-vehicles" element={<ProtectedRoute><MissionVehiclesPage /></ProtectedRoute>} />
          <Route path="/galaxy-map" element={<ProtectedRoute><GalaxyMapPage /></ProtectedRoute>} />
          <Route path="/sky-viewer" element={<ProtectedRoute><SkyViewerPage /></ProtectedRoute>} />
          <Route path="/mood-journal" element={<ProtectedRoute><MoodJournalPage /></ProtectedRoute>} />
          <Route path="/crew-communication" element={<ProtectedRoute><CrewCommunicationPage /></ProtectedRoute>} />
          <Route path="/environment-monitoring" element={<ProtectedRoute><EnvironmentMonitoringPage /></ProtectedRoute>} />
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
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence>
            {loading && <LoadingScreen onComplete={handleLoadComplete} />}
          </AnimatePresence>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
