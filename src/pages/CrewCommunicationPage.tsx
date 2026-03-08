import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Radio, Send, Users, Bell, Wifi, Clock, ChevronRight } from "lucide-react";

const crewMembers = [
  { name: "Commander Chen", role: "CDR", status: "online", avatar: "👨‍🚀" },
  { name: "Dr. Vasquez", role: "ENG", status: "online", avatar: "👩‍🔬" },
  { name: "Dr. Kim", role: "SCI", status: "away", avatar: "🧑‍🔬" },
  { name: "Lt. Brooks", role: "PLT", status: "online", avatar: "👨‍✈️" },
  { name: "Mission Control", role: "MCC", status: "online", avatar: "🛰️" },
];

type Message = { from: string; text: string; time: string; type: "crew" | "system" | "user" };

const missionUpdates = [
  { time: "06:00 UTC", text: "Orbital correction burn completed successfully.", priority: "normal" },
  { time: "08:30 UTC", text: "Solar panel deployment at 98% efficiency.", priority: "normal" },
  { time: "11:15 UTC", text: "EVA scheduled for Commander Chen at 14:00 UTC.", priority: "high" },
  { time: "13:45 UTC", text: "Incoming telemetry from Mars relay satellite.", priority: "normal" },
  { time: "15:20 UTC", text: "⚠ Minor pressure variance in Module B — monitoring.", priority: "warning" },
];

const autoResponses = [
  "Copy that. Acknowledged.",
  "Roger, will proceed as planned.",
  "Understood. Updating mission log.",
  "Affirmative. Standing by.",
  "Received. Relaying to ground control.",
  "Copy. All systems nominal on this end.",
];

const initialMessages: Message[] = [
  { from: "Mission Control", text: "Good morning crew. All systems are nominal. Daily briefing at 0800 UTC.", time: "05:45", type: "system" },
  { from: "Commander Chen", text: "Copy that, MCC. Crew status: all members rested and ready.", time: "05:48", type: "crew" },
  { from: "Dr. Vasquez", text: "Engineering report: Life support at 100%. Power reserves at 94%.", time: "06:02", type: "crew" },
  { from: "Dr. Kim", text: "Science bay samples from yesterday's EVA show promising results.", time: "06:15", type: "crew" },
  { from: "Mission Control", text: "Excellent work team. Reminder: orbital adjustment burn at 0900.", time: "06:22", type: "system" },
];

const CrewCommunicationPage = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("General");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [signalStrength, setSignalStrength] = useState(92);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength(85 + Math.random() * 14);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setMessages((prev) => [...prev, { from: "You", text: input, time, type: "user" }]);
    setInput("");

    // Auto-response
    setTimeout(() => {
      const responder = crewMembers[Math.floor(Math.random() * 4)];
      const response = autoResponses[Math.floor(Math.random() * autoResponses.length)];
      const t = new Date();
      setMessages((prev) => [
        ...prev,
        { from: responder.name, text: response, time: `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`, type: "crew" },
      ]);
    }, 1500 + Math.random() * 2000);
  };

  const channels = ["General", "Engineering", "Science", "Medical", "Emergency"];

  return (
    <PageLayout>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-foreground tracking-wider mb-2">
            <Radio className="inline w-8 h-8 mr-3 text-primary" />
            CREW COMMUNICATION CONSOLE
          </h1>
          <p className="text-muted-foreground font-mono text-xs tracking-wider">
            ENCRYPTED DEEP SPACE COMMUNICATION • SIGNAL STRENGTH: {Math.round(signalStrength)}%
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left sidebar - Crew & Channels */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            {/* Crew status */}
            <div className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-4">
              <h3 className="font-mono text-xs text-primary tracking-wider mb-3 flex items-center gap-2">
                <Users className="w-3 h-3" /> CREW STATUS
              </h3>
              <div className="space-y-2">
                {crewMembers.map((m) => (
                  <div key={m.name} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/10 transition-colors cursor-pointer">
                    <span className="text-lg">{m.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[10px] text-foreground truncate">{m.name}</p>
                      <p className="font-mono text-[9px] text-muted-foreground">{m.role}</p>
                    </div>
                    <span className={`w-2 h-2 rounded-full ${m.status === "online" ? "bg-glow-green" : "bg-accent/50"}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Channels */}
            <div className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-4">
              <h3 className="font-mono text-xs text-primary tracking-wider mb-3 flex items-center gap-2">
                <Wifi className="w-3 h-3" /> CHANNELS
              </h3>
              <div className="space-y-1">
                {channels.map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setSelectedChannel(ch)}
                    className={`w-full text-left px-3 py-2 rounded-lg font-mono text-[10px] tracking-wider transition-all flex items-center gap-2 ${
                      selectedChannel === ch
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "text-muted-foreground hover:bg-muted/10 border border-transparent"
                    }`}
                  >
                    <ChevronRight className="w-3 h-3" /> {ch.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chat area */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
            <div className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm flex flex-col h-[600px]">
              {/* Chat header */}
              <div className="p-4 border-b border-border/20 flex items-center justify-between">
                <div>
                  <h3 className="font-mono text-xs text-primary tracking-wider">#{selectedChannel.toUpperCase()}</h3>
                  <p className="font-mono text-[9px] text-muted-foreground">{crewMembers.filter((m) => m.status === "online").length} crew online</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-glow-green animate-pulse" />
                  <span className="font-mono text-[9px] text-muted-foreground">LIVE</span>
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === "user"
                          ? "bg-primary/15 border border-primary/30"
                          : msg.type === "system"
                          ? "bg-accent/10 border border-accent/20"
                          : "bg-muted/10 border border-border/20"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] font-bold text-primary/80">{msg.from}</span>
                        <span className="font-mono text-[9px] text-muted-foreground">{msg.time} UTC</span>
                      </div>
                      <p className="font-mono text-xs text-foreground/90">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/20">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type message..."
                    className="bg-background/50 border-border/20 font-mono text-xs"
                  />
                  <Button onClick={sendMessage} size="icon" className="shrink-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right sidebar - Mission updates */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
            <div className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-4">
              <h3 className="font-mono text-xs text-primary tracking-wider mb-3 flex items-center gap-2">
                <Bell className="w-3 h-3" /> MISSION UPDATES
              </h3>
              <div className="space-y-3">
                {missionUpdates.map((u, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-3 rounded-lg border ${
                      u.priority === "warning"
                        ? "border-destructive/30 bg-destructive/5"
                        : u.priority === "high"
                        ? "border-accent/30 bg-accent/5"
                        : "border-border/20 bg-background/20"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="font-mono text-[9px] text-muted-foreground">{u.time}</span>
                    </div>
                    <p className="font-mono text-[10px] text-foreground/80">{u.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Signal info */}
            <div className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-4">
              <h3 className="font-mono text-xs text-primary tracking-wider mb-3 flex items-center gap-2">
                <Wifi className="w-3 h-3" /> SIGNAL STATUS
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between font-mono text-[10px] text-muted-foreground mb-1">
                    <span>Signal Strength</span>
                    <span className="text-primary">{Math.round(signalStrength)}%</span>
                  </div>
                  <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      animate={{ width: `${signalStrength}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div className="font-mono text-[9px] text-muted-foreground space-y-1">
                  <p>Latency: {(4 + Math.random() * 2).toFixed(1)} min (Mars relay)</p>
                  <p>Encryption: AES-256 Active</p>
                  <p>Bandwidth: 2.4 Mbps</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CrewCommunicationPage;
