import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  rotation: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
  rotationSpeed: number;
  size: number;
}

export const Confetti: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  const colors = [
    "#22c55e", // green-500
    "#10b981", // emerald-500
    "#14b8a6", // teal-500
    "#06b6d4", // cyan-500
    "#ffffff", // white
  ];

  const createParticles = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const particles: Particle[] = [];

    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 8 + 6;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 15,
          y: (Math.random() - 0.5) * 15 - 3,
        },
        rotationSpeed: (Math.random() - 0.5) * 4,
        size,
      });
    }

    particlesRef.current = particles;
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate((particle.rotation * Math.PI) / 180);
    ctx.fillStyle = particle.color;
    ctx.fillRect(
      -particle.size / 2,
      -particle.size / 2,
      particle.size,
      particle.size
    );
    ctx.restore();
  };

  const animate = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
      particle.velocity.y += 0.2; // gravity
      particle.rotation += particle.rotationSpeed;

      // Only keep particles that are within bounds
      return (
        particle.y < canvas.height + 100 &&
        particle.x > -100 &&
        particle.x < canvas.width + 100
      );
    });

    particlesRef.current.forEach((particle) => drawParticle(ctx, particle));

    if (particlesRef.current.length > 0) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (trigger) {
      createParticles();
      animate();
    }
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ opacity: 0.8 }}
    />
  );
};
