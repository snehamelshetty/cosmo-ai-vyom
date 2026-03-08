import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bone, Dumbbell, Eye, Heart, Brain, Droplets, Radiation, BedDouble } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";

const healthChanges = [
  {
    icon: Bone,
    system: "Skeletal System",
    before: { value: "100%", label: "Normal bone density" },
    after: { value: "85-90%", label: "1-1.5% loss per month" },
    detail: "Microgravity causes calcium to leach from bones, similar to severe osteoporosis. Weight-bearing bones like the pelvis and spine are most affected.",
    severity: "high",
  },
  {
    icon: Dumbbell,
    system: "Muscular System",
    before: { value: "100%", label: "Normal muscle mass" },
    after: { value: "80%", label: "Up to 20% loss in 6 months" },
    detail: "Without gravity, muscles atrophy rapidly. Astronauts must exercise 2+ hours daily to mitigate loss. Leg muscles are most severely affected.",
    severity: "high",
  },
  {
    icon: Eye,
    system: "Vision",
    before: { value: "20/20", label: "Normal vision" },
    after: { value: "Degraded", label: "Intracranial pressure changes" },
    detail: "SANS (Spaceflight Associated Neuro-ocular Syndrome) causes optic disc swelling, globe flattening, and vision changes in ~70% of long-duration astronauts.",
    severity: "high",
  },
  {
    icon: Heart,
    system: "Cardiovascular",
    before: { value: "Normal", label: "Earth-adapted heart" },
    after: { value: "Rounded", label: "Heart becomes more spherical" },
    detail: "The heart changes shape in microgravity, becoming more spherical. Blood volume redistributes upward, causing puffy face and thin legs ('bird legs').",
    severity: "medium",
  },
  {
    icon: Brain,
    system: "Neurological",
    before: { value: "Baseline", label: "Normal brain function" },
    after: { value: "Altered", label: "Gray matter redistribution" },
    detail: "Cerebral spinal fluid shifts upward, causing headaches. Brain scans show changes in gray matter volume. Cognitive performance can be affected.",
    severity: "medium",
  },
  {
    icon: Droplets,
    system: "Fluid Distribution",
    before: { value: "Normal", label: "Gravity-aided distribution" },
    after: { value: "Shifted", label: "Fluid moves to upper body" },
    detail: "Without gravity pulling fluids down, blood and fluids shift to the head and chest. This causes facial puffiness, nasal congestion, and thinner legs.",
    severity: "medium",
  },
  {
    icon: Radiation,
    system: "DNA & Cellular",
    before: { value: "Protected", label: "Earth's magnetosphere shields" },
    after: { value: "Exposed", label: "Increased cosmic radiation" },
    detail: "Outside Earth's magnetic field, astronauts are exposed to galactic cosmic rays and solar particle events. DNA damage and cancer risk increase significantly.",
    severity: "critical",
  },
  {
    icon: BedDouble,
    system: "Sleep & Circadian",
    before: { value: "Regular", label: "24-hour day cycle" },
    after: { value: "Disrupted", label: "16 sunrises per day in LEO" },
    detail: "ISS orbits every 90 minutes, creating 16 sunrises/sunsets daily. Without natural light cues, circadian rhythm is severely disrupted, leading to chronic sleep issues.",
    severity: "medium",
  },
];

const astronautTimeline = [
  { period: "Pre-Flight", duration: "2+ years", desc: "Intensive physical training, psychological evaluation, isolation simulations, and baseline health measurements." },
  { period: "Launch", duration: "~10 min", desc: "Extreme G-forces (up to 3G), vibration stress, and transition to microgravity." },
  { period: "1st Month", duration: "Days 1-30", desc: "Space adaptation syndrome, fluid shifts, bone loss begins, sleep disruption starts." },
  { period: "6 Months", duration: "ISS Standard", desc: "Significant muscle atrophy, measurable bone loss, vision changes possible, psychological adjustment." },
  { period: "1+ Year", duration: "Mars-class", desc: "Severe deconditioning, radiation accumulation, deep psychological challenges, immune system changes." },
  { period: "Return", duration: "Weeks-Months", desc: "Re-adaptation to gravity, orthostatic intolerance, muscle rebuilding, bone recovery (partial)." },
];

const BeforeAfterSpacePage = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
            <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Comparative Analysis</span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mt-4 text-foreground">
              Before & After <span className="text-primary text-glow-star">Space</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              How space changes the human body — documented physiological and psychological transformations during long-duration missions.
            </p>
          </motion.div>

          {/* Health comparison cards */}
          <div className="grid md:grid-cols-2 gap-5 mb-16">
            {healthChanges.map((h, i) => (
              <motion.div key={h.system} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}>
                <HoloPanel variant={i % 2 === 0 ? "star" : "nebula"}
                  className="cursor-pointer hover:scale-[1.01] transition-transform">
                  <button onClick={() => setExpandedCard(expandedCard === i ? null : i)} className="w-full text-left">
                    <div className="flex items-center gap-3 mb-4">
                      <h.icon className={`w-6 h-6 ${
                        h.severity === "critical" ? "text-glow-red" :
                        h.severity === "high" ? "text-glow-orange" : "text-primary"
                      } opacity-70`} />
                      <h3 className="font-orbitron text-xs font-bold text-foreground tracking-wider">{h.system}</h3>
                      <span className={`ml-auto text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                        h.severity === "critical" ? "border-glow-red/30 text-glow-red" :
                        h.severity === "high" ? "border-glow-orange/30 text-glow-orange" :
                        "border-primary/30 text-primary"
                      }`}>{h.severity.toUpperCase()}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1 p-3 bg-glow-green/5 rounded-lg border border-glow-green/10">
                        <p className="font-mono text-[9px] text-glow-green/60 mb-1">ON EARTH</p>
                        <p className="font-orbitron text-sm font-bold text-foreground">{h.before.value}</p>
                        <p className="text-[10px] text-muted-foreground">{h.before.label}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground/30 flex-shrink-0" />
                      <div className="flex-1 p-3 bg-glow-red/5 rounded-lg border border-glow-red/10">
                        <p className="font-mono text-[9px] text-glow-red/60 mb-1">IN SPACE</p>
                        <p className="font-orbitron text-sm font-bold text-foreground">{h.after.value}</p>
                        <p className="text-[10px] text-muted-foreground">{h.after.label}</p>
                      </div>
                    </div>

                    {expandedCard === i && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="mt-4 text-xs text-muted-foreground leading-relaxed border-t border-border/20 pt-3">
                        {h.detail}
                      </motion.p>
                    )}
                  </button>
                </HoloPanel>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <HoloPanel variant="nebula" className="mb-12">
            <h3 className="font-orbitron text-sm font-bold text-foreground mb-8 tracking-wider text-center">
              ASTRONAUT HEALTH TIMELINE
            </h3>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/30" />
              {astronautTimeline.map((t, i) => (
                <motion.div key={t.period} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`relative flex mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary/50 -translate-x-1.5 mt-1.5 z-10" />
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <p className="font-orbitron text-xs font-bold text-primary">{t.period}</p>
                    <p className="text-[10px] font-mono text-muted-foreground mb-1">{t.duration}</p>
                    <p className="text-sm text-foreground/70">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </HoloPanel>
        </div>
      </section>
    </PageLayout>
  );
};

export default BeforeAfterSpacePage;
