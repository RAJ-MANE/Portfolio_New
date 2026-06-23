"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  const [isManualScanning, setIsManualScanning] = useState(false);
  const [isHoverScanning, setIsHoverScanning] = useState(false);

  const isScanning = isManualScanning || isHoverScanning;

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <div className={styles.textCol}>
          <div className={styles.introBadge}>
            <span className="nb-label" style={{ transform: "rotate(-1.5deg)" }}>
              🤖 Computer Vision & AI Dev
            </span>
          </div>

          <h1 className={styles.title}>
            <span className={styles.outlineText}>RAJ</span>
            <br />
            <span className={styles.solidText}>MANE</span>
          </h1>

          <p className={styles.tagline}>
            Effective engineering student excelling in <strong>Artificial Intelligence</strong>, <strong>Computer Vision</strong>, and <strong>Full-Stack development</strong>. Winner of multiple national hackathons, inspired by space tech and robotics.
          </p>

          <div className={styles.actions}>
            <a href="#projects" className="nb-button">
              View Work
              <FaArrowRight size={14} />
            </a>
            <a
              href="/Raj_Mane_Resume_v2.pdf"
              download="Raj_Mane_Resume_v2.pdf"
              className="nb-button nb-button--outline"
            >
              Resume
              <FaDownload size={14} />
            </a>
          </div>

          {/* Floating Sticker Badges on Desktop */}
          <div className={styles.desktopStickers}>
            <motion.div
              className={styles.sticker}
              style={{ "--rot": "-4deg", top: "10%", left: "-10%" } as any}
              animate={{ rotate: [-4, -2, -6, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="nb-label" style={{ backgroundColor: "var(--accent-warning)" }}>
                🎯 CGPA 9.88/10
              </span>
            </motion.div>

            <motion.div
              className={styles.sticker}
              style={{ "--rot": "3deg", bottom: "10%", left: "40%" } as any}
              animate={{ rotate: [3, 5, 1, 3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="nb-label" style={{ backgroundColor: "var(--accent-pink)" }}>
                🏆 3x Hackathon Winner
              </span>
            </motion.div>
          </div>
        </div>

        <div className={styles.imageCol}>
          <div className={styles.imageStack}>
            <div className={styles.backgroundOffsetCard} />
            <div 
              className={styles.imageCard}
              onMouseEnter={() => setIsHoverScanning(true)}
              onMouseLeave={() => setIsHoverScanning(false)}
            >
              <div className={styles.windowHeader}>
                <div className={styles.windowHeaderLeft}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.windowTitle}>raj_mane.png</span>
                </div>
                <button
                  type="button"
                  className={`${styles.scanToggleBtn} ${isScanning ? styles.scanActive : ""}`}
                  onClick={() => setIsManualScanning(!isManualScanning)}
                  title="Toggle AI Vision Scanner"
                >
                  <span className={`${styles.pulseIndicator} ${isScanning ? styles.pulseActive : ""}`} />
                  {isScanning ? "AI SCAN: ON" : "AI SCAN: OFF"}
                </button>
              </div>
              <div className={styles.imageWrapper}>
                <Image
                  src="/raj_hero.png"
                  alt="Raj Mane illustration representation"
                  fill
                  className={styles.heroImage}
                  priority
                />
                
                {isScanning && (
                  <>
                    {/* CRT Grid scanlines overlay */}
                    <div className={styles.gridOverlay} />
                    
                    {/* Moving laser scan line */}
                    <div className={styles.scanLine} />

                    {/* Face detection */}
                    <motion.div 
                      className={`${styles.boundingBox} ${styles.boxFace}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                    >
                      <span className={styles.boxLabel}>person: Raj Mane [99.9%]</span>
                    </motion.div>

                    {/* Glasses detection */}
                    <motion.div 
                      className={`${styles.boundingBox} ${styles.boxGlasses}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <span className={styles.boxLabel}>glasses: detected</span>
                    </motion.div>

                    {/* Syntax/Code decoration detection */}
                    <motion.div 
                      className={`${styles.boundingBox} ${styles.boxCode}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.35 }}
                    >
                      <span className={styles.boxLabel}>syntax: code</span>
                    </motion.div>

                    {/* Cloud shape detection */}
                    <motion.div 
                      className={`${styles.boundingBox} ${styles.boxCloud}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <span className={styles.boxLabel}>env: cloud_computing</span>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
            {/* Embedded sticker on image card */}
            <div className={styles.imageBadge}>
              <span className="nb-label" style={{ backgroundColor: "var(--accent-tertiary)", transform: "rotate(6deg)" }}>
                🚀 TCET Mumbai
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
