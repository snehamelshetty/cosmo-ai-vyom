import { motion } from "framer-motion";
import HoloPanel from "./HoloPanel";
import { Rocket as RocketIcon } from "lucide-react";
import rocketLaunch from "@/assets/rocket-launch.png";

const rockets = [
  { name: "Falcon 9", org: "SpaceX", crew: "7 astronauts", height: "70 m", payload: "22,800 kg to LEO", missions: "300+", thrust: "7,607 kN" },
  { name: "Space Launch System", org: "NASA", crew: "4 astronauts (Orion)", height: "98 m", payload: "95,000 kg to LEO", missions: "Artemis Program", thrust: "39,144 kN" },
  { name: "Starship", org: "SpaceX", crew: "100+ passengers", height: "121 m", payload: "150,000 kg to LEO", missions: "Mars & Beyond", thrust: "74,400 kN" },
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

        <div className="grid lg:grid-cols-4 gap-6 items-start">
          {/* Rocket image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden lg:flex justify-center"
          >
            <motion.img
              src={rocketLaunch}
              alt="Rocket launching"
              className="w-32 opacity-40"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Rocket cards */}
          {rockets.map((r, i) => (
            <HoloPanel key={r.name} variant={i === 1 ? "nebula" : "star"} delay={i * 0.15}>
              <div className="flex items-center gap-3 mb-4">
                <RocketIcon className={`w-6 h-6 ${i === 1 ? "text-accent" : "text-primary"} opacity-60`} />
                <div>
                  <h3 className="font-orbitron text-sm font-bold text-foreground">{r.name}</h3>
                  <p className="text-[10px] text-muted-foreground font-mono">{r.org}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                {Object.entries({ Crew: r.crew, Height: r.height, Payload: r.payload, Thrust: r.thrust, Missions: r.missions }).map(([label, val]) => (
                  <div key={label} className="flex justify-between border-b border-border/20 pb-1">
                    <span className="text-muted-foreground font-mono text-[10px]">{label}</span>
                    <span className="text-foreground/70 text-xs">{val}</span>
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
