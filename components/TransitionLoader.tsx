"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./TransitionLoader.module.css";

interface TransitionLoaderProps {
  isLoading: boolean;
  message?: string;
}

export default function TransitionLoader({
  isLoading,
  message = "LOADING WORKSPACE...",
}: TransitionLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Shutter background curtains */}
          <motion.div
            className={styles.curtainLeft}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className={styles.curtainRight}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Loader Card */}
          <motion.div
            className={styles.card}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.3, type: "spring", damping: 15 }}
          >
            {/* Window bar */}
            <div className={styles.titlebar}>
              <span className={styles.dot} style={{ backgroundColor: "#E06850" }} />
              <span className={styles.dot} style={{ backgroundColor: "#E5A93B" }} />
              <span className={styles.dot} style={{ backgroundColor: "#4A6B5D" }} />
              <span className={styles.titleText}>processing_signal.sys</span>
            </div>

            <div className={styles.body}>
              {/* Rotating Dashed Ring & Logo */}
              <div className={styles.logoWrapper}>
                <motion.div
                  className={styles.ring}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className={styles.logoFrame}
                  animate={{ 
                    scale: [1, 1.05, 0.95, 1.05, 1],
                    rotate: [0, 5, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <Image
                    src="/logo.jpeg"
                    alt="Loading Logo"
                    width={70}
                    height={70}
                    className={styles.logoImage}
                    priority
                  />
                </motion.div>
              </div>

              <div className={styles.messageBox}>
                <span className={styles.promptIcon}>&gt;</span>
                <span className={styles.messageText}>{message}</span>
                <span className={styles.cursor} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
