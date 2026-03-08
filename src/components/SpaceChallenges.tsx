import { motion } from "framer-motion";
import HoloPanel from "./HoloPanel";
import {
  Radiation, Dumbbell, Bone, BedDouble, Users, Radio,
  Brain, Eye, Timer, Compass, BookOpen, Wifi
} from "lucide-react";

const challenges = [
  { icon: Radiation, title: "Radiation Exposure", desc: "Beyond Earth's magnetosphere, cosmic rays pose significant health risks to DNA and organs." },
  { icon: Dumbbell, title: "Muscle Atrophy", desc: "Without gravity, muscles weaken rapidly. Astronauts lose 1-2% muscle mass per week." },
  { icon: Bone, title: "Bone Density Loss", desc: "Microgravity causes 1-1.5% bone loss per month, similar to osteoporosis." },
  { icon: BedDouble, title: "Sleep Disturbances", desc: "16 sunrises daily disrupt circadian rhythm, causing chronic sleep issues." },
  { icon: Users, title: "Isolation & Confinement", desc: "Confined spaces with the same crew for months create psychological strain." },
  { icon: Radio, title: "Communication Delays", desc: "Mars missions face 4-24 minute one-way delays, making real-time conversation impossible." },
];

const cognitiveSkills = [
  { icon: Brain, label: "Memory", value: 85 },
  { icon: Eye, label: "Focus", value: 92 },
  { icon: Timer, label: "Reaction", value: 78 },
  { icon: Compass, label: "Spatial", value: 88 },
  { icon: BookOpen, label: "Logic", value: 91 },
  { icon: Wifi, label: "Language", value: 86 },
];

const SpaceChallenges = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Deep Space Risks</span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-4 text-foreground">
            Astronaut <span className="text-primary text-glow-star">Challenges</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {challenges.map((c, i) => (
            <HoloPanel key={c.title} variant={i % 2 === 0 ? "star" : "nebula"} delay={i * 0.08}>
              <c.icon className={`w-6 h-6 mb-3 ${i % 2 === 0 ? "text-primary" : "text-accent"} opacity-60`} />
              <h3 className="font-orbitron text-xs font-bold text-foreground mb-2 tracking-wider">{c.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
            </HoloPanel>
          ))}
        </div>

        {/* Cognitive Radar */}
        <HoloPanel variant="nebula" className="max-w-2xl mx-auto">
          <h3 className="font-orbitron text-sm font-bold text-foreground mb-6 tracking-wider text-center">
            COGNITIVE FITNESS RADAR
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {cognitiveSkills.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(240 15% 12%)" strokeWidth="5" />
                    <circle cx="50" cy="50" r="40" fill="none"
                      stroke="hsl(270 50% 55%)" strokeWidth="5"
                      strokeDasharray={`${s.value * 2.51} ${100 * 2.51}`}
                      strokeLinecap="round" opacity="0.6" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-orbitron text-xs font-bold text-foreground/70">
                    {s.value}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-muted-foreground tracking-wider">{s.label.toUpperCase()}</span>
              </motion.div>
            ))}
          </div>
        </HoloPanel>
      </div>
    </section>
  );
};

export default SpaceChallenges;
