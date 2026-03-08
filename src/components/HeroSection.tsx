import { motion } from "framer-motion";
import milkywayBg from "@/assets/milkyway-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Milky Way background with slow drift */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.05, 1], x: [0, 10, 0], y: [0, -5, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <img
          src={milkywayBg}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.6) contrast(1.1)" }}
        />
      </motion.div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(240 10% 2%) 85%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="font-mono text-xs tracking-[0.4em] text-muted-foreground mb-8 uppercase"
          >
            Deep Space Wellbeing System
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="text-6xl md:text-8xl lg:text-9xl font-orbitron font-black text-foreground tracking-wider"
          >
            <span className="text-glow-star">MAITHRI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2.2 }}
            className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto font-rajdhani font-light leading-relaxed"
          >
            AI Companion for Astronaut Mental and Physical Wellbeing
            <br />
            <span className="text-foreground/40">in Deep Space Missions</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#features"
              className="px-8 py-3 rounded-lg border border-glow text-primary font-orbitron font-medium text-xs tracking-[0.2em] hover:bg-primary/5 transition-all duration-500 glow-star"
            >
              EXPLORE MISSION
            </a>
            <a
              href="#dashboard"
              className="px-8 py-3 rounded-lg bg-primary/10 border border-glow text-foreground font-orbitron font-medium text-xs tracking-[0.2em] hover:bg-primary/15 transition-all duration-500"
            >
              LAUNCH DASHBOARD
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 4 }, y: { repeat: Infinity, duration: 2.5 } }}
      >
        <div className="w-5 h-8 rounded-full border border-primary/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary/40 animate-pulse-glow" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
