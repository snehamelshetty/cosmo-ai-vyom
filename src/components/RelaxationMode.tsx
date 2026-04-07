import { useState, useRef, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX } from "lucide-react";
import milkywayBg from "@/assets/milkyway-bg.jpg";

const sounds = [
  { name: "Forest", emoji: "🌲", freq: 200 },
  { name: "Rain", emoji: "🌧️", freq: 150 },
  { name: "Ocean", emoji: "🌊", freq: 100 },
  { name: "Fire", emoji: "🔥", freq: 180 },
  { name: "Birds", emoji: "🐦", freq: 300 },
  { name: "Wind", emoji: "💨", freq: 120 },
  { name: "Night", emoji: "🦗", freq: 250 },
];

const RelaxationMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const startAmbient = (sound: typeof sounds[0]) => {
    stopAmbient();
    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.value = sound.freq;
    filter.type = "lowpass";
    filter.frequency.value = 400;
    gain.gain.value = isMuted ? 0 : 0.08;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    oscillatorRef.current = osc;
    gainRef.current = gain;
    setActiveSound(sound.name);
  };

  const stopAmbient = () => {
    oscillatorRef.current?.stop();
    audioContextRef.current?.close();
    oscillatorRef.current = null;
    gainRef.current = null;
    audioContextRef.current = null;
    setActiveSound(null);
  };

  const toggleMute = () => {
    if (gainRef.current) {
      gainRef.current.gain.value = isMuted ? 0.08 : 0;
    }
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    return () => { stopAmbient(); };
  }, []);

  return (
    <>
      {/* Trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-accent/10 border border-glow-nebula flex items-center justify-center hover:bg-accent/20 transition-all duration-500 glow-nebula"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Space Meditation Mode"
      >
        <span className="text-lg">🧘</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          >
            {/* Full screen cosmic background */}
            <motion.div
              className="absolute inset-0"
              animate={{ scale: [1, 1.08, 1], rotate: [0, 0.5, 0] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <img src={milkywayBg} alt="" className="w-full h-full object-cover"
                style={{ filter: "brightness(0.4) contrast(1.2) saturate(1.3)" }} />
            </motion.div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-background/50" />

            {/* Floating particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-foreground/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: Math.random() * 5 + 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}

            {/* Content */}
            <div className="relative z-10 text-center px-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-mono text-[10px] tracking-[0.5em] text-muted-foreground mb-4"
              >
                SPACE MEDITATION MODE
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="font-orbitron text-3xl md:text-5xl font-bold text-foreground text-glow-star mb-8"
              >
                Breathe
              </motion.h2>

              {/* Breathing circle */}
              <motion.div
                className="w-32 h-32 mx-auto rounded-full border border-primary/20 mb-12 flex items-center justify-center"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-primary/5 border border-primary/10"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Sound options */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap justify-center gap-3 mb-8"
              >
                {sounds.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => activeSound === s.name ? stopAmbient() : startAmbient(s)}
                    className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-500 border ${
                      activeSound === s.name
                        ? "border-primary/30 bg-primary/10 text-foreground glow-star"
                        : "border-border/30 text-muted-foreground hover:border-primary/20 hover:text-foreground"
                    }`}
                  >
                    {s.emoji} {s.name}
                  </button>
                ))}
              </motion.div>

              {/* Mute toggle */}
              {activeSound && (
                <button onClick={toggleMute} className="text-muted-foreground hover:text-foreground transition-colors">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={() => { stopAmbient(); setIsOpen(false); }}
              className="absolute top-6 right-6 z-20 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RelaxationMode;
