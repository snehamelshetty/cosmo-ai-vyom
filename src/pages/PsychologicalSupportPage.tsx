import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Heart, Brain, Shield, Smile, MessageCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";

type Message = { role: "user" | "assistant"; content: string };

const quickPrompts = [
  "I'm feeling lonely today",
  "Help me manage stress",
  "I miss my family",
  "I can't sleep well",
  "Feeling unmotivated",
  "Need someone to talk to",
];

const wellbeingTips = [
  { icon: Heart, title: "Emotional Grounding", desc: "Name 5 things you can see, 4 you can touch, 3 you can hear. This anchors you to the present." },
  { icon: Brain, title: "Cognitive Reframing", desc: "Challenge negative thoughts by asking: Is this thought helpful? Is there another perspective?" },
  { icon: Shield, title: "Stress Inoculation", desc: "Practice handling small stressors to build resilience for bigger challenges." },
  { icon: Smile, title: "Gratitude Practice", desc: "Write 3 things you're grateful for each day. This rewires your brain toward positivity." },
];

// Simple AI response generator (local, no backend needed)
const generateResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("lonely") || lower.includes("alone") || lower.includes("isolated")) {
    return "I understand that feeling of isolation, especially in the vast emptiness of space. Remember, you're connected to an entire team on Earth who cares about you. Let's try a grounding exercise: close your eyes and recall your favorite memory with someone you love. Hold that feeling for 30 seconds. You're never truly alone — I'm here with you, always.";
  }
  if (lower.includes("stress") || lower.includes("anxious") || lower.includes("worried")) {
    return "Stress in a confined environment is completely natural. Let's activate your parasympathetic nervous system: Try the 4-7-8 breathing technique — inhale for 4 counts, hold for 7, exhale for 8. Repeat 4 times. Your cortisol levels will decrease within minutes. Would you like me to guide you through a full stress-reduction session?";
  }
  if (lower.includes("family") || lower.includes("miss") || lower.includes("home")) {
    return "Missing loved ones during a long-duration mission is one of the most common and valid emotions. Your feelings show deep connections that give you strength. Consider recording a video message for them — expressing your feelings can be therapeutic. I can also show you photos from Earth or play familiar sounds that might comfort you. What would help most right now?";
  }
  if (lower.includes("sleep") || lower.includes("insomnia") || lower.includes("tired")) {
    return "Sleep disruption in microgravity is well-documented. Here are evidence-based strategies: 1) Maintain a consistent sleep schedule aligned with your circadian protocol. 2) Avoid screens 30 minutes before sleep. 3) Use the ambient sound module — ocean or rain sounds can improve sleep onset by 38%. 4) Practice progressive muscle relaxation starting from your toes. Shall I set up your sleep environment?";
  }
  if (lower.includes("unmotivated") || lower.includes("bored") || lower.includes("purpose")) {
    return "Motivation fluctuations are expected during extended missions. Let's reconnect with your purpose: Why did you choose this mission? What impact will your work have? Sometimes motivation returns through action, not waiting for inspiration. Try completing one small task right now — the sense of accomplishment can restart your momentum. I can also suggest cognitive fitness exercises to re-engage your mind.";
  }
  return "Thank you for sharing that with me. Your mental wellbeing is my top priority. I'm here to listen, support, and help you navigate whatever you're experiencing. In the isolation of space, having a trusted companion matters. Would you like to explore relaxation techniques, talk through your feelings, or try a mindfulness exercise? I'm fully present for you.";
};

const PsychologicalSupportPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello, I'm MAITHRI — your AI psychological companion. I'm here to support your mental wellbeing during this mission. How are you feeling today? You can share anything — this is a safe, private space." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { scrollToBottom(); }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(text);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
            <span className="text-accent/60 font-mono text-[10px] tracking-[0.5em] uppercase">AI Companion</span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mt-4 text-foreground">
              Psychological <span className="text-accent text-glow-nebula">Support</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              A safe, private AI companion trained to support astronaut mental wellbeing during deep space missions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chat */}
            <div className="lg:col-span-2">
              <HoloPanel className="h-[500px] flex flex-col">
                <div className="flex items-center gap-2 pb-4 border-b border-border/20 mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-orbitron text-xs text-foreground">MAITHRI Chat</p>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-glow-green animate-pulse" />
                      <span className="text-[10px] font-mono text-muted-foreground">Online</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin">
                  {messages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                        msg.role === "assistant" ? "bg-accent/10" : "bg-primary/10"
                      }`}>
                        {msg.role === "assistant" ? <Bot className="w-3.5 h-3.5 text-accent" /> : <User className="w-3.5 h-3.5 text-primary" />}
                      </div>
                      <div className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${
                        msg.role === "assistant"
                          ? "bg-muted/30 border border-border/20 text-foreground/80"
                          : "bg-primary/10 border border-primary/20 text-foreground/90"
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <div className="bg-muted/30 border border-border/20 rounded-lg px-4 py-3">
                        <motion.div className="flex gap-1"
                          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                        </motion.div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Quick prompts */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {quickPrompts.map(p => (
                    <button key={p} onClick={() => sendMessage(p)}
                      className="px-2.5 py-1 rounded-full text-[9px] font-mono border border-border/30 text-muted-foreground hover:border-accent/20 hover:text-accent transition-all">
                      {p}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
                  <input type="text" value={input} onChange={e => setInput(e.target.value)}
                    placeholder="Share how you're feeling..."
                    className="flex-1 bg-muted/20 border border-border/30 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/30" />
                  <button type="submit" disabled={!input.trim() || isTyping}
                    className="px-4 rounded-lg bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all disabled:opacity-30">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </HoloPanel>
            </div>

            {/* Tips sidebar */}
            <div className="space-y-4">
              <h3 className="font-orbitron text-xs text-foreground tracking-wider">WELLBEING TECHNIQUES</h3>
              {wellbeingTips.map((tip, i) => (
                <HoloPanel key={tip.title} variant={i % 2 === 0 ? "star" : "nebula"} delay={i * 0.1}>
                  <tip.icon className={`w-5 h-5 mb-2 ${i % 2 === 0 ? "text-primary" : "text-accent"} opacity-60`} />
                  <h4 className="font-orbitron text-[10px] font-bold text-foreground mb-1">{tip.title}</h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{tip.desc}</p>
                </HoloPanel>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PsychologicalSupportPage;
