"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

interface SparklesCoreProps {
  id: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
}

export const SparklesCore = ({
  id,
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 50,
  className = "",
}: SparklesCoreProps) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [particleColor, setParticleColor] = useState("#000000");
  const [sunVisible, setSunVisible] = useState(false);
  const [moonVisible, setMoonVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setParticleColor(theme === "dark" ? "#FFFFFF" : "#000000");

    if (theme === "light") {
      setMoonVisible(false);
      setTimeout(() => setSunVisible(true), 100);
    } else if (theme === "dark") {
      setSunVisible(false);
      setTimeout(() => setMoonVisible(true), 100);
    }
  }, [theme, mounted]);

  useEffect(() => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = Math.floor(window.innerWidth / 10 * (particleDensity / 100));

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = particleColor;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const particle = new Particle();
        particle.color = particleColor;
        particles.push(particle);
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].color = particleColor;
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [id, minSize, maxSize, particleDensity, particleColor, mounted]);

  return (
    <>
      <canvas
        id={id}
        className={className}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background,
        }}
      />
      {mounted && sunVisible && (
        <div className="absolute top-20 right-10">
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            style={{
              animation: "rotateSun 10s linear infinite, pulseSun 3s ease-in-out infinite",
              filter: "drop-shadow(0 0 6px rgba(255, 204, 0, 0.8))"
            }}
          >
            <circle cx="12" cy="12" r="5" fill="#FBBF24" />
            {[...Array(8)].map((_, i) => (
              <rect
                key={i}
                x="11"
                y="1"
                width="2"
                height="4"
                fill="#F59E0B"
                transform={`rotate(${i * 45} 12 12)`}
                style={{
                  animation: `pulseRay 2s ease-in-out ${i * 0.1}s infinite alternate`
                }}
              />
            ))}
          </svg>
        </div>
      )}

      {mounted && moonVisible && (
        <div className="absolute top-20 left-10">
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            style={{
              animation: "floatMoon 6s ease-in-out infinite",
              filter: "drop-shadow(0 0 6px rgba(147, 197, 253, 0.6))"
            }}
          >
            <path
              d="M12 3a9 9 0 1 0 9 9 7.5 7.5 0 0 1-9-9z"
              fill="#93C5FD"
            />
            <circle cx="16" cy="9" r="1.5" fill="#BFDBFE" opacity="0.8" />
            <circle cx="13" cy="6" r="1" fill="#BFDBFE" opacity="0.6" />
            <circle cx="10" cy="10" r="1.2" fill="#BFDBFE" opacity="0.7" />
          </svg>
        </div>
      )}
    </>
  );
};