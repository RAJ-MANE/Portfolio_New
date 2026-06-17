"use client";

import { motion } from "framer-motion";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
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
              href="/RAJ_MANE_Resume.pdf"
              download="Raj_Mane_Resume.pdf"
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
            <div className={styles.imageCard}>
              <div className={styles.windowHeader}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.windowTitle}>raj_mane.png</span>
              </div>
              <div className={styles.imageWrapper}>
                <Image
                  src="/raj_hero.png"
                  alt="Raj Mane illustration representation"
                  fill
                  className={styles.heroImage}
                  priority
                />
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
