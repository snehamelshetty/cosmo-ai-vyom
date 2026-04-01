import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const mainLinks = [
  { label: "Home", path: "/" },
  { label: "Health Monitoring", path: "/health-monitoring" },
  { label: "Mission Vehicles", path: "/mission-vehicles" },
  { label: "Before vs After", path: "/before-after-space" },
  { label: "Sky Viewer", path: "/sky-viewer" },
  { label: "About", path: "/about" },
];

const featureLinks = [
  { label: "Mood Journal", path: "/mood-journal" },
  { label: "Crew Communication", path: "/crew-communication" },
  { label: "Environment Monitoring", path: "/environment-monitoring" },
  { label: "Acoustic Relaxation", path: "/sound-therapy" },
  { label: "AI Fatigue Prediction", path: "/fatigue-prediction" },
  { label: "Cognitive Fitness Trainer", path: "/fitness-trainer" },
  { label: "AI Psychological Support", path: "/psychological-support" },
  { label: "Mental Health Monitoring", path: "/mental-health" },
  { label: "Physical Health Monitoring", path: "/physical-health" },
];

const NavBar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isFeaturePage = featureLinks.some(f => f.path === location.pathname) || location.pathname === "/features";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFeaturesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-40 border-b border-border/20 backdrop-blur-2xl bg-background/40"
    >
      <div className="container mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-orbitron font-bold text-sm text-primary/80 text-glow-star tracking-[0.3em] hover:text-primary transition-colors">
          COSMO
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Home */}
          <Link to="/"
            className={`px-3 py-1.5 rounded-md text-[9px] font-mono transition-all duration-300 tracking-[0.12em] uppercase ${
              location.pathname === "/" ? "text-primary bg-primary/8 text-glow-star" : "text-muted-foreground hover:text-primary/70 hover:bg-primary/5"
            }`}>
            Home
          </Link>

          {/* Features dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setFeaturesOpen(!featuresOpen)}
              onMouseEnter={() => setFeaturesOpen(true)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-[9px] font-mono transition-all duration-300 tracking-[0.12em] uppercase ${
                isFeaturePage ? "text-primary bg-primary/8 text-glow-star" : "text-muted-foreground hover:text-primary/70 hover:bg-primary/5"
              }`}
            >
              Features
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${featuresOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {featuresOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onMouseLeave={() => setFeaturesOpen(false)}
                  className="absolute top-full left-0 mt-1 w-56 rounded-lg border border-border/30 bg-background/95 backdrop-blur-xl shadow-xl shadow-primary/5 overflow-hidden"
                >
                  <Link to="/features" onClick={() => setFeaturesOpen(false)}
                    className="block px-4 py-2.5 text-[9px] font-mono tracking-wider text-primary/70 hover:bg-primary/5 border-b border-border/20 transition-all">
                    ◈ ALL FEATURES
                  </Link>
                  {featureLinks.map(f => (
                    <Link key={f.path} to={f.path} onClick={() => setFeaturesOpen(false)}
                      className={`block px-4 py-2 text-[9px] font-mono tracking-wider transition-all duration-200 ${
                        location.pathname === f.path
                          ? "text-primary bg-primary/8"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/20 hover:pl-5"
                      }`}>
                      {f.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other main links */}
          {mainLinks.slice(1).map(l => (
            <Link key={l.path} to={l.path}
              className={`px-3 py-1.5 rounded-md text-[9px] font-mono transition-all duration-300 tracking-[0.12em] uppercase ${
                location.pathname === l.path
                  ? "text-primary bg-primary/8 text-glow-star"
                  : "text-muted-foreground hover:text-primary/70 hover:bg-primary/5"
              }`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-glow-green/60 animate-pulse" />
            <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wider">ONLINE</span>
          </span>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-muted-foreground hover:text-foreground transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/20 bg-background/95 backdrop-blur-xl max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              <Link to="/" onClick={() => setMobileOpen(false)}
                className={`block py-2.5 px-4 rounded-lg text-xs font-mono tracking-wider transition-all ${
                  location.pathname === "/" ? "text-primary bg-primary/8 glow-star" : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                }`}>
                Home
              </Link>

              {/* Features section */}
              <div className="py-1">
                <Link to="/features" onClick={() => setMobileOpen(false)}
                  className="block py-2.5 px-4 rounded-lg text-xs font-mono tracking-wider text-primary/60 font-bold">
                  ◈ FEATURES
                </Link>
                <div className="pl-4 space-y-0.5">
                  {featureLinks.map(f => (
                    <Link key={f.path} to={f.path} onClick={() => setMobileOpen(false)}
                      className={`block py-2 px-4 rounded-lg text-[10px] font-mono tracking-wider transition-all ${
                        location.pathname === f.path ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                      }`}>
                      {f.label}
                    </Link>
                  ))}
                </div>
              </div>

              {mainLinks.slice(1).map(l => (
                <Link key={l.path} to={l.path} onClick={() => setMobileOpen(false)}
                  className={`block py-2.5 px-4 rounded-lg text-xs font-mono tracking-wider transition-all ${
                    location.pathname === l.path ? "text-primary bg-primary/8 glow-star" : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                  }`}>
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;
