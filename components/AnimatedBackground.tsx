"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import styles from "./AnimatedBackground.module.css";

// Interface for floating shapes
interface FloatingShape {
  id: number;
  type: "circle" | "square" | "cross" | "star" | "tag" | "bracket";
  content?: string;
  x: string; // Percentage value (e.g. "15%")
  y: string; // Percentage value
  size: number;
  color: string;
  depth: number; // For parallax effect (-1.5 to 1.5)
  rotateDir: number; // 1 or -1
  duration: number; // Animation duration in seconds
  delay: number; // Animation delay
}

const SHAPES_DATA: FloatingShape[] = [
  { id: 1, type: "cross", x: "12%", y: "15%", size: 30, color: "var(--accent-primary)", depth: 0.8, rotateDir: 1, duration: 25, delay: 0 },
  { id: 2, type: "bracket", content: "{ }", x: "85%", y: "10%", size: 38, color: "var(--accent-secondary)", depth: -1.2, rotateDir: -1, duration: 18, delay: 1 },
  { id: 3, type: "circle", x: "78%", y: "28%", size: 50, color: "var(--accent-warning)", depth: 0.6, rotateDir: 1, duration: 30, delay: 3 },
  { id: 4, type: "star", x: "8%", y: "45%", size: 42, color: "var(--accent-pink)", depth: 1.4, rotateDir: -1, duration: 22, delay: 0.5 },
  { id: 5, type: "tag", content: "</>", x: "88%", y: "52%", size: 36, color: "var(--accent-primary)", depth: -0.8, rotateDir: 1, duration: 20, delay: 2 },
  { id: 6, type: "square", x: "20%", y: "75%", size: 45, color: "var(--accent-tertiary)", depth: -1.0, rotateDir: -1, duration: 28, delay: 1.5 },
  { id: 7, type: "cross", x: "75%", y: "82%", size: 34, color: "var(--accent-pink)", depth: 0.9, rotateDir: 1, duration: 24, delay: 0.8 },
  { id: 8, type: "star", x: "48%", y: "12%", size: 32, color: "var(--accent-warning)", depth: 0.5, rotateDir: 1, duration: 32, delay: 4 },
  { id: 9, type: "bracket", content: "[ ]", x: "52%", y: "85%", size: 40, color: "var(--accent-secondary)", depth: -0.7, rotateDir: -1, duration: 26, delay: 2.2 },
  { id: 10, type: "circle", x: "32%", y: "42%", size: 24, color: "var(--accent-primary)", depth: 1.1, rotateDir: -1, duration: 16, delay: 0.2 },
  { id: 11, type: "star", x: "65%", y: "60%", size: 36, color: "var(--accent-tertiary)", depth: 1.2, rotateDir: 1, duration: 23, delay: 1.2 },
];

// Sub-component to satisfy React's Rules of Hooks
function FloatingShapeComponent({
  shape,
  smoothMouseX,
  smoothMouseY,
}: {
  shape: FloatingShape;
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
}) {
  const parallaxX = useTransform(smoothMouseX, (val) => val * shape.depth * 100);
  const parallaxY = useTransform(smoothMouseY, (val) => val * shape.depth * 100);

  return (
    <motion.div
      className={`${styles.shape} ${
        shape.type === "circle" || shape.type === "square" ? styles.solidCard : ""
      }`}
      style={{
        left: shape.x,
        top: shape.y,
        width: shape.size,
        height: shape.size,
        x: parallaxX,
        y: parallaxY,
        fontSize: shape.size * 0.7,
        backgroundColor: shape.type === "circle" || shape.type === "square" ? shape.color : "transparent",
        borderRadius: shape.type === "circle" ? "50%" : "0px",
        borderColor: "var(--border)",
      }}
      animate={{
        rotate: [0, 360 * shape.rotateDir],
        y: [0, -15, 15, 0]
      }}
      transition={{
        rotate: {
          duration: shape.duration,
          repeat: Infinity,
          ease: "linear",
        },
        y: {
          duration: shape.duration * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        },
        delay: shape.delay,
      }}
    >
      {shape.type === "cross" && (
        <svg className={styles.svgShape} width="100%" height="100%" viewBox="0 0 24 24">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      )}

      {shape.type === "star" && (
        <svg className={styles.svgShape} width="100%" height="100%" viewBox="0 0 24 24">
          <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
        </svg>
      )}

      {(shape.type === "bracket" || shape.type === "tag") && (
        <span style={{ color: shape.color }}>{shape.content}</span>
      )}
    </motion.div>
  );
}

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  // Mouse positions represented by Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring settings for ultra-smooth responsiveness
  const springConfig = { damping: 40, stiffness: 150, mass: 1.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse positions to range [-0.5, 0.5]
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      {/* Drifting Grid Overlay */}
      <motion.div 
        className={styles.gridOverlay}
        animate={{
          x: [0, -30, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating Interactive Shapes */}
      {SHAPES_DATA.map((shape) => (
        <FloatingShapeComponent
          key={shape.id}
          shape={shape}
          smoothMouseX={smoothMouseX}
          smoothMouseY={smoothMouseY}
        />
      ))}
    </div>
  );
}
