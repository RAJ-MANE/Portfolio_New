"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const STATUS_MESSAGES = [
  "Initializing system components...",
  "Loading Artificial Intelligence modules...",
  "Mounting Computer Vision pipelines...",
  "Verifying academic records: CGPA 9.88...",
  "Assembling hackathon project databases...",
  "Connecting to neural workspace...",
  "Establishing hyper-links...",
  "System ready! Initializing canvas..."
];

export default function BootLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Animate the progress bar and status text
  useEffect(() => {
    const duration = 2400; // total animation time in ms
    const intervalTime = 30; // update frequency
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // Auto-trigger completion shortly after 100%
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        
        // Cycle status messages based on progress checkpoints
        const msgIdx = Math.min(
          Math.floor((next / 100) * STATUS_MESSAGES.length),
          STATUS_MESSAGES.length - 1
        );
        setStatusIndex(msgIdx);
        
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(onComplete, 400);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="boot-loader"
          exit={{ 
            opacity: 0,
            scale: 1.05,
            y: "-100%"
          }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          onClick={handleSkip}
          style={{ cursor: "pointer" }}
        >
          {/* Subtle grid background to keep the developer aesthetic */}
          <div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: "radial-gradient(circle, rgba(42, 42, 40, 0.08) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              pointerEvents: "none"
            }}
          />

          <motion.div
            className="boot-card"
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              damping: 18, 
              stiffness: 120 
            }}
            onClick={(e) => e.stopPropagation()} // Prevent skip when clicking card details
          >
            {/* Window Dots to match neubrutalist style */}
            <div style={{ position: "absolute", top: "12px", left: "16px", display: "flex", gap: "6px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", border: "1.5px solid var(--border)", backgroundColor: "#E06850" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", border: "1.5px solid var(--border)", backgroundColor: "#E5A93B" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", border: "1.5px solid var(--border)", backgroundColor: "#4A6B5D" }} />
            </div>
            
            <div style={{ position: "absolute", top: "10px", right: "16px", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 700 }}>
              v1.2.0
            </div>

            {/* Logo container with elastic frame bounce */}
            <motion.div
              className="boot-logo-frame"
              animate={{ 
                rotate: [0, -1, 1, -1, 0],
                y: [0, -4, 0, -2, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/logo.jpeg"
                alt="Raj Mane"
                width={120}
                height={120}
                className="boot-logo"
                priority
              />
            </motion.div>

            <div>
              <h1 className="boot-title">RAJ MANE</h1>
              <p className="boot-subtitle">Developer Portfolio</p>
            </div>

            <div style={{ width: "100%" }}>
              {/* Neubrutalist Progress Bar */}
              <div className="boot-progress-container">
                <div 
                  className="boot-progress-bar" 
                  style={{ width: `${progress}%`, transition: "width 0.05s ease-out" }}
                />
                <span className="boot-progress-text">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Loading text status indicator */}
            <div className="boot-status">
              <AnimatePresence mode="wait">
                <motion.div
                  key={statusIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  &gt; {STATUS_MESSAGES[statusIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Skip Instruction */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.8 }}
            style={{
              position: "absolute",
              bottom: "40px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            click anywhere to bypass
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
