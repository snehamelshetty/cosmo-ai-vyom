import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";

// Pre-generate random values outside render
const createStars = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    size: i < 10 ? 3 : i < 30 ? 2 : 1,
    left: Math.random() * 100,
    top: Math.random() * 70,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 3,
  }));

const createShootingStars = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    width: 80 + Math.random() * 100,
    top: 5 + Math.random() * 30,
    duration: 2 + Math.random() * 0.5,
    delay: i * 3 + Math.random() * 2,
  }));

const createParticles = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    w: 4 + Math.random() * 8,
    h: 4 + Math.random() * 8,
    hue: 30 + Math.random() * 30,
    lightness: 50 + Math.random() * 30,
    offsetX: -30 + Math.random() * 60,
    driftX: (Math.random() - 0.5) * 80,
    travelY: 150 + Math.random() * 200,
    duration: 0.8 + Math.random() * 0.5,
    delay: i * 0.08,
  }));

const createSmokeClouds = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 30 + Math.random() * 40,
    driftX: (Math.random() - 0.5) * 200,
    driftY: Math.random() * 100 + 20,
    duration: 2 + Math.random(),
    delay: i * 0.2,
  }));

const createTrailSegments = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    width: 8 + Math.random() * 12,
    offsetX: (Math.random() - 0.5) * 20,
    delay: i * 0.03,
    opacity: 1 - i / count,
  }));

const createSparkles = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 5,
    angle: Math.random() * 360,
    distance: 40 + Math.random() * 120,
    duration: 1 + Math.random() * 1.5,
    delay: Math.random() * 0.8,
    hue: 30 + Math.random() * 40,
  }));

const STARS = createStars(60);
const SHOOTING_STARS = createShootingStars(4);
const PARTICLES = createParticles(16);
const SMOKE_CLOUDS = createSmokeClouds(10);
const TRAIL_SEGMENTS = createTrailSegments(30);
const SPARKLES = createSparkles(40);

// Web Audio API for synthesized sounds
const useRocketSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const rumbleNodesRef = useRef<{ osc: OscillatorNode; gain: GainNode; noise: AudioBufferSourceNode | null } | null>(null);
  const isPlayingRef = useRef(false);

  const createNoiseBuffer = useCallback((ctx: AudioContext) => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }, []);

  const startRumble = useCallback((intensity: number = 0.3) => {
    if (isPlayingRef.current) return;
    
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = ctx;

      // Low frequency oscillator for rumble
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(35, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(55, ctx.currentTime + 2);

      // Gain for volume control
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(intensity * 0.15, ctx.currentTime + 0.5);

      // Low pass filter for deep rumble
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(120, ctx.currentTime);

      // Noise for texture
      const noiseBuffer = createNoiseBuffer(ctx);
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(intensity * 0.08, ctx.currentTime);

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.setValueAtTime(200, ctx.currentTime);

      // Connect oscillator chain
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      // Connect noise chain
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      osc.start();
      noise.start();

      rumbleNodesRef.current = { osc, gain, noise };
      isPlayingRef.current = true;
    } catch (e) {
      console.log("Audio not supported:", e);
    }
  }, [createNoiseBuffer]);

  const intensifyRumble = useCallback((intensity: number) => {
    if (!audioContextRef.current || !rumbleNodesRef.current) return;
    const ctx = audioContextRef.current;
    const { gain, osc } = rumbleNodesRef.current;
    
    gain.gain.linearRampToValueAtTime(Math.min(intensity * 0.2, 0.3), ctx.currentTime + 0.1);
    osc.frequency.linearRampToValueAtTime(40 + intensity * 30, ctx.currentTime + 0.1);
  }, []);

  const playLiftoffWhoosh = useCallback(() => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    try {
      // Swoosh using filtered noise with frequency sweep
      const noiseBuffer = createNoiseBuffer(ctx);
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(300, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.3);
      filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 1.5);
      filter.Q.setValueAtTime(2, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 2);

      // Fade out rumble
      if (rumbleNodesRef.current) {
        rumbleNodesRef.current.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      }
    } catch (e) {
      console.log("Whoosh audio error:", e);
    }
  }, [createNoiseBuffer]);

  const stopAll = useCallback(() => {
    if (rumbleNodesRef.current) {
      try {
        rumbleNodesRef.current.osc.stop();
        rumbleNodesRef.current.noise?.stop();
      } catch (e) {
        // Already stopped
      }
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    isPlayingRef.current = false;
    rumbleNodesRef.current = null;
    audioContextRef.current = null;
  }, []);

  return { startRumble, intensifyRumble, playLiftoffWhoosh, stopAll };
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [liftoff, setLiftoff] = useState(false);
  const [showTrail, setShowTrail] = useState(false);
  const [trailPosition, setTrailPosition] = useState(0);
  const [showSparkleDisperse, setShowSparkleDisperse] = useState(false);

  const { startRumble, intensifyRumble, playLiftoffWhoosh, stopAll } = useRocketSound();
  const soundStartedRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            stopAll();
            onComplete();
          }, 1200);
          return 100;
        }
        return p + 1;
      });
    }, 50);
    return () => {
      clearInterval(timer);
      stopAll();
    };
  }, [onComplete, stopAll]);

  useEffect(() => {
    if (progress > 15) setPhase(1);
    if (progress > 35) setPhase(2);
    if (progress > 55) { setPhase(3); setShowTitle(true); }
    if (progress > 75) setPhase(4);
    if (progress > 90) { 
      setPhase(5); 
      setLiftoff(true);
      setShowTrail(true);
      playLiftoffWhoosh();
      // Trigger sparkle disperse after rocket leaves
      setTimeout(() => setShowSparkleDisperse(true), 1200);
    }

    // Start rumble at ignition phase
    if (progress > 30 && !soundStartedRef.current) {
      soundStartedRef.current = true;
      startRumble(0.3);
    }

    // Intensify as we approach liftoff
    if (progress > 30 && progress <= 90) {
      const intensity = (progress - 30) / 60;
      intensifyRumble(intensity);
    }
  }, [progress, startRumble, intensifyRumble, playLiftoffWhoosh]);

  // Animate trail position after liftoff
  useEffect(() => {
    if (liftoff) {
      const interval = setInterval(() => {
        setTrailPosition((p) => Math.min(p + 15, 500));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [liftoff]);

  const statusText = useMemo(() => [
    "INITIATING PRE-FLIGHT SEQUENCE...",
    "FUELING PROPULSION SYSTEMS...",
    "CALIBRATING NAVIGATION ARRAY...",
    "ACTIVATING LIFE SUPPORT MODULES...",
    "T-MINUS 10... ENGINES IGNITING...",
    "LIFTOFF — MISSION COSMO LAUNCHED",
  ], []);

  const rocketY = liftoff ? -400 : 0;
  const engineIntensity = progress > 50 ? 1 : progress / 50;
  const showFlame = progress > 30;
  const showParticles = progress > 40;
  const showSmoke = progress > 25 && progress < 95;

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
      </motion.div>

      {/* Stars */}
      {STARS.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-foreground"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
        />
      ))}

      {/* Shooting stars */}
      {SHOOTING_STARS.map((s) => (
        <motion.div
          key={`shoot-${s.id}`}
          className="absolute h-[2px] rounded-full"
          style={{
            width: `${s.width}px`,
            background: "linear-gradient(90deg, transparent, hsl(var(--primary)/0.8), hsl(var(--primary)), transparent)",
            top: `${s.top}%`,
            left: "-15%",
          }}
          animate={{ x: ["0vw", "130vw"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "easeOut" }}
        />
      ))}

      {/* Launch pad glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        animate={{ opacity: progress > 50 ? [0.5, 1, 0.5] : 0.3 }}
        transition={{ duration: 0.3, repeat: Infinity }}
        style={{
          background: `radial-gradient(ellipse at center bottom, hsl(var(--glow-orange) / ${(0.1 + engineIntensity * 0.3).toFixed(2)}) 0%, transparent 70%)`,
        }}
      />

      {/* Persistent rocket trail after liftoff */}
      <AnimatePresence>
        {showTrail && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ bottom: "50%", transform: "translateX(-50%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: showSparkleDisperse ? 0 : 1 }}
            transition={{ duration: showSparkleDisperse ? 2 : 0.3 }}
          >
            {TRAIL_SEGMENTS.map((seg) => (
              <motion.div
                key={`trail-${seg.id}`}
                className="absolute rounded-full"
                style={{
                  width: seg.width,
                  height: seg.width,
                  left: `calc(50% + ${seg.offsetX}px)`,
                  transform: "translateX(-50%)",
                  background: `radial-gradient(circle, hsl(45, 100%, ${70 - seg.id * 1.5}%) 0%, hsl(25, 100%, 50%) 40%, transparent 70%)`,
                  filter: `blur(${2 + seg.id * 0.5}px)`,
                }}
                initial={{ top: 0, opacity: 0, scale: 0.5 }}
                animate={showSparkleDisperse ? {
                  top: trailPosition + seg.id * 20,
                  opacity: 0,
                  scale: 0,
                  x: (Math.random() - 0.5) * 200,
                } : {
                  top: trailPosition + seg.id * 20,
                  opacity: [0, seg.opacity * 0.9, seg.opacity * 0.6],
                  scale: [0.5, 1.2, 1.5],
                }}
                transition={{
                  duration: showSparkleDisperse ? 1.5 : 0.5,
                  delay: seg.delay,
                  ease: "easeOut",
                }}
              />
            ))}
            {/* Main trail glow */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-20 rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, hsl(45, 100%, 70%) 0%, hsl(35, 100%, 55%) 20%, hsl(25, 100%, 45%) 50%, transparent 100%)",
                filter: "blur(8px)",
              }}
              initial={{ height: 0, top: 0, opacity: 0 }}
              animate={showSparkleDisperse ? { opacity: 0, scale: 0.5 } : { 
                height: Math.min(trailPosition + 100, 600),
                top: 0,
                opacity: [0, 0.8, 0.5],
              }}
              transition={{ duration: showSparkleDisperse ? 1.5 : 1.5, ease: "easeOut" }}
            />
            {/* Glowing core trail */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-8 rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, hsl(50, 100%, 90%) 0%, hsl(45, 100%, 70%) 30%, hsl(40, 100%, 55%) 60%, transparent 100%)",
                filter: "blur(3px)",
              }}
              initial={{ height: 0, top: 0 }}
              animate={showSparkleDisperse ? { opacity: 0, scale: 0.3 } : { 
                height: Math.min(trailPosition + 50, 500),
                top: 0,
              }}
              transition={{ duration: showSparkleDisperse ? 1 : 1.2, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkle disperse effect */}
      <AnimatePresence>
        {showSparkleDisperse && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2.5, delay: 0.5 }}
          >
            {SPARKLES.map((s) => {
              const rad = (s.angle * Math.PI) / 180;
              const endX = Math.cos(rad) * s.distance;
              const endY = Math.sin(rad) * s.distance;
              return (
                <motion.div
                  key={`sparkle-${s.id}`}
                  className="absolute rounded-full"
                  style={{
                    width: s.size,
                    height: s.size,
                    background: `radial-gradient(circle, hsl(${s.hue}, 100%, 85%) 0%, hsl(${s.hue}, 100%, 60%) 50%, transparent 100%)`,
                    boxShadow: `0 0 ${s.size * 2}px hsl(${s.hue}, 100%, 70%)`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: endX,
                    y: endY,
                    opacity: [1, 0.8, 0],
                    scale: [1, 1.5, 0],
                  }}
                  transition={{
                    duration: s.duration,
                    delay: s.delay,
                    ease: "easeOut",
                  }}
                />
              );
            })}
            {/* Central flash */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 60,
                height: 60,
                left: -30,
                top: -30,
                background: "radial-gradient(circle, hsl(45, 100%, 90%) 0%, hsl(35, 100%, 60%) 30%, transparent 70%)",
                filter: "blur(10px)",
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 3, 0], opacity: [1, 0.6, 0] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROCKET */}
      <motion.div
        className="relative z-10"
        animate={{ y: rocketY, scale: liftoff ? 0.8 : 1 }}
        transition={{
          duration: liftoff ? 2 : 0.5,
          ease: liftoff ? [0.4, 0, 0.2, 1] : "easeOut",
        }}
      >
        {/* Exhaust particles */}
        {showParticles && (
          <div className="absolute top-full left-1/2 -translate-x-1/2">
            {PARTICLES.map((p) => (
              <motion.div
                key={`p-${p.id}`}
                className="absolute rounded-full"
                style={{
                  width: p.w,
                  height: p.h,
                  background: `hsl(${p.hue}, 100%, ${p.lightness}%)`,
                  left: `${p.offsetX}px`,
                  filter: "blur(1px)",
                }}
                animate={{
                  y: [0, p.travelY],
                  x: [0, p.driftX],
                  opacity: [1, 0],
                  scale: [1, 0.2],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Main exhaust flame */}
        {showFlame && (
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 origin-top"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 0.5 + engineIntensity * 1.5, opacity: engineIntensity }}
          >
            <motion.div
              className="w-16 h-40 relative"
              animate={{ scaleY: [1, 1.1, 0.95, 1.05, 1] }}
              transition={{ duration: 0.15, repeat: Infinity }}
            >
              {/* Outer flame */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, hsl(45,100%,70%) 0%, hsl(35,100%,55%) 20%, hsl(20,100%,50%) 50%, hsl(10,100%,40%) 70%, transparent 100%)",
                  clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
                  filter: "blur(2px)",
                }}
              />
              {/* Inner flame */}
              <div
                className="absolute inset-x-4 inset-y-0"
                style={{
                  background:
                    "linear-gradient(to bottom, hsl(50,100%,95%) 0%, hsl(45,100%,75%) 30%, hsl(40,100%,60%) 60%, transparent 100%)",
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
                  filter: "blur(1px)",
                }}
              />
            </motion.div>
            {/* Flame glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-48 rounded-full blur-xl pointer-events-none"
              style={{
                background: `radial-gradient(ellipse, hsl(35,100%,60%/${(0.4 + engineIntensity * 0.4).toFixed(2)}) 0%, transparent 70%)`,
              }}
            />
          </motion.div>
        )}

        {/* Rocket body with vibration */}
        <motion.div
          className="relative"
          animate={
            showFlame
              ? { x: [0, -1, 1, -0.5, 0.5, 0] }
              : {}
          }
          transition={{ duration: 0.12, repeat: Infinity }}
        >
          <svg
            width="80"
            height="180"
            viewBox="0 0 80 180"
            className="drop-shadow-2xl"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="rktBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--muted))" />
                <stop offset="35%" stopColor="hsl(var(--foreground))" />
                <stop offset="65%" stopColor="hsl(var(--foreground))" />
                <stop offset="100%" stopColor="hsl(var(--muted))" />
              </linearGradient>
              <linearGradient id="rktNose" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary) / 0.6)" />
                <stop offset="50%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
              </linearGradient>
              <linearGradient id="rktFin" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent))" />
                <stop offset="100%" stopColor="hsl(var(--accent) / 0.5)" />
              </linearGradient>
            </defs>

            {/* Nose cone */}
            <path d="M 40 0 Q 25 30 25 50 L 55 50 Q 55 30 40 0" fill="url(#rktNose)" />

            {/* Body */}
            <rect x="25" y="50" width="30" height="90" fill="url(#rktBody)" rx="2" />

            {/* Window */}
            <circle cx="40" cy="75" r="8" fill="hsl(var(--background))" stroke="hsl(var(--primary) / 0.5)" strokeWidth="2" />
            <circle cx="40" cy="75" r="5" fill="hsl(var(--primary) / 0.2)" />
            <circle cx="38" cy="73" r="2" fill="hsl(var(--primary) / 0.6)" />

            {/* Stripes */}
            <rect x="25" y="95" width="30" height="3" fill="hsl(var(--primary))" />
            <rect x="25" y="110" width="30" height="3" fill="hsl(var(--accent))" />
            <rect x="25" y="125" width="30" height="3" fill="hsl(var(--primary))" />

            {/* Engine section */}
            <rect x="22" y="140" width="36" height="15" fill="hsl(var(--muted-foreground))" rx="1" />
            <rect x="28" y="155" width="24" height="10" fill="hsl(var(--muted))" rx="1" />

            {/* Nozzles */}
            <ellipse cx="33" cy="165" rx="4" ry="2" fill="hsl(var(--muted-foreground))" />
            <ellipse cx="47" cy="165" rx="4" ry="2" fill="hsl(var(--muted-foreground))" />

            {/* Fins */}
            <path d="M 25 130 L 5 170 L 5 175 L 25 155 Z" fill="url(#rktFin)" />
            <path d="M 55 130 L 75 170 L 75 175 L 55 155 Z" fill="url(#rktFin)" />
            <path d="M 38 135 L 38 175 L 42 175 L 42 135 Z" fill="hsl(var(--accent) / 0.7)" />
          </svg>

          {/* Rocket glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl -z-10 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Smoke clouds */}
        {showSmoke && (
          <div className="absolute top-[90%] left-1/2 -translate-x-1/2 pointer-events-none">
            {SMOKE_CLOUDS.map((s) => (
              <motion.div
                key={`smoke-${s.id}`}
                className="absolute rounded-full bg-muted-foreground/20"
                style={{
                  width: s.size,
                  height: s.size,
                  filter: "blur(8px)",
                }}
                animate={{
                  x: [0, s.driftX],
                  y: [0, s.driftY],
                  scale: [0.3, 1.5, 2],
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: s.duration,
                  repeat: Infinity,
                  delay: s.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Title */}
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
              COSMO
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
              Deep Space Wellbeing System
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 md:w-96">
        <div className="relative bg-muted/20 rounded-full p-1 border border-border/30 backdrop-blur-sm">
          <div className="h-3 bg-muted/30 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    progress > 90
                      ? "linear-gradient(90deg, hsl(var(--glow-green)), hsl(var(--glow-green) / 0.8))"
                      : "linear-gradient(90deg, hsl(var(--primary) / 0.5), hsl(var(--primary)), hsl(var(--accent)))",
                }}
              />
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                style={{
                  background:
                    progress > 90
                      ? "hsl(var(--glow-green))"
                      : "hsl(var(--primary))",
                  boxShadow: `0 0 20px ${progress > 90 ? "hsl(var(--glow-green))" : "hsl(var(--primary))"}`,
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center mt-4 px-2">
          <motion.div
            key={phase}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <motion.span
              className={`w-2 h-2 rounded-full ${phase >= 5 ? "bg-glow-green" : "bg-primary"}`}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <span
              className={`font-mono text-[9px] tracking-wider ${phase >= 5 ? "text-glow-green" : "text-muted-foreground"}`}
            >
              {statusText[phase]}
            </span>
          </motion.div>
          <span
            className={`font-mono text-sm font-bold tabular-nums ${phase >= 5 ? "text-glow-green" : "text-primary"}`}
          >
            {Math.min(Math.round(progress), 100)}%
          </span>
        </div>

        {/* Phase dots */}
        <div className="flex justify-between mt-4 px-4">
          {["PRE-FLIGHT", "FUEL", "NAV", "LIFE-SYS", "IGNITION", "LIFTOFF"].map(
            (label, p) => (
              <div key={p} className="flex flex-col items-center gap-1">
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
                <span
                  className={`text-[6px] font-mono tracking-wider ${
                    phase >= p
                      ? "text-foreground/60"
                      : "text-muted-foreground/30"
                  }`}
                >
                  {label}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-primary/20 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-primary/20 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-primary/20 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-primary/20 rounded-br-lg pointer-events-none" />
    </motion.div>
  );
};

export default LoadingScreen;
