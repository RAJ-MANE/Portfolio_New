"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if the device is a touch screen (no cursor)
    const checkTouchDevice = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(isTouch);
    };

    checkTouchDevice();

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;

    // Fast lerp positioning for buttery smooth mouse tracking
    const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      const target = e.target as HTMLElement;
      if (target && target.closest("input:not([type='submit']):not([type='button']), textarea")) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
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

    let animationFrameId: number;
    const updatePosition = () => {
      // Lerp positioning
      currentX = lerp(currentX, mouseX, 0.35); // Snappy 35% lerp
      currentY = lerp(currentY, mouseY, 0.35);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${isHovered ? styles.cursorHovered : ""}`}
    >
      <div className={styles.cursorInner}>
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
          <path
            className={styles.cursorArrow}
            d="M1,1 L1,22 L7.5,15.5 L12.5,27 L16.5,25 L11.5,14 L19,14 Z"
            fill={isHovered ? "var(--accent-pink)" : "var(--accent-warning)"}
            stroke="var(--border)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
