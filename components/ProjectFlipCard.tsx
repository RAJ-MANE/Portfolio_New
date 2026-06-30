"use client";

import { useState } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";
import styles from "./ProjectFlipCard.module.css";

interface ProjectFlipCardProps {
  title: string;
  description: string;
  tags: string[];
  color: string;
  github?: string;
  demo?: string;
  image?: string;
}

export default function ProjectFlipCard({
  title,
  description,
  tags,
  color,
  github,
  demo,
  image,
}: ProjectFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card from flipping back when links are clicked
  };

  // Determine contrast for header text
  const isLightBg = color === "var(--accent-warning)";
  const textColor = isLightBg ? "var(--text-primary)" : "var(--text-inverse)";

  return (
    <div
      className={styles.cardContainer}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`Flip card to see details of project ${title}`}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ""}`}>
        {/* Front Side */}
        <div className={`nb-card ${styles.cardFront}`}>
          {/* Title bar / Browser Header */}
          <div className={styles.titlebar} style={{ backgroundColor: color }}>
            <span className={styles.dot} style={{ backgroundColor: "#FF3B30" }} />
            <span className={styles.dot} style={{ backgroundColor: "#FFCC00" }} />
            <span className={styles.dot} style={{ backgroundColor: "#00C853" }} />
            <span className={styles.filename} style={{ color: textColor }}>
              index.html
            </span>
          </div>

          <div className={styles.cardContent}>
            <div>
              <h3 className={styles.projectTitle}>{title}</h3>
              <p className={styles.projectDesc}>{description}</p>
            </div>

            <div>
              <div className={styles.tagsContainer}>
                {tags.map((tag) => (
                  <span key={tag} className="nb-pill">
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.flipHint}>
                <HiOutlineRefresh size={14} className={styles.spinIcon} />
                <span>Click to View Live Preview & Links</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className={`nb-card ${styles.cardBack}`}>
          {/* OS Window header */}
          <div className={styles.titlebar} style={{ backgroundColor: "#2A2A28" }}>
            <span className={styles.dot} style={{ backgroundColor: "#FF3B30" }} />
            <span className={styles.dot} style={{ backgroundColor: "#FFCC00" }} />
            <span className={styles.dot} style={{ backgroundColor: "#00C853" }} />
            <span className={styles.filename} style={{ color: "var(--text-inverse)" }}>
              preview.exe
            </span>
          </div>

          <div className={styles.backContent}>
            {/* Visual Preview Area */}
            <div className={styles.visualPreview}>
              {image ? (
                <div className={styles.imageWrapper}>
                  <Image
                    src={image}
                    alt={`${title} Preview`}
                    fill
                    className={styles.previewImage}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <div className={styles.mockWebsite} style={{ "--card-accent": color } as any}>
                  <div className={styles.mockHero}>
                    <div className={styles.mockLogo}>💻</div>
                    <div className={styles.mockTextBar} style={{ width: "60%" }} />
                    <div className={styles.mockTextBar} style={{ width: "40%", opacity: 0.6 }} />
                  </div>
                  <div className={styles.mockGrid}>
                    <div className={styles.mockGridItem} />
                    <div className={styles.mockGridItem} />
                    <div className={styles.mockGridItem} />
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className={styles.footerActions}>
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleActionClick}
                  className="nb-button nb-button--outline"
                  style={{ padding: "8px 14px", fontSize: "0.75rem", flex: 1 }}
                >
                  <FaGithub /> Code
                </a>
              )}
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleActionClick}
                  className="nb-button"
                  style={{
                    padding: "8px 14px",
                    fontSize: "0.75rem",
                    flex: 1,
                    backgroundColor: color,
                    color: textColor,
                  }}
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
            </div>

            <div className={styles.flipBackHint}>
              <span>Click card anywhere else to flip back</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
