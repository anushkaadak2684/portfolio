"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DevProfile.module.css";

/* ——— TYPES ——— */
interface GitHubData {
  repos: number;
  followers: number;
  following: number;
  stars: number;
  contributions: number;
  grid: number[][];        // 26 weeks × 7 days, levels 0-4
  username: string;
}

interface LeetCodeData {
  total: number;
  easy: number;
  medium: number;
  hard: number;
  languages: { name: string; count: number }[];
  username: string;
  fallback?: boolean;
}

const GITHUB_URL  = "https://github.com/anushkaadak2684";
const LEETCODE_URL = "https://leetcode.com/u/anushka_adak";

export default function DevProfile() {
  const sectionRef  = useRef<HTMLElement>(null);
  const [gh, setGh] = useState<GitHubData | null>(null);
  const [lc, setLc] = useState<LeetCodeData | null>(null);
  const [ghLoading, setGhLoading] = useState(true);
  const [lcLoading, setLcLoading] = useState(true);
  const [ghError,   setGhError]   = useState(false);
  const [lcFallback, setLcFallback] = useState(false);

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Fetch from our server-side API routes */
  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setGh(data);
      })
      .catch(() => setGhError(true))
      .finally(() => setGhLoading(false));

    fetch("/api/leetcode")
      .then((r) => r.json())
      .then((data) => {
        setLc(data);
        if (data.fallback) setLcFallback(true);
      })
      .catch(() => {
        // hard fallback
        setLc({ total: 100, easy: 45, medium: 42, hard: 13, languages: [{ name: "Java", count: 48 }, { name: "Python", count: 32 }, { name: "C++", count: 20 }], username: "anushka_adak", fallback: true });
        setLcFallback(true);
      })
      .finally(() => setLcLoading(false));
  }, []);

  /* Use real grid or empty placeholder while loading */
  const contribGrid: number[][] =
    gh?.grid ??
    Array.from({ length: 26 }, () => Array(7).fill(0));

  const lcTotal = lc ? lc.easy + lc.medium + lc.hard || lc.total : 100;
  const easyPct  = lc && lcTotal ? Math.round((lc.easy   / lcTotal) * 100) : 45;
  const medPct   = lc && lcTotal ? Math.round((lc.medium / lcTotal) * 100) : 42;
  const hardPct  = lc && lcTotal ? Math.round((lc.hard   / lcTotal) * 100) : 13;

  return (
    <section
      id="dev-profile"
      ref={sectionRef}
      className={styles.section}
      aria-label="Developer Profile — GitHub and LeetCode Statistics"
    >
      <div className={`container ${styles.inner}`}>

        {/* ——— HEADER ——— */}
        <div className={`reveal ${styles.header}`}>
          <span className={styles.eyebrow}>Developer Profile</span>
          <h2 className={styles.heading}>
            Raw Technical
            <br />
            <span className="gradient-text">Credibility</span>
          </h2>
          <p className={styles.subheading}>
            Live statistics pulled directly from GitHub and LeetCode — 
            the unfiltered proof of consistent engineering output.
          </p>
        </div>

        {/* ——— DASHBOARD GRID ——— */}
        <div className={styles.dashboard}>

          {/* ===== GITHUB PANEL ===== */}
          <div className={`reveal ${styles.panel} ${styles.panelGitHub}`}>

            {/* Panel header */}
            <div className={styles.panelHeader}>
              <div className={styles.panelIcon} style={{ background: "rgba(255,255,255,0.12)", color: "var(--accent-blue)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </div>
              <div>
                <div className={styles.panelTitle}>GitHub Activity</div>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.panelLink}>
                  @anushkaadak2684
                </a>
              </div>
              <StatusBadge loading={ghLoading} error={ghError} color="blue" />
            </div>

            {/* Stats row */}
            <div className={styles.ghStats}>
              {[
                { label: "Repositories",   value: ghLoading ? "…" : ghError ? "—" : String(gh?.repos ?? "—"),             accent: "#3B82F6" },
                { label: "Contributions",  value: ghLoading ? "…" : ghError ? "200+" : `${gh?.contributions ?? 200}+`,    accent: "#8B5CF6" },
                { label: "Stars Earned",   value: ghLoading ? "…" : ghError ? "—" : String(gh?.stars ?? "—"),             accent: "#06B6D4" },
                { label: "Followers",      value: ghLoading ? "…" : ghError ? "—" : String(gh?.followers ?? "—"),         accent: "#3B82F6" },
              ].map((stat) => (
                <div key={stat.label} className={styles.ghStat}>
                  <div className={`${styles.ghStatValue} ${ghLoading ? styles.skeleton : ""}`} style={{ color: ghLoading ? "transparent" : stat.accent }}>
                    {stat.value}
                  </div>
                  <div className={styles.ghStatLabel}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Real contribution heatmap */}
            <div className={styles.contribSection}>
              <div className={styles.contribLabel}>
                Contribution Activity — Last 26 Weeks
                {gh?.contributions ? ` · ${gh.contributions} total` : ""}
              </div>
              <div
                className={`${styles.contribGrid} ${ghLoading ? styles.contribLoading : ""}`}
                role="img"
                aria-label="GitHub contribution graph"
              >
                {contribGrid.map((week, wi) =>
                  week.map((level, di) => (
                    <div
                      key={`${wi}-${di}`}
                      className={`${styles.contribCell} ${styles[`level${level}`]}`}
                      title={`Week ${wi + 1} · ${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][di]} · level ${level}`}
                    />
                  ))
                )}
              </div>
              <div className={styles.contribLegend} aria-hidden="true">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((l) => (
                  <div key={l} className={`${styles.contribCell} ${styles[`level${l}`]}`} />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>

          {/* ===== LEETCODE PANEL ===== */}
          <div className={`reveal reveal-delay-1 ${styles.panel} ${styles.panelLeetCode}`}>

            <div className={styles.panelHeader}>
              <div className={styles.panelIcon} style={{ background: "rgba(255,255,255,0.12)", color: "var(--accent-purple)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <div className={styles.panelTitle}>LeetCode Stats</div>
                <a href={LEETCODE_URL} target="_blank" rel="noopener noreferrer" className={styles.panelLink}>
                  @anushka_adak
                </a>
              </div>
              <StatusBadge
                loading={lcLoading}
                error={false}
                fallback={lcFallback}
                color="purple"
              />
            </div>

            {/* Total counter */}
            <div className={styles.lcTotal}>
              <div className={`${styles.lcTotalValue} ${lcLoading ? styles.skeleton : ""}`}>
                {lcLoading ? "\u00a0\u00a0\u00a0" : `${lc?.total ?? 100}+`}
              </div>
              <div className={styles.lcTotalLabel}>Problems Solved</div>
            </div>

            {/* Difficulty breakdown */}
            <div className={styles.diffBreakdown} aria-label="Difficulty breakdown">
              {[
                { label: "Easy",   count: lc?.easy   ?? 45, pct: easyPct, color: "#22c55e", bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.25)"  },
                { label: "Medium", count: lc?.medium  ?? 42, pct: medPct,  color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
                { label: "Hard",   count: lc?.hard    ?? 13, pct: hardPct, color: "#ef4444", bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.25)"  },
              ].map((d) => (
                <div key={d.label} className={styles.diffRow}>
                  <div className={styles.diffMeta}>
                    <span className={styles.diffBadge} style={{ background: d.bg, color: d.color, borderColor: d.border }}>
                      {d.label}
                    </span>
                    <span className={`${styles.diffCount} ${lcLoading ? styles.skeleton : ""}`}>
                      {lcLoading ? "…" : d.count}
                    </span>
                  </div>
                  <div className={styles.diffBarBg}>
                    <div
                      className={styles.diffBarFill}
                      style={{ width: lcLoading ? "0%" : `${d.pct}%`, background: d.color }}
                      role="progressbar"
                      aria-valuenow={d.count}
                      aria-label={`${d.label}: ${d.count} problems`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Language breakdown */}
            <div className={styles.langSection}>
              <div className={styles.langLabel}>Top Languages</div>
              <div className={styles.langChips}>
                {(lc?.languages ?? []).map((lang) => (
                  <div key={lang.name} className={styles.langChip}>
                    <span className={styles.langName}>{lang.name}</span>
                    <span className={styles.langCount}>{lang.count} solved</span>
                  </div>
                ))}
                {lcLoading && [1, 2, 3].map((i) => (
                  <div key={i} className={`${styles.langChip} ${styles.skeleton}`} style={{ height: 40 }} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ——— STATUS BADGE SUBCOMPONENT ——— */
function StatusBadge({
  loading, error, fallback, color,
}: {
  loading: boolean; error?: boolean; fallback?: boolean; color: "blue" | "purple";
}) {
  const blue   = { bg: "rgba(255,255,255,0.08)",  color: "var(--accent-blue)",   border: "rgba(255,255,255,0.2)"  };
  const purple = { bg: "rgba(255,255,255,0.08)",  color: "var(--accent-purple)", border: "rgba(255,255,255,0.2)" };
  const c = color === "blue" ? blue : purple;

  if (loading) return (
    <span style={{ marginLeft: "auto", fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
      Loading…
    </span>
  );
  if (error) return (
    <span style={{ marginLeft: "auto", fontSize: "0.68rem", padding: "3px 10px", borderRadius: 999, background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", fontFamily: "var(--font-body)" }}>
      Offline
    </span>
  );
  if (fallback) return (
    <span style={{ marginLeft: "auto", fontSize: "0.68rem", padding: "3px 10px", borderRadius: 999, background: "rgba(245,158,11,0.08)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.2)", fontFamily: "var(--font-body)" }}>
      Estimated
    </span>
  );
  return (
    <span style={{ marginLeft: "auto", fontSize: "0.68rem", padding: "3px 10px", borderRadius: 999, background: c.bg, color: c.color, border: `1px solid ${c.border}`, fontFamily: "var(--font-body)" }}>
      ● Live
    </span>
  );
}
