import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  color: "star" | "nebula" | "green" | "orange" | "red" | "blue";
  delay?: number;
}

const iconColorMap = {
  star: "text-primary",
  nebula: "text-accent",
  green: "text-glow-green",
  orange: "text-glow-orange",
  red: "text-glow-red",
  blue: "text-glow-blue",
};

const bgColorMap = {
  star: "bg-primary/10",
  nebula: "bg-accent/10",
  green: "bg-glow-green/10",
  orange: "bg-glow-orange/10",
  red: "bg-glow-red/10",
  blue: "bg-glow-blue/10",
};

const MetricCard = ({ icon: Icon, label, value, unit, color, delay = 0 }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="holo-panel rounded-lg p-4 flex flex-col items-center gap-2 group hover:glow-star-strong transition-all duration-500"
    >
      <div className={cn("p-2 rounded-full", bgColorMap[color])}>
        <Icon className={cn("w-5 h-5", iconColorMap[color])} />
      </div>
      <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.15em]">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={cn("text-2xl font-orbitron font-bold", iconColorMap[color])}>{value}</span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
    </motion.div>
  );
};

export default MetricCard;
