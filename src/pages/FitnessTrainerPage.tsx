import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Eye, Timer, Compass, BookOpen, Wifi, Trophy, Target, Zap, RotateCcw } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";

const exercises = [
  {
    id: "memory",
    icon: Brain,
    title: "Memory Sequence",
    desc: "Remember and reproduce increasingly complex sequences",
    difficulty: "Medium",
    duration: "3 min",
  },
  {
    id: "reaction",
    icon: Timer,
    title: "Reaction Speed",
    desc: "Test your reflexes by clicking targets as they appear",
    difficulty: "Easy",
    duration: "2 min",
  },
  {
    id: "spatial",
    icon: Compass,
    title: "Spatial Awareness",
    desc: "Navigate 3D mental rotation challenges",
    difficulty: "Hard",
    duration: "5 min",
  },
  {
    id: "focus",
    icon: Eye,
    title: "Focus Endurance",
    desc: "Sustained attention test with moving targets",
    difficulty: "Medium",
    duration: "4 min",
  },
  {
    id: "logic",
    icon: BookOpen,
    title: "Logic Puzzles",
    desc: "Pattern recognition and logical deduction",
    difficulty: "Hard",
    duration: "5 min",
  },
  {
    id: "language",
    icon: Wifi,
    title: "Word Processing",
    desc: "Rapid word association and vocabulary challenges",
    difficulty: "Easy",
    duration: "3 min",
  },
];

const cognitiveStats = [
  { label: "Memory", value: 85, prev: 82 },
  { label: "Focus", value: 92, prev: 88 },
  { label: "Reaction", value: 78, prev: 75 },
  { label: "Spatial", value: 88, prev: 85 },
  { label: "Logic", value: 91, prev: 87 },
  { label: "Language", value: 86, prev: 84 },
];

// Memory game
const MemoryGame = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const colors = ["bg-primary/60", "bg-accent/60", "bg-glow-green/60", "bg-glow-orange/60",
    "bg-glow-blue/60", "bg-glow-red/60", "bg-primary/40", "bg-accent/40", "bg-glow-green/40"];

  const startRound = () => {
    const newSeq = [...sequence, Math.floor(Math.random() * 9)];
    setSequence(newSeq);
    setPlayerInput([]);
    setIsShowingSequence(true);
    setGameOver(false);

    newSeq.forEach((cell, i) => {
      setTimeout(() => setActiveCell(cell), i * 600);
      setTimeout(() => setActiveCell(null), i * 600 + 400);
    });
    setTimeout(() => setIsShowingSequence(false), newSeq.length * 600 + 200);
  };

  const handleCellClick = (idx: number) => {
    if (isShowingSequence || gameOver) return;
    const newInput = [...playerInput, idx];
    setPlayerInput(newInput);
    setActiveCell(idx);
    setTimeout(() => setActiveCell(null), 200);

    if (newInput[newInput.length - 1] !== sequence[newInput.length - 1]) {
      setGameOver(true);
      return;
    }
    if (newInput.length === sequence.length) {
      setScore(s => s + 1);
      setTimeout(startRound, 800);
    }
  };

  const reset = () => {
    setSequence([]);
    setPlayerInput([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-xs text-muted-foreground">LEVEL {score + 1}</span>
        <span className="font-orbitron text-lg text-primary font-bold">{score}</span>
        <span className="font-mono text-xs text-muted-foreground">POINTS</span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.button key={i} onClick={() => handleCellClick(i)}
            whileTap={{ scale: 0.9 }}
            className={`w-16 h-16 rounded-lg border border-border/30 transition-all duration-200 ${
              activeCell === i ? colors[i] : "bg-muted/20 hover:bg-muted/40"
            }`}
          />
        ))}
      </div>

      {gameOver && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-4">
          <p className="text-glow-red font-mono text-xs mb-2">SEQUENCE BROKEN</p>
          <p className="text-foreground font-orbitron text-sm">Score: {score}</p>
        </motion.div>
      )}

      <div className="flex gap-2">
        {sequence.length === 0 || gameOver ? (
          <button onClick={() => { reset(); setTimeout(startRound, 100); }}
            className="px-6 py-2 rounded-lg border border-primary/20 text-primary font-mono text-xs hover:bg-primary/5 transition-all flex items-center gap-2">
            <Zap className="w-3 h-3" /> {gameOver ? "RETRY" : "START"}
          </button>
        ) : null}
        {score > 0 && (
          <button onClick={reset}
            className="px-4 py-2 rounded-lg border border-border/30 text-muted-foreground font-mono text-xs hover:text-foreground transition-all flex items-center gap-2">
            <RotateCcw className="w-3 h-3" /> RESET
          </button>
        )}
      </div>
    </div>
  );
};

// Reaction speed game
const ReactionGame = () => {
  const [state, setState] = useState<"idle" | "waiting" | "ready" | "done">("idle");
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [best, setBest] = useState(999);

  const start = () => {
    setState("waiting");
    const delay = 1000 + Math.random() * 4000;
    setTimeout(() => {
      setState("ready");
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (state === "ready") {
      const rt = Date.now() - startTime;
      setReactionTime(rt);
      if (rt < best) setBest(rt);
      setState("done");
    } else if (state === "waiting") {
      setState("idle");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.button
        onClick={state === "idle" || state === "done" ? start : handleClick}
        whileTap={{ scale: 0.95 }}
        className={`w-48 h-48 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-300 border-2 ${
          state === "waiting" ? "border-glow-orange/30 bg-glow-orange/5 text-glow-orange" :
          state === "ready" ? "border-glow-green/50 bg-glow-green/10 text-glow-green animate-pulse" :
          state === "done" ? "border-primary/30 bg-primary/5 text-primary" :
          "border-border/30 bg-muted/10 text-muted-foreground hover:border-primary/20"
        }`}
      >
        {state === "idle" && "CLICK TO START"}
        {state === "waiting" && "WAIT..."}
        {state === "ready" && "CLICK NOW!"}
        {state === "done" && `${reactionTime}ms`}
      </motion.button>

      {state === "done" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            Best: <span className="text-glow-green">{best}ms</span>
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">
            {reactionTime < 250 ? "⚡ Excellent!" : reactionTime < 350 ? "✓ Good" : "Keep practicing"}
          </p>
        </motion.div>
      )}
    </div>
  );
};

const FitnessTrainerPage = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
            <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Brain Training</span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mt-4 text-foreground">
              Cognitive <span className="text-primary text-glow-star">Fitness</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Interactive brain training exercises to maintain cognitive performance during long-duration space missions.
            </p>
          </motion.div>

          {/* Cognitive Radar */}
          <HoloPanel variant="nebula" className="max-w-3xl mx-auto mb-16">
            <h3 className="font-orbitron text-xs font-bold text-foreground mb-6 tracking-wider text-center">
              COGNITIVE PERFORMANCE OVERVIEW
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {cognitiveStats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }} className="flex flex-col items-center gap-2">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(240 15% 12%)" strokeWidth="5" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(220 60% 70%)" strokeWidth="5"
                        strokeDasharray={`${s.value * 2.51} ${100 * 2.51}`} strokeLinecap="round" opacity="0.6" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-orbitron text-xs font-bold text-foreground/70">{s.value}</span>
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground tracking-wider">{s.label.toUpperCase()}</span>
                  <span className={`text-[9px] font-mono ${s.value > s.prev ? "text-glow-green" : "text-glow-orange"}`}>
                    {s.value > s.prev ? "↑" : "↓"}{Math.abs(s.value - s.prev)}%
                  </span>
                </motion.div>
              ))}
            </div>
          </HoloPanel>

          {/* Exercise Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {exercises.map((ex, i) => (
              <HoloPanel key={ex.id} variant={i % 2 === 0 ? "star" : "nebula"} delay={i * 0.05}
                className="cursor-pointer hover:scale-[1.02] transition-transform">
                <button onClick={() => setActiveExercise(activeExercise === ex.id ? null : ex.id)} className="w-full text-left">
                  <div className="flex items-center justify-between mb-3">
                    <ex.icon className={`w-6 h-6 ${i % 2 === 0 ? "text-primary" : "text-accent"} opacity-60`} />
                    <div className="flex gap-2">
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                        ex.difficulty === "Easy" ? "border-glow-green/30 text-glow-green" :
                        ex.difficulty === "Medium" ? "border-glow-orange/30 text-glow-orange" :
                        "border-glow-red/30 text-glow-red"
                      }`}>{ex.difficulty}</span>
                      <span className="text-[9px] font-mono text-muted-foreground">{ex.duration}</span>
                    </div>
                  </div>
                  <h3 className="font-orbitron text-xs font-bold text-foreground mb-1 tracking-wider">{ex.title}</h3>
                  <p className="text-[10px] text-muted-foreground">{ex.desc}</p>
                </button>
              </HoloPanel>
            ))}
          </div>

          {/* Active exercise */}
          <AnimatePresence>
            {activeExercise && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <HoloPanel className="max-w-lg mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-orbitron text-sm font-bold text-foreground tracking-wider">
                      {exercises.find(e => e.id === activeExercise)?.title}
                    </h3>
                    <button onClick={() => setActiveExercise(null)}
                      className="text-muted-foreground hover:text-foreground text-xs">✕</button>
                  </div>
                  {activeExercise === "memory" && <MemoryGame />}
                  {activeExercise === "reaction" && <ReactionGame />}
                  {activeExercise !== "memory" && activeExercise !== "reaction" && (
                    <div className="text-center py-8">
                      <Target className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Exercise module loading...</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Coming in next mission update</p>
                    </div>
                  )}
                </HoloPanel>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Streak */}
          <HoloPanel className="max-w-md mx-auto mt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-glow-orange" />
                <div>
                  <p className="font-orbitron text-xs text-foreground">Training Streak</p>
                  <p className="text-[10px] text-muted-foreground font-mono">7 consecutive days</p>
                </div>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-glow-green/50" />
                ))}
              </div>
            </div>
          </HoloPanel>
        </div>
      </section>
    </PageLayout>
  );
};

export default FitnessTrainerPage;
