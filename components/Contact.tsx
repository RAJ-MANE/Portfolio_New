"use client";

import React, { useState } from "react";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import styles from "./Contact.module.css";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Trigger the creative logo loader transition
    window.dispatchEvent(
      new CustomEvent("trigger-logo-loader", {
        detail: { active: true, message: "TRANSMITTING SIGNAL..." },
      })
    );

    setTimeout(() => {
      // Deactivate loader
      window.dispatchEvent(
        new CustomEvent("trigger-logo-loader", {
          detail: { active: false },
        })
      );
      
      setIsSent(true);
      setFormState({ name: "", email: "", message: "" });

      // Reset sent status notification after a delay
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }, 2200);
  };

  return (
    <section className="section" id="contact">
      <div className="section-header">
        <span className="section-number">06</span>
        <h2 className="section-title">CONTACT ME</h2>
      </div>

      <div className={styles.container}>
        {/* Left Column: Form Card */}
        <div className={`nb-card ${styles.formCard}`}>
          <div className={styles.cardHeader}>
            <span className={styles.dot} style={{ backgroundColor: "#FF3B30" }} />
            <span className={styles.dot} style={{ backgroundColor: "#FFCC00" }} />
            <span className={styles.dot} style={{ backgroundColor: "#00C853" }} />
            <span className={styles.windowTitle}>send_message.sh</span>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                YOUR NAME
              </label>
              <input
                type="text"
                id="name"
                className={styles.input}
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                className={styles.input}
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message" className={styles.label}>
                MESSAGE
              </label>
              <textarea
                id="message"
                rows={5}
                className={styles.input}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Let's build something awesome..."
                required
              />
            </div>

            <button type="submit" className="nb-button">
              {isSent ? "Message Sent! ✓" : "Transmit Signal"}
              <FaPaperPlane size={14} />
            </button>
          </form>
        </div>

        {/* Right Column: Direct Info */}
        <div className={styles.infoCol}>
          <div className={`nb-card ${styles.infoCard}`} style={{ backgroundColor: "var(--accent-warning)" }}>
            <h3 className={styles.infoHeading}>LET'S SYNC UP!</h3>
            <p className={styles.infoText}>
              Always open to discussing AI automation workloads, computer vision pipelines, hackathon team-ups, or full-stack web projects.
            </p>
            <div className={styles.contactDetails}>
              <p>
                <strong>📞 PHONE:</strong> +91 7715869977
              </p>
              <p>
                <strong>✉️ EMAIL:</strong> rmane9313@gmail.com
              </p>
              <p>
                <strong>📍 LOCATION:</strong> Dombivli, Maharashtra, India
              </p>
            </div>
          </div>

          <div className={styles.socialsWrapper}>
            <a
              href="https://github.com/RAJ-MANE"
              target="_blank"
              rel="noopener noreferrer"
              className={`nb-card ${styles.socialBox}`}
              style={{ backgroundColor: "var(--accent-primary)" }}
            >
              <FaGithub size={32} style={{ color: "var(--text-inverse)" }} />
              <span className={styles.socialName}>GITHUB</span>
            </a>

            <a
              href="https://www.linkedin.com/in/raj-mane-268a95371/"
              target="_blank"
              rel="noopener noreferrer"
              className={`nb-card ${styles.socialBox}`}
              style={{ backgroundColor: "var(--accent-secondary)" }}
            >
              <FaLinkedinIn size={32} style={{ color: "var(--text-inverse)" }} />
              <span className={styles.socialName}>LINKEDIN</span>
            </a>

            <a
              href="https://leetcode.com/u/Raj-Mane/"
              target="_blank"
              rel="noopener noreferrer"
              className={`nb-card ${styles.socialBox}`}
              style={{ backgroundColor: "var(--accent-tertiary)" }}
            >
              <SiLeetcode size={32} style={{ color: "var(--text-inverse)" }} />
              <span className={styles.socialName}>LEETCODE</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
