"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./PixelBackground.module.css";

/* -----------------------------------------------------------------------------
 * CANVAS STAGGERED PHYSICS ENGINE (Neubrutalist Style)
 * Calibrated outward expansion ripple: extremely smooth, slightly relaxed,
 * fully responsive, and visually cohesive with the neubrutalist design system.
 * -------------------------------------------------------------------------- */

type Pixel = {
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isReverse: boolean;
  isShimmer: boolean;
  appear: () => void;
  shimmer: () => void;
};

// Vibrant but subtle Neubrutalist color palette with solid visibility
const NEUBRUTALIST_COLORS = [
  "rgba(224, 104, 80, 0.38)",   // accent-primary
  "rgba(74, 107, 93, 0.38)",    // accent-secondary
  "rgba(220, 161, 82, 0.38)",   // accent-tertiary
  "rgba(229, 169, 59, 0.38)",   // accent-warning
  "rgba(176, 91, 104, 0.38)",   // accent-pink
  "rgba(42, 42, 40, 0.18)",     // muted border color
];

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  baseSpeed: number,
  delay: number,
  mousePos: { current: { x: number; y: number } }
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;
  const maxSize = rand(5.5, 9.5); // Neubrutalist pixel block sizes (5.5px to 9.5px)

  const p: Pixel = {
    x, y, color, ctx,
    speed: rand(0.06, 0.3) * baseSpeed,
    size: 0,
    sizeStep: rand(0.12, 0.28),
    minSize: 1.2,
    maxSize,
    delay,
    counter: 0,
    counterStep: rand(1.8, 3.5) + (canvas.width + canvas.height) * 0.005,
    isReverse: false,
    isShimmer: false,
    appear() {
      if (p.counter <= p.delay) {
        p.counter += p.counterStep;
        return;
      }
      if (p.size >= p.maxSize) p.isShimmer = true;
      if (p.isShimmer) p.shimmer();
      else p.size += p.sizeStep;

      // Proximity scaling near the cursor
      let finalSize = p.size;
      let finalAlpha = 1.0;

      const mouse = mousePos.current;
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const distSq = dx * dx + dy * dy;

      const radius = 180; // Distance of mouse influence
      const radiusSq = radius * radius;
      if (distSq < radiusSq) {
        const dist = Math.sqrt(distSq);
        const factor = 1.0 - dist / radius; // 1 at cursor, 0 at boundary
        finalSize = p.size * (1.0 + 1.25 * factor); // Scale size up to 2.25x
        finalAlpha = 1.0 + 1.8 * factor; // Increase opacity up to 2.8x
      }

      ctx.save();
      ctx.globalAlpha = Math.min(finalAlpha, 2.8);
      const offset = maxSize * 0.5 - finalSize * 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x + offset, p.y + offset, finalSize, finalSize);
      ctx.restore();
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.minSize) p.isReverse = false;
      if (p.isReverse) p.size -= p.speed;
      else p.size += p.speed;
    },
  };

  return p;
}

export default function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(performance.now());
  const [mounted, setMounted] = useState(false);

  // Reference for tracking mouse coordinates across viewport
  const mousePos = useRef({ x: -1000, y: -1000 });

  // Calibrated layout settings for a subtle, high-performance background texture
  const gap = 48; // Bigger pixel cell grid spacing
  const speed = 25; // Growth speed coefficient

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fit canvas exactly to the screen viewport
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const effectiveSpeed = Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];

    // Map screen coordinate grid space
    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = NEUBRUTALIST_COLORS[Math.floor(Math.random() * NEUBRUTALIST_COLORS.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        // Circular wave delay mapping from center coordinates outwards
        const delay = Math.sqrt(dx * dx + dy * dy) * 0.22;
        pixels.push(createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay, mousePos));
      }
    }

    pixelsRef.current = pixels;
  }, [gap, speed]);

  const animate = useCallback(() => {
    cancelAnimationFrame(animationRef.current);
    const frameInterval = 1000 / 60; // 60 FPS lock

    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);

      const now = performance.now();
      const elapsed = now - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = now - (elapsed % frameInterval);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pixels = pixelsRef.current;
      for (const pixel of pixels) {
        pixel.appear();
      }
    };

    animationRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    // Resolve mount state to get valid canvas refs on client side
    if (!mounted) {
      setMounted(true);
      return;
    }

    init();

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [mounted, init, animate]);

  if (!mounted) return null;

  return (
    <div ref={wrapRef} className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
