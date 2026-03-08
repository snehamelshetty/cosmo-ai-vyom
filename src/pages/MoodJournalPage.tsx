import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { BookOpen, Brain, TrendingUp, AlertTriangle, Send, Smile, Frown, Meh } from "lucide-react";

const crewMembers = ["Commander", "Engineer", "Scientist", "Pilot"];

const moodKeywords: Record<string, string[]> = {
  happy: ["great", "happy", "excited", "wonderful", "amazing", "good", "love", "enjoy", "fantastic"],
  stressed: ["stressed", "pressure", "anxious", "worried", "tense", "overwhelmed", "deadline"],
  isolated: ["alone", "lonely", "miss", "isolated", "distant", "homesick", "far"],
  calm: ["calm", "peaceful", "relaxed", "serene", "quiet", "meditated"],
  fatigued: ["tired", "exhausted", "sleepy", "drained", "fatigue", "rest"],
  focused: ["focused", "productive", "accomplished", "completed", "progress", "working"],
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const generateWeeklyMood = () =>
  weekDays.map((day) => ({
    day,
    happiness: 40 + Math.random() * 50,
    stress: 10 + Math.random() * 60,
    isolation: 5 + Math.random() * 40,
    focus: 30 + Math.random() * 60,
    fatigue: 10 + Math.random() * 50,
  }));

const analyzeText = (text: string) => {
  const lower = text.toLowerCase();
  const scores: Record<string, number> = {};
  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    scores[mood] = keywords.reduce((s, kw) => s + (lower.includes(kw) ? 1 : 0), 0);
  }
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  return Object.fromEntries(Object.entries(scores).map(([k, v]) => [k, Math.round((v / total) * 100)]));
};

const MoodJournalPage = () => {
  const [selectedCrew, setSelectedCrew] = useState(0);
  const [journalText, setJournalText] = useState("");
  const [entries, setEntries] = useState<{ text: string; time: string; analysis: Record<string, number> }[]>([]);
  const [weeklyData, setWeeklyData] = useState(generateWeeklyMood());
  const [liveAnalysis, setLiveAnalysis] = useState<Record<string, number>>({});

  useEffect(() => {
    setEntries([]);
    setWeeklyData(generateWeeklyMood());
  }, [selectedCrew]);

  useEffect(() => {
    if (journalText.length > 10) {
      setLiveAnalysis(analyzeText(journalText));
    }
  }, [journalText]);

  const submitEntry = () => {
    if (!journalText.trim()) return;
    const analysis = analyzeText(journalText);
    setEntries((prev) => [
      { text: journalText, time: new Date().toLocaleTimeString(), analysis },
      ...prev,
    ]);
    setJournalText("");
    setLiveAnalysis({});
  };

  const dominantMood = Object.entries(liveAnalysis).sort((a, b) => b[1] - a[1])[0];
  const MoodIcon = dominantMood
    ? dominantMood[0] === "happy" || dominantMood[0] === "calm"
      ? Smile
      : dominantMood[0] === "stressed" || dominantMood[0] === "fatigued"
      ? Frown
      : Meh
    : Meh;

  const radarData = [
    { metric: "Happy", value: liveAnalysis.happy || 0 },
    { metric: "Stressed", value: liveAnalysis.stressed || 0 },
    { metric: "Isolated", value: liveAnalysis.isolated || 0 },
    { metric: "Calm", value: liveAnalysis.calm || 0 },
    { metric: "Fatigued", value: liveAnalysis.fatigued || 0 },
    { metric: "Focused", value: liveAnalysis.focused || 0 },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-foreground tracking-wider mb-2">
            <BookOpen className="inline w-8 h-8 mr-3 text-primary" />
            DAILY MOOD JOURNAL
          </h1>
          <p className="text-muted-foreground font-mono text-xs tracking-wider">
            AI-POWERED EMOTIONAL ANALYSIS • CREW PSYCHOLOGICAL MONITORING
          </p>
        </motion.div>

        {/* Crew selector */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {crewMembers.map((c, i) => (
            <motion.button
              key={c}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCrew(i)}
              className={`px-4 py-2 rounded-lg font-mono text-xs tracking-wider transition-all border ${
                selectedCrew === i
                  ? "bg-primary/15 border-primary/40 text-primary shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
                  : "border-border/30 text-muted-foreground hover:border-primary/20 hover:bg-muted/10"
              }`}
            >
              {c}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Journal input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-5">
              <h3 className="font-mono text-xs text-primary tracking-wider mb-3 flex items-center gap-2">
                <Send className="w-3 h-3" /> LOG ENTRY — {crewMembers[selectedCrew].toUpperCase()}
              </h3>
              <Textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="How are you feeling today? Describe your emotional state, thoughts, and experiences..."
                className="min-h-[160px] bg-background/50 border-border/20 font-mono text-xs resize-none"
              />
              <Button onClick={submitEntry} className="w-full mt-3 font-mono text-xs tracking-wider" disabled={!journalText.trim()}>
                <Brain className="w-3 h-3 mr-2" /> ANALYZE & SUBMIT
              </Button>
            </div>

            {/* Live analysis radar */}
            {Object.keys(liveAnalysis).length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-primary/20 bg-card/30 backdrop-blur-sm p-5"
              >
                <h3 className="font-mono text-xs text-primary tracking-wider mb-2 flex items-center gap-2">
                  <MoodIcon className="w-4 h-4" /> LIVE ANALYSIS
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border)/0.3)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} />
                    <PolarRadiusAxis tick={false} axisLine={false} />
                    <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.2)" strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
                {dominantMood && (
                  <p className="text-center font-mono text-[10px] text-muted-foreground mt-1">
                    DOMINANT: <span className="text-primary">{dominantMood[0].toUpperCase()}</span>
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Charts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-4">
            {/* Weekly mood trends */}
            <div className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-5">
              <h3 className="font-mono text-xs text-primary tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp className="w-3 h-3" /> WEEKLY MOOD TRENDS
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.2)" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 11 }} />
                  <Line type="monotone" dataKey="happiness" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} name="Happiness" />
                  <Line type="monotone" dataKey="stress" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 3 }} name="Stress" />
                  <Line type="monotone" dataKey="isolation" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 3 }} name="Isolation" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Stress patterns bar chart */}
            <div className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-5">
              <h3 className="font-mono text-xs text-primary tracking-wider mb-4 flex items-center gap-2">
                <AlertTriangle className="w-3 h-3" /> STRESS & FATIGUE PATTERNS
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.2)" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 11 }} />
                  <Bar dataKey="stress" fill="hsl(var(--destructive)/0.7)" radius={[4, 4, 0, 0]} name="Stress" />
                  <Bar dataKey="fatigue" fill="hsl(var(--accent)/0.6)" radius={[4, 4, 0, 0]} name="Fatigue" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Previous entries */}
            <div className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-5">
              <h3 className="font-mono text-xs text-primary tracking-wider mb-3">RECENT LOG ENTRIES</h3>
              {entries.length === 0 ? (
                <p className="text-muted-foreground font-mono text-xs text-center py-6 opacity-50">No entries yet. Write your first log above.</p>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  <AnimatePresence>
                    {entries.map((entry, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-3 rounded-lg border border-border/20 bg-background/30"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-mono text-[10px] text-muted-foreground">{entry.time}</span>
                          <div className="flex gap-2">
                            {Object.entries(entry.analysis)
                              .filter(([, v]) => v > 0)
                              .map(([mood, val]) => (
                                <span key={mood} className="font-mono text-[9px] text-primary/70 bg-primary/10 px-1.5 py-0.5 rounded">
                                  {mood}: {val}%
                                </span>
                              ))}
                          </div>
                        </div>
                        <p className="font-mono text-xs text-foreground/80 line-clamp-2">{entry.text}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MoodJournalPage;
