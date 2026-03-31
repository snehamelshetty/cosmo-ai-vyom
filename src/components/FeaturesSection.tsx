import { motion } from "framer-motion";
import HoloPanel from "./HoloPanel";
import { Link } from "react-router-dom";
import {
  Bot, Brain, Heart, Puzzle, Headphones, Zap, BarChart3, Rocket, Globe, Users, AlertTriangle, Satellite
} from "lucide-react";

const features = [
  { icon: Heart, title: "Health Monitoring", path: "/health-monitoring", variant: "star" as const,
    desc: "Real-time physical and mental health tracking with biometric sensor integration." },
  { icon: Zap, title: "AI Fatigue Prediction", path: "/fatigue-prediction", variant: "nebula" as const,
    desc: "Machine learning predicts exhaustion from behavior patterns, biometrics, and sleep cycles." },
  { icon: Bot, title: "Psychological Support", path: "/psychological-support", variant: "star" as const,
    desc: "AI companion detecting stress, loneliness, and anxiety from interaction patterns." },
  { icon: Puzzle, title: "Cognitive Fitness", path: "/fitness-trainer", variant: "nebula" as const,
    desc: "Brain training exercises for memory, focus, reaction speed, and spatial awareness." },
  { icon: Headphones, title: "Sound Therapy", path: "/sound-therapy", variant: "star" as const,
    desc: "Calming Earth sounds — rainfall, ocean waves, fireplace, forest ambience." },
  { icon: Globe, title: "3D Galaxy Map", path: "/galaxy-map", variant: "nebula" as const,
    desc: "Interactive solar system explorer with Stellarium sky viewer integration." },
  { icon: BarChart3, title: "Before & After Space", path: "/before-after-space", variant: "star" as const,
    desc: "How space changes the human body — physiological and psychological transformations." },
  { icon: Rocket, title: "Mission Vehicles", path: "/mission-vehicles", variant: "nebula" as const,
    desc: "Spacecraft fleet specs and COSMO integration — Falcon 9, SLS, Starship, and more." },
  { icon: Satellite, title: "Mission Companion AI", path: "/", variant: "star" as const,
    desc: "Maintains routine with reminders for exercise, hydration, sleep, and communication." },
  { icon: AlertTriangle, title: "Emergency Stabilizer", path: "/", variant: "nebula" as const,
    desc: "Activates breathing exercises, grounding techniques, and guided meditation during distress." },
  { icon: Users, title: "Social Connection", path: "/", variant: "star" as const,
    desc: "Reduces isolation with simulated family conversations and interactive memories." },
  { icon: Brain, title: "Crew Harmony", path: "/", variant: "nebula" as const,
    desc: "Analyzes communication to detect conflict, tension, and social withdrawal." },
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
            Click any feature to explore it in detail.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Link key={f.title} to={f.path}>
              <HoloPanel variant={f.variant} delay={i * 0.05}
                className="group hover:scale-[1.03] transition-transform duration-500 h-full cursor-pointer">
                <f.icon className={`w-7 h-7 mb-4 ${f.variant === "star" ? "text-primary" : "text-accent"} opacity-70 group-hover:opacity-100 transition-opacity`} />
                <h3 className="font-orbitron text-xs font-bold text-foreground mb-2 tracking-wider group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                {f.path !== "/" && (
                  <span className="inline-block mt-3 text-[9px] font-mono text-primary/50 group-hover:text-primary/80 transition-colors tracking-wider">
                    EXPLORE →
                  </span>
                )}
              </HoloPanel>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
