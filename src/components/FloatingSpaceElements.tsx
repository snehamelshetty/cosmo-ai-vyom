import { motion } from "framer-motion";
import { ParallaxLayer } from "./ParallaxLayer";
import planetSaturn from "@/assets/planet-saturn.png";
import planetEarth from "@/assets/planet-earth.png";
import planetMars from "@/assets/planet-mars.png";
import spiralGalaxy from "@/assets/spiral-galaxy.png";
import astronautFloat from "@/assets/astronaut-float.png";
import rocketLaunch from "@/assets/rocket-launch.png";

const FloatingSpaceElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {/* Saturn - top right, slow parallax */}
      <ParallaxLayer speed={0.15}>
        <motion.img
          src={planetSaturn}
          alt=""
          className="absolute -top-10 -right-20 w-64 md:w-96 opacity-25"
          animate={{ rotate: [0, 5, 0], y: [0, -10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </ParallaxLayer>

      {/* Earth - mid left */}
      <ParallaxLayer speed={0.25}>
        <motion.img
          src={planetEarth}
          alt=""
          className="absolute top-[120vh] -left-16 w-48 md:w-72 opacity-20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
      </ParallaxLayer>

      {/* Mars - right side, further down */}
      <ParallaxLayer speed={0.2}>
        <motion.img
          src={planetMars}
          alt=""
          className="absolute top-[250vh] -right-10 w-36 md:w-56 opacity-20"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </ParallaxLayer>

      {/* Spiral galaxy - background accent */}
      <ParallaxLayer speed={0.08}>
        <motion.img
          src={spiralGalaxy}
          alt=""
          className="absolute top-[180vh] left-1/2 -translate-x-1/2 w-[500px] md:w-[700px] opacity-10"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        />
      </ParallaxLayer>

      {/* Astronaut floating */}
      <ParallaxLayer speed={0.35}>
        <motion.img
          src={astronautFloat}
          alt=""
          className="absolute top-[80vh] right-[5%] w-32 md:w-48 opacity-30"
          animate={{ 
            y: [0, -25, 0], 
            rotate: [0, 5, -3, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </ParallaxLayer>

      {/* Rocket ascending */}
      <ParallaxLayer speed={0.5}>
        <motion.img
          src={rocketLaunch}
          alt=""
          className="absolute top-[320vh] left-[8%] w-16 md:w-24 opacity-25"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </ParallaxLayer>
    </div>
  );
};

export default FloatingSpaceElements;
