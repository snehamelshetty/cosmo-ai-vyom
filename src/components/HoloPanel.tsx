import { cn } from "@/lib/utils";
import { ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";

interface HoloPanelProps {
  children: ReactNode;
  className?: string;
  variant?: "star" | "nebula";
  delay?: number;
}

const HoloPanel = forwardRef<HTMLDivElement, HoloPanelProps>(({ children, className, variant = "star", delay = 0 }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className={cn(
        "rounded-lg p-6 relative overflow-hidden",
        variant === "star" ? "holo-panel glow-star" : "holo-panel-nebula glow-nebula",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
});

HoloPanel.displayName = "HoloPanel";

export default HoloPanel;
