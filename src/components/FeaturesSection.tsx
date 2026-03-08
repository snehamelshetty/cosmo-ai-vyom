import { motion } from "framer-motion";
import HoloPanel from "./HoloPanel";
import {
  Bot, Brain, Heart, Satellite, Puzzle, AlertTriangle,
  Users, Headphones, Globe, Zap, BarChart3, Rocket
} from "lucide-react";

const features = [
  {
    icon: Bot, title: "AI Psychological Support", color: "cyan" as const,
    desc: "Conversational AI companion that detects stress, loneliness, and anxiety from voice tone, writing style, and interaction patterns.",
  },
  {
    icon: Brain, title: "Mental Health Monitoring", color: "purple" as const,
    desc: "Tracks mood variation, isolation index, stress fluctuations, and motivation levels throughout missions.",
  },
  {
    icon: Heart, title: "Physical Health Monitoring", color: "cyan" as const,
    desc: "Integrates biometric sensors to track heart rate, O₂ saturation, temperature, hydration, sleep, and fatigue.",
  },
  {
    icon: Satellite, title: "Mission Companion AI", color: "purple" as const,
    desc: "Helps maintain routine with reminders for exercise, work tasks, hydration, sleep, and communication schedules.",
  },
  {
    icon: Puzzle, title: "Cognitive Fitness Trainer", color: "cyan" as const,
    desc: "Brain training exercises for memory, focus, reaction speed, spatial awareness, and logic.",
  },
  {
    icon: AlertTriangle, title: "Emergency Stabilizer", color: "purple" as const,
    desc: "Activates breathing exercises, grounding techniques, calming visuals, and guided meditation during distress.",
  },
  {
    icon: Users, title: "Social Connection Simulator", color: "cyan" as const,
    desc: "Reduces isolation with simulated family conversations, familiar voices, and interactive memories.",
  },
  {
    icon: Globe, title: "VR Relaxation Module", color: "purple" as const,
    desc: "Virtual environments — forests, oceans, mountains, night sky — for temporary escape from space.",
  },
  {
    icon: Zap, title: "AI Fatigue Prediction", color: "cyan" as const,
    desc: "Machine learning predicts exhaustion from behavior patterns, biometric data, and sleep cycles.",
  },
  {
    icon: BarChart3, title: "Crew Harmony Analyzer", color: "purple" as const,
    desc: "Analyzes communication to detect conflict, tension, and social withdrawal. Suggests team improvements.",
  },
  {
    icon: Headphones, title: "Acoustic Relaxation", color: "cyan" as const,
    desc: "Sound therapy with calming Earth sounds — bird chirping, rainfall, ocean waves, fireplace, wind in forest.",
  },
  {
    icon: Rocket, title: "Mission Intelligence", color: "purple" as const,
    desc: "Spacecraft specs, crew capacity, mission duration, orbital paths — all integrated with AI wellbeing data.",
  },
];

const iconColorMap = {
  cyan: "text-primary",
  purple: "text-accent",
};

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-widest">🤖 AI SYSTEMS</span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-4 text-foreground">
            Core <span className="text-primary text-glow-cyan">Features</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            A comprehensive AI suite designed to support every aspect of astronaut wellbeing during long-duration space missions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <HoloPanel key={f.title} variant={f.color} delay={i * 0.05} className="group hover:scale-[1.02] transition-transform">
              <f.icon className={`w-8 h-8 mb-4 ${iconColorMap[f.color]}`} />
              <h3 className="font-orbitron text-base font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </HoloPanel>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
