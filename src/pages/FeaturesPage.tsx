import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";
import {
  Bot, Brain, Heart, Puzzle, Headphones, Zap
} from "lucide-react";

const features = [
  { icon: Headphones, title: "Acoustic Relaxation", path: "/sound-therapy", variant: "star" as const,
    desc: "Earth-based sound therapy — rainfall, ocean waves, forest ambience, bird chirping, waterfall, and fireplace crackling. Includes guided breathing exercises." },
  { icon: Zap, title: "AI Fatigue Prediction", path: "/fatigue-prediction", variant: "nebula" as const,
    desc: "Machine learning predicts exhaustion from biometric data, behavior patterns, and sleep cycles. 24-hour fatigue forecasting with AI recommendations." },
  { icon: Puzzle, title: "Cognitive Fitness Trainer", path: "/fitness-trainer", variant: "star" as const,
    desc: "Interactive brain training — memory sequence tests, reaction speed challenges, pattern recognition, and focus endurance exercises with scoring." },
  { icon: Bot, title: "AI Psychological Support", path: "/psychological-support", variant: "nebula" as const,
    desc: "Conversational AI companion detecting stress, loneliness, and anxiety. Provides evidence-based coping strategies in a spacecraft console interface." },
  { icon: Brain, title: "Mental Health Monitoring", path: "/mental-health", variant: "star" as const,
    desc: "Tracks cognitive score, sleep architecture, focus index, stress levels, mood trends, social interaction patterns, and emotional state analysis." },
  { icon: Heart, title: "Physical Health Monitoring", path: "/physical-health", variant: "nebula" as const,
    desc: "Real-time biometric telemetry — heart rate, O₂ saturation, temperature, hydration, blood pressure, muscle status, and bone density tracking." },
];

const FeaturesPage = () => {
  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-center mb-20">
            <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Mission Control Hub</span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mt-4 text-foreground">
              MAITHRI <span className="text-primary text-glow-star">Features</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base font-light">
              Six AI-powered modules designed for every aspect of astronaut wellbeing during long-duration deep space missions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link to={f.path} className="block h-full">
                  <HoloPanel variant={f.variant}
                    className="group hover:scale-[1.04] transition-all duration-500 h-full cursor-pointer hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex items-center justify-between mb-4">
                      <f.icon className={`w-8 h-8 ${f.variant === "star" ? "text-primary" : "text-accent"} opacity-50 group-hover:opacity-100 transition-all duration-500`} />
                      <motion.div className="w-2 h-2 rounded-full bg-glow-green/30 group-hover:bg-glow-green/80"
                        animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
                    </div>
                    <h3 className="font-orbitron text-sm font-bold text-foreground mb-3 tracking-wider group-hover:text-primary transition-colors duration-300">{f.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{f.desc}</p>
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono text-primary/40 group-hover:text-primary/90 transition-all duration-300 tracking-wider group-hover:gap-2">
                      LAUNCH MODULE <span className="text-primary/60">→</span>
                    </span>
                  </HoloPanel>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FeaturesPage;
