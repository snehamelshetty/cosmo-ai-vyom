import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Brain, Moon, Wind, Zap, Thermometer, Droplets, Eye, Activity, Shield, Users } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";
import MetricCard from "@/components/MetricCard";

const physicalMetrics = [
  { icon: Heart, label: "Heart Rate", value: "72", unit: "bpm", color: "red" as const },
  { icon: Wind, label: "O₂ Saturation", value: "98", unit: "%", color: "star" as const },
  { icon: Thermometer, label: "Body Temp", value: "36.6", unit: "°C", color: "green" as const },
  { icon: Droplets, label: "Hydration", value: "91", unit: "%", color: "blue" as const },
  { icon: Activity, label: "Blood Pressure", value: "120/80", unit: "mmHg", color: "red" as const },
  { icon: Zap, label: "Energy Level", value: "76", unit: "%", color: "orange" as const },
];

const mentalMetrics = [
  { icon: Brain, label: "Cognitive Score", value: "87", unit: "/ 100", color: "nebula" as const },
  { icon: Moon, label: "Sleep Quality", value: "82", unit: "%", color: "blue" as const },
  { icon: Eye, label: "Focus Index", value: "89", unit: "/ 100", color: "star" as const },
  { icon: Shield, label: "Stress Level", value: "34", unit: "/ 100", color: "green" as const },
  { icon: Users, label: "Social Index", value: "72", unit: "%", color: "nebula" as const },
  { icon: Heart, label: "Mood Score", value: "78", unit: "/ 100", color: "orange" as const },
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

const weeklyTrend = [
  { day: "Mon", physical: 82, mental: 78 },
  { day: "Tue", physical: 85, mental: 80 },
  { day: "Wed", physical: 79, mental: 76 },
  { day: "Thu", physical: 88, mental: 83 },
  { day: "Fri", physical: 84, mental: 80 },
  { day: "Sat", physical: 90, mental: 87 },
  { day: "Sun", physical: 86, mental: 85 },
];

const HealthMonitoringPage = () => {
  const [activeTab, setActiveTab] = useState<"physical" | "mental">("physical");

  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
            <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Biometric Systems</span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mt-4 text-foreground">
              Health <span className="text-primary text-glow-star">Monitoring</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Comprehensive physical and mental health tracking for every crew member during deep space missions.
            </p>
          </motion.div>

          {/* Tab toggle */}
          <div className="flex justify-center gap-2 mb-12">
            {(["physical", "mental"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-orbitron text-xs tracking-wider transition-all border ${
                  activeTab === tab ? "border-primary/30 bg-primary/10 text-primary glow-star" : "border-border/30 text-muted-foreground hover:text-foreground"
                }`}>
                {tab.toUpperCase()} HEALTH
              </button>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {(activeTab === "physical" ? physicalMetrics : mentalMetrics).map((m, i) => (
              <MetricCard key={m.label} {...m} delay={i * 0.08} />
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {/* Emotional state */}
            <HoloPanel variant="nebula">
              <h3 className="font-orbitron text-xs font-bold text-foreground mb-4 tracking-wider">EMOTIONAL STATE ANALYSIS</h3>
              <div className="space-y-3">
                {emotionalState.map(e => (
                  <div key={e.label} className="flex items-center gap-3">
                    <span className="w-20 text-xs text-muted-foreground font-mono">{e.label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${e.value}%` }}
                        viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }}
                        className={`h-full rounded-full ${e.color} opacity-70`} />
                    </div>
                    <span className="text-xs font-mono text-foreground/70 w-10 text-right">{e.value}%</span>
                  </div>
                ))}
              </div>
            </HoloPanel>

            {/* Weekly trend */}
            <HoloPanel>
              <h3 className="font-orbitron text-xs font-bold text-foreground mb-4 tracking-wider">WEEKLY HEALTH TREND</h3>
              <div className="h-44 flex items-end gap-2">
                {weeklyTrend.map((d, i) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-0.5">
                      <motion.div initial={{ height: 0 }} whileInView={{ height: `${d.physical}%` }}
                        viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08 }}
                        className="flex-1 rounded-t bg-gradient-to-t from-primary/30 to-primary/50" />
                      <motion.div initial={{ height: 0 }} whileInView={{ height: `${d.mental}%` }}
                        viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08 + 0.1 }}
                        className="flex-1 rounded-t bg-gradient-to-t from-accent/30 to-accent/50" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-3 justify-center">
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary/50" /><span className="text-[9px] text-muted-foreground font-mono">Physical</span></div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent/50" /><span className="text-[9px] text-muted-foreground font-mono">Mental</span></div>
              </div>
            </HoloPanel>
          </div>

          {/* Heart rate */}
          <HoloPanel className="mb-12">
            <h3 className="font-orbitron text-xs font-bold text-foreground mb-4 tracking-wider">HEART RATE MONITOR — 24HR</h3>
            <div className="h-28 flex items-end gap-[2px]">
              {[68, 72, 70, 75, 73, 71, 69, 74, 72, 70, 68, 73, 75, 72, 70, 69, 71, 74, 72, 70, 68, 72, 73, 71, 70, 72, 74, 69, 71, 73, 68, 70, 75, 72, 69, 71].map((v, i) => (
                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${((v - 60) / 20) * 100}%` }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.02 }}
                  className="flex-1 rounded-t bg-gradient-to-t from-glow-red/30 to-glow-red/60" />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-mono">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
            </div>
          </HoloPanel>

          {/* Crew Status */}
          <HoloPanel variant="nebula">
            <h3 className="font-orbitron text-sm font-bold text-foreground mb-6 tracking-wider">CREW STATUS OVERVIEW</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {crewMembers.map((c, i) => (
                <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-muted/20 rounded-lg p-4 border border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center font-orbitron text-accent text-xs font-bold">
                      {c.name.split(" ").pop()?.[0]}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-foreground">{c.name}</p>
                      <p className="text-[10px] text-muted-foreground">{c.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-[10px]">
                    {[
                      { label: "Mental", val: c.mental, color: "bg-glow-green" },
                      { label: "Fatigue", val: c.fatigue, color: "bg-glow-orange" },
                      { label: "Cognitive", val: c.cognitive, color: "bg-primary" },
                      { label: "Social", val: c.social, color: "bg-accent" },
                    ].map(s => (
                      <div key={s.label} className="flex items-center gap-2">
                        <span className="w-14 text-muted-foreground font-mono">{s.label}</span>
                        <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                          <div className={`h-full rounded-full ${s.color} opacity-60`} style={{ width: `${s.val}%` }} />
                        </div>
                        <span className="w-8 text-right font-mono text-foreground/60">{s.val}%</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </HoloPanel>
        </div>
      </section>
    </PageLayout>
  );
};

export default HealthMonitoringPage;
