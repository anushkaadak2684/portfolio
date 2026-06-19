"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

const BADGES = [
  { icon: "🏆", label: "SIH Finalist 2024" },
  { icon: "🏆", label: "SIH Finalist 2025" },
  { icon: "💡", label: "IDE Bootcamp 2026" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll reveal for hero elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleViewProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className={styles.hero}
      aria-label="Hero — Anushka Adak Introduction"
    >
      {/* Ambient background orbs */}
      <div className={styles.orbLeft} aria-hidden="true" />
      <div className={styles.orbRight} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* ——— LEFT COLUMN ——— */}
        <div className={styles.left}>
          {/* Status tag */}
          <div className={`reveal ${styles.statusTag}`}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>Open to opportunities</span>
          </div>

          {/* Name */}
          <h1 className={`reveal reveal-delay-1 ${styles.name}`}>
            Anushka
            <br />
            <span className="gradient-text">Adak</span>
          </h1>

          {/* Title */}
          <p className={`reveal reveal-delay-2 ${styles.title}`}>
            Software Developer&nbsp;•&nbsp;Public Speaker&nbsp;•&nbsp;2× Smart India Hackathon Finalist
          </p>

          {/* Subtitle */}
          <p className={`reveal reveal-delay-3 ${styles.subtitle}`}>
            Building scalable software, AI‑powered systems, and impactful digital
            experiences that solve real‑world problems.
          </p>

          {/* CTA */}
          <div className={`reveal reveal-delay-4 ${styles.ctaRow}`}>
            <button
              id="hero-view-projects-btn"
              className={`btn btn-primary ${styles.ctaBtn}`}
              onClick={handleViewProjects}
              aria-label="View Projects — scroll to featured work"
            >
              View Projects
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <a
              href="#about"
              id="hero-learn-more-btn"
              className={`btn btn-outline ${styles.outlineBtn}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              About Me
            </a>
          </div>

          {/* Achievement Badges */}
          <div className={`reveal reveal-delay-5 ${styles.badges}`} role="list" aria-label="Achievements">
            {BADGES.map((badge) => (
              <div
                key={badge.label}
                className={styles.badge}
                role="listitem"
              >
                <span aria-hidden="true">{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ——— RIGHT COLUMN — Profile Card ——— */}
        <div className={`reveal reveal-delay-2 ${styles.right}`} aria-hidden="false">
          <div className={styles.cardWrapper}>
            {/* Back glow orb */}
            <div className={styles.profileGlow} aria-hidden="true" />

            {/* Glassmorphic card frame */}
            <div className={`glass-card ${styles.profileCard}`}>
              {/* Ambient gradient ring */}
              <div className={styles.profileRing} aria-hidden="true" />

              <div className={styles.profileImageWrapper}>
                <Image
                  src="/profile.jpeg"
                  alt="Anushka Adak — Software Developer & Public Speaker"
                  fill
                  sizes="(max-width: 768px) 280px, 360px"
                  className={styles.profileImage}
                  priority
                  draggable={false}
                />
              </div>

              {/* Floating skill chip */}
              <div className={`glass-card ${styles.floatingChipTop}`} aria-hidden="true">
                <span className={styles.chipDot} style={{ background: "var(--accent-blue)" }} />
                <span>Full Stack Dev</span>
              </div>

              {/* Floating stat chip */}
              <div className={`glass-card ${styles.floatingChipBottom}`} aria-hidden="true">
                <span className={styles.chipDot} style={{ background: "var(--accent-purple)" }} />
                <span>2× National Finalist</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className={styles.scrollCue} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span>scroll</span>
      </div>
    </section>
  );
}
