import { motion } from "framer-motion";
import HoloPanel from "./HoloPanel";
import { Rocket as RocketIcon } from "lucide-react";

const rockets = [
  {
    name: "Falcon 9",
    org: "SpaceX",
    crew: "7 astronauts",
    height: "70 m",
    payload: "22,800 kg to LEO",
    missions: "300+",
  },
  {
    name: "Space Launch System",
    org: "NASA",
    crew: "4 astronauts (Orion)",
    height: "98 m",
    payload: "95,000 kg to LEO",
    missions: "Artemis Program",
  },
  {
    name: "Starship",
    org: "SpaceX",
    crew: "100+ passengers",
    height: "121 m",
    payload: "150,000 kg to LEO",
    missions: "Mars & Beyond",
  },
];

const RocketSection = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-widest">🚀 SPACECRAFT</span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-4 text-foreground">
            Mission <span className="text-primary text-glow-cyan">Vehicles</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {rockets.map((r, i) => (
            <HoloPanel key={r.name} variant={i === 1 ? "purple" : "cyan"} delay={i * 0.15}>
              <div className="flex items-center gap-3 mb-4">
                <RocketIcon className={`w-8 h-8 ${i === 1 ? "text-accent" : "text-primary"}`} />
                <div>
                  <h3 className="font-orbitron text-lg font-bold text-foreground">{r.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{r.org}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Crew", val: r.crew },
                  { label: "Height", val: r.height },
                  { label: "Payload", val: r.payload },
                  { label: "Missions", val: r.missions },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between border-b border-border/50 pb-1">
                    <span className="text-muted-foreground font-mono text-xs">{s.label}</span>
                    <span className="text-foreground font-medium">{s.val}</span>
                  </div>
                ))}
              </div>
            </HoloPanel>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RocketSection;
