import { motion } from "framer-motion";
import HoloPanel from "./HoloPanel";

const beforeItems = [
  "Psychological evaluation & readiness assessment",
  "Physical endurance training programs",
  "Cognitive tests & brain performance baselines",
  "Isolation simulations & confinement training",
  "Teamwork exercises & crew bonding",
  "AI-assisted mental preparation protocols",
];

const duringChallenges = [
  { challenge: "Microgravity Effects", desc: "Muscle loss, bone density reduction, fluid redistribution" },
  { challenge: "Isolation & Loneliness", desc: "Months away from family, confined spaces" },
  { challenge: "Circadian Disruption", desc: "16 sunrises per day destabilize sleep cycles" },
  { challenge: "Communication Delay", desc: "Up to 24-minute one-way delay to Earth" },
  { challenge: "Sensory Monotony", desc: "Same environment day after day" },
  { challenge: "Radiation Exposure", desc: "Increased cosmic radiation beyond Earth's magnetosphere" },
];

const MissionPhases = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-widest">🌍 MISSION LIFECYCLE</span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-4 text-foreground">
            Before & During <span className="text-primary text-glow-cyan">Space</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <HoloPanel>
            <h3 className="font-orbitron text-xl font-bold text-foreground mb-6">
              🌍 Before Space Mission
            </h3>
            <p className="text-muted-foreground mb-6">Training phase — MAITHRI helps prepare astronauts for the psychological and physical demands of space.</p>
            <ul className="space-y-3">
              {beforeItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-secondary-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </HoloPanel>

          <HoloPanel variant="purple">
            <h3 className="font-orbitron text-xl font-bold text-foreground mb-6">
              🛰 During Space Mission
            </h3>
            <p className="text-muted-foreground mb-6">Challenges astronauts face — MAITHRI provides continuous AI support throughout these conditions.</p>
            <div className="space-y-4">
              {duringChallenges.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-accent font-mono text-sm mt-0.5">⚠</span>
                  <div>
                    <p className="font-bold text-sm text-foreground">{c.challenge}</p>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </HoloPanel>
        </div>
      </div>
    </section>
  );
};

export default MissionPhases;
