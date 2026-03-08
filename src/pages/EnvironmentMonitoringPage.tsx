import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Thermometer, Wind, Droplets, AlertTriangle, Shield, Activity } from "lucide-react";

type EnvReading = { time: string; temp: number; o2: number; co2: number; humidity: number };

const generateHistory = (): EnvReading[] => {
  const data: EnvReading[] = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i.toString().padStart(2, "0")}:00`,
      temp: 21 + Math.sin(i / 4) * 1.5 + (Math.random() - 0.5),
      o2: 20.5 + Math.sin(i / 6) * 0.5 + (Math.random() - 0.5) * 0.3,
      co2: 0.04 + Math.sin(i / 3) * 0.015 + Math.random() * 0.01,
      humidity: 45 + Math.sin(i / 5) * 5 + (Math.random() - 0.5) * 3,
    });
  }
  return data;
};

const modules = ["Module A — Habitat", "Module B — Laboratory", "Module C — Command", "Module D — Cargo"];

const GaugeCircle = ({ value, max, min, label, unit, icon: Icon, warning, danger }: {
  value: number; max: number; min: number; label: string; unit: string;
  icon: any; warning: [number, number]; danger: [number, number];
}) => {
  const pct = ((value - min) / (max - min)) * 100;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (pct / 100) * circumference;
  const isWarning = value < warning[0] || value > warning[1];
  const isDanger = value < danger[0] || value > danger[1];
  const color = isDanger ? "hsl(var(--destructive))" : isWarning ? "hsl(var(--accent))" : "hsl(var(--primary))";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      className={`rounded-xl border bg-card/30 backdrop-blur-sm p-5 text-center transition-all ${
        isDanger ? "border-destructive/40 shadow-[0_0_20px_hsl(var(--destructive)/0.15)]"
        : isWarning ? "border-accent/30 shadow-[0_0_15px_hsl(var(--accent)/0.1)]"
        : "border-border/30"
      }`}
    >
      <div className="relative w-28 h-28 mx-auto mb-3">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted)/0.3)" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="w-4 h-4 mb-1" style={{ color }} />
          <span className="font-orbitron text-lg font-bold text-foreground">{typeof value === "number" ? (value < 1 ? value.toFixed(3) : value.toFixed(1)) : value}</span>
          <span className="font-mono text-[9px] text-muted-foreground">{unit}</span>
        </div>
      </div>
      <p className="font-mono text-xs text-foreground/80 tracking-wider">{label}</p>
      {(isWarning || isDanger) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-2 flex items-center justify-center gap-1 font-mono text-[9px] ${isDanger ? "text-destructive" : "text-accent"}`}
        >
          <AlertTriangle className="w-3 h-3" />
          {isDanger ? "CRITICAL" : "WARNING"}
        </motion.div>
      )}
    </motion.div>
  );
};

const EnvironmentMonitoringPage = () => {
  const [selectedModule, setSelectedModule] = useState(0);
  const [readings, setReadings] = useState({ temp: 22.1, o2: 20.8, co2: 0.041, humidity: 46.2 });
  const [history, setHistory] = useState<EnvReading[]>(generateHistory());

  useEffect(() => {
    setHistory(generateHistory());
  }, [selectedModule]);

  // Live simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setReadings((prev) => ({
        temp: +(prev.temp + (Math.random() - 0.5) * 0.3).toFixed(2),
        o2: +(prev.o2 + (Math.random() - 0.5) * 0.1).toFixed(2),
        co2: +(Math.max(0.02, prev.co2 + (Math.random() - 0.5) * 0.005)).toFixed(4),
        humidity: +(prev.humidity + (Math.random() - 0.5) * 0.8).toFixed(1),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const alerts = [
    readings.temp > 24 && { text: "Temperature above nominal range", severity: "warning" as const },
    readings.temp > 26 && { text: "CRITICAL: Temperature exceeding safe limits!", severity: "danger" as const },
    readings.o2 < 19.5 && { text: "Oxygen level below threshold", severity: "danger" as const },
    readings.co2 > 0.06 && { text: "CO₂ concentration elevated", severity: "warning" as const },
    readings.humidity > 55 && { text: "Humidity above optimal range", severity: "warning" as const },
    readings.humidity < 35 && { text: "Humidity below optimal range", severity: "warning" as const },
  ].filter(Boolean) as { text: string; severity: "warning" | "danger" }[];

  return (
    <PageLayout>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-foreground tracking-wider mb-2">
            <Shield className="inline w-8 h-8 mr-3 text-primary" />
            ENVIRONMENT MONITORING
          </h1>
          <p className="text-muted-foreground font-mono text-xs tracking-wider">
            SPACECRAFT ATMOSPHERIC CONTROL • LIFE SUPPORT TELEMETRY
          </p>
        </motion.div>

        {/* Module selector */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {modules.map((m, i) => (
            <motion.button
              key={m}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedModule(i)}
              className={`px-4 py-2 rounded-lg font-mono text-[10px] tracking-wider transition-all border ${
                selectedModule === i
                  ? "bg-primary/15 border-primary/40 text-primary shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
                  : "border-border/30 text-muted-foreground hover:border-primary/20 hover:bg-muted/10"
              }`}
            >
              {m}
            </motion.button>
          ))}
        </div>

        {/* Live indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-glow-green animate-pulse" />
          <span className="font-mono text-[10px] text-muted-foreground tracking-wider">LIVE TELEMETRY — UPDATING EVERY 3s</span>
        </div>

        {/* Gauges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <GaugeCircle value={readings.temp} min={15} max={30} label="CABIN TEMP" unit="°C" icon={Thermometer} warning={[19, 24]} danger={[17, 26]} />
          <GaugeCircle value={readings.o2} min={18} max={22} label="OXYGEN" unit="%" icon={Wind} warning={[19.5, 21.5]} danger={[19, 22]} />
          <GaugeCircle value={readings.co2} min={0} max={0.1} label="CO₂ LEVEL" unit="%" icon={Activity} warning={[0, 0.05]} danger={[0, 0.07]} />
          <GaugeCircle value={readings.humidity} min={20} max={70} label="HUMIDITY" unit="%" icon={Droplets} warning={[35, 55]} danger={[30, 60]} />
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
            <h3 className="font-mono text-xs text-destructive tracking-wider mb-2 flex items-center gap-2">
              <AlertTriangle className="w-3 h-3" /> ACTIVE ALERTS
            </h3>
            <div className="space-y-1">
              {alerts.map((a, i) => (
                <p key={i} className={`font-mono text-[10px] ${a.severity === "danger" ? "text-destructive" : "text-accent"}`}>
                  ⚠ {a.text}
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {/* History charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: "temp" as const, label: "TEMPERATURE (°C)", color: "hsl(var(--primary))" },
            { key: "o2" as const, label: "OXYGEN LEVEL (%)", color: "hsl(var(--accent))" },
            { key: "co2" as const, label: "CO₂ CONCENTRATION (%)", color: "hsl(var(--destructive))" },
            { key: "humidity" as const, label: "HUMIDITY (%)", color: "hsl(var(--primary))" },
          ].map((chart) => (
            <motion.div
              key={chart.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-5"
            >
              <h3 className="font-mono text-xs text-primary tracking-wider mb-4">{chart.label}</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.2)" />
                  <XAxis dataKey="time" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} interval={3} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 11 }} />
                  <Line type="monotone" dataKey={chart.key} stroke={chart.color} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default EnvironmentMonitoringPage;
