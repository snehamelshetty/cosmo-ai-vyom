import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const Planet = ({ position, color, size, name, onClick }: { 
  position: [number, number, number]; 
  color: string; 
  size: number; 
  name: string;
  onClick: (name: string) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={() => onClick(name)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.4 : 0.1}
      />
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size + 0.1, size + 0.15, 64]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.5 : 0.15} side={THREE.DoubleSide} />
      </mesh>
    </mesh>
  );
};

const OrbitRing = ({ radius }: { radius: number }) => (
  <mesh rotation={[Math.PI / 2, 0, 0]}>
    <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
    <meshBasicMaterial color="#4466aa" transparent opacity={0.08} side={THREE.DoubleSide} />
  </mesh>
);

const GalaxyParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(8000 * 3);
    const col = new Float32Array(8000 * 3);

    for (let i = 0; i < 8000; i++) {
      const angle = Math.random() * Math.PI * 2;
      const armOffset = Math.floor(Math.random() * 4) * (Math.PI / 2);
      const dist = Math.random() * 15 + 1;
      const spiralAngle = angle + armOffset + dist * 0.3;

      const spread = (Math.random() - 0.5) * 2 * (dist * 0.15);

      pos[i * 3] = Math.cos(spiralAngle) * dist + spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 2] = Math.sin(spiralAngle) * dist + spread;

      const brightness = 0.5 + Math.random() * 0.5;
      const hue = Math.random();
      col[i * 3] = hue < 0.5 ? 0.6 * brightness : 0.9 * brightness;
      col[i * 3 + 1] = 0.6 * brightness;
      col[i * 3 + 2] = hue > 0.5 ? 0.8 * brightness : 1.0 * brightness;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

const planetData = [
  { name: "Mercury", position: [3, 0, 0] as [number, number, number], color: "#aaaaaa", size: 0.2, info: "Closest to the Sun. Extreme temperature variations." },
  { name: "Venus", position: [4.5, 0.2, 1] as [number, number, number], color: "#ddaa55", size: 0.35, info: "Earth's twin. Dense atmosphere with sulfuric acid clouds." },
  { name: "Earth", position: [6, -0.1, -0.5] as [number, number, number], color: "#3366cc", size: 0.4, info: "Our home. The only known planet with life." },
  { name: "Mars", position: [8, 0.1, 1.5] as [number, number, number], color: "#cc4422", size: 0.3, info: "The Red Planet. Target for human colonization." },
  { name: "Jupiter", position: [11, -0.3, -1] as [number, number, number], color: "#cc8844", size: 0.8, info: "Gas giant. Has 95 known moons including Europa." },
  { name: "Saturn", position: [14, 0.2, 0.5] as [number, number, number], color: "#ddcc88", size: 0.7, info: "Famous for its ring system. Least dense planet." },
];

const GalaxyMap = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const selectedInfo = planetData.find(p => p.name === selectedPlanet);

  return (
    <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase">Interactive</span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-4 text-foreground">
            3D Galaxy <span className="text-primary text-glow-star">Map</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-sm">
            Drag to rotate · Scroll to zoom · Click planets to explore
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden border border-border/20 glow-star"
          style={{ height: "500px" }}
        >
          <Canvas camera={{ position: [0, 8, 18], fov: 55 }}>
            <ambientLight intensity={0.15} />
            <pointLight position={[0, 0, 0]} intensity={2} color="#ffdd88" />

            {/* Sun */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshBasicMaterial color="#ffcc44" />
            </mesh>
            <pointLight position={[0, 0, 0]} intensity={3} color="#ffaa33" distance={30} />

            {/* Orbit rings */}
            {[3, 4.5, 6, 8, 11, 14].map((r) => (
              <OrbitRing key={r} radius={r} />
            ))}

            {/* Planets */}
            {planetData.map((p) => (
              <Planet key={p.name} {...p} onClick={setSelectedPlanet} />
            ))}

            {/* Galaxy background particles */}
            <GalaxyParticles />

            <Stars radius={50} depth={60} count={3000} factor={3} saturation={0.2} fade speed={0.5} />
            <OrbitControls
              enablePan={false}
              minDistance={5}
              maxDistance={35}
              autoRotate
              autoRotateSpeed={0.3}
            />
          </Canvas>

          {/* Planet info overlay */}
          {selectedInfo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 holo-panel rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-orbitron text-sm font-bold text-primary">{selectedInfo.name}</h3>
                <button onClick={() => setSelectedPlanet(null)} className="text-muted-foreground text-xs hover:text-foreground">✕</button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{selectedInfo.info}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GalaxyMap;
