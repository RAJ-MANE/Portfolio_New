"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import styles from "./ZigzagTimeline.module.css";

interface TimelineItem {
  role: string;
  company: string;
  period: string;
  logo: string;
  color: string;
  badgeColor: string;
  points: string[];
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    role: "Student Member",
    company: "ISTE TCET",
    period: "Jun 2024 - Present",
    logo: "/iste logo.jpeg",
    color: "var(--accent-warning)",
    badgeColor: "var(--accent-primary)",
    points: [
      "Engaged in technical workshops, networking, and peer-to-peer technical mentorship inside TCET.",
      "Collaborated on campus-wide technology initiatives and hackathons organized under the ISTE student chapter.",
    ],
  },
  {
    role: "Cyber Security Intern",
    company: "Cyber Peace Foundation",
    period: "Nov 2024 - Dec 2024",
    logo: "/cyber peace logo.jpeg",
    color: "var(--accent-pink)",
    badgeColor: "var(--accent-tertiary)",
    points: [
      "Conducted research on cybersecurity frameworks, digital trust, and online safety principles.",
      "Assisted in threat intelligence analysis and digital safety awareness campaigns.",
    ],
  },
  {
    role: "Technical Head",
    company: "Axios EDIC TCET E-CELL",
    period: "Jun 2025 - Jun 2026",
    logo: "/edic e cell logo.jpeg",
    color: "var(--accent-secondary)",
    badgeColor: "var(--accent-pink)",
    points: [
      "Led full-stack web development operations, overseeing AXIOS cell websites and digital portals.",
      "Managed tech team workflows, establishing architecture guidelines, code reviews, and hosting deployments.",
    ],
  },
  {
    role: "Tech Intern",
    company: "Dilatio & Co.",
    period: "Jan 2026 - Apr 2026",
    logo: "/dilatio logo.jpeg",
    color: "var(--accent-primary)",
    badgeColor: "var(--accent-warning)",
    points: [
      "Developed and automated business workflows using n8n, integrating APIs for dynamic content scheduling.",
      "Assisted in deploying custom AI automation models and web-based business management tools.",
    ],
  },
];

export default function ZigzagTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start drawing when the top of the container reaches 75% of screen height
    // Complete drawing when the bottom of the container reaches 65% of screen height
    // This ensures the line reaches 100% (Dilatio) before leaving the screen.
    offset: ["start 75%", "end 65%"],
  });

  // Apply smooth spring physics to scroll scale
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Map the spring-smoothed scaleY value (0 to 1) to absolute position and rotation of the sliding pointer
  const pointerY = useTransform(scaleY, [0, 1], ["0%", "100%"]);
  const pointerRotate = useTransform(scaleY, [0, 1], [0, 720]);

  return (
    <section className="section" id="experience" ref={containerRef}>
      <div className="section-header">
        <span className="section-number">02</span>
        <h2 className="section-title">EXPERIENCE</h2>
      </div>

      <div className={styles.timelineContainer}>
        {/* Central Neubrutalist Backbone Line - Background Slot */}
        <div className={styles.centerLineBackground} />

        {/* Central Neubrutalist Backbone Line - Growing Progress (GPU Accelerated) */}
        <motion.div
          className={styles.centerLineProgress}
          style={{ scaleY, transformOrigin: "top" }}
        />

        {/* Dynamic Sliding Neubrutalist Pointer (Lightning Bolt ⚡) */}
        <motion.div
          className={styles.timelinePointer}
          style={{ 
            top: pointerY, 
            rotate: pointerRotate,
            x: "-50%",
            y: "-50%"
          }}
        >
          ⚡
        </motion.div>

        {/* Milestone Rows */}
        <div className={styles.timelineList}>
          {TIMELINE_DATA.map((item, idx) => {
            const isCardLeft = idx % 2 === 0;
            
            return (
              <div
                key={item.role + item.company}
                className={`${styles.timelineRow} ${
                  isCardLeft ? styles.timelineRowLeft : styles.timelineRowRight
                }`}
              >
                {/* Horizontal link line (connecting card and logo) */}
                <div className={styles.horizontalLinkLine} />

                {isCardLeft ? (
                  <>
                    {/* Card on Left */}
                    <motion.div
                      className={styles.cardCol}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    >
                      <div
                        className="nb-card"
                        style={{
                          padding: "24px",
                          borderTop: `8px solid ${item.color}`,
                          zIndex: 2,
                        }}
                      >
                        <div className={styles.cardHeader}>
                          <span
                            className="nb-label"
                            style={{ backgroundColor: item.badgeColor }}
                          >
                            {item.period}
                          </span>
                          <h3 className={styles.roleTitle}>{item.role}</h3>
                          <h4 className={styles.companyTitle}>{item.company}</h4>
                        </div>
                        <ul className={styles.pointsList}>
                          {item.points.map((pt, pIdx) => (
                            <li key={pIdx} className={styles.pointItem}>
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    {/* Logo on Right */}
                    <motion.div
                      className={styles.logoCol}
                      initial={{ opacity: 0, scale: 0.7, rotate: 6 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
                    >
                      <div className={styles.logoFrame}>
                        <Image
                          src={item.logo}
                          alt={`${item.company} Logo`}
                          width={130}
                          height={130}
                          className={styles.logoImage}
                        />
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <>
                    {/* Logo on Left */}
                    <motion.div
                      className={styles.logoCol}
                      initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
                    >
                      <div className={styles.logoFrame}>
                        <Image
                          src={item.logo}
                          alt={`${item.company} Logo`}
                          width={130}
                          height={130}
                          className={styles.logoImage}
                        />
                      </div>
                    </motion.div>

                    {/* Card on Right */}
                    <motion.div
                      className={styles.cardCol}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    >
                      <div
                        className="nb-card"
                        style={{
                          padding: "24px",
                          borderTop: `8px solid ${item.color}`,
                          zIndex: 2,
                        }}
                      >
                        <div className={styles.cardHeader}>
                          <span
                            className="nb-label"
                            style={{ backgroundColor: item.badgeColor }}
                          >
                            {item.period}
                          </span>
                          <h3 className={styles.roleTitle}>{item.role}</h3>
                          <h4 className={styles.companyTitle}>{item.company}</h4>
                        </div>
                        <ul className={styles.pointsList}>
                          {item.points.map((pt, pIdx) => (
                            <li key={pIdx} className={styles.pointItem}>
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Connector center dot */}
                <motion.div
                  className={styles.timelineConnector}
                  initial={{ scale: 0, rotate: -45, x: "-50%", y: "-50%" }}
                  whileInView={{ scale: 1, rotate: 0, x: "-50%", y: "-50%" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.15 }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
