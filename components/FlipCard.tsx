"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineRefresh } from "react-icons/hi";
import styles from "./FlipCard.module.css";

interface FlipCardProps {
  title: string;
  org: string;
  type: string;
  desc: string;
  color: string;
  lightText?: boolean;
  certImage?: string;
}

export default function FlipCard({
  title,
  org,
  type,
  desc,
  color,
  lightText = false,
  certImage,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleViewFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card from flipping back
    if (certImage) {
      window.open(certImage, "_blank");
    }
  };

  return (
    <div
      className={styles.cardContainer}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`Flip card to see details of ${title}`}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ""}`}>
        {/* Front Side */}
        <div
          className={styles.cardFront}
          style={{
            backgroundColor: color,
            color: lightText ? "var(--text-inverse)" : "var(--text-primary)",
          }}
        >
          <div>
            <div className={styles.topInfo} style={{ borderColor: lightText ? "rgba(255,255,255,0.25)" : "rgba(42,42,40,0.25)" }}>
              <span className={styles.badgeLabel} style={{ backgroundColor: lightText ? "rgba(255,255,255,0.15)" : "var(--bg-card)", color: lightText ? "var(--text-inverse)" : "var(--text-primary)", borderColor: lightText ? "var(--text-inverse)" : "var(--border)" }}>{type}</span>
              <span className={styles.orgText}>{org}</span>
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDesc} style={{ color: lightText ? "rgba(255, 255, 255, 0.82)" : "rgba(42, 42, 40, 0.85)" }}>
              {desc}
            </p>
          </div>
          
          <div className={styles.flipHint}>
            <HiOutlineRefresh size={12} />
            <span>Click to Flip</span>
          </div>
        </div>

        {/* Back Side */}
        <div className={styles.cardBack}>
          {certImage ? (
            <div className={styles.imageWrapper}>
              <Image
                src={certImage}
                alt={`${title} Certificate`}
                fill
                className={styles.certImage}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <button className={styles.viewBtn} onClick={handleViewFullscreen}>
                Fullscreen ↗
              </button>
            </div>
          ) : (
            <div
              className={styles.imageWrapper}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-inverse)",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#2a2a28",
              }}
            >
              <span style={{ fontSize: "2rem", marginBottom: "8px" }}>🎓</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.95rem" }}>
                {title}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent-warning)", marginTop: "4px" }}>
                {org}
              </span>
              <span style={{ fontSize: "0.75rem", opacity: 0.7, marginTop: "12px" }}>
                Verified Academic Credential
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
