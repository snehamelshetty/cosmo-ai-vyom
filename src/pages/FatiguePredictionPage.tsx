import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, TrendingDown, TrendingUp, AlertTriangle, Moon, Activity, Droplets, Brain, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";

const fatigueFactors = [
  { icon: Moon, label: "Sleep Quality", value: 72, weight: 0.3, status: "moderate" },
  { icon: Activity, label: "Physical Activity", value: 45, weight: 0.2, status: "low" },
  { icon: Droplets, label: "Hydration Level", value: 88, weight: 0.15, status: "good" },
  { icon: Brain, label: "Cognitive Load", value: 82, weight: 0.2, status: "high" },
  { icon: Clock, label: "Work Hours", value: 65, weight: 0.15, status: "moderate" },
];

const hourlyPrediction = [
  { hour: "06:00", fatigue: 25, alert: false },
  { hour: "08:00", fatigue: 15, alert: false },
  { hour: "10:00", fatigue: 20, alert: false },
  { hour: "12:00", fatigue: 35, alert: false },
  { hour: "14:00", fatigue: 55, alert: true },
  { hour: "16:00", fatigue: 65, alert: true },
  { hour: "18:00", fatigue: 50, alert: true },
  { hour: "20:00", fatigue: 70, alert: true },
  { hour: "22:00", fatigue: 80, alert: true },
];

const recommendations = [
  { priority: "high", text: "Take a 20-minute power nap between 14:00-15:00", reason: "Predicted fatigue spike at 55%" },
  { priority: "high", text: "Increase water intake by 500ml before 12:00", reason: "Hydration dropping below optimal" },
  { priority: "medium", text: "Switch to light cognitive tasks after 16:00", reason: "Cognitive load too high for evening" },
  { priority: "medium", text: "15-minute exercise break at 11:00", reason: "Physical activity levels below baseline" },
  { priority: "low", text: "Start sleep preparation protocol at 21:00", reason: "Optimize circadian rhythm reset" },
];

const FatiguePredictionPage = () => {
  const [overallFatigue, setOverallFatigue] = useState(0);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  useEffect(() => {
    const total = fatigueFactors.reduce((sum, f) => sum + (100 - f.value) * f.weight, 0);
    const target = Math.round(total);
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setOverallFatigue(current);
      if (current >= target) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
            <span className="text-glow-orange/60 font-mono text-[10px] tracking-[0.5em] uppercase">Predictive AI</span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mt-4 text-foreground">
              Fatigue <span className="text-glow-orange" style={{ textShadow: "0 0 20px hsl(30 80% 50% / 0.4)" }}>Prediction</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Machine learning analysis of biometric data, behavior patterns, and sleep cycles to predict exhaustion before it happens.
            </p>
          </motion.div>

          {/* Main score */}
          <div className="flex justify-center mb-16">
            <HoloPanel className="w-72 text-center">
              <p className="font-mono text-[10px] text-muted-foreground tracking-wider mb-4">CURRENT FATIGUE INDEX</p>
              <div className="relative w-36 h-36 mx-auto mb-4">
                <svg className="w-36 h-36 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(240 15% 12%)" strokeWidth="6" />
                  <circle cx="50" cy="50" r="42" fill="none"
                    stroke={overallFatigue > 60 ? "hsl(0 60% 50%)" : overallFatigue > 40 ? "hsl(30 80% 50%)" : "hsl(150 60% 45%)"}
                    strokeWidth="6" strokeDasharray={`${overallFatigue * 2.64} ${100 * 2.64}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-orbitron text-3xl font-bold text-foreground">{overallFatigue}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">/100</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                {overallFatigue > 60 ? (
                  <><AlertTriangle className="w-3 h-3 text-glow-red" /><span className="text-xs text-glow-red font-mono">HIGH RISK</span></>
                ) : overallFatigue > 40 ? (
                  <><TrendingDown className="w-3 h-3 text-glow-orange" /><span className="text-xs text-glow-orange font-mono">MODERATE</span></>
                ) : (
                  <><TrendingUp className="w-3 h-3 text-glow-green" /><span className="text-xs text-glow-green font-mono">NOMINAL</span></>
                )}
              </div>
            </HoloPanel>
          </div>

          {/* Factors */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {fatigueFactors.map((f, i) => (
              <HoloPanel key={f.label} variant={i % 2 === 0 ? "star" : "nebula"} delay={i * 0.08}>
                <f.icon className="w-5 h-5 mb-2 text-glow-orange/60" />
                <p className="font-mono text-[9px] text-muted-foreground mb-1">{f.label}</p>
                <p className="font-orbitron text-lg font-bold text-foreground">{f.value}%</p>
                <div className="h-1 mt-2 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${f.value}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full rounded-full ${f.status === "good" ? "bg-glow-green/60" : f.status === "moderate" ? "bg-glow-orange/60" : f.status === "high" ? "bg-primary/60" : "bg-glow-red/60"}`}
                  />
                </div>
              </HoloPanel>
            ))}
          </div>

          {/* Timeline */}
          <HoloPanel className="mb-12">
            <h3 className="font-orbitron text-xs font-bold text-foreground mb-6 tracking-wider">24-HOUR FATIGUE FORECAST</h3>
            <div className="h-40 flex items-end gap-2">
              {hourlyPrediction.map((h, i) => (
                <div key={h.hour} className="flex-1 flex flex-col items-center gap-1 cursor-pointer"
                  onClick={() => setSelectedHour(i)}>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${h.fatigue}%` }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className={`w-full rounded-t transition-all ${
                      selectedHour === i ? "ring-1 ring-primary/50" : ""
                    } ${h.alert ? "bg-gradient-to-t from-glow-red/20 to-glow-red/50" : "bg-gradient-to-t from-glow-green/20 to-glow-green/40"}`}
                  />
                  <span className="text-[9px] font-mono text-muted-foreground">{h.hour}</span>
                </div>
              ))}
            </div>
            {selectedHour !== null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 bg-muted/20 rounded-lg">
                <p className="text-xs text-foreground font-mono">
                  {hourlyPrediction[selectedHour].hour} — Predicted Fatigue: <span className={hourlyPrediction[selectedHour].alert ? "text-glow-red" : "text-glow-green"}>
                    {hourlyPrediction[selectedHour].fatigue}%
                  </span>
                </p>
              </motion.div>
            )}
          </HoloPanel>

          {/* Recommendations */}
          <HoloPanel variant="nebula">
            <h3 className="font-orbitron text-xs font-bold text-foreground mb-6 tracking-wider">AI RECOMMENDATIONS</h3>
            <div className="space-y-3">
              {recommendations.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-muted/10 rounded-lg border border-border/20">
                  <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                    r.priority === "high" ? "bg-glow-red" : r.priority === "medium" ? "bg-glow-orange" : "bg-glow-green"
                  }`} />
                  <div>
                    <p className="text-sm text-foreground/80">{r.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{r.reason}</p>
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

export default FatiguePredictionPage;
