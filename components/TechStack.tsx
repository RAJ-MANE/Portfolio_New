"use client";

import { motion } from "framer-motion";
import styles from "./TechStack.module.css";

const SKILL_CATEGORIES = [
  {
    title: "PROGRAMMING LANGUAGES",
    color: "var(--accent-warning)",
    skills: ["Python", "C", "C++", "Java", "JavaScript", "Bash"],
  },
  {
    title: "WEB & FRAMEWORKS",
    color: "var(--accent-primary)",
    skills: ["HTML", "CSS", "Flask", "TensorFlow", "OpenCV", "MediaPipe", "NumPy"],
  },
  {
    title: "DATABASES",
    color: "var(--accent-tertiary)",
    skills: ["SQL", "MySQL", "SQLite"],
  },
  {
    title: "TOOLS & PLATFORMS",
    color: "var(--accent-secondary)",
    skills: ["Docker", "Git", "SQL Workbench", "Figma", "Mockups"],
  },
  {
    title: "DOMAINS",
    color: "var(--accent-pink)",
    skills: ["Computer Vision", "AI/ML", "Web App Development", "Embedded Systems"],
  },
];

export default function TechStack() {
  return (
    <section className="section" id="skills">
      <div className="section-header">
        <span className="section-number">05</span>
        <h2 className="section-title">TECH STACK</h2>
      </div>

      <div className={styles.categoriesGrid}>
        {SKILL_CATEGORIES.map((cat, idx) => {
          const rotationAngle = idx % 2 === 0 ? "-1deg" : "1deg";
          return (
            <div
              key={cat.title}
              className={`nb-card ${styles.categoryCard}`}
              style={{ rotate: rotationAngle } as any}
            >
              <div className={styles.cardHeader} style={{ backgroundColor: cat.color }}>
                <h3 className={styles.categoryTitle}>{cat.title}</h3>
              </div>
              <div className={styles.skillsList}>
                {cat.skills.map((skill, sIdx) => {
                  const pillRotation = sIdx % 3 === 0 ? "-2.5deg" : sIdx % 3 === 1 ? "2.5deg" : "-0.5deg";
                  return (
                    <motion.span
                      key={skill}
                      className="nb-pill"
                      style={{
                        transform: `rotate(${pillRotation})`,
                        borderColor: "var(--border)",
                        backgroundColor: "var(--bg-canvas)",
                      }}
                      whileHover={{
                        scale: 1.12,
                        rotate: "0deg",
                        backgroundColor: cat.color,
                        color: cat.color === "var(--accent-primary)" || cat.color === "var(--accent-secondary)" ? "var(--text-inverse)" : "var(--text-primary)",
                        zIndex: 2,
                      }}
                    >
                      {skill}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
