import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Health Monitor", path: "/health-monitoring" },
  { label: "Fatigue AI", path: "/fatigue-prediction" },
  { label: "Psych Support", path: "/psychological-support" },
  { label: "Fitness", path: "/fitness-trainer" },
  { label: "Sound Therapy", path: "/sound-therapy" },
  { label: "Galaxy Map", path: "/galaxy-map" },
  { label: "Before & After", path: "/before-after-space" },
  { label: "Vehicles", path: "/mission-vehicles" },
];

const NavBar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 border-b border-border/20 backdrop-blur-2xl bg-background/30"
    >
      <div className="container mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-orbitron font-bold text-sm text-primary/80 text-glow-star tracking-[0.3em]">
          MAITHRI
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(l => (
            <Link key={l.path} to={l.path}
              className={`text-[9px] font-mono transition-colors duration-500 tracking-[0.15em] uppercase ${
                location.pathname === l.path ? "text-primary text-glow-star" : "text-muted-foreground hover:text-primary/70"
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

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-muted-foreground hover:text-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden border-t border-border/20 bg-background/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map(l => (
              <Link key={l.path} to={l.path} onClick={() => setMobileOpen(false)}
                className={`block py-2 px-3 rounded-lg text-xs font-mono tracking-wider transition-all ${
                  location.pathname === l.path ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                }`}>
                {l.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default NavBar;
