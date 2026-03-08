import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import GalaxyMap from "@/components/GalaxyMap";
import HoloPanel from "@/components/HoloPanel";

const GalaxyMapPage = () => {
  return (
    <PageLayout>
      <section className="relative min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
            <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Interactive 3D</span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mt-4 text-foreground">
              Galaxy <span className="text-primary text-glow-star">Map</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Explore our solar system in 3D. Drag to rotate, scroll to zoom, click planets to learn more.
            </p>
          </motion.div>

          {/* Embedded Stellarium viewer */}
          <HoloPanel className="mb-12">
            <h3 className="font-orbitron text-xs font-bold text-foreground mb-4 tracking-wider text-center">
              STELLARIUM SKY VIEWER
            </h3>
            <div className="rounded-lg overflow-hidden border border-border/20" style={{ height: "450px" }}>
              <iframe
                src="https://stellarium-web.org/"
                className="w-full h-full"
                title="Stellarium Web Viewer"
                allow="fullscreen"
                style={{ border: "none" }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground font-mono text-center mt-3">
              Powered by Stellarium Web — Explore constellations, planets, galaxies, and star clusters
            </p>
          </HoloPanel>

          {/* 3D Galaxy Map */}
          <GalaxyMap />
        </div>
      </section>
    </PageLayout>
  );
};

export default GalaxyMapPage;
