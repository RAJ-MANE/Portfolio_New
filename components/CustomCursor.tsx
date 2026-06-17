"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Buttery smooth spring positioning for the custom cursor
  const cursorX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.2 });
  const cursorY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.2 });

  useEffect(() => {
    // Check if the device is a touch screen (no cursor)
    const checkTouchDevice = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(isTouch);
    };

    checkTouchDevice();

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (target && target.closest("input:not([type='submit']):not([type='button']), textarea")) {
        setIsVisible(false);
      } else {
        if (!isVisible) setIsVisible(true);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest("input:not([type='submit']):not([type='button']), textarea")) {
        setIsVisible(false);
        return;
      }
      if (
        target &&
        target.closest("a, button, select, [role='button'], input[type='submit'], input[type='button'], .clickable")
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        target.closest("a, button, select, [role='button'], input[type='submit'], input[type='button'], .clickable")
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mouseX, mouseY, isVisible]);

  // Render nothing on mobile/tablets or if cursor is out of bounds
  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      className={styles.cursor}
      style={{
        left: cursorX,
        top: cursorY,
      }}
      animate={{
        scale: isHovered ? 1.2 : 1.0,
        rotate: isHovered ? -8 : 0, // Dynamic tilt on hover
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 25,
      }}
    >
      <svg
        width="38"
        height="38"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        {/* Solid Neubrutalist Drop Shadow (Solid Black Offset) */}
        <path
          d="M4,4 L4,25 L10.5,18.5 L15.5,30 L19.5,28 L14.5,17 L22,17 Z"
          fill="var(--border)"
        />

        {/* Foreground Colored Arrow with Thick Border */}
        <motion.path
          d="M1,1 L1,22 L7.5,15.5 L12.5,27 L16.5,25 L11.5,14 L19,14 Z"
          animate={{
            fill: isHovered ? "var(--accent-pink)" : "var(--accent-warning)",
          }}
          transition={{ duration: 0.15 }}
          stroke="var(--border)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
