"use client";

import { useEffect, useRef } from "react";
import styles from "./Recognition.module.css";

const CASE_STUDIES = [
  {
    id: "sih-2024",
    year: "2024",
    event: "Smart India Hackathon",
    badge: "National Finalist",
    project: "LawAI",
    tagline: "AI-Powered Legal Assistant for the Madhya Pradesh Police",
    role: "Solution Architect & Designer",
    description:
      "Identified a systemic gap in legal information access within law enforcement. Architected end-to-end — from problem mapping and solution blueprinting to experience design — an <strong>AI-powered legal assistant</strong> purpose-built for the Madhya Pradesh Police. LawAI translates complex legal code into actionable, context-aware guidance, drastically reducing case-processing friction for officers in the field.",
    lifecycle: [
      { phase: "Problem Mapping", detail: "Systemic analysis of legal bottlenecks in MP Police workflow" },
      { phase: "Architecture Blueprint", detail: "AI pipeline design, data modelling, API surface definition" },
      { phase: "Experience Design", detail: "Officer-first UX — clarity and speed under high-pressure contexts" },
      { phase: "Validation", detail: "Pitch-validated at national level; selected as Finalist" },
    ],
    domain: "Legal Tech · AI/NLP · Public Sector",
    accent: "blue",
    number: "01",
  },
  {
    id: "sih-2025",
    year: "2025",
    event: "Smart India Hackathon",
    badge: "National Finalist",
    project: "Nayantra",
    tagline: "Blockchain-Driven Direct Benefit Transfer for PCR & POA Act Victims",
    role: "Solution Architect & Designer",
    description:
      "Responded to the opacity and leakage in government welfare disbursement systems. Designed <strong>Nayantra</strong> — a secure, smart, blockchain-driven DBT platform — to bring immutable transparency and cryptographic accountability to benefit transfers for victims under the <strong>Protection of Civil Rights (PCR)</strong> and <strong>Protection of Atrocities (POA) Acts</strong>. Every architectural decision prioritised security, auditability, and dignity for the end beneficiary.",
    lifecycle: [
      { phase: "Systemic Research", detail: "Mapped DBT leakage patterns and trust gaps under PCR & POA" },
      { phase: "Blockchain Architecture", detail: "Smart contract design for tamper-proof disbursement trails" },
      { phase: "Privacy-First Design", detail: "Beneficiary anonymity with on-chain verification" },
      { phase: "National Validation", detail: "Selected as Finalist — architecture stress-tested by national jury" },
    ],
    domain: "Blockchain · GovTech · Social Impact",
    accent: "purple",
    number: "02",
  },
  {
    id: "ide-2026",
    year: "2026",
    event: "IDE Bootcamp",
    badge: "Pitch-Ready Team",
    project: "GhostProof",
    tagline: "AI-Powered Browser Extension to Detect Fraudulent Job Listings",
    role: "Co-Founder & Solution Architect",
    description:
      "Founded at <strong>Keystone Ventures</strong>, GhostProof tackles the rising epidemic of fraudulent job postings targeting job seekers. As Solution Architect, designed an <strong>AI-powered browser extension</strong> that analyses job listings in real time — cross-referencing signals such as salary anomalies, company legitimacy, posting patterns, and language markers — to surface a <strong>fraud confidence score</strong> before a single application is submitted.",
    lifecycle: [
      { phase: "Market Research", detail: "Scoped the scale of ghost job fraud — 60%+ listings estimated deceptive" },
      { phase: "AI Model Design", detail: "Feature engineering for fraud signal detection across job listing attributes" },
      { phase: "Extension Architecture", detail: "Browser-native ML inference with low-latency classification pipeline" },
      { phase: "Startup Pitch", detail: "Pitch-ready selection at IDE Bootcamp 2026 under Keystone Ventures" },
    ],
    domain: "AI · Browser Extension · Consumer Tech",
    accent: "cyan",
    number: "03",
  },
];

const ACCENT_COLORS: Record<string, string> = {
  blue:   "#3B82F6",
  purple: "#8B5CF6",
  cyan:   "#06B6D4",
};

export default function Recognition() {
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
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="recognition"
      ref={sectionRef}
      className={styles.section}
      aria-label="National Recognition — Case Studies"
    >
      {/* Ambient background */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* ——— HEADER ——— */}
        <div className={`reveal ${styles.header}`}>
          <span className={styles.eyebrow}>National Recognition</span>
          <h2 className={styles.heading}>
            From Ideas to
            <br />
            <span className="gradient-text">National Recognition</span>
          </h2>
          <p className={styles.subheading}>
            These aren&apos;t just projects. They are <strong>end-to-end systemic solutions</strong> — 
            conceived, architected, designed, and validated at the national level.
            Every entry below represents the full product lifecycle, driven by a single architect.
          </p>

          {/* Role callout */}
          <div className={styles.roleCallout}>
            <div className={styles.roleIcon} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <div className={styles.roleCalloutTitle}>Role: Solution Architect &amp; Designer</div>
              <div className={styles.roleCalloutSub}>
                Systemic problem mapping → architectural blueprints → experience design → post-validation
              </div>
            </div>
          </div>
        </div>

        {/* ——— CASE STUDIES ——— */}
        <div className={styles.caseStudies}>
          {CASE_STUDIES.map((cs, i) => (
            <article
              key={cs.id}
              className={`reveal ${styles.caseCard}`}
              style={{
                transitionDelay: `${i * 0.1}s`,
                "--accent": ACCENT_COLORS[cs.accent],
              } as React.CSSProperties}
              id={`case-${cs.id}`}
            >
              {/* Left accent bar */}
              <div
                className={styles.accentBar}
                style={{ background: ACCENT_COLORS[cs.accent] }}
                aria-hidden="true"
              />

              <div className={styles.cardBody}>
                {/* Top row: number + event + badge */}
                <div className={styles.cardTopRow}>
                  <span className={styles.caseNumber}>{cs.number}</span>
                  <div className={styles.eventMeta}>
                    <span className={styles.eventYear}>{cs.year}</span>
                    <span className={styles.eventName}>{cs.event}</span>
                  </div>
                  <span
                    className={styles.badge}
                    style={{
                      color: ACCENT_COLORS[cs.accent],
                      background: "rgba(255, 255, 255, 0.06)",
                      borderColor: "rgba(255, 255, 255, 0.12)",
                    }}
                  >
                    {cs.badge}
                  </span>
                </div>

                {/* Project name + tagline */}
                <div className={styles.projectHeader}>
                  <h3
                    className={styles.projectName}
                    style={{ "--accent": ACCENT_COLORS[cs.accent] } as React.CSSProperties}
                  >
                    {cs.project}
                  </h3>
                  <p className={styles.projectTagline}>{cs.tagline}</p>
                </div>

                {/* Role pill */}
                <div className={styles.rolePill}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  {cs.role}
                </div>

                {/* Description */}
                <p
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: cs.description }}
                />

                {/* Lifecycle rail */}
                <div className={styles.lifecycle} aria-label="Project lifecycle phases">
                  <div className={styles.lifecycleLabel}>Project Lifecycle</div>
                  <div className={styles.lifecycleSteps}>
                    {cs.lifecycle.map((step, j) => (
                      <div key={step.phase} className={styles.lifecycleStep}>
                        {/* Connector */}
                        {j > 0 && (
                          <div
                            className={styles.stepConnector}
                            style={{ background: ACCENT_COLORS[cs.accent] }}
                            aria-hidden="true"
                          />
                        )}
                        <div className={styles.stepDot} style={{ background: ACCENT_COLORS[cs.accent] }} aria-hidden="true" />
                        <div className={styles.stepContent}>
                          <div className={styles.stepPhase}>{step.phase}</div>
                          <div className={styles.stepDetail}>{step.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Domain */}
                <div className={styles.domain}>
                  {cs.domain.split(" · ").map((d) => (
                    <span key={d} className={styles.domainChip}>{d}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
