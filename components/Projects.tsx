"use client";

import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.css";

const PROJECTS_DATA = [
  {
    title: "Air Paint Web App",
    filename: "air_paint_cv.py",
    description: "Engineered a real-time, gesture-based drawing canvas tool using computer vision for precise fingertip tracking. Integrates local camera feeds.",
    tags: ["Python", "Flask", "OpenCV", "MediaPipe", "NumPy"],
    color: "var(--accent-warning)",
    github: "https://github.com/RAJ-MANE",
    demo: "https://github.com/RAJ-MANE",
    sliderLeftText: "FRAME IN",
    sliderRightText: "CANVAS MASK",
    sliderLeftBg: "#FFE8E8",
    sliderRightBg: "#111111",
  },
  {
    title: "Renewable Energy Optimizer",
    filename: "renewable_site_optimizer.py",
    description: "Designed an AI-powered solar and wind site optimization platform that analyzes historical weather metrics, geographical coordinates, and terrain elevations to compute optimal placements for wind turbines and solar panels.",
    tags: ["Python", "Streamlit", "TensorFlow", "Pandas", "Matplotlib"],
    color: "var(--accent-primary)",
    github: "https://github.com/RAJ-MANE/Renewable_Site_Optimizer",
    demo: "https://ai-sun-wind-planner.vercel.app",
    sliderLeftText: "WEATHER CONST.",
    sliderRightText: "OPTIMIZED SITES",
    sliderLeftBg: "#E3F2FD",
    sliderRightBg: "#0F172A",
    imageLeft: "/renewable1.jpeg",
    imageRight: "/renewable2.png",
  },
  {
    title: "Improvyu AI Interview Prep",
    filename: "improvyu_nlp.tsx",
    description: "A full-stack, multimodal AI interview prep platform that performs real-time facial expression analysis, voice analytics, and GPT question generation.",
    tags: ["Next.js", "Python", "AI/ML", "WebSockets", "TensorFlow"],
    color: "var(--accent-secondary)",
    github: "https://github.com/RAJ-MANE/MODEL_FORGE",
    demo: "https://model-forge-frontend-snowy.vercel.app/",
    sliderLeftText: "USER VIDEO",
    sliderRightText: "ANALYSIS SHIELD",
    sliderLeftBg: "#E8F5E9",
    sliderRightBg: "#1E1E1E",
    imageLeft: "/improvyu1.png",
    imageRight: "/improvu2.png",
  },
];

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="section-header">
        <span className="section-number">03</span>
        <h2 className="section-title">PROJECTS</h2>
      </div>

      <div className={styles.grid}>
        {PROJECTS_DATA.map((proj) => (
          <ProjectCard key={proj.title} {...proj} />
        ))}
      </div>
    </section>
  );
}
