import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";

const SkyViewerPage = () => {
  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
            <span className="text-accent/60 font-mono text-[10px] tracking-[0.5em] uppercase">Interactive Astronomy</span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mt-4 text-foreground">
              Stellarium <span className="text-accent text-glow-nebula">Sky Viewer</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Explore constellations, planets, galaxies, and star clusters with an interactive sky viewer — bringing the cosmos to your screen.
            </p>
          </motion.div>

          <HoloPanel className="mb-8">
            <div className="rounded-lg overflow-hidden border border-border/20" style={{ height: "600px" }}>
              <iframe
                src="https://stellarium-web.org/"
                className="w-full h-full"
                title="Stellarium Web Sky Viewer"
                allow="fullscreen"
                style={{ border: "none" }}
              />
            </div>
          </HoloPanel>

          <div className="grid md:grid-cols-3 gap-4">
            <HoloPanel>
              <h3 className="font-orbitron text-xs font-bold text-foreground mb-2 tracking-wider">🌟 Stars & Constellations</h3>
              <p className="text-[10px] text-muted-foreground">Navigate the sky to identify stars and constellation patterns. Click on any star for detailed information.</p>
            </HoloPanel>
            <HoloPanel variant="nebula">
              <h3 className="font-orbitron text-xs font-bold text-foreground mb-2 tracking-wider">🪐 Planets</h3>
              <p className="text-[10px] text-muted-foreground">Locate planets in real-time positions. See Mercury, Venus, Mars, Jupiter, Saturn, and more on the sky map.</p>
            </HoloPanel>
            <HoloPanel>
              <h3 className="font-orbitron text-xs font-bold text-foreground mb-2 tracking-wider">🌌 Deep Sky Objects</h3>
              <p className="text-[10px] text-muted-foreground">Discover nebulae, galaxies, and star clusters. Zoom in to explore the Andromeda Galaxy, Orion Nebula, and more.</p>
            </HoloPanel>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SkyViewerPage;
