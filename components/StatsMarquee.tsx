"use client";

import styles from "./StatsMarquee.module.css";

const STATS_ITEMS = [
  "CGPA 9.88/10",
  "3x HACKATHON WINNER",
  "98% MODEL PRECISION",
  "ORACLE AI CERTIFIED",
  "IIT BOMBAY JAVA CERTIFIED",
  "COMPUTER VISION & AI",
  "FULL-STACK DEVELOPER",
  "MUMBAI, MH",
];

export default function StatsMarquee() {
  // Double the list to make seamless scrolling loop
  const doubledItems = [...STATS_ITEMS, ...STATS_ITEMS, ...STATS_ITEMS];

  return (
    <div className={styles.marqueeContainer}>
      <div className="marquee-track">
        {doubledItems.map((item, idx) => (
          <div key={idx} className={styles.marqueeItem}>
            <span className={styles.itemText}>{item}</span>
            <span className={styles.star}>★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
