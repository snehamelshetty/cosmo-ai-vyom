import { motion } from "framer-motion";

const NavBar = () => {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/60"
    >
      <div className="container mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-orbitron font-black text-xl text-primary text-glow-cyan tracking-widest">
          MAITHRI
        </a>
        <div className="hidden md:flex items-center gap-8">
          {["Dashboard", "Features", "Mission", "About"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors tracking-wider"
            >
              {l.toUpperCase()}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-glow-green animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">SYSTEMS ONLINE</span>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
