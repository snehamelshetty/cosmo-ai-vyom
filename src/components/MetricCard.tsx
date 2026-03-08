import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  color: "cyan" | "purple" | "green" | "orange" | "red" | "blue";
  delay?: number;
}

const colorMap = {
  cyan: "text-glow-cyan border-glow text-primary",
  purple: "text-glow-purple border-glow-purple text-accent",
  green: "text-glow-cyan text-glow-green",
  orange: "text-glow-cyan text-glow-orange",
  red: "text-glow-cyan text-glow-red",
  blue: "text-glow-cyan text-glow-blue",
};

const bgColorMap = {
  cyan: "bg-primary/10",
  purple: "bg-accent/10",
  green: "bg-glow-green/10",
  orange: "bg-glow-orange/10",
  red: "bg-glow-red/10",
  blue: "bg-glow-blue/10",
};

const iconColorMap = {
  cyan: "text-primary",
  purple: "text-accent",
  green: "text-glow-green",
  orange: "text-glow-orange",
  red: "text-glow-red",
  blue: "text-glow-blue",
};

const MetricCard = ({ icon: Icon, label, value, unit, color, delay = 0 }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="holo-panel rounded-lg p-4 flex flex-col items-center gap-2 group hover:glow-cyan-strong transition-all duration-300"
    >
      <div className={cn("p-2 rounded-full", bgColorMap[color])}>
        <Icon className={cn("w-5 h-5", iconColorMap[color])} />
      </div>
      <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={cn("text-2xl font-orbitron font-bold", iconColorMap[color])}>{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
    </motion.div>
  );
};

export default MetricCard;
