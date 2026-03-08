import { motion } from "framer-motion";

const FooterSection = () => {
  return (
    <footer className="relative py-16 px-6 border-t border-border/30">
      <div className="container mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-orbitron text-3xl font-bold text-primary text-glow-cyan mb-4">MAITHRI</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            AI-Powered Wellbeing System — Supporting astronaut mental health, physical condition, and cognitive performance across the cosmos.
          </p>
          <div className="flex justify-center gap-8 text-sm font-mono text-muted-foreground">
            <span>🛰 Status: Operational</span>
            <span>📡 Uplink: Active</span>
            <span>🌍 Ground Control: Connected</span>
          </div>
          <p className="text-xs text-muted-foreground mt-8 font-mono">
            © {new Date().getFullYear()} MAITHRI Mission Control. All systems nominal.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
