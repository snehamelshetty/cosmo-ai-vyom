import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: [number, number, number];
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleScroll = useCallback(() => {
    scrollRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];

    const starColors: [number, number, number][] = [
      [200, 220, 255],  // blue-white
      [255, 240, 230],  // warm white
      [180, 200, 255],  // cool blue
      [255, 220, 200],  // warm
      [220, 230, 255],  // pale blue
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Create dense star field
    const totalStars = 600;
    for (let i = 0; i < totalStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() < 0.9 ? Math.random() * 1.2 + 0.3 : Math.random() * 2.5 + 1,
        baseOpacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 2 + 0.5,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    const spawnShootingStar = () => {
      const angle = Math.random() * 0.5 + 0.3;
      const speed = Math.random() * 8 + 6;
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.4 + scrollRef.current,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: Math.random() * 40 + 30,
        length: Math.random() * 60 + 40,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;
      const mx = mouseRef.current.x / window.innerWidth - 0.5;
      const my = mouseRef.current.y / window.innerHeight - 0.5;

      // Draw stars with twinkling and mouse parallax
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6;
        const opacity = star.baseOpacity * twinkle;

        // Subtle parallax based on star size (bigger = closer = more movement)
        const parallaxFactor = star.size * 1.5;
        const px = star.x + mx * parallaxFactor;
        const py = star.y + my * parallaxFactor;

        const [r, g, b] = star.color;

        // Glow for larger stars
        if (star.size > 1.5) {
          const gradient = ctx.createRadialGradient(px, py, 0, px, py, star.size * 4);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity * 0.6})`);
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${opacity * 0.1})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(px, py, star.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fill();
      });

      // Shooting stars
      if (Math.random() < 0.008) spawnShootingStar();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life++;

        const progress = ss.life / ss.maxLife;
        const fadeIn = Math.min(ss.life / 5, 1);
        const fadeOut = 1 - progress;
        const alpha = fadeIn * fadeOut * 0.9;

        const tailX = ss.x - ss.vx * (ss.length / Math.sqrt(ss.vx ** 2 + ss.vy ** 2));
        const tailY = ss.y - ss.vy * (ss.length / Math.sqrt(ss.vx ** 2 + ss.vy ** 2));

        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        gradient.addColorStop(0, `rgba(180, 200, 255, 0)`);
        gradient.addColorStop(0.7, `rgba(200, 220, 255, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        if (ss.life >= ss.maxLife) shootingStars.splice(i, 1);
      }

      // Cosmic dust particles (subtle)
      for (let i = 0; i < 8; i++) {
        const dx = Math.sin(time * 0.1 + i * 1.7) * 200 + canvas.width * 0.5;
        const dy = Math.cos(time * 0.08 + i * 2.3) * 150 + (scrollRef.current + window.innerHeight * 0.5);
        const dustAlpha = Math.sin(time * 0.3 + i) * 0.015 + 0.02;
        const gradient = ctx.createRadialGradient(dx, dy, 0, dx, dy, 150);
        gradient.addColorStop(0, `rgba(180, 160, 220, ${dustAlpha})`);
        gradient.addColorStop(1, `rgba(180, 160, 220, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(dx, dy, 150, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default StarField;
