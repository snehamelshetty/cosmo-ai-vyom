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
    <section className="relative py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mb-20">
          <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Mission Lifecycle</span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-4 text-foreground">
            Before & During <span className="text-primary text-glow-star">Space</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <HoloPanel>
            <h3 className="font-orbitron text-sm font-bold text-foreground mb-6 tracking-wider">BEFORE SPACE MISSION</h3>
            <p className="text-muted-foreground text-sm mb-6">Training phase — COSMO helps prepare astronauts for the demands of space.</p>
            <ul className="space-y-3">
              {beforeItems.map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary/50 flex-shrink-0" />
                  <span className="text-sm text-foreground/70">{item}</span>
                </motion.li>
              ))}
            </ul>
          </HoloPanel>

          <HoloPanel variant="nebula">
            <h3 className="font-orbitron text-sm font-bold text-foreground mb-6 tracking-wider">DURING SPACE MISSION</h3>
            <p className="text-muted-foreground text-sm mb-6">COSMO provides continuous AI support throughout these conditions.</p>
            <div className="space-y-4">
              {duringChallenges.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3">
                  <span className="text-accent/50 font-mono text-xs mt-0.5">⚠</span>
                  <div>
                    <p className="font-bold text-xs text-foreground/80">{c.challenge}</p>
                    <p className="text-[11px] text-muted-foreground">{c.desc}</p>
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
