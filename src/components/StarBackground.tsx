import React, { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  originalX: number;
  originalY: number;
  velocityX: number;
  velocityY: number;
  hue: number;
  angle: number;
  speed: number;
}

export const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef<number>(0);

  // Watch for theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.target === document.documentElement &&
          mutation.attributeName === "class"
        ) {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const stars: Star[] = [];
      const densityFactor = isDarkMode ? 5000 : 4000; // Less density in dark mode
      const numStars = Math.floor(
        (window.innerWidth * window.innerHeight) / densityFactor
      );

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 0.7 + 0.3, // Smaller stars (was 1.0 + 0.5)
          opacity: Math.random() * 0.5 + 0.3, // Lower opacity (was 0.7 + 0.8)
          originalX: 0,
          originalY: 0,
          velocityX: 0,
          velocityY: 0,
          hue: Math.random() * 40 + 230,
          angle: Math.random() * Math.PI * 4,
          speed: Math.random() * 0.4 + 0.4, // Very slow autonomous movement
        });
      }

      starsRef.current = stars.map((star) => ({
        ...star,
        originalX: star.x,
        originalY: star.y,
      }));
    };

    const draw = (timestamp: number) => {
      if (!canvas || !ctx) return;

      const deltaTime = timestamp - timeRef.current;
      timeRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const stars = starsRef.current;
      const mouseX = mousePosition.x;
      const mouseY = mousePosition.y;

      // Calculate mouse movement direction and speed
      const mouseDeltaX = mouseX - lastMousePosition.current.x;
      const mouseDeltaY = mouseY - lastMousePosition.current.y;
      const mouseSpeed = Math.sqrt(
        mouseDeltaX * mouseDeltaX + mouseDeltaY * mouseDeltaY
      );

      lastMousePosition.current = { x: mouseX, y: mouseY };

      stars.forEach((star) => {
        // Gentle autonomous movement
        star.angle += 0.02; // Very slow rotation
        const autonomousX = Math.cos(star.angle) * star.speed;
        const autonomousY = Math.sin(star.angle) * star.speed;

        // Apply gentle force in the opposite direction of mouse movement
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100000; // Reduced influence radius
        const repulsionStrength = 0.3; // Reduced repulsion strength further

        if (distance < maxDistance && mouseSpeed > 0.1) {
          const influence = Math.pow(1 - distance / maxDistance, 2);
          star.velocityX -=
            (mouseDeltaX / mouseSpeed) * repulsionStrength * influence;
          star.velocityY -=
            (mouseDeltaY / mouseSpeed) * repulsionStrength * influence;
        }

        // Update position with both autonomous movement and velocity
        star.x += star.velocityX + autonomousX;
        star.y += star.velocityY + autonomousY;

        // Apply friction
        star.velocityX *= 0.95;
        star.velocityY *= 0.95;

        // Return to original position (very gently)
        const returnStrength = 0.01;
        star.velocityX += (star.originalX - star.x) * returnStrength;
        star.velocityY += (star.originalY - star.y) * returnStrength;

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

        const finalOpacity = star.opacity;

        if (isDarkMode) {
          ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity * 0.6})`; // Reduced opacity in dark mode
          // Add subtle glow effect in dark mode
          ctx.shadowColor = "rgba(255, 255, 255, 0.3)"; // Reduced glow opacity
          ctx.shadowBlur = 1; // Reduced glow size
        } else {
          ctx.fillStyle = `rgba(100, 100, 100, ${finalOpacity * 1.2})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: isDarkMode ? 0.6 : 0.8 }}
    />
  );
};
