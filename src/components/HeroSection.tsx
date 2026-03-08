import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import milkywayBg from "@/assets/milkyway-bg.jpg";
import astronautFloat from "@/assets/astronaut-float.png";
import planetEarth from "@/assets/planet-earth.png";
import planetSaturn from "@/assets/planet-saturn.png";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 150]);
  const astroY = useTransform(scrollY, [0, 800], [0, -80]);
  const planetY = useTransform(scrollY, [0, 800], [0, 60]);
  const saturnY = useTransform(scrollY, [0, 800], [0, -40]);
  const textY = useTransform(scrollY, [0, 800], [0, -40]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Milky Way parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.img src={milkywayBg} alt="Deep space Milky Way galaxy background"
          className="w-full h-[130%] object-cover"
          style={{ filter: "brightness(0.45) contrast(1.15) saturate(1.2)" }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
      </motion.div>

      {/* Cinematic vignette layers */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 20%, hsl(240 10% 2%) 85%)" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Floating Earth - parallax */}
      <motion.img src={planetEarth} alt="Planet Earth floating in space"
        className="absolute bottom-[8%] left-[3%] w-44 md:w-72 opacity-12 blur-[1px]"
        style={{ y: planetY }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }} />

      {/* Floating Saturn - parallax */}
      <motion.img src={planetSaturn} alt="Planet Saturn"
        className="absolute top-[20%] left-[8%] w-20 md:w-32 opacity-10 blur-[2px]"
        style={{ y: saturnY }}
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }} />

      {/* Floating astronaut - parallax */}
      <motion.img src={astronautFloat} alt="Astronaut floating in deep space"
        className="absolute top-[12%] right-[3%] w-32 md:w-52 opacity-20"
        style={{ y: astroY }}
        animate={{ y: [0, -25, 0], rotate: [0, 4, -3, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />

      {/* Nebula glow accent */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/3 blur-[120px]" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-primary/3 blur-[100px]" />

      {/* Content */}
      <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity }}>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.5, y: 0 }} transition={{ duration: 1.5, delay: 0.8 }}
          className="font-mono text-[10px] tracking-[0.5em] text-muted-foreground mb-8 uppercase">
          Deep Space Wellbeing System
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 1.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-orbitron font-black text-foreground tracking-wider">
          <span className="text-glow-star">MAITHRI</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 1.8 }}
          className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto font-rajdhani font-light leading-relaxed">
          AI Companion for Astronaut Mental and Physical Wellbeing
          <br /><span className="text-foreground/40">in Deep Space Missions</span>
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 2.2 }}
          className="text-sm text-muted-foreground/60 mt-4 max-w-lg mx-auto">
          Monitoring vitals, predicting fatigue, providing psychological support, and keeping astronauts connected to Earth — powered by artificial intelligence.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 2.8 }}
          className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/features"
            className="px-10 py-3.5 rounded-lg border border-glow text-primary font-orbitron font-medium text-xs tracking-[0.2em] hover:bg-primary/5 transition-all duration-500 glow-star">
            EXPLORE FEATURES
          </Link>
          <Link to="/galaxy-map"
            className="px-10 py-3.5 rounded-lg border border-glow-nebula text-accent font-orbitron font-medium text-xs tracking-[0.2em] hover:bg-accent/5 transition-all duration-500 glow-nebula">
            3D GALAXY MAP
          </Link>
          <Link to="/health-monitoring"
            className="px-10 py-3.5 rounded-lg bg-primary/8 border border-glow text-foreground/80 font-orbitron font-medium text-xs tracking-[0.2em] hover:bg-primary/12 transition-all duration-500">
            HEALTH MONITOR
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }} animate={{ opacity: 0.4, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 3.5 }, y: { repeat: Infinity, duration: 2.5 } }}>
        <div className="w-5 h-8 rounded-full border border-primary/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary/40 animate-pulse-glow" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
