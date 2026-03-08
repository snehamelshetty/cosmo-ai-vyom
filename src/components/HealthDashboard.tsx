import { Heart, Brain, Moon, Wind, Zap, Thermometer, Droplets, Eye } from "lucide-react";
import MetricCard from "./MetricCard";
import HoloPanel from "./HoloPanel";
import { motion } from "framer-motion";

const metrics = [
  { icon: Heart, label: "Heart Rate", value: "72", unit: "bpm", color: "red" as const },
  { icon: Brain, label: "Cognitive Score", value: "87", unit: "/ 100", color: "purple" as const },
  { icon: Moon, label: "Sleep Quality", value: "82", unit: "%", color: "blue" as const },
  { icon: Wind, label: "O₂ Saturation", value: "98", unit: "%", color: "cyan" as const },
  { icon: Zap, label: "Energy Level", value: "76", unit: "%", color: "orange" as const },
  { icon: Thermometer, label: "Body Temp", value: "36.6", unit: "°C", color: "green" as const },
  { icon: Droplets, label: "Hydration", value: "91", unit: "%", color: "blue" as const },
  { icon: Eye, label: "Focus Index", value: "89", unit: "/ 100", color: "cyan" as const },
];

const emotionalState = [
  { label: "Calm", value: 65, color: "bg-glow-green" },
  { label: "Focused", value: 78, color: "bg-primary" },
  { label: "Anxiety", value: 12, color: "bg-glow-orange" },
  { label: "Fatigue", value: 28, color: "bg-glow-red" },
  { label: "Motivation", value: 85, color: "bg-accent" },
  { label: "Isolation", value: 18, color: "bg-glow-blue" },
];

const crewMembers = [
  { name: "Cmdr. Elena Vasquez", role: "Mission Commander", mental: 92, fatigue: 15, cognitive: 94, social: 88 },
  { name: "Dr. James Park", role: "Flight Surgeon", mental: 87, fatigue: 22, cognitive: 89, social: 91 },
  { name: "Lt. Anika Sharma", role: "Pilot", mental: 78, fatigue: 35, cognitive: 85, social: 72 },
  { name: "Eng. Mikhail Petrov", role: "Systems Engineer", mental: 84, fatigue: 28, cognitive: 91, social: 80 },
];

const HealthDashboard = () => {
  return (
    <section id="dashboard" className="relative py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-widest">📊 SYSTEM STATUS</span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-4 text-foreground">
            Astronaut Health <span className="text-primary text-glow-cyan">Dashboard</span>
          </h2>
        </motion.div>

        {/* Vital Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((m, i) => (
            <MetricCard key={m.label} {...m} delay={i * 0.1} />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Stress Analysis */}
          <HoloPanel>
            <h3 className="font-orbitron text-lg font-bold text-foreground mb-4">⚠ Stress Analysis</h3>
            <div className="flex items-center gap-6 mb-4">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(215 30% 16%)" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="hsl(185 100% 50%)" strokeWidth="8"
                    strokeDasharray={`${34 * 2.51} ${100 * 2.51}`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-orbitron text-xl font-bold text-primary">34</span>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-mono">STRESS SCORE</p>
                <p className="text-2xl font-orbitron font-bold text-foreground">34 <span className="text-sm text-muted-foreground">/ 100</span></p>
                <p className="text-glow-green text-sm mt-1 text-glow-green font-mono">● Nominal — Low stress detected</p>
              </div>
            </div>
          </HoloPanel>

          {/* Emotional State */}
          <HoloPanel variant="purple">
            <h3 className="font-orbitron text-lg font-bold text-foreground mb-4">😊 Emotional State</h3>
            <div className="space-y-3">
              {emotionalState.map((e) => (
                <div key={e.label} className="flex items-center gap-3">
                  <span className="w-20 text-sm text-muted-foreground font-mono">{e.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${e.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className={`h-full rounded-full ${e.color}`}
                    />
                  </div>
                  <span className="text-sm font-mono text-foreground w-10 text-right">{e.value}%</span>
                </div>
              ))}
            </div>
          </HoloPanel>
        </div>

        {/* Simulated Charts */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <HoloPanel className="lg:col-span-2">
            <h3 className="font-orbitron text-sm font-bold text-foreground mb-4">❤️ Heart Rate Monitor</h3>
            <div className="h-32 flex items-end gap-1">
              {[68, 72, 70, 75, 73, 71, 69, 74, 72, 70, 68, 73, 75, 72, 70, 69, 71, 74, 72, 70, 68, 72, 73, 71].map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${((v - 60) / 20) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.03 }}
                  className="flex-1 rounded-t bg-gradient-to-t from-glow-red/60 to-glow-red"
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground font-mono">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
            </div>
          </HoloPanel>

          <HoloPanel>
            <h3 className="font-orbitron text-sm font-bold text-foreground mb-4">😊 Weekly Mood</h3>
            <div className="h-32 flex items-end gap-2">
              {[
                { day: "M", val: 75 },
                { day: "T", val: 82 },
                { day: "W", val: 78 },
                { day: "T", val: 85 },
                { day: "F", val: 80 },
                { day: "S", val: 88 },
                { day: "S", val: 90 },
              ].map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${d.val}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="w-full rounded-t bg-gradient-to-t from-accent/60 to-accent"
                  />
                  <span className="text-xs text-muted-foreground font-mono">{d.day}</span>
                </div>
              ))}
            </div>
          </HoloPanel>
        </div>

        {/* Crew Status */}
        <HoloPanel>
          <h3 className="font-orbitron text-lg font-bold text-foreground mb-6">👨‍🚀 Crew Status Overview</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {crewMembers.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-muted/30 rounded-lg p-4 border border-border"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-orbitron text-primary text-sm font-bold">
                    {c.name.split(" ").pop()?.[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.role}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { label: "Mental", val: c.mental, color: "bg-glow-green" },
                    { label: "Fatigue", val: c.fatigue, color: "bg-glow-orange" },
                    { label: "Cognitive", val: c.cognitive, color: "bg-primary" },
                    { label: "Social", val: c.social, color: "bg-accent" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <span className="w-14 text-muted-foreground font-mono">{s.label}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.val}%` }} />
                      </div>
                      <span className="w-8 text-right font-mono text-foreground">{s.val}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </HoloPanel>
      </div>
    </section>
  );
};

export default HealthDashboard;
