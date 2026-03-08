import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 600);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 30) setPhase(1);
    if (progress > 60) setPhase(2);
    if (progress > 90) setPhase(3);
  }, [progress]);

  const statusText = [
    "INITIALIZING SYSTEMS...",
    "CONNECTING TO DEEP SPACE NETWORK...",
    "LOADING ASTRONAUT MODULES...",
    "MISSION READY",
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Star particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full bg-primary/60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Nebula glow */}
      <div className="absolute w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute w-64 h-64 rounded-full bg-primary/5 blur-[100px] translate-x-20 -translate-y-10" />

      {/* Logo ring */}
      <div className="relative mb-12">
        <motion.div
          className="w-32 h-32 rounded-full border border-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border border-accent/15"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="font-orbitron text-2xl font-black text-primary text-glow-star tracking-[0.15em]">
            M
          </span>
        </motion.div>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-orbitron text-3xl font-bold text-foreground tracking-[0.3em] mb-2"
      >
        MAITHRI
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.8 }}
        className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground mb-12 uppercase"
      >
        Deep Space Wellbeing System
      </motion.p>

      {/* Progress bar */}
      <div className="w-64 relative">
        <div className="h-[2px] bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary/60 via-primary to-accent/60 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
            {statusText[phase]}
          </span>
          <span className="font-mono text-[10px] text-primary/70">
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
