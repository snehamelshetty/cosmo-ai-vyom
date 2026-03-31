import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";
import { Rocket, Brain, Heart, Shield, Users, Globe, Satellite } from "lucide-react";

const team = [
  { role: "AI Wellbeing Engine", desc: "Core AI system monitoring astronaut mental and physical health in real-time using biometric sensors, behavioral analysis, and predictive algorithms." },
  { role: "Cognitive Support Module", desc: "Brain training, fatigue prediction, and psychological support systems designed to maintain peak cognitive performance during long-duration missions." },
  { role: "Biometric Telemetry", desc: "Continuous monitoring of heart rate, O₂ saturation, temperature, hydration, bone density, and muscle status throughout the mission." },
  { role: "Earth Connection", desc: "Acoustic relaxation, social connection simulation, and familiar environment recreation to combat isolation and homesickness." },
];

const milestones = [
  { year: "2024", event: "COSMO concept development and initial AI training on astronaut health data" },
  { year: "2025", event: "Integration with biometric sensors and cognitive fitness training modules" },
  { year: "2026", event: "Full-system testing with simulated deep space mission environments" },
  { year: "2027", event: "Planned deployment on Artemis lunar missions" },
  { year: "2030+", event: "Mars mission integration — continuous AI support for 2+ year missions" },
];

const AboutPage = () => {
  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Mission Brief</span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mt-4 text-foreground">
              About <span className="text-primary text-glow-star">COSMO</span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-base font-light leading-relaxed">
              COSMO — <em>AI Companion for Astronaut Mental and Physical Wellbeing</em> — is a comprehensive artificial intelligence system designed to support astronaut health during deep space missions where real-time communication with Earth is impossible.
            </p>
          </motion.div>

          {/* Mission */}
          <HoloPanel className="mb-8">
            <div className="flex items-start gap-4">
              <Rocket className="w-8 h-8 text-primary/50 flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-orbitron text-sm font-bold text-foreground mb-3 tracking-wider">OUR MISSION</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  As humanity prepares for deep space exploration — missions to the Moon, Mars, and beyond — the greatest challenge isn't technology. It's the human element. Astronauts face extreme isolation, confined spaces, communication delays of up to 24 minutes, muscle atrophy, bone loss, sleep disruption, and profound psychological challenges.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  COSMO is built to be the always-present AI companion — monitoring vitals, predicting fatigue before it happens, providing psychological support during moments of crisis, training cognitive fitness, and recreating the sounds and feelings of Earth to combat homesickness.
                </p>
              </div>
            </div>
          </HoloPanel>

          {/* Core systems */}
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {team.map((t, i) => (
              <motion.div key={t.role} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}>
                <HoloPanel variant={i % 2 === 0 ? "star" : "nebula"} className="h-full">
                  <h3 className="font-orbitron text-xs font-bold text-foreground mb-2 tracking-wider">{t.role}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                </HoloPanel>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <HoloPanel variant="nebula" className="mb-8">
            <h2 className="font-orbitron text-sm font-bold text-foreground mb-8 tracking-wider text-center">DEVELOPMENT TIMELINE</h2>
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border/30" />
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`relative flex mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="absolute left-8 md:left-1/2 w-3 h-3 rounded-full bg-primary/50 -translate-x-1.5 mt-1 z-10" />
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <p className="font-orbitron text-sm font-bold text-primary">{m.year}</p>
                    <p className="text-sm text-foreground/70 mt-1">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </HoloPanel>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6 text-sm">Explore our AI systems and see how COSMO protects astronaut wellbeing.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/features"
                className="px-8 py-3 rounded-lg border border-glow text-primary font-orbitron font-medium text-xs tracking-[0.2em] hover:bg-primary/5 transition-all duration-500 glow-star">
                EXPLORE FEATURES
              </Link>
              <Link to="/galaxy-map"
                className="px-8 py-3 rounded-lg border border-glow-nebula text-accent font-orbitron font-medium text-xs tracking-[0.2em] hover:bg-accent/5 transition-all duration-500 glow-nebula">
                GALAXY MAP
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
