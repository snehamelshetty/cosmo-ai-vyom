import { motion } from "framer-motion";
import HoloPanel from "./HoloPanel";
import { useState, useEffect } from "react";
import { Satellite, Camera, Globe, RefreshCw } from "lucide-react";

interface APODData {
  title: string;
  explanation: string;
  url: string;
  media_type: string;
  date: string;
}

interface ISSPosition {
  latitude: string;
  longitude: string;
  timestamp: number;
}

const NASA_API_KEY = "DEMO_KEY";

const SpaceDataDashboard = () => {
  const [apod, setApod] = useState<APODData | null>(null);
  const [iss, setIss] = useState<ISSPosition | null>(null);
  const [loading, setLoading] = useState(true);
  const [issRefreshing, setIssRefreshing] = useState(false);

  const fetchAPOD = async () => {
    try {
      const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
      if (res.ok) {
        const data = await res.json();
        setApod(data);
      }
    } catch (e) {
      console.error("APOD fetch error:", e);
    }
  };

  const fetchISS = async (refresh = false) => {
    if (refresh) setIssRefreshing(true);
    try {
      const res = await fetch("http://api.open-notify.org/iss-now.json");
      if (res.ok) {
        const data = await res.json();
        setIss({
          latitude: data.iss_position.latitude,
          longitude: data.iss_position.longitude,
          timestamp: data.timestamp,
        });
      }
    } catch {
      // Fallback for CORS - use a proxy or show last known
      try {
        const res = await fetch(`https://api.wheretheiss.at/v1/satellites/25544`);
        if (res.ok) {
          const data = await res.json();
          setIss({
            latitude: data.latitude.toFixed(4),
            longitude: data.longitude.toFixed(4),
            timestamp: Math.floor(Date.now() / 1000),
          });
        }
      } catch (e2) {
        console.error("ISS fetch error:", e2);
      }
    }
    setIssRefreshing(false);
  };

  useEffect(() => {
    Promise.all([fetchAPOD(), fetchISS()]).finally(() => setLoading(false));
    const interval = setInterval(() => fetchISS(), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-28 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Live Space Intelligence</span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-4 text-foreground">
            Real-Time <span className="text-accent text-glow-nebula">Space Data</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm">
            Live data from NASA and ESA — powering MAITHRI's situational awareness systems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* ISS Tracker */}
          <HoloPanel>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Satellite className="w-5 h-5 text-primary" />
                <h3 className="font-orbitron text-sm font-bold text-foreground tracking-wider">ISS LIVE POSITION</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => fetchISS(true)}
                className="p-1.5 rounded-full border border-border/50 hover:border-primary/40 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-muted-foreground ${issRefreshing ? "animate-spin" : ""}`} />
              </motion.button>
            </div>

            {loading ? (
              <div className="h-48 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : iss ? (
              <div>
                <div className="relative rounded-lg overflow-hidden mb-4 border border-border/20" style={{ height: 220 }}>
                  <iframe
                    src={`https://maps.google.com/maps?q=${iss.latitude},${iss.longitude}&z=3&output=embed&t=k`}
                    className="w-full h-full"
                    title="ISS Position Map"
                    style={{ border: "none", filter: "hue-rotate(200deg) saturate(0.6) brightness(0.7)" }}
                  />
                  <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm rounded px-2 py-1 border border-primary/30">
                    <span className="text-[10px] font-mono text-primary">● LIVE TRACKING</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/20 rounded-lg p-3 border border-border/20">
                    <p className="text-[10px] font-mono text-muted-foreground mb-1">LATITUDE</p>
                    <p className="font-orbitron text-lg font-bold text-foreground">{parseFloat(iss.latitude).toFixed(4)}°</p>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-3 border border-border/20">
                    <p className="text-[10px] font-mono text-muted-foreground mb-1">LONGITUDE</p>
                    <p className="font-orbitron text-lg font-bold text-foreground">{parseFloat(iss.longitude).toFixed(4)}°</p>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground/60 font-mono mt-3 text-center">
                  Orbital speed: ~27,600 km/h · Altitude: ~408 km · Updates every 30s
                </p>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                <Globe className="w-5 h-5 mr-2 opacity-50" /> Unable to fetch ISS data
              </div>
            )}
          </HoloPanel>

          {/* NASA APOD */}
          <HoloPanel variant="nebula">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-accent" />
              <h3 className="font-orbitron text-sm font-bold text-foreground tracking-wider">NASA ASTRONOMY PICTURE OF THE DAY</h3>
            </div>

            {loading ? (
              <div className="h-48 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
              </div>
            ) : apod ? (
              <div>
                <div className="rounded-lg overflow-hidden mb-4 border border-border/20" style={{ height: 220 }}>
                  {apod.media_type === "image" ? (
                    <img src={apod.url} alt={apod.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <iframe src={apod.url} className="w-full h-full" title={apod.title} style={{ border: "none" }} />
                  )}
                </div>
                <h4 className="font-orbitron text-xs font-bold text-foreground mb-2">{apod.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{apod.explanation}</p>
                <p className="text-[10px] text-muted-foreground/50 font-mono mt-3">
                  Source: NASA · {apod.date}
                </p>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                <Camera className="w-5 h-5 mr-2 opacity-50" /> Unable to fetch APOD
              </div>
            )}
          </HoloPanel>
        </div>

        {/* Additional live stats row */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            { label: "ISS Crew Members", value: "7", sub: "Expedition 72", icon: Globe },
            { label: "Days in Orbit", value: "9,400+", sub: "Since Nov 2, 2000", icon: Satellite },
            { label: "Earth Orbits / Day", value: "15.5", sub: "Every 92 minutes", icon: RefreshCw },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <HoloPanel variant={i === 1 ? "nebula" : "star"}>
                <div className="flex items-center gap-3">
                  <stat.icon className="w-5 h-5 text-primary/60" />
                  <div>
                    <p className="font-orbitron text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-[10px] text-muted-foreground/50 font-mono">{stat.sub}</p>
                  </div>
                </div>
              </HoloPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpaceDataDashboard;
