import { motion } from "framer-motion";

const FooterSection = () => {
  return (
    <footer className="relative py-20 px-6 border-t border-border/10">
      <div className="container mx-auto max-w-7xl text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="font-orbitron text-2xl font-bold text-primary/60 text-glow-star mb-4 tracking-[0.3em]">COSMO</h2>
          <p className="text-muted-foreground/60 max-w-md mx-auto mb-10 text-sm font-light">
            AI-Powered Wellbeing System — Supporting astronaut mental health, physical condition, and cognitive performance across the cosmos.
          </p>
          <div className="flex justify-center gap-10 text-[10px] font-mono text-muted-foreground/40 tracking-wider">
            <span>Status: Operational</span>
            <span>Uplink: Active</span>
            <span>Ground Control: Connected</span>
          </div>
          <p className="text-[10px] text-muted-foreground/30 mt-10 font-mono tracking-wider">
            © {new Date().getFullYear()} MAITHRI · All systems nominal
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
