import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Rocket, Mail, Lock, ArrowRight } from "lucide-react";
import StarField from "@/components/StarField";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = isSignUp ? await signUp(email, password) : await signIn(email, password);
    setLoading(false);

    if (error) {
      toast({ title: "Authentication Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isSignUp ? "Account Created!" : "Welcome Back!", description: "Redirecting to mission control..." });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <StarField />
      
      {/* Nebula background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <Card className="border-border/30 bg-card/80 backdrop-blur-xl shadow-2xl shadow-primary/5">
          <CardHeader className="text-center space-y-4 pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
            >
              <Rocket className="w-8 h-8 text-primary" />
            </motion.div>
            <div>
              <CardTitle className="font-orbitron text-2xl tracking-wider text-foreground">
                {isSignUp ? "JOIN MISSION" : "MISSION LOGIN"}
              </CardTitle>
              <CardDescription className="font-mono text-xs tracking-widest text-muted-foreground mt-2">
                {isSignUp ? "CREATE YOUR CREW CREDENTIALS" : "AUTHENTICATE TO PROCEED"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-mono text-xs tracking-wider text-muted-foreground">
                  EMAIL ID
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="crew@cosmo.space"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background/50 border-border/30 font-mono text-sm focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-mono text-xs tracking-wider text-muted-foreground">
                  ACCESS CODE
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-background/50 border-border/30 font-mono text-sm focus:border-primary/50"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full font-orbitron tracking-wider text-xs h-11 bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Rocket className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <>
                    {isSignUp ? "CREATE ACCOUNT" : "LAUNCH SESSION"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider"
              >
                {isSignUp ? "ALREADY HAVE CREDENTIALS? SIGN IN" : "NEW CREW MEMBER? CREATE ACCOUNT"}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage;
