"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Image from "next/image";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`} id="navbar">
        <div className={styles.inner}>
          <a href="#" className={styles.logo}>
            <div className={styles.logoFrame}>
              <Image
                src="/logo.jpeg"
                alt="Raj Mane Logo"
                width={48}
                height={48}
                className={styles.logoImage}
              />
            </div>
            <span className={styles.logoText}>Raj Mane</span>
          </a>

          <ul className={styles.links}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a
              href="https://github.com/RAJ-MANE"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/raj-mane-268a95371/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="https://leetcode.com/u/Raj-Mane/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="LeetCode"
            >
              <SiLeetcode size={18} />
            </a>
            <a href="#contact" className={`nb-button ${styles.ctaButton}`}>
              <FaEnvelope size={16} />
              Contact
            </a>
          </div>

          <button
            className={styles.menuToggle}
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <HiMenuAlt3 size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className={styles.drawer}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <HiX size={28} />
              </button>

              <ul className={styles.drawerLinks}>
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <a
                      href={link.href}
                      className={styles.drawerLink}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className={styles.drawerSocials}>
                <a href="https://github.com/RAJ-MANE" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                  <FaGithub size={22} />
                </a>
                <a href="https://www.linkedin.com/in/raj-mane-268a95371/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                  <FaLinkedinIn size={22} />
                </a>
                <a href="https://leetcode.com/u/Raj-Mane/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LeetCode">
                  <SiLeetcode size={22} />
                </a>
                <a href="mailto:rmane9313@gmail.com" className={styles.socialIcon}>
                  <FaEnvelope size={22} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
