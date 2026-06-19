"use client";

import { useEffect, useRef } from "react";
import styles from "./Highlights.module.css";

const METRICS = [
  {
    id: "sih-finalist",
    value: "2×",
    label: "Smart India Hackathon Finalist",
    sublabel: "National level — 2024 & 2025",
    accent: "blue",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    id: "ide-bootcamp",
    value: "1×",
    label: "IDE Bootcamp Participant",
    sublabel: "Pitch-ready startup — 2026",
    accent: "purple",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
  },
  {
    id: "featured-projects",
    value: "4+",
    label: "Featured Projects",
    sublabel: "Full-stack · ML · Systems",
    accent: "cyan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    id: "github-contributions",
    value: "200+",
    label: "GitHub Contributions",
    sublabel: "Active open-source commits",
    accent: "blue",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    id: "dsa-problems",
    value: "100+",
    label: "DSA Problems Solved",
    sublabel: "LeetCode · competitive coding",
    accent: "purple",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: "tech-domains",
    value: "AI · FS · DB",
    label: "Core Domains",
    sublabel: "AI · Full Stack · Database Systems",
    accent: "cyan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    id: "public-speaker",
    value: "Speaker",
    label: "Public Speaker",
    sublabel: "Hackathons · tech events",
    accent: "blue",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

export default function Highlights() {
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
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="highlights"
      ref={sectionRef}
      className={styles.highlights}
      aria-label="Highlights — Quantifiable Impact"
    >
      {/* Subtle top divider glow */}
      <div className={styles.topGlow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* Section label */}
        <div className={`reveal ${styles.sectionLabel}`}>
          <span className={styles.labelLine} aria-hidden="true" />
          <span>Impact at a glance</span>
          <span className={styles.labelLine} aria-hidden="true" />
        </div>

        {/* Metrics grid */}
        <div className={styles.grid} role="list" aria-label="Achievement metrics">
          {METRICS.map((metric, i) => (
            <article
              key={metric.id}
              className={`reveal ${styles.card} ${styles[`accent-${metric.accent}`]}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
              role="listitem"
            >
              <div className={styles.cardInner}>
                {/* Icon */}
                <div className={`${styles.iconWrap} ${styles[`icon-${metric.accent}`]}`} aria-hidden="true">
                  {metric.icon}
                </div>

                {/* Value */}
                <div className={styles.value} aria-label={`${metric.value} ${metric.label}`}>
                  {metric.value}
                </div>

                {/* Label */}
                <div className={styles.labelText}>{metric.label}</div>

                {/* Sublabel */}
                <div className={styles.sublabel}>{metric.sublabel}</div>

                {/* Decorative hover line */}
                <div className={`${styles.hoverLine} ${styles[`line-${metric.accent}`]}`} aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className={styles.bottomGlow} aria-hidden="true" />
    </section>
  );
}
