"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./About.module.css";

const TECH_ECOSYSTEM = [
  {
    id: "frontend",
    category: "Frontend",
    accent: "blue",
    tags: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Material UI", "Bootstrap"],
  },
  {
    id: "backend",
    category: "Backend",
    accent: "purple",
    tags: ["Node.js", "Express.js", "Java"],
  },
  {
    id: "databases",
    category: "Databases",
    accent: "cyan",
    tags: ["MongoDB", "MySQL", "Firebase", "TiDB"],
  },
  {
    id: "languages",
    category: "Languages",
    accent: "blue",
    tags: ["Java", "C++", "C", "Python", "JavaScript", "TypeScript"],
  },
  {
    id: "tools",
    category: "Tools & Platforms",
    accent: "purple",
    tags: ["Git", "GitHub", "Railway", "Vercel", "Render"],
  },
  {
    id: "core-cs",
    category: "Core CS",
    accent: "cyan",
    tags: [
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Computer Networks",
      "Operating Systems",
      "Artificial Intelligence",
      "Machine Learning",
    ],
  },
];

const NARRATIVE_HIGHLIGHTS = [
  {
    id: "education",
    icon: "🎓",
    text: "B.Tech in Computer Science & Business Systems",
    sub: "Techno Main Salt Lake",
  },
  {
    id: "focus",
    icon: "⚡",
    text: "Full-Stack Architecture & AI/ML Systems",
    sub: "End-to-end product engineering",
  },
  {
    id: "mindset",
    icon: "🧠",
    text: "System-Level Logic & Backend Processing",
    sub: "Performance-first engineering mindset",
  },
  {
    id: "business",
    icon: "💡",
    text: "Bridging Tech with Business",
    sub: "Entrepreneurial ventures & startup thinking",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
      id="about"
      ref={sectionRef}
      className={styles.about}
      aria-label="About Anushka Adak"
    >
      {/* Background texture */}
      <div className={styles.bgTexture} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* ——— SECTION HEADER ——— */}
        <div className={`reveal ${styles.header}`}>
          <span className={styles.eyebrow}>About</span>
          <h2 className={styles.heading}>
            The Person Behind
            <br />
            <span className="gradient-text">the Code</span>
          </h2>
        </div>

        {/* ——— SPLIT LAYOUT ——— */}
        <div className={styles.split}>
          {/* LEFT — Narrative */}
          <div className={`reveal reveal-delay-1 ${styles.narrative}`}>
            {/* Main bio */}
            <div className={styles.bioParagraphs}>
              <p className={styles.bioPrimary}>
                B.Tech student in{" "}
                <strong>Computer Science and Business Systems</strong> at{" "}
                <strong>Techno Main Salt Lake</strong>, driven by a deep
                fascination for software engineering, full-stack architecture,
                and building products with real-world utility.
              </p>
              <p className={styles.bioSecondary}>
                My work is rooted in{" "}
                <strong>system-level thinking</strong> — designing backend
                architectures, implementing AI/ML pipelines, and crafting
                seamless digital experiences. I approach every project with an
                execution mindset: from architectural blueprints to deployed
                products.
              </p>
              <p className={styles.bioSecondary}>
                What sets me apart is the bridge I build between{" "}
                <strong>technology and business impact</strong>. Through
                entrepreneurial ventures like{" "}
                <strong>GhostProof</strong> and national hackathon solutions, I
                validate ideas in the real world — not just on paper.
              </p>
            </div>

            {/* Highlight pills */}
            <ul className={styles.highlightList} aria-label="Key strengths">
              {NARRATIVE_HIGHLIGHTS.map((item) => (
                <li key={item.id} className={styles.highlightItem}>
                  <div className={styles.highlightIcon} aria-hidden="true">
                    {item.icon}
                  </div>
                  <div>
                    <div className={styles.highlightText}>{item.text}</div>
                    <div className={styles.highlightSub}>{item.sub}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Tech Ecosystem */}
          <div className={`reveal reveal-delay-2 ${styles.ecosystem}`}>
            <div className={styles.ecosystemHeader}>
              <h3 className={styles.ecosystemTitle}>Tech Ecosystem</h3>
              <p className={styles.ecosystemSubtitle}>
                Click a category to spotlight it
              </p>
            </div>

            <div className={styles.categories} role="list" aria-label="Technology categories">
              {TECH_ECOSYSTEM.map((group) => (
                <div
                  key={group.id}
                  className={`${styles.categoryGroup} ${
                    activeCategory && activeCategory !== group.id
                      ? styles.dimmed
                      : ""
                  }`}
                  role="listitem"
                >
                  {/* Category label */}
                  <button
                    className={`${styles.categoryLabel} ${styles[`accent-${group.accent}`]} ${
                      activeCategory === group.id ? styles.categoryActive : ""
                    }`}
                    onClick={() =>
                      setActiveCategory((prev) =>
                        prev === group.id ? null : group.id
                      )
                    }
                    aria-pressed={activeCategory === group.id}
                    aria-label={`Toggle ${group.category} category`}
                    id={`category-${group.id}`}
                  >
                    <span className={styles.categoryDot} aria-hidden="true" />
                    {group.category}
                  </button>

                  {/* Chip row */}
                  <div
                    className={styles.chipRow}
                    role="list"
                    aria-label={`${group.category} technologies`}
                  >
                    {group.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`${styles.chip} ${styles[`chip-${group.accent}`]}`}
                        role="listitem"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
