import { motion } from "framer-motion";
import HoloPanel from "./HoloPanel";
import { Rocket, Satellite, Globe, Brain, Shield, Target, Flag } from "lucide-react";

const phases = [
  { year: "2024", title: "Concept & AI Training", desc: "Initial development of MAITHRI AI core, training on astronaut health datasets and biometric patterns.", icon: Brain, status: "complete" },
  { year: "2025 Q1", title: "Biometric Integration", desc: "Integration with wearable sensors for real-time heart rate, O₂, temperature, and hydration monitoring.", icon: Shield, status: "complete" },
  { year: "2025 Q2", title: "Cognitive & Psych Modules", desc: "Cognitive fitness trainer, fatigue prediction engine, and psychological support chatbot deployment.", icon: Target, status: "active" },
  { year: "2026", title: "Deep Space Simulation", desc: "Full-system testing in simulated Mars transit environments with 24-min communication delay.", icon: Satellite, status: "upcoming" },
  { year: "2027", title: "Artemis Lunar Deployment", desc: "First operational deployment aboard Artemis missions to the lunar surface.", icon: Rocket, status: "upcoming" },
  { year: "2028", title: "Gateway Station Integration", desc: "Permanent installation on the Lunar Gateway station for continuous crew support.", icon: Globe, status: "upcoming" },
  { year: "2030+", title: "Mars Mission Support", desc: "Full autonomy mode for 2+ year Mars missions — MAITHRI as sole medical AI companion.", icon: Flag, status: "upcoming" },
];

const statusColors: Record<string, string> = {
  complete: "bg-glow-green/20 border-glow-green/40 text-glow-green",
  active: "bg-primary/20 border-primary/40 text-primary animate-pulse",
  upcoming: "bg-muted/30 border-border/30 text-muted-foreground",
};

const dotColors: Record<string, string> = {
  complete: "bg-glow-green",
  active: "bg-primary glow-star",
  upcoming: "bg-muted-foreground/30",
};

const MissionTimeline = () => (
  <section className="relative py-28 px-6">
    <div className="container mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Project Roadmap</span>
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-4 text-foreground">
          Mission <span className="text-primary text-glow-star">Timeline</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm">
          From concept to Mars — tracking MAITHRI's journey to becoming humanity's AI companion in deep space.
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

        {phases.map((p, i) => {
          const Icon = p.icon;
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={p.year}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`relative flex items-start mb-10 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Dot */}
              <div className={`absolute left-6 md:left-1/2 w-3 h-3 rounded-full ${dotColors[p.status]} -translate-x-1.5 mt-6 z-10`} />

              {/* Card */}
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                <HoloPanel variant={p.status === "active" ? "star" : "nebula"} className="relative">
                  <div className={`flex items-center gap-3 mb-2 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${statusColors[p.status]}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-orbitron text-xs font-bold text-primary tracking-wider">{p.year}</p>
                      <p className="font-orbitron text-sm font-bold text-foreground">{p.title}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  <span className={`inline-block mt-2 text-[9px] font-mono px-2 py-0.5 rounded border ${statusColors[p.status]}`}>
                    {p.status.toUpperCase()}
                  </span>
                </HoloPanel>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default MissionTimeline;
