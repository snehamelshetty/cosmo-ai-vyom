import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [liftoff, setLiftoff] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1200);
          return 100;
        }
        return p + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 15) setPhase(1);
    if (progress > 35) setPhase(2);
    if (progress > 55) { setPhase(3); setShowTitle(true); }
    if (progress > 75) setPhase(4);
    if (progress > 90) { setPhase(5); setLiftoff(true); }
  }, [progress]);

  const statusText = [
    "INITIATING PRE-FLIGHT SEQUENCE...",
    "FUELING PROPULSION SYSTEMS...",
    "CALIBRATING NAVIGATION ARRAY...",
    "ACTIVATING LIFE SUPPORT MODULES...",
    "T-MINUS 10... ENGINES IGNITING...",
    "🚀 LIFTOFF — MISSION MAITHRI LAUNCHED",
  ];

  // Rocket Y position based on progress
  const rocketY = liftoff ? -400 : 0;
  const engineIntensity = progress > 50 ? 1 : progress / 50;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Deep space background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[hsl(240,15%,8%)]" />
      
      {/* Nebula clouds */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-0 left-1/4 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[150px] rotate-12" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[200px]" />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[300px] rounded-full bg-glow-orange/5 blur-[120px]" />
      </motion.div>

      {/* Stars - multiple layers */}
      {Array.from({ length: 80 }).map((_, i) => {
        const size = i < 10 ? 3 : i < 30 ? 2 : 1;
        const duration = 2 + Math.random() * 4;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-foreground"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        );
      })}

      {/* Shooting stars */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`shoot-${i}`}
          className="absolute h-[2px] rounded-full"
          style={{
            width: `${80 + Math.random() * 100}px`,
            background: `linear-gradient(90deg, transparent, hsl(var(--primary)/0.8), hsl(var(--primary)), transparent)`,
            top: `${5 + Math.random() * 30}%`,
            left: `-15%`,
            filter: "blur(0.5px)",
          }}
          animate={{
            x: ["0vw", "130vw"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 0.5,
            repeat: Infinity,
            delay: i * 3 + Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Launch pad ground glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: `radial-gradient(ellipse at center bottom, hsl(var(--glow-orange)/${0.1 + engineIntensity * 0.3}) 0%, transparent 70%)`,
        }}
        animate={{
          opacity: progress > 50 ? [0.5, 1, 0.5] : 0.3,
        }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />

      {/* ROCKET ASSEMBLY */}
      <motion.div
        className="relative z-10"
        animate={{ 
          y: rocketY,
          scale: liftoff ? 0.8 : 1,
        }}
        transition={{ 
          duration: liftoff ? 2 : 0.5, 
          ease: liftoff ? [0.4, 0, 0.2, 1] : "easeOut" 
        }}
      >
        {/* Engine exhaust particles - behind rocket */}
        {progress > 40 && (
          <div className="absolute top-full left-1/2 -translate-x-1/2">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: 4 + Math.random() * 8,
                  height: 4 + Math.random() * 8,
                  background: `hsl(${30 + Math.random() * 30}, 100%, ${50 + Math.random() * 30}%)`,
                  left: `${-30 + Math.random() * 60}px`,
                  filter: "blur(1px)",
                }}
                animate={{
                  y: [0, 150 + Math.random() * 200],
                  x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 80],
                  opacity: [1, 0],
                  scale: [1, 0.2],
                }}
                transition={{
                  duration: 0.8 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Main exhaust flame */}
        {progress > 30 && (
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 origin-top"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ 
              scaleY: 0.5 + engineIntensity * 1.5,
              opacity: engineIntensity,
            }}
          >
            {/* Outer flame - orange/red */}
            <motion.div
              className="w-16 h-40 relative"
              animate={{ scaleY: [1, 1.1, 0.95, 1.05, 1] }}
              transition={{ duration: 0.15, repeat: Infinity }}
            >
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, 
                    hsl(45, 100%, 70%) 0%, 
                    hsl(35, 100%, 55%) 20%, 
                    hsl(20, 100%, 50%) 50%, 
                    hsl(10, 100%, 40%) 70%,
                    transparent 100%)`,
                  clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
                  filter: "blur(2px)",
                }}
              />
              {/* Inner flame - bright white/yellow core */}
              <div 
                className="absolute inset-x-4 inset-y-0"
                style={{
                  background: `linear-gradient(to bottom, 
                    hsl(50, 100%, 95%) 0%, 
                    hsl(45, 100%, 75%) 30%, 
                    hsl(40, 100%, 60%) 60%,
                    transparent 100%)`,
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
                  filter: "blur(1px)",
                }}
              />
            </motion.div>
            
            {/* Flame glow */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-48 rounded-full blur-xl"
              style={{
                background: `radial-gradient(ellipse, hsl(35, 100%, 60%/${0.4 + engineIntensity * 0.4}) 0%, transparent 70%)`,
              }}
            />
          </motion.div>
        )}

        {/* Rocket body */}
        <motion.div
          className="relative"
          animate={progress > 30 ? { 
            x: [0, -1, 1, -0.5, 0.5, 0],
          } : {}}
          transition={{ duration: 0.1, repeat: Infinity }}
        >
          {/* Rocket SVG */}
          <svg width="80" height="180" viewBox="0 0 80 180" className="drop-shadow-2xl">
            {/* Nose cone */}
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--muted))" />
                <stop offset="30%" stopColor="hsl(var(--foreground))" />
                <stop offset="70%" stopColor="hsl(var(--foreground))" />
                <stop offset="100%" stopColor="hsl(var(--muted))" />
              </linearGradient>
              <linearGradient id="noseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary)/0.6)" />
                <stop offset="50%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary)/0.6)" />
              </linearGradient>
              <linearGradient id="finGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent))" />
                <stop offset="100%" stopColor="hsl(var(--accent)/0.5)" />
              </linearGradient>
            </defs>
            
            {/* Nose cone */}
            <path 
              d="M 40 0 Q 25 30 25 50 L 55 50 Q 55 30 40 0" 
              fill="url(#noseGradient)"
              className="drop-shadow-lg"
            />
            
            {/* Main body */}
            <rect x="25" y="50" width="30" height="90" fill="url(#bodyGradient)" rx="2" />
            
            {/* Window */}
            <circle cx="40" cy="75" r="8" fill="hsl(var(--background))" stroke="hsl(var(--primary)/0.5)" strokeWidth="2" />
            <circle cx="40" cy="75" r="5" fill="hsl(var(--primary)/0.2)" />
            <motion.circle 
              cx="38" cy="73" r="2" 
              fill="hsl(var(--primary)/0.6)"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Body stripes */}
            <rect x="25" y="95" width="30" height="3" fill="hsl(var(--primary))" />
            <rect x="25" y="110" width="30" height="3" fill="hsl(var(--accent))" />
            <rect x="25" y="125" width="30" height="3" fill="hsl(var(--primary))" />
            
            {/* MAITHRI text on body */}
            <text x="40" y="88" textAnchor="middle" fontSize="5" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="bold">
              MAITHRI
            </text>
            
            {/* Engine section */}
            <rect x="22" y="140" width="36" height="15" fill="hsl(var(--muted-foreground))" rx="1" />
            <rect x="28" y="155" width="24" height="10" fill="hsl(var(--muted))" rx="1" />
            
            {/* Engine nozzles */}
            <ellipse cx="33" cy="165" rx="4" ry="2" fill="hsl(var(--muted-foreground))" />
            <ellipse cx="47" cy="165" rx="4" ry="2" fill="hsl(var(--muted-foreground))" />
            
            {/* Left fin */}
            <path 
              d="M 25 130 L 5 170 L 5 175 L 25 155 Z" 
              fill="url(#finGradient)"
            />
            
            {/* Right fin */}
            <path 
              d="M 55 130 L 75 170 L 75 175 L 55 155 Z" 
              fill="url(#finGradient)"
            />
            
            {/* Center fin (back) */}
            <path 
              d="M 38 135 L 38 175 L 42 175 L 42 135 Z" 
              fill="hsl(var(--accent)/0.7)"
            />
          </svg>

          {/* Rocket glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl -z-10"
            style={{
              background: `radial-gradient(ellipse, hsl(var(--primary)/0.15) 0%, transparent 70%)`,
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Smoke clouds at base during ignition */}
        {progress > 25 && progress < 95 && (
          <div className="absolute top-[90%] left-1/2 -translate-x-1/2">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`smoke-${i}`}
                className="absolute rounded-full bg-muted-foreground/20"
                style={{
                  width: 30 + Math.random() * 40,
                  height: 30 + Math.random() * 40,
                  filter: "blur(8px)",
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0.3,
                  opacity: 0 
                }}
                animate={{
                  x: (Math.random() - 0.5) * 200,
                  y: Math.random() * 100 + 20,
                  scale: [0.3, 1.5, 2],
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Title reveal */}
      <AnimatePresence>
        {showTitle && (
          <motion.div 
            className="absolute top-[12%] text-center z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "1em", scale: 1.2 }}
              animate={{ opacity: 1, letterSpacing: "0.35em", scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-orbitron text-4xl md:text-6xl font-bold text-foreground mb-3"
            >
              MAITHRI
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto max-w-xs"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1 }}
              className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground mt-3 uppercase"
            >
              Mars Astronaut Integrated Training & Health Response Intelligence
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mission control style progress */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 md:w-96">
        {/* Outer glow */}
        <motion.div
          className="absolute -inset-4 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse, hsl(var(--primary)/${0.05 + engineIntensity * 0.1}) 0%, transparent 70%)`,
          }}
        />

        {/* Progress bar container */}
        <div className="relative bg-muted/20 rounded-full p-1 border border-border/30 backdrop-blur-sm">
          <div className="h-3 bg-muted/30 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full rounded-full relative"
              style={{
                width: `${Math.min(progress, 100)}%`,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Gradient fill */}
              <div 
                className="absolute inset-0"
                style={{
                  background: progress > 90 
                    ? `linear-gradient(90deg, hsl(var(--glow-green)), hsl(var(--glow-green)/0.8))`
                    : `linear-gradient(90deg, hsl(var(--primary)/0.5), hsl(var(--primary)), hsl(var(--accent)))`,
                }}
              />
              
              {/* Animated shine */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)`,
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Bright tip */}
              <motion.div 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                style={{
                  background: progress > 90 ? "hsl(var(--glow-green))" : "hsl(var(--primary))",
                  boxShadow: `0 0 20px ${progress > 90 ? "hsl(var(--glow-green))" : "hsl(var(--primary))"}`,
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>

        {/* Status display */}
        <div className="flex justify-between items-center mt-4 px-2">
          <motion.div
            key={phase}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <motion.span
              className={`w-2 h-2 rounded-full ${phase >= 5 ? 'bg-glow-green' : 'bg-primary'}`}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <span className={`font-mono text-[9px] tracking-wider ${phase >= 5 ? 'text-glow-green' : 'text-muted-foreground'}`}>
              {statusText[phase]}
            </span>
          </motion.div>
          <span className={`font-mono text-sm font-bold tabular-nums ${phase >= 5 ? 'text-glow-green' : 'text-primary'}`}>
            {Math.min(Math.round(progress), 100)}%
          </span>
        </div>

        {/* Phase indicators */}
        <div className="flex justify-between mt-4 px-4">
          {["PRE-FLIGHT", "FUEL", "NAV", "LIFE-SUPPORT", "IGNITION", "LIFTOFF"].map((label, p) => (
            <motion.div
              key={p}
              className="flex flex-col items-center gap-1"
            >
              <motion.div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  phase >= p 
                    ? p === 5 
                      ? "bg-glow-green shadow-[0_0_8px_hsl(var(--glow-green))]" 
                      : "bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.5)]" 
                    : "bg-muted/30"
                }`}
                animate={phase === p ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <span className={`text-[6px] font-mono tracking-wider ${phase >= p ? 'text-foreground/60' : 'text-muted-foreground/30'}`}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-primary/20 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-primary/20 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-primary/20 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-primary/20 rounded-br-lg" />
    </motion.div>
  );
};

export default LoadingScreen;
