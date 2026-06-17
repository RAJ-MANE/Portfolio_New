"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BootLoader from "../components/BootLoader";
import TransitionLoader from "../components/TransitionLoader";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsMarquee from "../components/StatsMarquee";
import About from "../components/About";
import ZigzagTimeline from "../components/ZigzagTimeline";
import Projects from "../components/Projects";
import Achievements from "../components/Achievements";
import TechStack from "../components/TechStack";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import PixelBackground from "../components/PixelBackground";
import CustomCursor from "../components/CustomCursor";

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState("TRANSMITTING...");
  const { scrollYProgress } = useScroll();

  // Scroll animations for floating geometric watermark backdrops
  const backgroundRotation = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Global button/link click interceptor and custom loader event listeners
  useEffect(() => {
    // 1. Intercept global link and button clicks
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button");
      if (!target) return;

      // Ignore structural interactive items that shouldn't show global loader:
      // - Mobile menu toggle button in Navbar
      // - Close button in drawer
      // - Skip button/overlay in loader
      // - Form submit buttons (which trigger the loader programmatically)
      if (
        target.closest("#navbar button") ||
        target.classList.contains("boot-loader") ||
        target.closest(".boot-card") ||
        target.getAttribute("type") === "submit" ||
        target.closest("[class*='closeBtn']") ||
        target.closest("[class*='overlay']") ||
        target.closest("[class*='menuToggle']")
      ) {
        return;
      }

      const href = target.getAttribute("href");
      const text = target.textContent?.trim().toUpperCase() || "";
      let message = "TRANSMITTING SIGNAL...";

      if (href) {
        if (href.startsWith("#")) {
          const sectionName = href.replace("#", "").toUpperCase();
          if (sectionName) {
            message = `ROUTING TO ${sectionName}...`;
          } else {
            message = "SCROLLING TO TOP...";
          }
        } else if (href.includes("github.com")) {
          message = "OPENING GITHUB PORTAL...";
        } else if (href.includes("linkedin.com")) {
          message = "CONNECTING TO LINKEDIN...";
        } else if (href.endsWith(".pdf")) {
          message = "FETCHING RESUME PDF...";
        } else {
          message = "CONNECTING TO LINK...";
        }
      } else if (text) {
        message = `${text}...`;
      }

      // Prevent navigation temporarily to show the creative loader
      e.preventDefault();
      setTransitionMessage(message);
      setTransitioning(true);

      setTimeout(() => {
        // Perform action after transition completes
        if (href) {
          if (href.startsWith("#")) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            } else if (href === "#") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          } else {
            const targetAttr = target.getAttribute("target");
            if (targetAttr === "_blank") {
              window.open(href, "_blank", "noopener,noreferrer");
            } else {
              window.location.href = href;
            }
          }
        }
        
        // Short timeout to fade out loader
        setTimeout(() => {
          setTransitioning(false);
        }, 200);
      }, 850);
    };

    // 2. Custom event listener to trigger programmatically from other components
    const handleTriggerLoader = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { message: customMsg, active } = customEvent.detail || {};
      if (active) {
        setTransitionMessage(customMsg || "TRANSMITTING...");
        setTransitioning(true);
      } else {
        setTransitioning(false);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    window.addEventListener("trigger-logo-loader", handleTriggerLoader);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("trigger-logo-loader", handleTriggerLoader);
    };
  }, []);

  return (
    <>
      <BootLoader onComplete={() => setBooting(false)} />
      <TransitionLoader isLoading={transitioning} message={transitionMessage} />

      {!booting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: "relative", minHeight: "100vh" }}
        >
          <PixelBackground />
          <CustomCursor />
          <Navbar />
          
          <main style={{ paddingTop: "100px", overflow: "hidden" }}>
            <Hero />
            <StatsMarquee />
            <About />
            <ZigzagTimeline />
            <Projects />
            <Achievements />
            <TechStack />
            <Contact />
          </main>

          <Footer />

          {/* Floating Watermark Shapes - Neubrutalism style (outlined, low opacity, parallax) */}
          <motion.div
            className="parallax-shape"
            style={{
              width: "300px",
              height: "300px",
              top: "15%",
              right: "-50px",
              transform: "rotate(15deg)",
              borderWidth: "4px",
              borderStyle: "dashed",
              rotate: backgroundRotation,
              y: backgroundY,
            } as any}
          />

          <motion.div
            className="parallax-shape parallax-shape--circle"
            style={{
              width: "450px",
              height: "450px",
              top: "40%",
              left: "-150px",
              borderWidth: "4px",
              borderStyle: "dashed",
              rotate: backgroundRotation,
              y: backgroundY,
            } as any}
          />

          <motion.div
            className="parallax-shape"
            style={{
              width: "250px",
              height: "250px",
              bottom: "20%",
              right: "4%",
              borderWidth: "4px",
              borderStyle: "dashed",
              rotate: backgroundRotation,
              y: backgroundY,
            } as any}
          />
        </motion.div>
      )}
    </>
  );
}
