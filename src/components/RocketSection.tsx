import { motion } from "framer-motion";
import HoloPanel from "./HoloPanel";
import { Rocket as RocketIcon } from "lucide-react";

const rockets = [
  { name: "Falcon 9", org: "SpaceX", crew: "7 astronauts", height: "70 m", payload: "22,800 kg to LEO", missions: "300+" },
  { name: "Space Launch System", org: "NASA", crew: "4 astronauts (Orion)", height: "98 m", payload: "95,000 kg to LEO", missions: "Artemis Program" },
  { name: "Starship", org: "SpaceX", crew: "100+ passengers", height: "121 m", payload: "150,000 kg to LEO", missions: "Mars & Beyond" },
];

const RocketSection = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mb-20">
          <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Spacecraft</span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-4 text-foreground">
            Mission <span className="text-primary text-glow-star">Vehicles</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {rockets.map((r, i) => (
            <HoloPanel key={r.name} variant={i === 1 ? "nebula" : "star"} delay={i * 0.15}>
              <div className="flex items-center gap-3 mb-4">
                <RocketIcon className={`w-7 h-7 ${i === 1 ? "text-accent" : "text-primary"} opacity-60`} />
                <div>
                  <h3 className="font-orbitron text-sm font-bold text-foreground">{r.name}</h3>
                  <p className="text-[10px] text-muted-foreground font-mono">{r.org}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Crew", val: r.crew },
                  { label: "Height", val: r.height },
                  { label: "Payload", val: r.payload },
                  { label: "Missions", val: r.missions },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between border-b border-border/30 pb-1">
                    <span className="text-muted-foreground font-mono text-[10px]">{s.label}</span>
                    <span className="text-foreground/70 text-xs">{s.val}</span>
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
