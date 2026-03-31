import { motion } from "framer-motion";
import { Brain, Moon, Eye, Shield, Users, Heart, Smile, MessageSquare } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";
import MetricCard from "@/components/MetricCard";

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

const moodTrend = [
  { day: "Mon", mood: 72 }, { day: "Tue", mood: 78 }, { day: "Wed", mood: 68 },
  { day: "Thu", mood: 82 }, { day: "Fri", mood: 76 }, { day: "Sat", mood: 85 }, { day: "Sun", mood: 88 },
];

const sleepData = [
  { day: "Mon", deep: 35, light: 45, rem: 20 },
  { day: "Tue", deep: 40, light: 40, rem: 20 },
  { day: "Wed", deep: 30, light: 50, rem: 20 },
  { day: "Thu", deep: 42, light: 38, rem: 20 },
  { day: "Fri", deep: 38, light: 42, rem: 20 },
  { day: "Sat", deep: 45, light: 35, rem: 20 },
  { day: "Sun", deep: 48, light: 32, rem: 20 },
];

const cognitiveSkills = [
  { label: "Memory", value: 85 },
  { label: "Focus", value: 92 },
  { label: "Reaction", value: 78 },
  { label: "Spatial", value: 88 },
  { label: "Logic", value: 91 },
  { label: "Language", value: 86 },
];

const MentalHealthPage = () => {
  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
            <span className="text-accent/60 font-mono text-[10px] tracking-[0.5em] uppercase">Neuropsychological Analysis</span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mt-4 text-foreground">
              Mental Health <span className="text-accent text-glow-nebula">Monitoring</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Comprehensive psychological and cognitive health tracking for astronaut wellbeing during deep space missions.
            </p>
          </motion.div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {mentalMetrics.map((m, i) => (
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

            {/* Weekly mood trend */}
            <HoloPanel>
              <h3 className="font-orbitron text-xs font-bold text-foreground mb-4 tracking-wider">WEEKLY MOOD TREND</h3>
              <div className="h-40 flex items-end gap-3">
                {moodTrend.map((d, i) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div initial={{ height: 0 }} whileInView={{ height: `${d.mood}%` }}
                      viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08 }}
                      className="w-full rounded-t bg-gradient-to-t from-accent/30 to-accent/60" />
                    <span className="text-[9px] font-mono text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </HoloPanel>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {/* Sleep analysis */}
            <HoloPanel>
              <h3 className="font-orbitron text-xs font-bold text-foreground mb-4 tracking-wider">SLEEP ARCHITECTURE</h3>
              <div className="h-36 flex items-end gap-2">
                {sleepData.map((d, i) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-0.5">
                    <div className="w-full flex flex-col">
                      <motion.div initial={{ height: 0 }} whileInView={{ height: `${d.deep}px` }}
                        viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
                        className="w-full rounded-t bg-glow-blue/50" />
                      <motion.div initial={{ height: 0 }} whileInView={{ height: `${d.light}px` }}
                        viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 + 0.1 }}
                        className="w-full bg-primary/30" />
                      <motion.div initial={{ height: 0 }} whileInView={{ height: `${d.rem}px` }}
                        viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 + 0.2 }}
                        className="w-full rounded-b bg-accent/40" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground mt-1">{d.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-3 justify-center">
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-glow-blue/50" /><span className="text-[9px] text-muted-foreground font-mono">Deep</span></div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary/30" /><span className="text-[9px] text-muted-foreground font-mono">Light</span></div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent/40" /><span className="text-[9px] text-muted-foreground font-mono">REM</span></div>
              </div>
            </HoloPanel>

            {/* Cognitive radar */}
            <HoloPanel variant="nebula">
              <h3 className="font-orbitron text-xs font-bold text-foreground mb-6 tracking-wider text-center">COGNITIVE FITNESS RADAR</h3>
              <div className="grid grid-cols-3 gap-4">
                {cognitiveSkills.map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center gap-2">
                    <div className="relative w-14 h-14">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(240 15% 12%)" strokeWidth="5" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(270 50% 55%)" strokeWidth="5"
                          strokeDasharray={`${s.value * 2.51} ${100 * 2.51}`} strokeLinecap="round" opacity="0.6" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-orbitron text-xs font-bold text-foreground/70">{s.value}</span>
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground tracking-wider">{s.label.toUpperCase()}</span>
                  </motion.div>
                ))}
              </div>
            </HoloPanel>
          </div>

          {/* AI Insights */}
          <HoloPanel>
            <div className="flex items-start gap-4">
              <MessageSquare className="w-6 h-6 text-accent/50 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-orbitron text-xs font-bold text-foreground mb-2 tracking-wider">COSMO AI INSIGHT</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "Your cognitive performance has improved by 4% this week, with notable gains in focus and memory retention.
                  However, your isolation index has increased slightly. I recommend scheduling a video call with family or engaging
                  in the Social Connection Simulator. Your sleep architecture shows healthy REM cycles — keep maintaining your current sleep protocol."
                </p>
              </div>
            </div>
          </HoloPanel>
        </div>
      </section>
    </PageLayout>
  );
};

export default MentalHealthPage;
