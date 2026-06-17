"use client";

import FlipCard from "./FlipCard";
import styles from "./Achievements.module.css";

const HACKATHONS_COMPETITIONS_DATA = [
  {
    title: "GenerationTech 2025",
    org: "JP Morgan Chase",
    type: "WINNER 🏆",
    desc: "National hackathon champion for developing social-good tech under corporate mentorship.",
    color: "var(--accent-warning)",
    certImage: "/jpmorgan_certi.jpeg",
  },
  {
    title: "Model Forge 2025",
    org: "ML Competition",
    type: "WINNER 🥇",
    desc: "First place in optimization, architecture design, and inference precision benchmarking.",
    color: "var(--accent-pink)",
    lightText: true,
    certImage: "/model forge certificate.jpeg",
  },
  {
    title: "NEXUS AI Challenge",
    org: "MultiModal Challenge",
    type: "WINNER 🎯",
    desc: "Top prize in MultiModal AI integration, creating modular cross-agent interfaces.",
    color: "var(--accent-tertiary)",
    certImage: "/nexus ai certificate.jpeg",
  },
];

const CERTIFICATIONS_COURSES_DATA = [
  {
    title: "AI Foundations Associate",
    org: "Oracle",
    type: "CERTIFICATION 📜",
    desc: "Official industry accreditation covering core cognitive workloads, neural logic and model design.",
    color: "var(--accent-secondary)",
    lightText: true,
    certImage: "/ai model building certificate.jpeg",
  },
  {
    title: "AI Model Building",
    org: "Technical Training",
    type: "CERTIFICATION 🤖",
    desc: "Specialized certification for end-to-end model construction, validation, and deployment pipelines.",
    color: "var(--accent-primary)",
    lightText: true,
    certImage: "/ai model building certificate.jpeg",
  },
  {
    title: "Java Training - IIT Bombay",
    org: "IIT Bombay Spoken Tutorial",
    type: "COURSE 🎓",
    desc: "Completed programming course and certification exam with a top-tier score of 80%.",
    color: "var(--accent-secondary)",
    lightText: true,
  },
];

export default function Achievements() {
  return (
    <section className="section" id="achievements">
      <div className="section-header">
        <span className="section-number">04</span>
        <h2 className="section-title">ACCOLADES & CREDENTIALS</h2>
      </div>

      <div className={styles.container}>
        {/* Section 1: Hackathons & Competitions */}
        <div className={styles.sectionBlock}>
          <div className={styles.sectionSubTitle}>
            <span>🏆</span>
            <span>Hackathons & Competitions</span>
          </div>
          <div className={styles.cardGrid}>
            {HACKATHONS_COMPETITIONS_DATA.map((ach) => (
              <FlipCard
                key={ach.title}
                title={ach.title}
                org={ach.org}
                type={ach.type}
                desc={ach.desc}
                color={ach.color}
                certImage={ach.certImage}
              />
            ))}
          </div>
        </div>

        {/* Section 2: Certifications & Courses */}
        <div className={styles.sectionBlock}>
          <div className={styles.sectionSubTitle}>
            <span>📜</span>
            <span>Certifications & Courses</span>
          </div>
          <div className={styles.cardGrid}>
            {CERTIFICATIONS_COURSES_DATA.map((ach) => (
              <FlipCard
                key={ach.title}
                title={ach.title}
                org={ach.org}
                type={ach.type}
                desc={ach.desc}
                color={ach.color}
                lightText={ach.lightText}
                certImage={ach.certImage}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
