import { motion, useScroll, useTransform } from "framer-motion";
import milkywayBg from "@/assets/milkyway-bg.jpg";
import astronautFloat from "@/assets/astronaut-float.png";
import planetEarth from "@/assets/planet-earth.png";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 150]);
  const astroY = useTransform(scrollY, [0, 800], [0, -80]);
  const planetY = useTransform(scrollY, [0, 800], [0, 60]);
  const textY = useTransform(scrollY, [0, 800], [0, -40]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Milky Way background with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.img
          src={milkywayBg}
          alt=""
          className="w-full h-[120%] object-cover"
          style={{ filter: "brightness(0.5) contrast(1.1)" }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 25%, hsl(240 10% 2%) 80%)" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />

      {/* Floating Earth - parallax */}
      <motion.img
        src={planetEarth}
        alt=""
        className="absolute bottom-[10%] left-[5%] w-40 md:w-64 opacity-15 blur-[1px]"
        style={{ y: planetY }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating astronaut - parallax */}
      <motion.img
        src={astronautFloat}
        alt=""
        className="absolute top-[15%] right-[3%] w-28 md:w-44 opacity-25"
        style={{ y: astroY }}
        animate={{ y: [0, -20, 0], rotate: [0, 3, -2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="font-mono text-[10px] tracking-[0.5em] text-muted-foreground mb-8 uppercase"
        >
          Deep Space Wellbeing System
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-orbitron font-black text-foreground tracking-wider"
        >
          <span className="text-glow-star">MAITHRI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto font-rajdhani font-light leading-relaxed"
        >
          AI Companion for Astronaut Mental and Physical Wellbeing
          <br />
          <span className="text-foreground/40">in Deep Space Missions</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#features" className="px-8 py-3 rounded-lg border border-glow text-primary font-orbitron font-medium text-xs tracking-[0.2em] hover:bg-primary/5 transition-all duration-500 glow-star">
            EXPLORE MISSION
          </a>
          <a href="#dashboard" className="px-8 py-3 rounded-lg bg-primary/10 border border-glow text-foreground font-orbitron font-medium text-xs tracking-[0.2em] hover:bg-primary/15 transition-all duration-500">
            LAUNCH DASHBOARD
          </a>
          <a href="#galaxy" className="px-8 py-3 rounded-lg border border-glow-nebula text-accent font-orbitron font-medium text-xs tracking-[0.2em] hover:bg-accent/5 transition-all duration-500 glow-nebula">
            3D GALAXY MAP
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 3.5 }, y: { repeat: Infinity, duration: 2.5 } }}
      >
        <div className="w-5 h-8 rounded-full border border-primary/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary/40 animate-pulse-glow" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
