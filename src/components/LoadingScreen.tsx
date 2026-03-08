import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 900);
          return 100;
        }
        return p + 1.2;
      });
    }, 45);
    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 20) setPhase(1);
    if (progress > 45) setPhase(2);
    if (progress > 70) { setPhase(3); setShowTitle(true); }
    if (progress > 92) setPhase(4);
  }, [progress]);

  const statusText = [
    "INITIALIZING QUANTUM SYSTEMS...",
    "ESTABLISHING DEEP SPACE UPLINK...",
    "CALIBRATING BIOMETRIC SENSORS...",
    "SYNCHRONIZING CREW MODULES...",
    "MISSION READY — ALL SYSTEMS NOMINAL",
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Deep space nebula layers */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3 }}
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[200px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/4 blur-[250px] rotate-45" />
      </motion.div>

      {/* Shooting stars */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`shoot-${i}`}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/80 to-transparent"
          style={{
            width: `${60 + Math.random() * 120}px`,
            top: `${10 + Math.random() * 40}%`,
            left: `-10%`,
          }}
          animate={{
            x: ["0vw", "120vw"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            repeat: Infinity,
            delay: i * 1.8 + Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Star particles - layered depths */}
      {Array.from({ length: 60 }).map((_, i) => {
        const size = i < 10 ? 3 : i < 30 ? 2 : 1;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-foreground/70"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.9, 0.1],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        );
      })}

      {/* Orbital rings */}
      <div className="relative mb-16">
        {/* Outer orbit */}
        <motion.div
          className="w-44 h-44 rounded-full border border-primary/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-primary/60 shadow-[0_0_12px_hsl(var(--primary)/0.6)]"
            style={{ top: -4, left: "50%", marginLeft: -4 }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Middle orbit */}
        <motion.div
          className="absolute inset-4 rounded-full border border-accent/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-accent/50 shadow-[0_0_8px_hsl(var(--accent)/0.5)]"
            style={{ bottom: -3, left: "50%", marginLeft: -3 }}
          />
        </motion.div>

        {/* Inner orbit */}
        <motion.div
          className="absolute inset-8 rounded-full border border-primary/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Core logo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="font-orbitron text-3xl font-black text-primary text-glow-star tracking-[0.15em] relative z-10">
              M
            </span>
          </div>
        </motion.div>
      </div>

      {/* Title with cinematic reveal */}
      <AnimatePresence>
        {showTitle && (
          <motion.div className="text-center mb-4">
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.8em", scale: 1.1 }}
              animate={{ opacity: 1, letterSpacing: "0.3em", scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-orbitron text-4xl md:text-5xl font-bold text-foreground mb-2"
            >
              MAITHRI
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto max-w-xs"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2 }}
        className="font-mono text-[10px] tracking-[0.5em] text-muted-foreground mb-14 uppercase"
      >
        Deep Space Wellbeing System
      </motion.p>

      {/* Cinematic progress bar */}
      <div className="w-72 md:w-80 relative">
        {/* Glow behind bar */}
        <motion.div
          className="absolute -inset-2 rounded-full bg-primary/10 blur-md"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="h-[3px] bg-muted/30 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full relative"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: `linear-gradient(90deg, hsl(var(--primary)/0.4), hsl(var(--primary)), hsl(var(--accent)/0.8))`,
            }}
          >
            {/* Bright tip */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.8)]" />
          </motion.div>
        </div>

        {/* Status text */}
        <div className="flex justify-between mt-4 items-center">
          <motion.span
            key={phase}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-[9px] text-muted-foreground tracking-wider"
          >
            {statusText[phase]}
          </motion.span>
          <span className="font-mono text-[11px] text-primary/80 font-bold tabular-nums">
            {Math.min(Math.round(progress), 100)}%
          </span>
        </div>

        {/* Phase indicators */}
        <div className="flex justify-between mt-3 px-1">
          {[0, 1, 2, 3, 4].map((p) => (
            <motion.div
              key={p}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                phase >= p ? "bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.5)]" : "bg-muted/30"
              }`}
              animate={phase === p ? { scale: [1, 1.5, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
};

export default LoadingScreen;
