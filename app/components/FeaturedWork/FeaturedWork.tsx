"use client";

import { useEffect, useRef } from "react";
import styles from "./FeaturedWork.module.css";

const PROJECTS = [
  {
    id: "classsphere",
    index: "01",
    name: "ClassSphere",
    tagline: "Real-Time Virtual Classroom Platform",
    description:
      "A production-grade virtual classroom platform built for synchronous remote education. ClassSphere enables <strong>live video classes</strong> with WebRTC-powered peer-to-peer streaming, <strong>screen sharing</strong>, real-time <strong>attendance tracking</strong>, and <strong>assignment uploads</strong>. The platform enforces <strong>role-based access control</strong>—separating instructor and student environments—and delivers rich user engagement analytics. Engineered for scale with a serverless Firebase backend and a fully typed TypeScript surface.",
    stack: ["TypeScript", "Next.js", "Firebase", "WebRTC"],
    accent: "blue",
    github: "https://github.com/anushkaadak2684",
    category: "Full Stack · EdTech",
    highlights: ["Live Video Classes", "Screen Sharing", "Role-Based Access", "Real-Time Attendance"],
  },
  {
    id: "quickshow",
    index: "02",
    name: "QuickShow",
    tagline: "High-Performance Movie Booking Platform",
    description:
      "A high-throughput cinema booking engine designed to handle concurrent seat reservations without collision. QuickShow features <strong>robust client-side state management</strong>, a normalized <strong>relational database schema</strong> (MySQL) backed by <strong>TiDB Cloud</strong> for horizontal scalability, and a RESTful Node/Express API layer. The booking flow is engineered to resolve race conditions on simultaneous seat selection — delivering a premium, frictionless experience under load.",
    stack: ["React", "Node.js", "Express.js", "MySQL", "TiDB Cloud"],
    accent: "purple",
    github: "https://github.com/anushkaadak2684",
    category: "Full Stack · FinTech",
    highlights: ["Concurrent Seat Logic", "TiDB Cloud Scale", "Relational Schema", "State Management"],
  },
  {
    id: "cachenexus",
    index: "03",
    name: "CacheNexus",
    tagline: "Intelligent Caching Simulator & Visualizer",
    description:
      "A low-level systems tool that brings cache algorithms to life. CacheNexus lets engineers <strong>test, benchmark, and visually compare</strong> caching strategies — LRU, LFU, FIFO, and custom policies — against real access patterns. The simulator generates <strong>hit/miss ratio analytics</strong>, latency projections, and memory utilization graphs in real time. Built as a rigorous engineering exercise in <strong>data structure optimization</strong> and algorithmic complexity analysis.",
    stack: ["JavaScript", "Data Structures", "Algorithms", "Visualization"],
    accent: "cyan",
    github: "https://github.com/anushkaadak2684",
    category: "Systems · CS Fundamentals",
    highlights: ["LRU / LFU / FIFO", "Hit-Rate Analytics", "Benchmark Engine", "Live Visualization"],
  },
  {
    id: "iris-classification",
    index: "04",
    name: "Iris Classification",
    tagline: "Optimized ML Classification System",
    description:
      "A clean, highly optimized <strong>multivariate machine learning classification system</strong> built on the canonical Iris dataset. The project explores the full ML pipeline: <strong>data preprocessing</strong>, feature engineering, multi-model evaluation (KNN, SVM, Decision Tree, Logistic Regression), hyperparameter tuning, and <strong>performance benchmarking</strong>. Designed to be a rigorous demonstration of classification fundamentals with publication-quality output metrics and decision-boundary visualizations.",
    stack: ["Python", "scikit-learn", "pandas", "matplotlib"],
    accent: "blue",
    github: "https://github.com/anushkaadak2684",
    category: "Machine Learning · AI",
    highlights: ["Multi-Model Evaluation", "Feature Engineering", "Hyperparameter Tuning", "Decision Boundaries"],
  },
];

const ACCENT_COLORS: Record<string, string> = {
  blue: "#3B82F6",
  purple: "#8B5CF6",
  cyan: "#06B6D4",
};

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={styles.section}
      aria-label="Featured Work — Projects"
    >
      <div className={`container ${styles.inner}`}>
        {/* Header */}
        <div className={`reveal ${styles.header}`}>
          <span className={styles.eyebrow}>Featured Work</span>
          <h2 className={styles.heading}>
            Projects Built to
            <br />
            <span className="gradient-text">Solve Real Problems</span>
          </h2>
          <p className={styles.subheading}>
            Every project is engineered with production intent — architected for scale,
            tested under load, and shipped with purpose.
          </p>
        </div>

        {/* Project Rows */}
        <div className={styles.projects}>
          {PROJECTS.map((project, i) => {
            const isEven = i % 2 === 1;
            return (
              <a
                key={project.id}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`reveal ${styles.projectRow} ${isEven ? styles.rowReverse : ""}`}
                id={`project-${project.id}`}
                aria-label={`View ${project.name} on GitHub`}
                style={{ "--accent": ACCENT_COLORS[project.accent] } as React.CSSProperties}
              >
                {/* Index + Category */}
                <div className={styles.projectMeta}>
                  <span className={styles.projectIndex}>{project.index}</span>
                  <span className={styles.projectCategory}>{project.category}</span>
                  <div
                    className={styles.metaLine}
                    style={{ background: ACCENT_COLORS[project.accent] }}
                    aria-hidden="true"
                  />
                </div>

                {/* Content block */}
                <div className={styles.projectContent}>
                  {/* Name + arrow */}
                  <div className={styles.projectTitleRow}>
                    <h3 className={styles.projectName}>{project.name}</h3>
                    <div className={`${styles.arrowBox} ${styles[`arrow-${project.accent}`]}`} aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                  <p className={styles.projectTagline}>{project.tagline}</p>

                  {/* Description */}
                  <p
                    className={styles.projectDesc}
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />

                  {/* Highlight tags */}
                  <div className={styles.highlights} aria-label="Project highlights">
                    {project.highlights.map((h) => (
                      <span
                        key={h}
                        className={`${styles.highlightTag} ${styles[`tag-${project.accent}`]}`}
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className={styles.stack} aria-label="Technology stack">
                    {project.stack.map((tech) => (
                      <span key={tech} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* GitHub CTA */}
                  <div className={styles.githubCta}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    View on GitHub
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
