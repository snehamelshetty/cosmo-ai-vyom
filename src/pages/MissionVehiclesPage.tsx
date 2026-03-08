import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Gauge, Users, Ruler, Weight, Flame, Target, Calendar } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";
import rocketLaunch from "@/assets/rocket-launch.png";

const vehicles = [
  {
    name: "Falcon 9",
    org: "SpaceX",
    image: "🚀",
    crew: "7 astronauts",
    height: "70 m",
    payload: "22,800 kg to LEO",
    thrust: "7,607 kN",
    missions: "300+",
    firstFlight: "2010",
    status: "Active",
    description: "The world's first orbital-class reusable rocket. Falcon 9 has revolutionized space access with its proven reusability and reliability.",
    specs: [
      { label: "Diameter", value: "3.7 m" },
      { label: "Mass", value: "549,054 kg" },
      { label: "Stages", value: "2" },
      { label: "Engines", value: "9× Merlin" },
      { label: "Success Rate", value: "98.9%" },
      { label: "Cost/Launch", value: "~$67M" },
    ],
  },
  {
    name: "Space Launch System",
    org: "NASA",
    image: "🛸",
    crew: "4 astronauts (Orion)",
    height: "98 m",
    payload: "95,000 kg to LEO",
    thrust: "39,144 kN",
    missions: "Artemis Program",
    firstFlight: "2022",
    status: "Active",
    description: "NASA's most powerful rocket ever built, designed for deep space exploration and the Artemis lunar missions.",
    specs: [
      { label: "Diameter", value: "8.4 m" },
      { label: "Mass", value: "2,608,000 kg" },
      { label: "Stages", value: "2 + Boosters" },
      { label: "Engines", value: "4× RS-25" },
      { label: "Destination", value: "Moon & Beyond" },
      { label: "Cost/Launch", value: "~$4.1B" },
    ],
  },
  {
    name: "Starship",
    org: "SpaceX",
    image: "✨",
    crew: "100+ passengers",
    height: "121 m",
    payload: "150,000 kg to LEO",
    thrust: "74,400 kN",
    missions: "Mars & Beyond",
    firstFlight: "2023 (test)",
    status: "In Development",
    description: "The largest and most powerful rocket ever built. Designed for Earth orbit, Moon, Mars, and beyond. Fully reusable.",
    specs: [
      { label: "Diameter", value: "9 m" },
      { label: "Mass", value: "5,000,000 kg" },
      { label: "Stages", value: "2 (Super Heavy)" },
      { label: "Engines", value: "33× Raptor" },
      { label: "Destination", value: "Mars" },
      { label: "Cost/Launch", value: "~$10M (target)" },
    ],
  },
  {
    name: "New Glenn",
    org: "Blue Origin",
    image: "🔷",
    crew: "TBD",
    height: "98 m",
    payload: "45,000 kg to LEO",
    thrust: "17,100 kN",
    missions: "Commercial & Gov",
    firstFlight: "2024",
    status: "Active",
    description: "Blue Origin's heavy-lift orbital launch vehicle with a reusable first stage, designed for both commercial and government missions.",
    specs: [
      { label: "Diameter", value: "7 m" },
      { label: "Mass", value: "~500,000 kg" },
      { label: "Stages", value: "2" },
      { label: "Engines", value: "7× BE-4" },
      { label: "Reusable", value: "1st Stage" },
      { label: "Fairing", value: "7 m" },
    ],
  },
];

const MissionVehiclesPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const vehicle = vehicles[selectedVehicle];

  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
            <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Spacecraft Fleet</span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mt-4 text-foreground">
              Mission <span className="text-primary text-glow-star">Vehicles</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              The spacecraft that will carry humanity to the stars — each integrated with MAITHRI's wellbeing monitoring systems.
            </p>
          </motion.div>

          {/* Vehicle selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {vehicles.map((v, i) => (
              <button key={v.name} onClick={() => setSelectedVehicle(i)}
                className={`px-5 py-2.5 rounded-lg font-orbitron text-xs tracking-wider transition-all border ${
                  selectedVehicle === i ? "border-primary/30 bg-primary/10 text-primary glow-star" : "border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/20"
                }`}>
                <span className="mr-2">{v.image}</span>{v.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={vehicle.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>

              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {/* Rocket visual */}
                <HoloPanel className="flex flex-col items-center justify-center">
                  <motion.img src={rocketLaunch} alt={vehicle.name}
                    className="w-32 opacity-50 mb-4"
                    animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
                  <p className="font-orbitron text-lg font-bold text-foreground">{vehicle.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{vehicle.org}</p>
                  <span className={`mt-2 text-[9px] font-mono px-3 py-1 rounded-full border ${
                    vehicle.status === "Active" ? "border-glow-green/30 text-glow-green" : "border-glow-orange/30 text-glow-orange"
                  }`}>{vehicle.status}</span>
                </HoloPanel>

                {/* Key stats */}
                <HoloPanel variant="nebula" className="lg:col-span-2">
                  <p className="text-sm text-foreground/70 mb-6">{vehicle.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { icon: Users, label: "Crew", value: vehicle.crew },
                      { icon: Ruler, label: "Height", value: vehicle.height },
                      { icon: Weight, label: "Payload", value: vehicle.payload },
                      { icon: Flame, label: "Thrust", value: vehicle.thrust },
                      { icon: Target, label: "Missions", value: vehicle.missions },
                      { icon: Calendar, label: "First Flight", value: vehicle.firstFlight },
                    ].map(s => (
                      <div key={s.label} className="p-3 bg-muted/10 rounded-lg border border-border/20">
                        <s.icon className="w-4 h-4 text-accent/50 mb-1" />
                        <p className="text-[9px] font-mono text-muted-foreground">{s.label}</p>
                        <p className="text-xs font-bold text-foreground">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </HoloPanel>
              </div>

              {/* Detailed specs */}
              <HoloPanel>
                <h3 className="font-orbitron text-xs font-bold text-foreground mb-4 tracking-wider">TECHNICAL SPECIFICATIONS</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {vehicle.specs.map(s => (
                    <div key={s.label} className="text-center p-3 bg-muted/10 rounded-lg">
                      <p className="font-mono text-[9px] text-muted-foreground mb-1">{s.label}</p>
                      <p className="font-orbitron text-sm font-bold text-primary">{s.value}</p>
                    </div>
                  ))}
                </div>
              </HoloPanel>
            </motion.div>
          </AnimatePresence>

          {/* MAITHRI integration */}
          <HoloPanel variant="nebula" className="mt-8">
            <div className="flex items-start gap-4">
              <Rocket className="w-8 h-8 text-accent/50 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-orbitron text-sm font-bold text-foreground mb-2 tracking-wider">MAITHRI INTEGRATION</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every mission vehicle in our fleet is equipped with MAITHRI's comprehensive wellbeing monitoring suite.
                  Real-time biometric tracking, AI psychological support, fatigue prediction, and environmental controls
                  are seamlessly integrated into the spacecraft's life support systems, ensuring crew health from launch to landing.
                </p>
              </div>
            </div>
          </HoloPanel>
        </div>
      </section>
    </PageLayout>
  );
};

export default MissionVehiclesPage;
