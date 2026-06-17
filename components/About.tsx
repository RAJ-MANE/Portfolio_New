"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";

const SKILLS_LIST = [
  { name: "Computer Vision", color: "var(--accent-primary)" },
  { name: "Deep Learning", color: "var(--accent-secondary)" },
  { name: "OpenCV", color: "var(--accent-tertiary)" },
  { name: "MediaPipe", color: "var(--accent-pink)" },
  { name: "TensorFlow", color: "var(--accent-warning)" },
  { name: "Flask / API", color: "var(--accent-primary)" },
  { name: "Docker", color: "var(--accent-secondary)" },
  { name: "Embedded Systems", color: "var(--accent-tertiary)" },
  { name: "Next.js", color: "var(--accent-pink)" },
  { name: "UI/UX Figma", color: "var(--accent-warning)" },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="section-header">
        <span className="section-number">01</span>
        <h2 className="section-title">ABOUT ME</h2>
      </div>

      <div className={styles.grid}>
        <div className={`nb-card ${styles.cardLeft}`}>
          <span className="nb-label" style={{ alignSelf: "flex-start", backgroundColor: "var(--accent-secondary)", color: "var(--text-inverse)" }}>
            WHO I AM
          </span>
          <h3 className={styles.headline}>
            A High-Octane CS Student Pushing the Boundaries of AI & Computer Vision.
          </h3>
          <p className={styles.description}>
            Currently pursuing my Bachelor of Engineering in Computer Science at the prestigious <strong>Thakur College of Engineering and Technology (TCET), Mumbai</strong> with an outstanding CGPA of <strong>9.88/10</strong>.
          </p>
          <p className={styles.description}>
            My journey is fueled by national-level hackathons and a deep curiosity for space tech, robotics, and interactive interfaces. I specialize in building solutions where machine learning meets physical hardware and highly-responsive web wrappers.
          </p>
        </div>

        <div className={`nb-card ${styles.cardRight}`}>
          <span className="nb-label" style={{ alignSelf: "flex-start", backgroundColor: "var(--accent-tertiary)", color: "var(--text-primary)" }}>
            MY WEAPONS
          </span>
          <h3 className={styles.headline}>Skills & Toolkits</h3>
          
          <div className={styles.skillsWrapper}>
            {SKILLS_LIST.map((skill, index) => {
              // Alternate rotation angles for neubrutalist sticker effect
              const rot = index % 3 === 0 ? "-3deg" : index % 3 === 1 ? "3deg" : "-1deg";
              return (
                <motion.span
                  key={skill.name}
                  className="nb-pill"
                  style={{
                    backgroundColor: skill.color,
                    color: skill.color === "var(--accent-secondary)" || skill.color === "var(--accent-primary)" ? "var(--text-inverse)" : "var(--text-primary)",
                    transform: `rotate(${rot})`,
                    display: "inline-block",
                  }}
                  whileHover={{ scale: 1.1, rotate: "0deg", zIndex: 10 }}
                >
                  {skill.name}
                </motion.span>
              );
            })}
          </div>

          <div className={styles.terminalBox}>
            <div className={styles.terminalHeader}>
              <span className={styles.tDot} />
              <span className={styles.tDot} />
              <span className={styles.tDot} />
              <span className={styles.tTitle}>languages.sh</span>
            </div>
            <div className={styles.terminalBody}>
              <p><code>$ cat languages.txt</code></p>
              <p style={{ color: "var(--accent-primary)", marginTop: "4px" }}>
                <code>Python, C, C++, Java, JavaScript, Bash, SQL</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
