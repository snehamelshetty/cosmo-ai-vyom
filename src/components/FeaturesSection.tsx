import { motion } from "framer-motion";
import HoloPanel from "./HoloPanel";
import {
  Bot, Brain, Heart, Satellite, Puzzle, AlertTriangle,
  Users, Headphones, Globe, Zap, BarChart3, Rocket
} from "lucide-react";

const features = [
  { icon: Bot, title: "AI Psychological Support", variant: "star" as const,
    desc: "Conversational AI companion detecting stress, loneliness, and anxiety from voice tone, writing style, and interaction patterns." },
  { icon: Brain, title: "Mental Health Monitoring", variant: "nebula" as const,
    desc: "Tracks mood variation, isolation index, stress fluctuations, and motivation levels throughout missions." },
  { icon: Heart, title: "Physical Health Monitoring", variant: "star" as const,
    desc: "Integrates biometric sensors for heart rate, O₂ saturation, temperature, hydration, sleep, and fatigue." },
  { icon: Satellite, title: "Mission Companion AI", variant: "nebula" as const,
    desc: "Maintains routine with reminders for exercise, work tasks, hydration, sleep, and communication schedules." },
  { icon: Puzzle, title: "Cognitive Fitness Trainer", variant: "star" as const,
    desc: "Brain training exercises for memory, focus, reaction speed, spatial awareness, and logic." },
  { icon: AlertTriangle, title: "Emergency Stabilizer", variant: "nebula" as const,
    desc: "Activates breathing exercises, grounding techniques, calming visuals, and guided meditation during distress." },
  { icon: Users, title: "Social Connection Simulator", variant: "star" as const,
    desc: "Reduces isolation with simulated family conversations, familiar voices, and interactive memories." },
  { icon: Globe, title: "VR Relaxation Module", variant: "nebula" as const,
    desc: "Virtual environments — forests, oceans, mountains, night sky — for temporary escape." },
  { icon: Zap, title: "AI Fatigue Prediction", variant: "star" as const,
    desc: "Machine learning predicts exhaustion from behavior patterns, biometric data, and sleep cycles." },
  { icon: BarChart3, title: "Crew Harmony Analyzer", variant: "nebula" as const,
    desc: "Analyzes communication to detect conflict, tension, and social withdrawal." },
  { icon: Headphones, title: "Acoustic Relaxation", variant: "star" as const,
    desc: "Sound therapy with calming Earth sounds — rainfall, ocean waves, fireplace, wind in forest." },
  { icon: Rocket, title: "Mission Intelligence", variant: "nebula" as const,
    desc: "Spacecraft specs, crew capacity, mission duration — all integrated with AI wellbeing data." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mb-20">
          <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">AI Systems</span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-4 text-foreground">
            Core <span className="text-primary text-glow-star">Features</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base font-light">
            A comprehensive AI suite for every aspect of astronaut wellbeing during long-duration space missions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <HoloPanel key={f.title} variant={f.variant} delay={i * 0.05}
              className="group hover:scale-[1.02] transition-transform duration-500">
              <f.icon className={`w-7 h-7 mb-4 ${f.variant === "star" ? "text-primary" : "text-accent"} opacity-70`} />
              <h3 className="font-orbitron text-xs font-bold text-foreground mb-2 tracking-wider">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </HoloPanel>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
