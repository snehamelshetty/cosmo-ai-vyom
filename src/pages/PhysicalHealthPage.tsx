import { motion } from "framer-motion";
import { Heart, Wind, Thermometer, Droplets, Activity, Zap, Dumbbell, Bone, TrendingUp, AlertCircle } from "lucide-react";
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

const heartRateData = [68, 72, 70, 75, 73, 71, 69, 74, 72, 70, 68, 73, 75, 72, 70, 69, 71, 74, 72, 70, 68, 72, 73, 71, 70, 72, 74, 69, 71, 73, 68, 70, 75, 72, 69, 71];

const muscleGroups = [
  { name: "Quadriceps", status: 82, trend: "stable" },
  { name: "Calves", status: 75, trend: "declining" },
  { name: "Core", status: 88, trend: "improving" },
  { name: "Back", status: 80, trend: "stable" },
  { name: "Arms", status: 85, trend: "improving" },
  { name: "Shoulders", status: 78, trend: "stable" },
];

const exerciseLog = [
  { day: "Mon", type: "Resistance", duration: 120, calories: 450 },
  { day: "Tue", type: "Cardio", duration: 90, calories: 380 },
  { day: "Wed", type: "Resistance", duration: 110, calories: 420 },
  { day: "Thu", type: "Mixed", duration: 130, calories: 500 },
  { day: "Fri", type: "Cardio", duration: 100, calories: 400 },
  { day: "Sat", type: "Resistance", duration: 120, calories: 460 },
  { day: "Sun", type: "Rest", duration: 30, calories: 120 },
];

const boneHealth = [
  { region: "Lumbar Spine", density: 96, change: -0.3 },
  { region: "Hip", density: 94, change: -0.5 },
  { region: "Femur", density: 97, change: -0.2 },
  { region: "Tibia", density: 93, change: -0.6 },
];

const PhysicalHealthPage = () => {
  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
            <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Biometric Telemetry</span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mt-4 text-foreground">
              Physical Health <span className="text-primary text-glow-star">Monitoring</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Real-time biometric sensor integration tracking every physical parameter during deep space missions.
            </p>
          </motion.div>

          {/* Vitals */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {physicalMetrics.map((m, i) => (
              <MetricCard key={m.label} {...m} delay={i * 0.08} />
            ))}
          </div>

          {/* Heart rate */}
          <HoloPanel className="mb-8">
            <h3 className="font-orbitron text-xs font-bold text-foreground mb-4 tracking-wider">HEART RATE MONITOR — 24HR</h3>
            <div className="h-28 flex items-end gap-[2px]">
              {heartRateData.map((v, i) => (
                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${((v - 60) / 20) * 100}%` }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.02 }}
                  className="flex-1 rounded-t bg-gradient-to-t from-glow-red/30 to-glow-red/60" />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-mono">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
            </div>
          </HoloPanel>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Muscle status */}
            <HoloPanel variant="nebula">
              <h3 className="font-orbitron text-xs font-bold text-foreground mb-4 tracking-wider flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-accent/60" /> MUSCLE STATUS
              </h3>
              <div className="space-y-3">
                {muscleGroups.map((m, i) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <span className="w-24 text-xs text-muted-foreground font-mono">{m.name}</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${m.status}%` }}
                        viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full rounded-full ${m.status > 85 ? "bg-glow-green/60" : m.status > 75 ? "bg-primary/60" : "bg-glow-orange/60"}`} />
                    </div>
                    <span className="text-xs font-mono text-foreground/70 w-10 text-right">{m.status}%</span>
                    <span className={`text-[9px] font-mono ${
                      m.trend === "improving" ? "text-glow-green" : m.trend === "declining" ? "text-glow-red" : "text-muted-foreground"
                    }`}>
                      {m.trend === "improving" ? "↑" : m.trend === "declining" ? "↓" : "→"}
                    </span>
                  </div>
                ))}
              </div>
            </HoloPanel>

            {/* Bone density */}
            <HoloPanel>
              <h3 className="font-orbitron text-xs font-bold text-foreground mb-4 tracking-wider flex items-center gap-2">
                <Bone className="w-4 h-4 text-primary/60" /> BONE DENSITY
              </h3>
              <div className="space-y-4">
                {boneHealth.map((b, i) => (
                  <div key={b.region}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-muted-foreground font-mono">{b.region}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-foreground/70">{b.density}%</span>
                        <span className="text-[9px] font-mono text-glow-orange">{b.change}%/mo</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${b.density}%` }}
                        viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary/40 to-primary/70" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2 mt-4 p-2 bg-glow-orange/5 rounded border border-glow-orange/10">
                <AlertCircle className="w-3 h-3 text-glow-orange mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-muted-foreground">Bone loss rate within expected range for microgravity. Continue resistance exercise protocol.</p>
              </div>
            </HoloPanel>
          </div>

          {/* Exercise log */}
          <HoloPanel variant="nebula">
            <h3 className="font-orbitron text-xs font-bold text-foreground mb-4 tracking-wider">WEEKLY EXERCISE LOG</h3>
            <div className="grid grid-cols-7 gap-2">
              {exerciseLog.map((e, i) => (
                <motion.div key={e.day} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="text-center p-3 bg-muted/10 rounded-lg border border-border/20">
                  <p className="font-mono text-[9px] text-muted-foreground">{e.day}</p>
                  <p className="font-orbitron text-sm font-bold text-foreground mt-1">{e.duration}</p>
                  <p className="text-[9px] text-muted-foreground">min</p>
                  <p className={`text-[9px] font-mono mt-1 ${e.type === "Rest" ? "text-glow-green" : "text-primary"}`}>{e.type}</p>
                  <p className="text-[9px] text-glow-orange mt-0.5">{e.calories} cal</p>
                </motion.div>
              ))}
            </div>
          </HoloPanel>
        </div>
      </section>
    </PageLayout>
  );
};

export default PhysicalHealthPage;
