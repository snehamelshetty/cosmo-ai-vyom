import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Brain, Moon, Activity, AlertTriangle, Shield, Users, Zap } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PolarRadiusAxis,
} from "recharts";

// ─── Crew Data ───────────────────────────────────────────────
const crewMembers = [
  {
    id: "commander", name: "Cmdr. Elena Vasquez", role: "Commander", avatar: "EV",
    heartRate: 72, stress: 22, o2: 98, temp: 36.6,
    heartTrend: [68,70,72,74,71,69,72,73,70,72,74,71,69,72,75,73,70,72,68,71,73,70,72,74],
    sleepData: [
      { day: "Mon", deep: 3.2, light: 2.8, rem: 1.5 },
      { day: "Tue", deep: 3.5, light: 2.5, rem: 1.8 },
      { day: "Wed", deep: 2.8, light: 3.0, rem: 1.4 },
      { day: "Thu", deep: 3.6, light: 2.6, rem: 1.9 },
      { day: "Fri", deep: 3.3, light: 2.9, rem: 1.6 },
      { day: "Sat", deep: 3.8, light: 2.4, rem: 2.0 },
      { day: "Sun", deep: 3.4, light: 2.7, rem: 1.7 },
    ],
    moodData: [
      { day: "Mon", score: 82 }, { day: "Tue", score: 78 }, { day: "Wed", score: 85 },
      { day: "Thu", score: 80 }, { day: "Fri", score: 88 }, { day: "Sat", score: 90 }, { day: "Sun", score: 86 },
    ],
    emotional: { calm: 72, focused: 85, anxiety: 8, fatigue: 15, motivation: 90, isolation: 12 },
    cognitive: [
      { metric: "Focus", value: 92 }, { metric: "Memory", value: 88 }, { metric: "Reaction", value: 85 },
      { metric: "Logic", value: 90 }, { metric: "Spatial", value: 87 }, { metric: "Language", value: 91 },
    ],
    aiStatus: "Nominal — Low stress detected",
  },
  {
    id: "engineer", name: "Eng. Mikhail Petrov", role: "Engineer", avatar: "MP",
    heartRate: 76, stress: 31, o2: 97, temp: 36.8,
    heartTrend: [74,76,78,75,73,77,76,74,78,76,75,77,79,76,74,78,76,73,75,77,76,74,78,75],
    sleepData: [
      { day: "Mon", deep: 2.8, light: 3.2, rem: 1.2 },
      { day: "Tue", deep: 2.5, light: 3.5, rem: 1.0 },
      { day: "Wed", deep: 2.6, light: 3.0, rem: 1.3 },
      { day: "Thu", deep: 2.9, light: 2.8, rem: 1.4 },
      { day: "Fri", deep: 2.4, light: 3.3, rem: 1.1 },
      { day: "Sat", deep: 2.7, light: 3.1, rem: 1.2 },
      { day: "Sun", deep: 2.3, light: 3.4, rem: 1.0 },
    ],
    moodData: [
      { day: "Mon", score: 70 }, { day: "Tue", score: 65 }, { day: "Wed", score: 72 },
      { day: "Thu", score: 68 }, { day: "Fri", score: 74 }, { day: "Sat", score: 71 }, { day: "Sun", score: 69 },
    ],
    emotional: { calm: 55, focused: 78, anxiety: 22, fatigue: 35, motivation: 72, isolation: 28 },
    cognitive: [
      { metric: "Focus", value: 84 }, { metric: "Memory", value: 80 }, { metric: "Reaction", value: 78 },
      { metric: "Logic", value: 92 }, { metric: "Spatial", value: 90 }, { metric: "Language", value: 76 },
    ],
    aiStatus: "Caution — Elevated fatigue markers",
  },
  {
    id: "scientist", name: "Dr. Aisha Rahman", role: "Scientist", avatar: "AR",
    heartRate: 69, stress: 18, o2: 99, temp: 36.5,
    heartTrend: [67,68,69,70,68,67,69,70,68,69,71,69,67,68,70,69,67,69,70,68,67,69,68,70],
    sleepData: [
      { day: "Mon", deep: 3.8, light: 2.4, rem: 2.0 },
      { day: "Tue", deep: 3.6, light: 2.6, rem: 1.9 },
      { day: "Wed", deep: 3.9, light: 2.3, rem: 2.1 },
      { day: "Thu", deep: 3.7, light: 2.5, rem: 2.0 },
      { day: "Fri", deep: 4.0, light: 2.2, rem: 2.2 },
      { day: "Sat", deep: 3.5, light: 2.7, rem: 1.8 },
      { day: "Sun", deep: 3.8, light: 2.4, rem: 2.0 },
    ],
    moodData: [
      { day: "Mon", score: 88 }, { day: "Tue", score: 90 }, { day: "Wed", score: 86 },
      { day: "Thu", score: 92 }, { day: "Fri", score: 89 }, { day: "Sat", score: 94 }, { day: "Sun", score: 91 },
    ],
    emotional: { calm: 82, focused: 90, anxiety: 5, fatigue: 10, motivation: 95, isolation: 8 },
    cognitive: [
      { metric: "Focus", value: 90 }, { metric: "Memory", value: 94 }, { metric: "Reaction", value: 82 },
      { metric: "Logic", value: 96 }, { metric: "Spatial", value: 80 }, { metric: "Language", value: 95 },
    ],
    aiStatus: "Nominal — Optimal cognitive performance",
  },
  {
    id: "pilot", name: "Lt. James Park", role: "Pilot", avatar: "JP",
    heartRate: 74, stress: 26, o2: 98, temp: 36.7,
    heartTrend: [72,74,76,73,71,75,74,72,76,74,73,75,77,74,72,76,74,71,73,75,74,72,76,73],
    sleepData: [
      { day: "Mon", deep: 3.0, light: 3.0, rem: 1.4 },
      { day: "Tue", deep: 2.8, light: 3.2, rem: 1.2 },
      { day: "Wed", deep: 3.2, light: 2.8, rem: 1.5 },
      { day: "Thu", deep: 2.6, light: 3.4, rem: 1.1 },
      { day: "Fri", deep: 3.1, light: 2.9, rem: 1.4 },
      { day: "Sat", deep: 2.9, light: 3.1, rem: 1.3 },
      { day: "Sun", deep: 2.7, light: 3.3, rem: 1.2 },
    ],
    moodData: [
      { day: "Mon", score: 75 }, { day: "Tue", score: 72 }, { day: "Wed", score: 78 },
      { day: "Thu", score: 74 }, { day: "Fri", score: 80 }, { day: "Sat", score: 77 }, { day: "Sun", score: 76 },
    ],
    emotional: { calm: 62, focused: 80, anxiety: 15, fatigue: 30, motivation: 78, isolation: 20 },
    cognitive: [
      { metric: "Focus", value: 88 }, { metric: "Memory", value: 82 }, { metric: "Reaction", value: 94 },
      { metric: "Logic", value: 85 }, { metric: "Spatial", value: 92 }, { metric: "Language", value: 80 },
    ],
    aiStatus: "Watch — Increased fatigue detected",
  },
];

const aiAlerts = [
  { icon: "⚠", text: "Sleep quality declining for Engineer", severity: "warning" },
  { icon: "⚠", text: "Increased fatigue detected for Pilot", severity: "warning" },
  { icon: "✓", text: "Commander vitals optimal — all systems green", severity: "ok" },
  { icon: "◈", text: "Scientist cognitive score above baseline", severity: "info" },
];

// ─── Stress Gauge Component ─────────────────────────────────
const StressGauge = ({ value }: { value: number }) => {
  const angle = (value / 100) * 180;
  const color = value < 30 ? "hsl(var(--glow-green))" : value < 60 ? "hsl(var(--glow-orange))" : "hsl(var(--glow-red))";
  const r = 70;
  const endX = 80 + r * Math.cos(Math.PI - (angle * Math.PI) / 180);
  const endY = 85 - r * Math.sin(Math.PI - (angle * Math.PI) / 180);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 160 100" className="w-full max-w-[200px]">
        <path d="M 10 85 A 70 70 0 0 1 150 85" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" strokeLinecap="round" />
        <motion.path
          d={`M 10 85 A 70 70 0 ${angle > 90 ? 1 : 0} 1 ${endX} ${endY}`}
          fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
        <motion.circle cx={endX} cy={endY} r="5" fill={color}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      </svg>
      <motion.span className="text-3xl font-orbitron font-bold mt-[-8px]"
        style={{ color }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        {value}%
      </motion.span>
    </div>
  );
};

// ─── Main Page ───────────────────────────────────────────────
const HealthMonitoringPage = () => {
  const [selectedCrew, setSelectedCrew] = useState(0);
  const crew = crewMembers[selectedCrew];

  const emotionalEntries = [
    { label: "Calm", value: crew.emotional.calm, color: "bg-glow-green" },
    { label: "Focused", value: crew.emotional.focused, color: "bg-primary" },
    { label: "Anxiety", value: crew.emotional.anxiety, color: "bg-glow-orange" },
    { label: "Fatigue", value: crew.emotional.fatigue, color: "bg-glow-red" },
    { label: "Motivation", value: crew.emotional.motivation, color: "bg-accent" },
    { label: "Isolation", value: crew.emotional.isolation, color: "bg-glow-blue" },
  ];

  const chartTooltipStyle = {
    contentStyle: {
      background: "hsl(240 12% 5% / 0.95)",
      border: "1px solid hsl(var(--border))",
      borderRadius: "8px",
      fontSize: "11px",
      fontFamily: "Share Tech Mono, monospace",
      color: "hsl(var(--foreground))",
    },
  };

  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">

          {/* Header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-10">
            <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Mission Control — Medical Bay</span>
            <h1 className="text-3xl md:text-5xl font-orbitron font-bold mt-3 text-foreground">
              Crew Health <span className="text-primary text-glow-star">Monitoring</span>
            </h1>
          </motion.div>

          {/* ─── Crew Selector ──────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {crewMembers.map((c, i) => (
              <motion.button key={c.id}
                onClick={() => setSelectedCrew(i)}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className={`relative rounded-xl p-4 text-left transition-all duration-300 border ${
                  selectedCrew === i
                    ? "border-primary/50 bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                    : "border-border/30 bg-card/50 hover:border-border/50 hover:bg-card/70"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-orbitron text-xs font-bold ${
                    selectedCrew === i ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {c.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-foreground">{c.role}</p>
                    <p className="text-[10px] text-muted-foreground">{c.name}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-muted-foreground">HR: <span className="text-foreground">{c.heartRate}</span></span>
                  <span className="text-muted-foreground">Stress: <span className={c.stress > 25 ? "text-glow-orange" : "text-glow-green"}>{c.stress}%</span></span>
                </div>
                {selectedCrew === i && (
                  <motion.div layoutId="crew-indicator" className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary rounded-full"
                    style={{ boxShadow: "0 0 8px hsl(var(--primary))" }} />
                )}
              </motion.button>
            ))}
          </div>

          {/* ─── Dashboard Grid ─────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div key={crew.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {/* Row 1: Heart Rate + Sleep + Mood */}
              <div className="grid lg:grid-cols-3 gap-4 mb-4">
                {/* Heart Rate */}
                <HoloPanel className="lg:col-span-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-orbitron text-[10px] font-bold text-foreground tracking-wider flex items-center gap-2">
                      <Heart className="w-3.5 h-3.5 text-glow-red" /> HEART RATE
                    </h3>
                    <span className="text-xl font-orbitron font-bold text-glow-red">{crew.heartRate} <span className="text-xs text-muted-foreground">bpm</span></span>
                  </div>
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={crew.heartTrend.map((v, i) => ({ t: i, hr: v }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="t" hide />
                      <YAxis domain={["dataMin - 5", "dataMax + 5"]} hide />
                      <Tooltip {...chartTooltipStyle} />
                      <Line type="monotone" dataKey="hr" stroke="hsl(var(--glow-red))" strokeWidth={2}
                        dot={false} style={{ filter: "drop-shadow(0 0 4px hsl(var(--glow-red)))" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </HoloPanel>

                {/* Sleep Quality */}
                <HoloPanel className="lg:col-span-1">
                  <h3 className="font-orbitron text-[10px] font-bold text-foreground mb-3 tracking-wider flex items-center gap-2">
                    <Moon className="w-3.5 h-3.5 text-glow-blue" /> SLEEP QUALITY
                  </h3>
                  <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={crew.sleepData} barGap={1}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip {...chartTooltipStyle} />
                      <Bar dataKey="deep" stackId="s" fill="hsl(var(--primary))" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="light" stackId="s" fill="hsl(var(--accent))" />
                      <Bar dataKey="rem" stackId="s" fill="hsl(var(--glow-blue))" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex gap-3 mt-2 justify-center">
                    {[["Deep", "--primary"], ["Light", "--accent"], ["REM", "--glow-blue"]].map(([l, c]) => (
                      <span key={l} className="flex items-center gap-1 text-[9px] font-mono text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ background: `hsl(var(${c}))` }} />{l}
                      </span>
                    ))}
                  </div>
                </HoloPanel>

                {/* Weekly Mood */}
                <HoloPanel className="lg:col-span-1">
                  <h3 className="font-orbitron text-[10px] font-bold text-foreground mb-3 tracking-wider flex items-center gap-2">
                    <Brain className="w-3.5 h-3.5 text-accent" /> WEEKLY MOOD INDEX
                  </h3>
                  <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={crew.moodData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis domain={[50, 100]} hide />
                      <Tooltip {...chartTooltipStyle} />
                      <Bar dataKey="score" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]}
                        style={{ filter: "drop-shadow(0 0 4px hsl(var(--accent) / 0.4))" }} />
                    </BarChart>
                  </ResponsiveContainer>
                </HoloPanel>
              </div>

              {/* Row 2: Stress + Emotional + Cognitive */}
              <div className="grid lg:grid-cols-3 gap-4 mb-4">
                {/* Stress Gauge */}
                <HoloPanel variant="nebula">
                  <h3 className="font-orbitron text-[10px] font-bold text-foreground mb-2 tracking-wider flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-glow-green" /> STRESS ANALYSIS
                  </h3>
                  <StressGauge value={crew.stress} />
                  <div className="mt-2 text-center">
                    <span className="text-[10px] font-mono text-muted-foreground">AI Status: </span>
                    <span className={`text-[10px] font-mono ${crew.stress < 25 ? "text-glow-green" : crew.stress < 40 ? "text-glow-orange" : "text-glow-red"}`}>
                      {crew.aiStatus}
                    </span>
                  </div>
                </HoloPanel>

                {/* Emotional State */}
                <HoloPanel>
                  <h3 className="font-orbitron text-[10px] font-bold text-foreground mb-4 tracking-wider flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-primary" /> EMOTIONAL STATE
                  </h3>
                  <div className="space-y-2.5">
                    {emotionalEntries.map((e) => (
                      <div key={e.label} className="flex items-center gap-2">
                        <span className="w-16 text-[10px] text-muted-foreground font-mono">{e.label}</span>
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }} animate={{ width: `${e.value}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className={`h-full rounded-full ${e.color} opacity-70`}
                            style={{ boxShadow: `0 0 6px currentColor` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-foreground/70 w-8 text-right">{e.value}%</span>
                      </div>
                    ))}
                  </div>
                </HoloPanel>

                {/* Cognitive Radar */}
                <HoloPanel variant="nebula">
                  <h3 className="font-orbitron text-[10px] font-bold text-foreground mb-2 tracking-wider flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-glow-star" /> COGNITIVE RADAR
                  </h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <RadarChart data={crew.cognitive} cx="50%" cy="50%" outerRadius="70%">
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2}
                        style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.4))" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </HoloPanel>
              </div>

              {/* Row 3: Crew Overview + AI Alerts */}
              <div className="grid lg:grid-cols-3 gap-4">
                {/* Crew Overview */}
                <HoloPanel className="lg:col-span-2">
                  <h3 className="font-orbitron text-[10px] font-bold text-foreground mb-4 tracking-wider flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-accent" /> CREW OVERVIEW
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {crewMembers.map((c, i) => (
                      <motion.div key={c.id}
                        whileHover={{ scale: 1.04 }}
                        onClick={() => setSelectedCrew(i)}
                        className={`rounded-lg p-3 border cursor-pointer transition-all ${
                          selectedCrew === i
                            ? "border-primary/40 bg-primary/5"
                            : "border-border/30 bg-muted/20 hover:border-border/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-orbitron font-bold ${
                            selectedCrew === i ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                          }`}>{c.avatar}</div>
                          <span className="text-[10px] font-bold text-foreground">{c.role}</span>
                        </div>
                        <div className="space-y-1 text-[9px] font-mono">
                          <div className="flex justify-between text-muted-foreground">
                            <span>Heart Rate</span>
                            <span className="text-foreground">{c.heartRate} bpm</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground">
                            <span>Stress</span>
                            <span className={c.stress > 25 ? "text-glow-orange" : "text-glow-green"}>{c.stress}%</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground">
                            <span>O₂ Sat</span>
                            <span className="text-foreground">{c.o2}%</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </HoloPanel>

                {/* AI Alerts */}
                <HoloPanel variant="nebula">
                  <h3 className="font-orbitron text-[10px] font-bold text-foreground mb-4 tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-glow-orange" /> AI HEALTH ALERTS
                  </h3>
                  <div className="space-y-2">
                    {aiAlerts.map((a, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className={`flex items-start gap-2 rounded-lg p-2.5 border text-[10px] font-mono ${
                          a.severity === "warning"
                            ? "border-glow-orange/20 bg-glow-orange/5 text-glow-orange"
                            : a.severity === "ok"
                            ? "border-glow-green/20 bg-glow-green/5 text-glow-green"
                            : "border-primary/20 bg-primary/5 text-primary"
                        }`}
                      >
                        <span className="text-sm mt-[-1px]">{a.icon}</span>
                        <span>{a.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </HoloPanel>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>
    </PageLayout>
  );
};

export default HealthMonitoringPage;
