import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";
import milkywayBg from "@/assets/milkyway-bg.jpg";

const soundScapes = [
  { name: "Bird Chirping", emoji: "🐦", freq: 300, filter: 500, desc: "Dawn chorus in a mountain valley" },
  { name: "Rain", emoji: "🌧️", freq: 150, filter: 300, desc: "Gentle rainfall on a quiet night" },
  { name: "Ocean Waves", emoji: "🌊", freq: 100, filter: 250, desc: "Rolling waves on a moonlit shore" },
  { name: "Waterfall", emoji: "💧", freq: 130, filter: 280, desc: "Cascading water in a tropical forest" },
  { name: "Forest Wind", emoji: "🌲", freq: 120, filter: 200, desc: "Gentle breeze through tall pines" },
  { name: "Fire Crackling", emoji: "🔥", freq: 180, filter: 400, desc: "Crackling campfire under the stars" },
  { name: "Night Crickets", emoji: "🦗", freq: 250, filter: 450, desc: "Cricket symphony on a warm evening" },
  { name: "Thunder", emoji: "⛈️", freq: 80, filter: 180, desc: "Distant thunder rolling across plains" },
];

const breathingPatterns = [
  { name: "4-7-8 Calm", inhale: 4, hold: 7, exhale: 8 },
  { name: "Box Breathing", inhale: 4, hold: 4, exhale: 4 },
  { name: "Deep Slow", inhale: 6, hold: 2, exhale: 8 },
];

const SoundTherapyPage = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.08);
  const [isMuted, setIsMuted] = useState(false);
  const [breathPattern, setBreathPattern] = useState(breathingPatterns[0]);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [isBreathing, setIsBreathing] = useState(false);
  const [timer, setTimer] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const noiseRef = useRef<AudioBufferSourceNode | null>(null);
  const timerRef = useRef<number | null>(null);

  const createNoise = useCallback((ctx: AudioContext, gain: GainNode) => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 200;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.03;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(gain);
    noise.start();
    noiseRef.current = noise;
  }, []);

  const startSound = (sound: typeof soundScapes[0]) => {
    stopSound();
    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = sound.freq;
    filter.type = "lowpass";
    filter.frequency.value = sound.filter;
    gain.gain.value = isMuted ? 0 : volume;

    lfo.type = "sine";
    lfo.frequency.value = 0.1;
    lfoGain.gain.value = 5;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    createNoise(ctx, gain);

    oscillatorRef.current = osc;
    gainRef.current = gain;
    setActiveSound(sound.name);
  };

  const stopSound = () => {
    try {
      noiseRef.current?.stop();
    } catch {}
    try {
      oscillatorRef.current?.stop();
    } catch {}
    audioContextRef.current?.close();
    oscillatorRef.current = null;
    gainRef.current = null;
    noiseRef.current = null;
    audioContextRef.current = null;
    setActiveSound(null);
  };

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (!isBreathing) return;
    const cycle = () => {
      setBreathPhase("inhale");
      const t1 = setTimeout(() => setBreathPhase("hold"), breathPattern.inhale * 1000);
      const t2 = setTimeout(() => setBreathPhase("exhale"), (breathPattern.inhale + breathPattern.hold) * 1000);
      const total = (breathPattern.inhale + breathPattern.hold + breathPattern.exhale) * 1000;
      const t3 = setTimeout(cycle, total);
      timerRef.current = t3 as unknown as number;
      return [t1, t2, t3];
    };
    const timeouts = cycle();
    return () => { timeouts.forEach(t => clearTimeout(t)); if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isBreathing, breathPattern]);

  // Session timer
  useEffect(() => {
    if (!activeSound) { setTimer(0); return; }
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [activeSound]);

  useEffect(() => () => stopSound(), []);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-6">
        {/* Background */}
        <div className="absolute inset-0 opacity-15">
          <img src={milkywayBg} alt="" className="w-full h-full object-cover" style={{ filter: "blur(40px) brightness(0.3)" }} />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
            <span className="text-accent/60 font-mono text-[10px] tracking-[0.5em] uppercase">Therapeutic Audio</span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mt-4 text-foreground">
              Acoustic <span className="text-accent text-glow-nebula">Relaxation</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Earth-based sound therapy designed to reduce stress and promote calm during deep space missions.
            </p>
          </motion.div>

          {/* Breathing Exercise */}
          <div className="flex flex-col items-center mb-16">
            <motion.div
              className="w-40 h-40 rounded-full border-2 border-accent/20 flex items-center justify-center mb-6 relative"
              animate={isBreathing ? {
                scale: breathPhase === "inhale" ? 1.4 : breathPhase === "hold" ? 1.4 : 1,
              } : {}}
              transition={{ duration: breathPhase === "inhale" ? breathPattern.inhale : breathPhase === "exhale" ? breathPattern.exhale : 0.3, ease: "easeInOut" }}
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center"
                animate={isBreathing ? {
                  scale: breathPhase === "inhale" ? 1.6 : breathPhase === "hold" ? 1.6 : 1,
                  opacity: breathPhase === "hold" ? 0.8 : 0.4,
                } : {}}
                transition={{ duration: breathPhase === "inhale" ? breathPattern.inhale : breathPhase === "exhale" ? breathPattern.exhale : 0.3 }}
              >
                <span className="font-orbitron text-xs text-accent/70 uppercase tracking-wider">
                  {isBreathing ? breathPhase : "ready"}
                </span>
              </motion.div>
              {isBreathing && (
                <motion.div
                  className="absolute inset-0 rounded-full border border-accent/10"
                  animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}
            </motion.div>

            <div className="flex gap-2 mb-4">
              {breathingPatterns.map(p => (
                <button key={p.name} onClick={() => setBreathPattern(p)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-mono border transition-all ${breathPattern.name === p.name ? "border-accent/30 bg-accent/10 text-accent" : "border-border/30 text-muted-foreground hover:border-accent/20"}`}>
                  {p.name}
                </button>
              ))}
            </div>
            <button onClick={() => setIsBreathing(!isBreathing)}
              className="flex items-center gap-2 px-6 py-2 rounded-lg border border-accent/20 text-accent/70 font-mono text-xs hover:bg-accent/5 transition-all">
              {isBreathing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {isBreathing ? "PAUSE" : "START"} BREATHING
            </button>
          </div>

          {/* Sound Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {soundScapes.map((s, i) => (
              <HoloPanel key={s.name} variant={i % 2 === 0 ? "star" : "nebula"} delay={i * 0.05}>
                <button onClick={() => activeSound === s.name ? stopSound() : startSound(s)}
                  className="w-full text-left group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{s.emoji}</span>
                    <div className="flex items-center gap-2">
                      {activeSound === s.name ? (
                        <Pause className="w-4 h-4 text-glow-green" />
                      ) : (
                        <Play className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                  </div>
                  <h3 className="font-orbitron text-xs font-bold text-foreground mb-1">{s.name}</h3>
                  <p className="text-[10px] text-muted-foreground mb-2">{s.desc}</p>
                  {/* Progress bar */}
                  <div className="h-1 rounded-full bg-muted overflow-hidden">
                    {activeSound === s.name ? (
                      <motion.div
                        className="h-full rounded-full bg-glow-green/60"
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <div className="h-full w-0 rounded-full bg-primary/30" />
                    )}
                  </div>
                </button>
              </HoloPanel>
            ))}
          </div>

          {/* Controls */}
          {activeSound && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto">
              <HoloPanel variant="nebula">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-orbitron text-xs text-foreground">Now Playing</p>
                    <p className="text-sm text-accent">{soundScapes.find(s => s.name === activeSound)?.emoji} {activeSound}</p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{formatTime(timer)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsMuted(!isMuted)} className="text-muted-foreground hover:text-foreground">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input type="range" min="0" max="0.2" step="0.01" value={volume}
                    onChange={e => setVolume(parseFloat(e.target.value))}
                    className="flex-1 h-1 bg-muted rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent" />
                  <button onClick={stopSound}
                    className="px-3 py-1 rounded text-[10px] font-mono border border-glow-red/30 text-glow-red hover:bg-glow-red/10 transition-all">
                    STOP
                  </button>
                </div>
              </HoloPanel>
            </motion.div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default SoundTherapyPage;
