import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

export const CricketAtmosphericBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle atmospheric dust / golden turf particles
    const particleCount = 40;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.35 - 0.05,
      opacity: Math.random() * 0.5 + 0.1,
      fadeSpeed: (Math.random() * 0.005) + 0.002,
      fadingIn: Math.random() > 0.5
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle drifting particles
      particles.forEach((p) => {
        // Update opacity
        if (p.fadingIn) {
          p.opacity += p.fadeSpeed;
          if (p.opacity >= 0.6) p.fadingIn = false;
        } else {
          p.opacity -= p.fadeSpeed;
          if (p.opacity <= 0.1) p.fadingIn = true;
        }

        p.x += p.speedX + normalizedX * 0.15;
        p.y += p.speedY + normalizedY * 0.15;

        // Wrap around
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 190, 110, ${p.opacity * 0.7})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(230, 190, 110, 0.4)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [normalizedX, normalizedY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic ambient mouse follow glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 transition-transform duration-700 ease-out bg-radial from-amber-500/30 via-emerald-500/10 to-transparent"
        style={{
          transform: `translate(calc(50vw + ${normalizedX * 240}px - 300px), calc(40vh + ${normalizedY * 200}px - 300px))`
        }}
      />

      {/* Atmospheric floodlight subtle cone */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gradient-to-b from-white/[0.03] via-amber-400/[0.015] to-transparent blur-3xl" />

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};
