"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import styles from "./ProjectCard.module.css";

interface ProjectProps {
  title: string;
  filename: string;
  description: string;
  tags: string[];
  color: string;
  github?: string;
  demo?: string;
  sliderLeftText?: string;
  sliderRightText?: string;
  sliderLeftBg?: string;
  sliderRightBg?: string;
  imageLeft?: string;
  imageRight?: string;
}

export default function ProjectCard({
  title,
  filename,
  description,
  tags,
  color,
  github,
  demo,
  sliderLeftText = "INPUT (RAW CAM)",
  sliderRightText = "OUTPUT (AI CV MASK)",
  sliderLeftBg = "#FFE6D5",
  sliderRightBg = "#1A1A1A",
  imageLeft,
  imageRight,
}: ProjectProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  const handleStart = () => {
    isDragging.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const isLightBg = color === "var(--accent-warning)";
  const textColor = isLightBg ? "var(--text-primary)" : "var(--text-inverse)";

  return (
    <div className={`nb-card ${styles.projectCard}`} style={{ borderColor: "var(--border)" }}>
      {/* OS Titlebar */}
      <div className={styles.titlebar} style={{ backgroundColor: color }}>
        <span className={styles.dot} style={{ backgroundColor: "#FF3B30" }} />
        <span className={styles.dot} style={{ backgroundColor: "#FFCC00" }} />
        <span className={styles.dot} style={{ backgroundColor: "#00C853" }} />
        <span className={styles.filename} style={{ color: textColor }}>{filename}</span>
      </div>

      {/* Interactive Mock Slider Area */}
      <div
        className={styles.sliderContainer}
        ref={containerRef}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        {/* Left Side (Raw / Before / Code) */}
        <div
          className={styles.sliderSide}
          style={{ backgroundColor: sliderLeftBg, color: "var(--text-primary)" }}
        >
          <div className={styles.sideLabel}>{sliderLeftText}</div>
          <div className={styles.sideContent}>
            {imageLeft ? (
              <div className={styles.imageWrapper}>
                <Image
                  src={imageLeft}
                  alt={`${title} Before`}
                  fill
                  className={styles.sliderImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : (
              <pre className={styles.codeSnippet}>
                {`import cv2\nimport mediapipe as mp\n\n# init camera pipeline\ncap = cv2.VideoCapture(0)\n\nwhile True:\n    ret, frame = cap.read()\n    # raw frame input...`}
              </pre>
            )}
          </div>
        </div>

        {/* Right Side (AI Output / Render) */}
        <div
          className={`${styles.sliderSide} ${styles.sliderRight}`}
          style={{
            clipPath: `inset(0 0 0 ${sliderPos}%)`,
            backgroundColor: sliderRightBg,
            color: "#00FF88",
          }}
        >
          <div className={styles.sideLabel} style={{ color: imageRight ? "var(--text-primary)" : "#00FF88" }}>
            {sliderRightText}
          </div>
          <div className={styles.sideContent}>
            {imageRight ? (
              <div className={styles.imageWrapper}>
                <Image
                  src={imageRight}
                  alt={`${title} After`}
                  fill
                  className={styles.sliderImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : (
              <>
                <pre className={styles.codeSnippet} style={{ color: "#00FF88" }}>
                  {`# running inference...\n[INFO] Fingertip tracked: (X:342, Y:190)\n[INFO] Gesture detected: INDEX_UP\n[ACTION] Drawing stroke at target coords\n[SUCCESS] Render matrix updated`}
                </pre>
                <div className={styles.glowTarget} style={{ left: `${sliderPos}%` }} />
              </>
            )}
          </div>
        </div>

        {/* Slider Handle */}
        <div className={styles.handle} style={{ left: `${sliderPos}%` }}>
          <div className={styles.handleBar} />
          <div className={styles.handleKnob}>
            <span>⇅</span>
          </div>
          <div className={styles.handleBar} />
        </div>
      </div>

      {/* Details Area */}
      <div className={styles.details}>
        <h3 className={styles.projectTitle}>{title}</h3>
        <p className={styles.projectDesc}>{description}</p>

        <div className={styles.tagsContainer}>
          {tags.map((tag) => (
            <span key={tag} className="nb-pill">
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.footerActions}>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="nb-button nb-button--outline"
              style={{ padding: "8px 16px", fontSize: "0.8rem" }}
            >
              <FaGithub /> Code
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="nb-button"
              style={{ padding: "8px 16px", fontSize: "0.8rem", backgroundColor: color, color: textColor }}
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
