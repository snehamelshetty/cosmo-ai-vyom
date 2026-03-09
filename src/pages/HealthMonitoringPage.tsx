import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Brain, Moon, Activity, AlertTriangle, Shield, Users, Zap, Radio,
  Wifi, WifiOff, Battery, BatteryLow, Signal, Cpu, ToggleLeft, ToggleRight,
  Smartphone, CheckCircle2, XCircle, Clock, Database
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";
import { Switch } from "@/components/ui/switch";
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PolarRadiusAxis,
} from "recharts";
import {
  generateSimulatedData,
  fetchLatestHealthData,
  fetchDevices,
  fetchHealthAlerts,
  acknowledgeAlert,
  insertSimulatedData,
  subscribeToHealthData,
  subscribeToDeviceUpdates,
  subscribeToAlerts,
  getApiEndpoint,
  generateEsp32CodeSnippet,
  type IoTDevice,
  type HealthAlert,
  type HealthMetrics,
} from "@/services/iotHealthService";
import { toast } from "sonner";

// ─── Helper: clamp + jitter ─────────────────────────────────
const jitter = (base: number, range: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, base + (Math.random() - 0.5) * range));

// ─── Base Crew Profiles ─────────────────────────────────────
const crewProfiles = [
  {
    id: "commander", name: "Cmdr. Elena Vasquez", role: "Commander", avatar: "EV",
    baseHR: 72, baseStress: 22, baseO2: 98, baseTemp: 36.6,
    emotional: { calm: 72, focused: 85, anxiety: 8, fatigue: 15, motivation: 90, isolation: 12 },
    cognitive: [
      { metric: "Focus", base: 92 }, { metric: "Memory", base: 88 }, { metric: "Reaction", base: 85 },
      { metric: "Logic", base: 90 }, { metric: "Spatial", base: 87 }, { metric: "Language", base: 91 },
    ],
    sleepData: [
      { day: "Mon", deep: 3.2, light: 2.8, rem: 1.5 }, { day: "Tue", deep: 3.5, light: 2.5, rem: 1.8 },
      { day: "Wed", deep: 2.8, light: 3.0, rem: 1.4 }, { day: "Thu", deep: 3.6, light: 2.6, rem: 1.9 },
      { day: "Fri", deep: 3.3, light: 2.9, rem: 1.6 }, { day: "Sat", deep: 3.8, light: 2.4, rem: 2.0 },
      { day: "Sun", deep: 3.4, light: 2.7, rem: 1.7 },
    ],
    moodData: [
      { day: "Mon", score: 82 }, { day: "Tue", score: 78 }, { day: "Wed", score: 85 },
      { day: "Thu", score: 80 }, { day: "Fri", score: 88 }, { day: "Sat", score: 90 }, { day: "Sun", score: 86 },
    ],
    baseAiStatus: "Nominal — Low stress detected",
  },
  {
    id: "engineer", name: "Eng. Mikhail Petrov", role: "Engineer", avatar: "MP",
    baseHR: 76, baseStress: 31, baseO2: 97, baseTemp: 36.8,
    emotional: { calm: 55, focused: 78, anxiety: 22, fatigue: 35, motivation: 72, isolation: 28 },
    cognitive: [
      { metric: "Focus", base: 84 }, { metric: "Memory", base: 80 }, { metric: "Reaction", base: 78 },
      { metric: "Logic", base: 92 }, { metric: "Spatial", base: 90 }, { metric: "Language", base: 76 },
    ],
    sleepData: [
      { day: "Mon", deep: 2.8, light: 3.2, rem: 1.2 }, { day: "Tue", deep: 2.5, light: 3.5, rem: 1.0 },
      { day: "Wed", deep: 2.6, light: 3.0, rem: 1.3 }, { day: "Thu", deep: 2.9, light: 2.8, rem: 1.4 },
      { day: "Fri", deep: 2.4, light: 3.3, rem: 1.1 }, { day: "Sat", deep: 2.7, light: 3.1, rem: 1.2 },
      { day: "Sun", deep: 2.3, light: 3.4, rem: 1.0 },
    ],
    moodData: [
      { day: "Mon", score: 70 }, { day: "Tue", score: 65 }, { day: "Wed", score: 72 },
      { day: "Thu", score: 68 }, { day: "Fri", score: 74 }, { day: "Sat", score: 71 }, { day: "Sun", score: 69 },
    ],
    baseAiStatus: "Caution — Elevated fatigue markers",
  },
  {
    id: "scientist", name: "Dr. Aisha Rahman", role: "Scientist", avatar: "AR",
    baseHR: 69, baseStress: 18, baseO2: 99, baseTemp: 36.5,
    emotional: { calm: 82, focused: 90, anxiety: 5, fatigue: 10, motivation: 95, isolation: 8 },
    cognitive: [
      { metric: "Focus", base: 90 }, { metric: "Memory", base: 94 }, { metric: "Reaction", base: 82 },
      { metric: "Logic", base: 96 }, { metric: "Spatial", base: 80 }, { metric: "Language", base: 95 },
    ],
    sleepData: [
      { day: "Mon", deep: 3.8, light: 2.4, rem: 2.0 }, { day: "Tue", deep: 3.6, light: 2.6, rem: 1.9 },
      { day: "Wed", deep: 3.9, light: 2.3, rem: 2.1 }, { day: "Thu", deep: 3.7, light: 2.5, rem: 2.0 },
      { day: "Fri", deep: 4.0, light: 2.2, rem: 2.2 }, { day: "Sat", deep: 3.5, light: 2.7, rem: 1.8 },
      { day: "Sun", deep: 3.8, light: 2.4, rem: 2.0 },
    ],
    moodData: [
      { day: "Mon", score: 88 }, { day: "Tue", score: 90 }, { day: "Wed", score: 86 },
      { day: "Thu", score: 92 }, { day: "Fri", score: 89 }, { day: "Sat", score: 94 }, { day: "Sun", score: 91 },
    ],
    baseAiStatus: "Nominal — Optimal cognitive performance",
  },
  {
    id: "pilot", name: "Lt. James Park", role: "Pilot", avatar: "JP",
    baseHR: 74, baseStress: 26, baseO2: 98, baseTemp: 36.7,
    emotional: { calm: 62, focused: 80, anxiety: 15, fatigue: 30, motivation: 78, isolation: 20 },
    cognitive: [
      { metric: "Focus", base: 88 }, { metric: "Memory", base: 82 }, { metric: "Reaction", base: 94 },
      { metric: "Logic", base: 85 }, { metric: "Spatial", base: 92 }, { metric: "Language", base: 80 },
    ],
    sleepData: [
      { day: "Mon", deep: 3.0, light: 3.0, rem: 1.4 }, { day: "Tue", deep: 2.8, light: 3.2, rem: 1.2 },
      { day: "Wed", deep: 3.2, light: 2.8, rem: 1.5 }, { day: "Thu", deep: 2.6, light: 3.4, rem: 1.1 },
      { day: "Fri", deep: 3.1, light: 2.9, rem: 1.4 }, { day: "Sat", deep: 2.9, light: 3.1, rem: 1.3 },
      { day: "Sun", deep: 2.7, light: 3.3, rem: 1.2 },
    ],
    moodData: [
      { day: "Mon", score: 75 }, { day: "Tue", score: 72 }, { day: "Wed", score: 78 },
      { day: "Thu", score: 74 }, { day: "Fri", score: 80 }, { day: "Sat", score: 77 }, { day: "Sun", score: 76 },
    ],
    baseAiStatus: "Watch — Increased fatigue detected",
  },
];

// ─── Live data type ─────────────────────────────────────────
interface LiveCrewData {
  heartRate: number;
  stress: number;
  o2: number;
  temp: number;
  heartTrend: number[];
  emotional: Record<string, number>;
  cognitive: { metric: string; value: number }[];
  aiStatus: string;
  hydration: number;
  sleepQuality: number;
}

const generateLiveData = (profile: typeof crewProfiles[0]): LiveCrewData => {
  const hr = Math.round(jitter(profile.baseHR, 8, 55, 110));
  const stress = Math.round(jitter(profile.baseStress, 10, 0, 100));
  return {
    heartRate: hr,
    stress,
    o2: Math.round(jitter(profile.baseO2, 2, 90, 100)),
    temp: parseFloat(jitter(profile.baseTemp, 0.4, 35.5, 38.0).toFixed(1)),
    heartTrend: Array.from({ length: 24 }, () => Math.round(jitter(profile.baseHR, 6, 55, 110))),
    emotional: Object.fromEntries(
      Object.entries(profile.emotional).map(([k, v]) => [k, Math.round(jitter(v, 8, 0, 100))])
    ),
    cognitive: profile.cognitive.map(c => ({
      metric: c.metric,
      value: Math.round(jitter(c.base, 6, 0, 100)),
    })),
    aiStatus: stress < 25
      ? "Nominal — Low stress detected"
      : stress < 40
      ? "Caution — Elevated stress markers"
      : "Alert — High stress level",
    hydration: Math.round(jitter(80, 15, 50, 100)),
    sleepQuality: Math.round(jitter(75, 20, 40, 100)),
  };
};

// ─── Stress Gauge ────────────────────────────────────────────
const StressGauge = ({ value }: { value: number }) => {
  const angle = (value / 100) * 180;
  const color = value < 30 ? "hsl(var(--glow-green))" : value < 60 ? "hsl(var(--glow-orange))" : "hsl(var(--glow-red))";
  const r = 70;
  const endX = 80 + r * Math.cos(Math.PI - (angle * Math.PI) / 180);
  const endY = 85 - r * Math.sin(Math.PI - (angle * Math.PI) / 180);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 160 100" className="w-full max-w-[200px]">
        <path d="M 10 85 A 70 70 0 0 1 150 85" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" strokeLinecap="round" />
        <motion.path
          d={`M 10 85 A 70 70 0 ${angle > 90 ? 1 : 0} 1 ${endX} ${endY}`}
          fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
        <motion.circle cx={endX} cy={endY} r="5" fill={color}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      </svg>
      <motion.span className="text-3xl font-orbitron font-bold mt-[-8px]"
        style={{ color }} key={value}
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}>
        {value}%
      </motion.span>
    </div>
  );
};

// ─── Live Pulse Indicator ────────────────────────────────────
const LiveIndicator = ({ lastUpdate, isLive }: { lastUpdate: number; isLive: boolean }) => {
  const seconds = Math.max(0, Math.floor((Date.now() - lastUpdate) / 1000));
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLive ? 'bg-glow-blue' : 'bg-glow-green'}`} />
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isLive ? 'bg-glow-blue' : 'bg-glow-green'}`} />
      </span>
      <span className={`text-[9px] font-mono tracking-wider ${isLive ? 'text-glow-blue' : 'text-glow-green'}`}>
        {isLive ? 'LIVE IOT' : 'SIMULATED'} — {seconds < 2 ? "NOW" : `${seconds}s ago`}
      </span>
    </div>
  );
};

// ─── Device Status Panel ─────────────────────────────────────
const DeviceStatusPanel = ({ devices, isLiveMode }: { devices: IoTDevice[]; isLiveMode: boolean }) => {
  const getTimeSince = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  const getBatteryIcon = (level: number) => {
    if (level < 20) return <BatteryLow className="w-3.5 h-3.5 text-glow-red" />;
    return <Battery className="w-3.5 h-3.5 text-glow-green" />;
  };

  const getSignalBars = (strength: number) => {
    const bars = Math.ceil(strength / 25);
    return (
      <div className="flex gap-0.5 items-end h-3">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`w-1 rounded-sm transition-all ${
              bar <= bars ? 'bg-glow-green' : 'bg-muted'
            }`}
            style={{ height: `${bar * 25}%` }}
          />
        ))}
      </div>
    );
  };

  // Simulated devices when in demo mode
  const demoDevices: IoTDevice[] = [
    {
      id: 'demo-1',
      device_name: 'Astronaut Wearable Sensor',
      device_type: 'wearable_sensor',
      crew_member: 'Commander',
      is_connected: true,
      battery_level: 82,
      signal_strength: 95,
      firmware_version: 'v2.1.4',
      last_sync_at: new Date(Date.now() - 2000).toISOString(),
    },
    {
      id: 'demo-2',
      device_name: 'Biomedical Monitor',
      device_type: 'medical_device',
      crew_member: 'Engineer',
      is_connected: true,
      battery_level: 67,
      signal_strength: 78,
      firmware_version: 'v1.8.2',
      last_sync_at: new Date(Date.now() - 5000).toISOString(),
    },
    {
      id: 'demo-3',
      device_name: 'Sleep Tracker',
      device_type: 'sleep_monitor',
      crew_member: 'Scientist',
      is_connected: false,
      battery_level: 45,
      signal_strength: 0,
      firmware_version: 'v1.5.0',
      last_sync_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ];

  const displayDevices = isLiveMode && devices.length > 0 ? devices : demoDevices;

  return (
    <HoloPanel variant="nebula">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-orbitron text-[10px] font-bold text-foreground tracking-wider flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-primary" /> IOT DEVICE STATUS
        </h3>
        <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${isLiveMode ? 'bg-glow-blue/20 text-glow-blue' : 'bg-muted text-muted-foreground'}`}>
          {displayDevices.filter(d => d.is_connected).length}/{displayDevices.length} ONLINE
        </span>
      </div>

      <div className="space-y-3">
        {displayDevices.map((device) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-lg p-3 border transition-all ${
              device.is_connected
                ? 'border-glow-green/30 bg-glow-green/5'
                : 'border-border/30 bg-muted/10'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  device.is_connected ? 'bg-glow-green/20' : 'bg-muted'
                }`}>
                  <Smartphone className={`w-4 h-4 ${device.is_connected ? 'text-glow-green' : 'text-muted-foreground'}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-foreground truncate">{device.device_name}</p>
                  <p className="text-[9px] text-muted-foreground truncate">{device.crew_member}</p>
                </div>
              </div>
              {device.is_connected ? (
                <CheckCircle2 className="w-4 h-4 text-glow-green shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 text-[9px] font-mono">
              <div className="flex items-center gap-1">
                {getBatteryIcon(device.battery_level)}
                <span className={device.battery_level < 20 ? 'text-glow-red' : 'text-foreground'}>
                  {device.battery_level}%
                </span>
              </div>
              <div className="flex items-center gap-1">
                {getSignalBars(device.signal_strength)}
                <span className="text-muted-foreground">{device.signal_strength}%</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{getTimeSince(device.last_sync_at)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {!isLiveMode && (
        <div className="mt-4 p-2 rounded-lg border border-dashed border-primary/30 bg-primary/5">
          <p className="text-[9px] font-mono text-primary/80 text-center">
            Demo Mode — Connect real IoT devices to see live data
          </p>
        </div>
      )}
    </HoloPanel>
  );
};

// ─── Data Mode Toggle ────────────────────────────────────────
const DataModeToggle = ({ isLive, onToggle }: { isLive: boolean; onToggle: () => void }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-card/50">
    <div className="flex items-center gap-2">
      {isLive ? <Wifi className="w-4 h-4 text-glow-blue" /> : <WifiOff className="w-4 h-4 text-muted-foreground" />}
      <span className="text-[10px] font-mono text-muted-foreground">DATA SOURCE</span>
    </div>
    <div className="flex items-center gap-2">
      <span className={`text-[10px] font-mono ${!isLive ? 'text-glow-green' : 'text-muted-foreground'}`}>
        SIMULATED
      </span>
      <Switch checked={isLive} onCheckedChange={onToggle} />
      <span className={`text-[10px] font-mono ${isLive ? 'text-glow-blue' : 'text-muted-foreground'}`}>
        LIVE IOT
      </span>
    </div>
  </div>
);

// ─── API Info Panel ──────────────────────────────────────────
const ApiInfoPanel = ({ showCode, onToggle }: { showCode: boolean; onToggle: () => void }) => {
  const endpoint = getApiEndpoint();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const samplePayload = `{
  "crew_member": "Commander",
  "heart_rate": 72,
  "oxygen_level": 98,
  "body_temperature": 36.6,
  "hydration": 91,
  "stress_level": 34,
  "timestamp": "${new Date().toISOString()}"
}`;

  return (
    <HoloPanel>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-orbitron text-[10px] font-bold text-foreground tracking-wider flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-accent" /> IOT API ENDPOINT
        </h3>
        <button
          onClick={onToggle}
          className="text-[9px] font-mono text-primary hover:text-primary/80 transition-colors"
        >
          {showCode ? 'Hide ESP32 Code' : 'Show ESP32 Code'}
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-[9px] font-mono text-muted-foreground block mb-1">POST Endpoint</label>
          <div
            onClick={() => copyToClipboard(endpoint)}
            className="p-2 rounded-lg bg-muted/50 border border-border/30 cursor-pointer hover:bg-muted/70 transition-colors"
          >
            <code className="text-[9px] font-mono text-primary break-all">{endpoint}</code>
          </div>
        </div>

        <div>
          <label className="text-[9px] font-mono text-muted-foreground block mb-1">Sample Payload</label>
          <div
            onClick={() => copyToClipboard(samplePayload)}
            className="p-2 rounded-lg bg-muted/50 border border-border/30 cursor-pointer hover:bg-muted/70 transition-colors max-h-32 overflow-y-auto"
          >
            <pre className="text-[8px] font-mono text-foreground/80">{samplePayload}</pre>
          </div>
        </div>

        {showCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label className="text-[9px] font-mono text-muted-foreground block mb-1">ESP32 Code Snippet</label>
            <div
              onClick={() => copyToClipboard(generateEsp32CodeSnippet('device-id', 'Commander'))}
              className="p-2 rounded-lg bg-muted/50 border border-border/30 cursor-pointer hover:bg-muted/70 transition-colors max-h-48 overflow-y-auto"
            >
              <pre className="text-[7px] font-mono text-foreground/70 whitespace-pre-wrap">
                {generateEsp32CodeSnippet('device-id', 'Commander').slice(0, 800)}...
              </pre>
            </div>
          </motion.div>
        )}

        <p className="text-[8px] font-mono text-muted-foreground">
          Click any block to copy • Supports REST, WebSocket-ready via Realtime subscriptions
        </p>
      </div>
    </HoloPanel>
  );
};

// ─── Health Alerts Panel ─────────────────────────────────────
const HealthAlertsPanel = ({ 
  alerts, 
  simulatedAlerts,
  isLiveMode,
  onAcknowledge 
}: { 
  alerts: HealthAlert[]; 
  simulatedAlerts: { icon: string; text: string; severity: string }[];
  isLiveMode: boolean;
  onAcknowledge: (id: string) => void;
}) => {
  const displayAlerts = isLiveMode && alerts.length > 0 
    ? alerts.map(a => ({
        id: a.id,
        icon: a.severity === 'critical' ? '🚨' : a.severity === 'warning' ? '⚠' : '✓',
        text: a.message,
        severity: a.severity,
        isReal: true,
      }))
    : simulatedAlerts.map((a, i) => ({ ...a, id: `sim-${i}`, isReal: false }));

  return (
    <HoloPanel variant="nebula">
      <h3 className="font-orbitron text-[10px] font-bold text-foreground mb-4 tracking-wider flex items-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-glow-orange" /> AI HEALTH ALERTS
      </h3>
      <div className="space-y-2 max-h-[240px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {displayAlerts.map((a, i) => (
            <motion.div key={a.id}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              transition={{ delay: i * 0.08 }}
              layout
              className={`flex items-start gap-2 rounded-lg p-2.5 border text-[10px] font-mono ${
                a.severity === "warning" || a.severity === 'critical'
                  ? "border-glow-orange/20 bg-glow-orange/5 text-glow-orange"
                  : a.severity === "ok"
                  ? "border-glow-green/20 bg-glow-green/5 text-glow-green"
                  : "border-primary/20 bg-primary/5 text-primary"
              }`}
            >
              <span className="text-sm mt-[-1px]">{a.icon}</span>
              <span className="flex-1">{a.text}</span>
              {(a as any).isReal && (
                <button
                  onClick={() => onAcknowledge(a.id)}
                  className="text-[8px] px-1.5 py-0.5 rounded bg-background/50 hover:bg-background/80 transition-colors"
                >
                  ACK
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {displayAlerts.length === 0 && (
          <div className="text-center py-4 text-[10px] font-mono text-muted-foreground">
            No active alerts
          </div>
        )}
      </div>
    </HoloPanel>
  );
};

// ─── Main Page ───────────────────────────────────────────────
const HealthMonitoringPage = () => {
  const [selectedCrew, setSelectedCrew] = useState(0);
  const [liveData, setLiveData] = useState<LiveCrewData[]>(() =>
    crewProfiles.map(generateLiveData)
  );
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [, setTick] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  
  // IoT State
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [healthAlerts, setHealthAlerts] = useState<HealthAlert[]>([]);
  const [showApiCode, setShowApiCode] = useState(false);

  // Update live data every 3 seconds (simulated mode)
  const updateData = useCallback(() => {
    if (!isLiveMode) {
      setLiveData(crewProfiles.map(generateLiveData));
      setLastUpdate(Date.now());
    }
  }, [isLiveMode]);

  useEffect(() => {
    intervalRef.current = setInterval(updateData, 3000);
    return () => clearInterval(intervalRef.current);
  }, [updateData]);

  // Tick every second to update "seconds ago" display
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Load initial data and set up subscriptions
  useEffect(() => {
    const loadInitialData = async () => {
      const [deviceData, alertData] = await Promise.all([
        fetchDevices(),
        fetchHealthAlerts(),
      ]);
      setDevices(deviceData);
      setHealthAlerts(alertData);
    };

    loadInitialData();

    // Set up realtime subscriptions
    const unsubscribeHealth = subscribeToHealthData((payload) => {
      if (isLiveMode) {
        const newData = payload.new as any;
        // Update the corresponding crew member's data
        setLiveData(prev => {
          const crewIndex = crewProfiles.findIndex(
            c => c.role.toLowerCase() === newData.crew_member.toLowerCase() ||
                 c.name.toLowerCase().includes(newData.crew_member.toLowerCase())
          );
          if (crewIndex >= 0) {
            const updated = [...prev];
            updated[crewIndex] = {
              ...updated[crewIndex],
              heartRate: newData.heart_rate || updated[crewIndex].heartRate,
              o2: newData.oxygen_level || updated[crewIndex].o2,
              temp: newData.body_temperature || updated[crewIndex].temp,
              stress: newData.stress_level || updated[crewIndex].stress,
              hydration: newData.hydration || updated[crewIndex].hydration,
              sleepQuality: newData.sleep_quality || updated[crewIndex].sleepQuality,
            };
            return updated;
          }
          return prev;
        });
        setLastUpdate(Date.now());
        toast.info(`New health data received for ${newData.crew_member}`);
      }
    });

    const unsubscribeDevices = subscribeToDeviceUpdates((payload) => {
      const updatedDevice = payload.new as IoTDevice;
      setDevices(prev => {
        const index = prev.findIndex(d => d.id === updatedDevice.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = updatedDevice;
          return updated;
        }
        return [...prev, updatedDevice];
      });
    });

    const unsubscribeAlerts = subscribeToAlerts((payload) => {
      const newAlert = payload.new as HealthAlert;
      setHealthAlerts(prev => [newAlert, ...prev.slice(0, 19)]);
      
      if (newAlert.severity === 'critical') {
        toast.error(newAlert.message, { duration: 10000 });
      } else if (newAlert.severity === 'warning') {
        toast.warning(newAlert.message);
      }
    });

    return () => {
      unsubscribeHealth();
      unsubscribeDevices();
      unsubscribeAlerts();
    };
  }, [isLiveMode]);

  const handleAcknowledgeAlert = async (alertId: string) => {
    const success = await acknowledgeAlert(alertId);
    if (success) {
      setHealthAlerts(prev => prev.filter(a => a.id !== alertId));
      toast.success('Alert acknowledged');
    }
  };

  const handleToggleLiveMode = () => {
    setIsLiveMode(!isLiveMode);
    if (!isLiveMode) {
      toast.info('Switched to Live IoT mode — Waiting for sensor data');
    } else {
      toast.info('Switched to Simulated mode');
    }
  };

  const crew = crewProfiles[selectedCrew];
  const live = liveData[selectedCrew];

  const emotionalEntries = [
    { label: "Calm", value: live.emotional.calm, color: "bg-glow-green" },
    { label: "Focused", value: live.emotional.focused, color: "bg-primary" },
    { label: "Anxiety", value: live.emotional.anxiety, color: "bg-glow-orange" },
    { label: "Fatigue", value: live.emotional.fatigue, color: "bg-glow-red" },
    { label: "Motivation", value: live.emotional.motivation, color: "bg-accent" },
    { label: "Isolation", value: live.emotional.isolation, color: "bg-glow-blue" },
  ];

  // Dynamic AI alerts based on live data
  const aiAlerts = crewProfiles.map((p, i) => {
    const d = liveData[i];
    const alerts: { icon: string; text: string; severity: string }[] = [];
    if (d.stress > 35) alerts.push({ icon: "⚠", text: `High stress detected for ${p.role} (${d.stress}%)`, severity: "warning" });
    if (d.emotional.fatigue > 30) alerts.push({ icon: "⚠", text: `Increased fatigue for ${p.role}`, severity: "warning" });
    if (d.o2 < 96) alerts.push({ icon: "⚠", text: `Low O₂ saturation for ${p.role} (${d.o2}%)`, severity: "warning" });
    if (d.stress < 20 && d.emotional.fatigue < 15) alerts.push({ icon: "✓", text: `${p.role} vitals optimal`, severity: "ok" });
    if (d.cognitive.every(c => c.value > 85)) alerts.push({ icon: "◈", text: `${p.role} cognitive above baseline`, severity: "info" });
    return alerts;
  }).flat().slice(0, 6);

  const chartTooltipStyle = {
    contentStyle: {
      background: "hsl(240 12% 5% / 0.95)",
      border: "1px solid hsl(var(--border))",
      borderRadius: "8px",
      fontSize: "11px",
      fontFamily: "Share Tech Mono, monospace",
      color: "hsl(var(--foreground))",
    },
  };

  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">

          {/* Header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-6">
            <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Mission Control — Medical Bay</span>
            <h1 className="text-3xl md:text-5xl font-orbitron font-bold mt-3 text-foreground">
              Crew Health <span className="text-primary text-glow-star">Monitoring</span>
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground mt-2">
              IoT-Ready Real-Time Health Telemetry System
            </p>
          </motion.div>

          {/* Live status bar + Data Mode Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 px-2 gap-4">
            <LiveIndicator lastUpdate={lastUpdate} isLive={isLiveMode} />
            <DataModeToggle isLive={isLiveMode} onToggle={handleToggleLiveMode} />
            <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1"><Radio className="w-3 h-3 text-primary" /> Telemetry Active</span>
              <span>Refresh: 3s</span>
              <span>Crew: {crewProfiles.length}</span>
            </div>
          </div>

          {/* ─── IoT Status Row ──────────────────────────────── */}
          <div className="grid lg:grid-cols-3 gap-4 mb-6">
            <DeviceStatusPanel devices={devices} isLiveMode={isLiveMode} />
            <ApiInfoPanel showCode={showApiCode} onToggle={() => setShowApiCode(!showApiCode)} />
            <HealthAlertsPanel 
              alerts={healthAlerts} 
              simulatedAlerts={aiAlerts}
              isLiveMode={isLiveMode}
              onAcknowledge={handleAcknowledgeAlert}
            />
          </div>

          {/* ─── Crew Selector ──────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {crewProfiles.map((c, i) => {
              const d = liveData[i];
              return (
                <motion.button key={c.id}
                  onClick={() => setSelectedCrew(i)}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className={`relative rounded-xl p-3 sm:p-4 text-left transition-all duration-300 border ${
                    selectedCrew === i
                      ? "border-primary/50 bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                      : "border-border/30 bg-card/50 hover:border-border/50 hover:bg-card/70"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-orbitron text-[10px] sm:text-xs font-bold shrink-0 ${
                      selectedCrew === i ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      {c.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[10px] sm:text-xs text-foreground truncate">{c.role}</p>
                      <p className="text-[9px] sm:text-[10px] text-muted-foreground truncate">{c.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono">
                    <span className="text-muted-foreground">HR: <motion.span key={d.heartRate} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className="text-foreground">{d.heartRate}</motion.span></span>
                    <span className="text-muted-foreground">Stress: <motion.span key={d.stress} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className={d.stress > 25 ? "text-glow-orange" : "text-glow-green"}>{d.stress}%</motion.span></span>
                  </div>
                  {selectedCrew === i && (
                    <motion.div layoutId="crew-indicator" className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary rounded-full"
                      style={{ boxShadow: "0 0 8px hsl(var(--primary))" }} />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* ─── Dashboard Grid ─────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div key={crew.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {/* Row 1: Heart Rate + Sleep + Mood */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {/* Heart Rate */}
                <HoloPanel>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-orbitron text-[10px] font-bold text-foreground tracking-wider flex items-center gap-2">
                      <Heart className="w-3.5 h-3.5 text-glow-red" /> HEART RATE
                    </h3>
                    <motion.span key={live.heartRate} initial={{ scale: 1.3, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }}
                      className="text-xl font-orbitron font-bold text-glow-red">
                      {live.heartRate} <span className="text-xs text-muted-foreground">bpm</span>
                    </motion.span>
                  </div>
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={live.heartTrend.map((v, i) => ({ t: i, hr: v }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="t" hide />
                      <YAxis domain={["dataMin - 5", "dataMax + 5"]} hide />
                      <Tooltip {...chartTooltipStyle} />
                      <Line type="monotone" dataKey="hr" stroke="hsl(var(--glow-red))" strokeWidth={2}
                        dot={false} animationDuration={800}
                        style={{ filter: "drop-shadow(0 0 4px hsl(var(--glow-red)))" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </HoloPanel>

                {/* Sleep Quality */}
                <HoloPanel>
                  <h3 className="font-orbitron text-[10px] font-bold text-foreground mb-3 tracking-wider flex items-center gap-2">
                    <Moon className="w-3.5 h-3.5 text-glow-blue" /> SLEEP QUALITY
                  </h3>
                  <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={crew.sleepData} barGap={1}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip {...chartTooltipStyle} />
                      <Bar dataKey="deep" stackId="s" fill="hsl(var(--primary))" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="light" stackId="s" fill="hsl(var(--accent))" />
                      <Bar dataKey="rem" stackId="s" fill="hsl(var(--glow-blue))" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex gap-3 mt-2 justify-center flex-wrap">
                    {[["Deep", "--primary"], ["Light", "--accent"], ["REM", "--glow-blue"]].map(([l, c]) => (
                      <span key={l} className="flex items-center gap-1 text-[9px] font-mono text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ background: `hsl(var(${c}))` }} />{l}
                      </span>
                    ))}
                  </div>
                </HoloPanel>

                {/* Weekly Mood */}
                <HoloPanel className="md:col-span-2 lg:col-span-1">
                  <h3 className="font-orbitron text-[10px] font-bold text-foreground mb-3 tracking-wider flex items-center gap-2">
                    <Brain className="w-3.5 h-3.5 text-accent" /> WEEKLY MOOD INDEX
                  </h3>
                  <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={crew.moodData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis domain={[50, 100]} hide />
                      <Tooltip {...chartTooltipStyle} />
                      <Bar dataKey="score" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]}
                        style={{ filter: "drop-shadow(0 0 4px hsl(var(--accent) / 0.4))" }} />
                    </BarChart>
                  </ResponsiveContainer>
                </HoloPanel>
              </div>

              {/* Row 2: Stress + Emotional + Cognitive */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {/* Stress Gauge */}
                <HoloPanel variant="nebula">
                  <h3 className="font-orbitron text-[10px] font-bold text-foreground mb-2 tracking-wider flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-glow-green" /> STRESS ANALYSIS
                  </h3>
                  <StressGauge value={live.stress} />
                  <div className="mt-2 text-center">
                    <span className="text-[10px] font-mono text-muted-foreground">AI Status: </span>
                    <motion.span key={live.aiStatus}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className={`text-[10px] font-mono ${live.stress < 25 ? "text-glow-green" : live.stress < 40 ? "text-glow-orange" : "text-glow-red"}`}>
                      {live.aiStatus}
                    </motion.span>
                  </div>
                </HoloPanel>

                {/* Emotional State */}
                <HoloPanel>
                  <h3 className="font-orbitron text-[10px] font-bold text-foreground mb-4 tracking-wider flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-primary" /> EMOTIONAL STATE
                  </h3>
                  <div className="space-y-2.5">
                    {emotionalEntries.map((e) => (
                      <div key={e.label} className="flex items-center gap-2">
                        <span className="w-16 text-[10px] text-muted-foreground font-mono">{e.label}</span>
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            animate={{ width: `${e.value}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-full rounded-full ${e.color} opacity-70`}
                            style={{ boxShadow: `0 0 6px currentColor` }}
                          />
                        </div>
                        <motion.span key={e.value} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}
                          className="text-[10px] font-mono text-foreground/70 w-8 text-right">{e.value}%</motion.span>
                      </div>
                    ))}
                  </div>
                </HoloPanel>

                {/* Cognitive Radar */}
                <HoloPanel variant="nebula" className="md:col-span-2 lg:col-span-1">
                  <h3 className="font-orbitron text-[10px] font-bold text-foreground mb-2 tracking-wider flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-glow-star" /> COGNITIVE RADAR
                  </h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <RadarChart data={live.cognitive} cx="50%" cy="50%" outerRadius="70%">
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2}
                        animationDuration={800}
                        style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.4))" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </HoloPanel>
              </div>

              {/* Row 3: Vitals Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Heart Rate", value: `${live.heartRate}`, unit: "bpm", icon: Heart, colorClass: "text-glow-red" },
                  { label: "O₂ Saturation", value: `${live.o2}`, unit: "%", icon: Activity, colorClass: "text-glow-blue" },
                  { label: "Body Temp", value: `${live.temp}`, unit: "°C", icon: Shield, colorClass: "text-glow-green" },
                  { label: "Stress", value: `${live.stress}`, unit: "%", icon: Brain, colorClass: live.stress > 30 ? "text-glow-orange" : "text-glow-green" },
                ].map((v) => (
                  <HoloPanel key={v.label} className="!p-3 sm:!p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <v.icon className={`w-3.5 h-3.5 ${v.colorClass}`} />
                      <span className="text-[9px] font-mono text-muted-foreground tracking-wider">{v.label.toUpperCase()}</span>
                    </div>
                    <motion.div key={v.value} initial={{ opacity: 0.5, y: 4 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-baseline gap-1">
                      <span className={`text-2xl sm:text-3xl font-orbitron font-bold ${v.colorClass}`}>{v.value}</span>
                      <span className="text-xs text-muted-foreground">{v.unit}</span>
                    </motion.div>
                  </HoloPanel>
                ))}
              </div>

              {/* Row 4: Crew Overview */}
              <HoloPanel>
                <h3 className="font-orbitron text-[10px] font-bold text-foreground mb-4 tracking-wider flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-accent" /> CREW OVERVIEW
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {crewProfiles.map((c, i) => {
                    const d = liveData[i];
                    return (
                      <motion.div key={c.id}
                        whileHover={{ scale: 1.04 }}
                        onClick={() => setSelectedCrew(i)}
                        className={`rounded-lg p-3 border cursor-pointer transition-all ${
                          selectedCrew === i
                            ? "border-primary/40 bg-primary/5"
                            : "border-border/30 bg-muted/20 hover:border-border/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-orbitron font-bold shrink-0 ${
                            selectedCrew === i ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                          }`}>{c.avatar}</div>
                          <span className="text-[10px] font-bold text-foreground truncate">{c.role}</span>
                        </div>
                        <div className="space-y-1 text-[9px] font-mono">
                          <div className="flex justify-between text-muted-foreground">
                            <span>Heart Rate</span>
                            <motion.span key={d.heartRate} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className="text-foreground">{d.heartRate} bpm</motion.span>
                          </div>
                          <div className="flex justify-between text-muted-foreground">
                            <span>Stress</span>
                            <motion.span key={d.stress} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className={d.stress > 25 ? "text-glow-orange" : "text-glow-green"}>{d.stress}%</motion.span>
                          </div>
                          <div className="flex justify-between text-muted-foreground">
                            <span>O₂ Sat</span>
                            <motion.span key={d.o2} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className="text-foreground">{d.o2}%</motion.span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </HoloPanel>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>
    </PageLayout>
  );
};

export default HealthMonitoringPage;
