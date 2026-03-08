import { motion } from "framer-motion";

const NavBar = () => {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 border-b border-border/20 backdrop-blur-2xl bg-background/30"
    >
      <div className="container mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-orbitron font-bold text-sm text-primary/80 text-glow-star tracking-[0.3em]">
          MAITHRI
        </a>
        <div className="hidden md:flex items-center gap-10">
          {["Dashboard", "Features", "Mission"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="text-[10px] font-mono text-muted-foreground hover:text-primary/70 transition-colors duration-500 tracking-[0.2em] uppercase">
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-glow-green/60 animate-pulse" />
          <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wider">ONLINE</span>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
