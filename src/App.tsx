import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback, lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingScreen from "./components/LoadingScreen";

// Eagerly load the most critical pages
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";

// Lazy load all other pages for code splitting
const NotFound = lazy(() => import("./pages/NotFound"));
const FeaturesPage = lazy(() => import("./pages/FeaturesPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const SoundTherapyPage = lazy(() => import("./pages/SoundTherapyPage"));
const FitnessTrainerPage = lazy(() => import("./pages/FitnessTrainerPage"));
const PsychologicalSupportPage = lazy(() => import("./pages/PsychologicalSupportPage"));
const FatiguePredictionPage = lazy(() => import("./pages/FatiguePredictionPage"));
const HealthMonitoringPage = lazy(() => import("./pages/HealthMonitoringPage"));
const MentalHealthPage = lazy(() => import("./pages/MentalHealthPage"));
const PhysicalHealthPage = lazy(() => import("./pages/PhysicalHealthPage"));
const BeforeAfterSpacePage = lazy(() => import("./pages/BeforeAfterSpacePage"));
const MissionVehiclesPage = lazy(() => import("./pages/MissionVehiclesPage"));
const GalaxyMapPage = lazy(() => import("./pages/GalaxyMapPage"));
const SkyViewerPage = lazy(() => import("./pages/SkyViewerPage"));
const MoodJournalPage = lazy(() => import("./pages/MoodJournalPage"));
const CrewCommunicationPage = lazy(() => import("./pages/CrewCommunicationPage"));
const EnvironmentMonitoringPage = lazy(() => import("./pages/EnvironmentMonitoringPage"));
const AIAssistantPage = lazy(() => import("./pages/AIAssistantPage"));
const CrewManagementPage = lazy(() => import("./pages/CrewManagementPage"));

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

const LazyFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageTransition}>
        <Suspense fallback={<LazyFallback />}>
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
        </Suspense>
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
