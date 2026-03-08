import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HoloPanelProps {
  children: ReactNode;
  className?: string;
  variant?: "cyan" | "purple";
  delay?: number;
}

const HoloPanel = ({ children, className, variant = "cyan", delay = 0 }: HoloPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={cn(
        "rounded-lg p-6 relative overflow-hidden",
        variant === "cyan" ? "holo-panel glow-cyan" : "holo-panel-purple glow-purple",
        className
      )}
    >
      <div className="scan-line absolute inset-0 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default HoloPanel;
