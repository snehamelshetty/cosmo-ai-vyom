import { Heart, Brain, Moon, Wind, Zap, Thermometer, Droplets, Eye } from "lucide-react";
import MetricCard from "./MetricCard";
import HoloPanel from "./HoloPanel";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import nebulaBg from "@/assets/nebula-section.jpg";

const crewData = [
  {
    name: "Cmdr. Elena Vasquez",
    role: "Mission Commander",
    mental: 92, fatigue: 15, cognitive: 94, social: 88,
    metrics: [
      { icon: Heart, label: "Heart Rate", value: "68", unit: "bpm", color: "red" as const },
      { icon: Brain, label: "Cognitive Score", value: "94", unit: "/ 100", color: "nebula" as const },
      { icon: Moon, label: "Sleep Quality", value: "88", unit: "%", color: "blue" as const },
      { icon: Wind, label: "O₂ Saturation", value: "99", unit: "%", color: "star" as const },
      { icon: Zap, label: "Energy Level", value: "82", unit: "%", color: "orange" as const },
      { icon: Thermometer, label: "Body Temp", value: "36.5", unit: "°C", color: "green" as const },
      { icon: Droplets, label: "Hydration", value: "94", unit: "%", color: "blue" as const },
      { icon: Eye, label: "Focus Index", value: "92", unit: "/ 100", color: "star" as const },
    ],
    stress: 18,
    emotional: [
      { label: "Calm", value: 82, color: "bg-glow-green" },
      { label: "Focused", value: 90, color: "bg-primary" },
      { label: "Anxiety", value: 8, color: "bg-glow-orange" },
      { label: "Fatigue", value: 15, color: "bg-glow-red" },
      { label: "Motivation", value: 92, color: "bg-accent" },
      { label: "Isolation", value: 10, color: "bg-glow-blue" },
    ],
    heartRate: [66, 68, 67, 70, 69, 68, 66, 71, 68, 67, 65, 69, 70, 68, 67, 66, 68, 70, 68, 67, 65, 68, 69, 67, 66, 68, 70, 66, 68, 69],
    mood: [{ day: "M", val: 85 }, { day: "T", val: 88 }, { day: "W", val: 82 }, { day: "T", val: 90 }, { day: "F", val: 87 }, { day: "S", val: 92 }, { day: "S", val: 94 }],
  },
  {
    name: "Dr. James Park",
    role: "Flight Surgeon",
    mental: 87, fatigue: 22, cognitive: 89, social: 91,
    metrics: [
      { icon: Heart, label: "Heart Rate", value: "74", unit: "bpm", color: "red" as const },
      { icon: Brain, label: "Cognitive Score", value: "89", unit: "/ 100", color: "nebula" as const },
      { icon: Moon, label: "Sleep Quality", value: "79", unit: "%", color: "blue" as const },
      { icon: Wind, label: "O₂ Saturation", value: "98", unit: "%", color: "star" as const },
      { icon: Zap, label: "Energy Level", value: "75", unit: "%", color: "orange" as const },
      { icon: Thermometer, label: "Body Temp", value: "36.7", unit: "°C", color: "green" as const },
      { icon: Droplets, label: "Hydration", value: "88", unit: "%", color: "blue" as const },
      { icon: Eye, label: "Focus Index", value: "86", unit: "/ 100", color: "star" as const },
    ],
    stress: 28,
    emotional: [
      { label: "Calm", value: 70, color: "bg-glow-green" },
      { label: "Focused", value: 82, color: "bg-primary" },
      { label: "Anxiety", value: 15, color: "bg-glow-orange" },
      { label: "Fatigue", value: 22, color: "bg-glow-red" },
      { label: "Motivation", value: 88, color: "bg-accent" },
      { label: "Isolation", value: 12, color: "bg-glow-blue" },
    ],
    heartRate: [72, 74, 73, 76, 75, 73, 71, 76, 74, 72, 70, 75, 77, 74, 72, 71, 73, 76, 74, 72, 70, 74, 75, 73, 72, 74, 76, 71, 73, 75],
    mood: [{ day: "M", val: 78 }, { day: "T", val: 82 }, { day: "W", val: 80 }, { day: "T", val: 85 }, { day: "F", val: 83 }, { day: "S", val: 87 }, { day: "S", val: 90 }],
  },
  {
    name: "Lt. Anika Sharma",
    role: "Pilot",
    mental: 78, fatigue: 35, cognitive: 85, social: 72,
    metrics: [
      { icon: Heart, label: "Heart Rate", value: "78", unit: "bpm", color: "red" as const },
      { icon: Brain, label: "Cognitive Score", value: "85", unit: "/ 100", color: "nebula" as const },
      { icon: Moon, label: "Sleep Quality", value: "68", unit: "%", color: "blue" as const },
      { icon: Wind, label: "O₂ Saturation", value: "97", unit: "%", color: "star" as const },
      { icon: Zap, label: "Energy Level", value: "62", unit: "%", color: "orange" as const },
      { icon: Thermometer, label: "Body Temp", value: "36.8", unit: "°C", color: "green" as const },
      { icon: Droplets, label: "Hydration", value: "82", unit: "%", color: "blue" as const },
      { icon: Eye, label: "Focus Index", value: "80", unit: "/ 100", color: "star" as const },
    ],
    stress: 42,
    emotional: [
      { label: "Calm", value: 50, color: "bg-glow-green" },
      { label: "Focused", value: 72, color: "bg-primary" },
      { label: "Anxiety", value: 25, color: "bg-glow-orange" },
      { label: "Fatigue", value: 35, color: "bg-glow-red" },
      { label: "Motivation", value: 74, color: "bg-accent" },
      { label: "Isolation", value: 30, color: "bg-glow-blue" },
    ],
    heartRate: [76, 78, 77, 82, 80, 78, 75, 81, 79, 77, 74, 80, 83, 79, 77, 75, 78, 81, 79, 77, 74, 78, 80, 77, 76, 78, 81, 75, 78, 80],
    mood: [{ day: "M", val: 65 }, { day: "T", val: 70 }, { day: "W", val: 68 }, { day: "T", val: 75 }, { day: "F", val: 72 }, { day: "S", val: 78 }, { day: "S", val: 80 }],
  },
  {
    name: "Eng. Mikhail Petrov",
    role: "Systems Engineer",
    mental: 84, fatigue: 28, cognitive: 91, social: 80,
    metrics: [
      { icon: Heart, label: "Heart Rate", value: "71", unit: "bpm", color: "red" as const },
      { icon: Brain, label: "Cognitive Score", value: "91", unit: "/ 100", color: "nebula" as const },
      { icon: Moon, label: "Sleep Quality", value: "76", unit: "%", color: "blue" as const },
      { icon: Wind, label: "O₂ Saturation", value: "98", unit: "%", color: "star" as const },
      { icon: Zap, label: "Energy Level", value: "70", unit: "%", color: "orange" as const },
      { icon: Thermometer, label: "Body Temp", value: "36.6", unit: "°C", color: "green" as const },
      { icon: Droplets, label: "Hydration", value: "86", unit: "%", color: "blue" as const },
      { icon: Eye, label: "Focus Index", value: "88", unit: "/ 100", color: "star" as const },
    ],
    stress: 32,
    emotional: [
      { label: "Calm", value: 62, color: "bg-glow-green" },
      { label: "Focused", value: 85, color: "bg-primary" },
      { label: "Anxiety", value: 18, color: "bg-glow-orange" },
      { label: "Fatigue", value: 28, color: "bg-glow-red" },
      { label: "Motivation", value: 80, color: "bg-accent" },
      { label: "Isolation", value: 22, color: "bg-glow-blue" },
    ],
    heartRate: [69, 71, 70, 74, 72, 70, 68, 73, 71, 69, 67, 72, 74, 71, 69, 68, 70, 73, 71, 69, 67, 71, 72, 70, 69, 71, 73, 68, 70, 72],
    mood: [{ day: "M", val: 72 }, { day: "T", val: 78 }, { day: "W", val: 75 }, { day: "T", val: 82 }, { day: "F", val: 78 }, { day: "S", val: 84 }, { day: "S", val: 86 }],
  },
];

const getStressLabel = (score: number) => {
  if (score < 25) return { text: "● Nominal — Low stress", className: "text-glow-green" };
  if (score < 45) return { text: "● Elevated — Moderate stress", className: "text-glow-orange" };
  return { text: "● Warning — High stress", className: "text-glow-red" };
};

const HealthDashboard = () => {
  const [selectedCrew, setSelectedCrew] = useState(0);
  const crew = crewData[selectedCrew];
  const stressInfo = getStressLabel(crew.stress);

  return (
    <section id="dashboard" className="relative py-32 px-6">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <img src={nebulaBg} alt="" className="w-full h-full object-cover" style={{ filter: "blur(40px)" }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">System Status</span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-4 text-foreground">
            Health <span className="text-primary text-glow-star">Dashboard</span>
          </h2>
        </motion.div>

        {/* Crew selector */}
        <HoloPanel className="mb-10">
          <h3 className="font-orbitron text-sm font-bold text-foreground mb-6 tracking-wider">SELECT CREW MEMBER</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {crewData.map((c, i) => (
              <motion.button
                key={c.name}
                onClick={() => setSelectedCrew(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`text-left rounded-lg p-4 border transition-all duration-300 cursor-pointer ${
                  selectedCrew === i
                    ? "border-primary/40 bg-primary/10 glow-star-strong"
                    : "border-border/50 bg-muted/20 hover:border-primary/20 hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-orbitron text-xs font-bold transition-colors ${
                    selectedCrew === i ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary/60"
                  }`}>
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
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <span className="w-14 text-muted-foreground font-mono">{s.label}</span>
                      <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${s.color} opacity-60`} style={{ width: `${s.val}%` }} />
                      </div>
                      <span className="w-8 text-right font-mono text-foreground/60">{s.val}%</span>
                    </div>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </HoloPanel>

        {/* Animated crew dashboard */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCrew}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Active crew header */}
            <div className="mb-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center font-orbitron text-primary text-lg font-bold glow-star">
                {crew.name.split(" ").pop()?.[0]}
              </div>
              <div>
                <h3 className="font-orbitron text-lg font-bold text-foreground tracking-wider">{crew.name}</h3>
                <p className="text-xs text-muted-foreground font-mono">{crew.role} — VITALS ACTIVE</p>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {crew.metrics.map((m, i) => (
                <MetricCard key={`${selectedCrew}-${m.label}`} {...m} delay={i * 0.06} />
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-10">
              <HoloPanel>
                <h3 className="font-orbitron text-sm font-bold text-foreground mb-4 tracking-wider">STRESS ANALYSIS</h3>
                <div className="flex items-center gap-6 mb-4">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(240 15% 12%)" strokeWidth="6" />
                      <motion.circle
                        cx="50" cy="50" r="40" fill="none" stroke="hsl(220 60% 70%)" strokeWidth="6"
                        strokeLinecap="round" opacity="0.7"
                        initial={{ strokeDasharray: `0 ${100 * 2.51}` }}
                        animate={{ strokeDasharray: `${crew.stress * 2.51} ${100 * 2.51}` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-orbitron text-xl font-bold text-primary">{crew.stress}</span>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-mono tracking-wider">STRESS SCORE</p>
                    <p className="text-2xl font-orbitron font-bold text-foreground">{crew.stress} <span className="text-sm text-muted-foreground">/ 100</span></p>
                    <p className={`${stressInfo.className} text-xs mt-1 font-mono`}>{stressInfo.text}</p>
                  </div>
                </div>
              </HoloPanel>

              <HoloPanel variant="nebula">
                <h3 className="font-orbitron text-sm font-bold text-foreground mb-4 tracking-wider">EMOTIONAL STATE</h3>
                <div className="space-y-3">
                  {crew.emotional.map((e) => (
                    <div key={e.label} className="flex items-center gap-3">
                      <span className="w-20 text-xs text-muted-foreground font-mono">{e.label}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${e.value}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full rounded-full ${e.color} opacity-70`}
                        />
                      </div>
                      <span className="text-xs font-mono text-foreground/70 w-10 text-right">{e.value}%</span>
                    </div>
                  ))}
                </div>
              </HoloPanel>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <HoloPanel className="lg:col-span-2">
                <h3 className="font-orbitron text-xs font-bold text-foreground mb-4 tracking-wider">HEART RATE MONITOR</h3>
                <div className="h-28 flex items-end gap-[2px]">
                  {crew.heartRate.map((v, i) => (
                    <motion.div
                      key={`${selectedCrew}-hr-${i}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${((v - 60) / 25) * 100}%` }}
                      transition={{ duration: 0.5, delay: i * 0.02 }}
                      className="flex-1 rounded-t bg-gradient-to-t from-glow-red/30 to-glow-red/60"
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-mono">
                  <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
                </div>
              </HoloPanel>

              <HoloPanel variant="nebula">
                <h3 className="font-orbitron text-xs font-bold text-foreground mb-4 tracking-wider">WEEKLY MOOD</h3>
                <div className="h-28 flex items-end gap-2">
                  {crew.mood.map((d, i) => (
                    <div key={`${selectedCrew}-mood-${i}`} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${d.val}%` }}
                        transition={{ duration: 0.6, delay: i * 0.06 }}
                        className="w-full rounded-t bg-gradient-to-t from-accent/30 to-accent/60"
                      />
                      <span className="text-[10px] text-muted-foreground font-mono">{d.day}</span>
                    </div>
                  ))}
                </div>
              </HoloPanel>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HealthDashboard;
