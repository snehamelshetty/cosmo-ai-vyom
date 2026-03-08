import { motion } from "framer-motion";
import heroAstronaut from "@/assets/hero-astronaut.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 gradient-space" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-glow text-primary font-mono text-sm mb-6 glow-cyan">
              🛰 MISSION CONTROL ACTIVE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black text-foreground leading-tight"
          >
            <span className="text-primary text-glow-cyan">MAITHRI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-xl font-rajdhani font-light"
          >
            AI-Powered Wellbeing System for Astronaut Mental Health, Physical Condition & Cognitive Performance
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="#dashboard"
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-orbitron font-bold text-sm tracking-wider glow-cyan-strong hover:scale-105 transition-transform"
            >
              ACCESS DASHBOARD
            </a>
            <a
              href="#features"
              className="px-8 py-3 rounded-lg border border-glow text-primary font-orbitron font-bold text-sm tracking-wider hover:bg-primary/10 transition-all"
            >
              EXPLORE SYSTEMS
            </a>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
            <img
              src={heroAstronaut}
              alt="Astronaut floating in space with Earth behind"
              className="relative w-80 md:w-[28rem] animate-float drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse-glow" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
