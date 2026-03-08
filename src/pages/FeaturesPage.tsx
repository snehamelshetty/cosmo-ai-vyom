import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";
import {
  Bot, Brain, Heart, Puzzle, Headphones, Zap, BarChart3, Rocket, Globe, Users, AlertTriangle, Satellite, Eye, Activity
} from "lucide-react";

const features = [
  { icon: Headphones, title: "Acoustic Relaxation", path: "/sound-therapy", variant: "star" as const,
    desc: "Earth-based sound therapy — rainfall, ocean waves, forest ambience, bird chirping, fireplace crackling, and more." },
  { icon: Zap, title: "AI Fatigue Prediction", path: "/fatigue-prediction", variant: "nebula" as const,
    desc: "Machine learning predicts exhaustion from biometric data, behavior patterns, and sleep cycles before it happens." },
  { icon: Puzzle, title: "Cognitive Fitness Trainer", path: "/fitness-trainer", variant: "star" as const,
    desc: "Interactive brain training — memory tests, reaction speed, pattern recognition, and focus endurance exercises." },
  { icon: Bot, title: "AI Psychological Support", path: "/psychological-support", variant: "nebula" as const,
    desc: "Conversational AI companion detecting stress, loneliness, anxiety, and providing evidence-based coping strategies." },
  { icon: Brain, title: "Mental Health Monitoring", path: "/mental-health", variant: "star" as const,
    desc: "Tracks cognitive score, sleep quality, focus index, stress levels, mood, and social interaction patterns." },
  { icon: Heart, title: "Physical Health Monitoring", path: "/physical-health", variant: "nebula" as const,
    desc: "Real-time biometric tracking — heart rate, O₂ saturation, temperature, hydration, blood pressure, and energy." },
  { icon: Globe, title: "3D Galaxy Map", path: "/galaxy-map", variant: "star" as const,
    desc: "Interactive 3D solar system explorer with rotating planets, orbit rings, and clickable celestial bodies." },
  { icon: Rocket, title: "Mission Vehicles", path: "/mission-vehicles", variant: "nebula" as const,
    desc: "Spacecraft fleet specifications — Falcon 9, SLS, Starship, New Glenn — integrated with MAITHRI wellbeing systems." },
  { icon: BarChart3, title: "Before vs After Space", path: "/before-after-space", variant: "star" as const,
    desc: "How space changes the human body — bone loss, muscle atrophy, vision changes, cardiovascular remodeling." },
  { icon: Eye, title: "Stellarium Sky Viewer", path: "/sky-viewer", variant: "nebula" as const,
    desc: "Explore constellations, planets, galaxies, and star clusters with an embedded interactive sky viewer." },
  { icon: Activity, title: "Emergency Stabilizer", path: "/features", variant: "star" as const,
    desc: "Activates breathing exercises, grounding techniques, calming visuals, and guided meditation during distress." },
  { icon: Users, title: "Social Connection Simulator", path: "/features", variant: "nebula" as const,
    desc: "Reduces isolation with simulated family conversations, familiar voices, and interactive Earth memories." },
];

const FeaturesPage = () => {
  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-20">
            <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">AI Systems Suite</span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mt-4 text-foreground">
              MAITHRI <span className="text-primary text-glow-star">Features</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base font-light">
              A comprehensive AI-powered suite designed for every aspect of astronaut wellbeing during long-duration deep space missions. Click any feature to explore.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Link key={f.title} to={f.path}>
                <HoloPanel variant={f.variant} delay={i * 0.04}
                  className="group hover:scale-[1.03] transition-transform duration-500 h-full cursor-pointer">
                  <f.icon className={`w-7 h-7 mb-4 ${f.variant === "star" ? "text-primary" : "text-accent"} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
                  <h3 className="font-orbitron text-xs font-bold text-foreground mb-2 tracking-wider group-hover:text-primary transition-colors duration-300">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  <span className="inline-block mt-3 text-[9px] font-mono text-primary/40 group-hover:text-primary/80 transition-colors duration-300 tracking-wider">
                    EXPLORE →
                  </span>
                </HoloPanel>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FeaturesPage;
