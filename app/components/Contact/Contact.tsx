"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Contact.module.css";

const CONTACT_DETAILS = [
  {
    id: "email",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "anushkaadakofficial@gmail.com",
    href: "mailto:anushkaadakofficial@gmail.com",
    copyable: true,
  },
  {
    id: "linkedin",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/anushka-adak",
    href: "https://www.linkedin.com/in/anushka-adak-4b0a76287",
  },
  {
    id: "github",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/anushkaadak2684",
    href: "https://github.com/anushkaadak2684",
  },
  {
    id: "leetcode",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    label: "LeetCode",
    value: "leetcode.com/u/anushka_adak",
    href: "https://leetcode.com/u/anushka_adak",
  },
  {
    id: "location",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Location",
    value: "Kolkata, India",
    href: null,
  },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Copy email */
  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("anushkaadak2684@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = "anushkaadakofficial@gmail.com";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, []);

  /* Form helpers */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isEmailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const errors = {
    name: form.name.trim().length < 2 ? "Name must be at least 2 characters" : "",
    email: !isEmailValid(form.email) ? "Please enter a valid email address" : "",
    subject: form.subject.trim().length < 3 ? "Subject must be at least 3 characters" : "",
    message: form.message.trim().length < 20 ? "Message must be at least 20 characters" : "",
  };
  const isValid = Object.values(errors).every((e) => !e);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Touch all fields to surface validation errors
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!isValid) return;

    setSubmitStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        console.error("Contact API error:", data.error);
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setTouched({});
    setSubmitStatus("idle");
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={styles.section}
      aria-label="Contact Anushka Adak"
    >
      {/* Ambient glow */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>

        {/* ——— HEADER ——— */}
        <div className={`reveal ${styles.header}`}>
          <span className={styles.eyebrow}>Contact</span>
          <h2 className={styles.heading}>
            Let&apos;s Build Something
            <br />
            <span className="gradient-text">Meaningful Together</span>
          </h2>
          <p className={styles.subheading}>
            Whether it&apos;s an internship opportunity, collaboration, hackathon, or a
            conversation about technology, I&apos;d love to connect.
          </p>
        </div>

        {/* ——— SPLIT LAYOUT ——— */}
        <div className={styles.split}>

          {/* ——— LEFT: PRIMARY DETAILS ——— */}
          <div className={`reveal reveal-delay-1 ${styles.leftCol}`}>

            <div className={styles.detailsList} role="list" aria-label="Contact details">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.id} className={styles.detailRow} role="listitem">
                  <div className={styles.detailIcon} aria-hidden="true">
                    {item.icon}
                  </div>
                  <div className={styles.detailContent}>
                    <div className={styles.detailLabel}>{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className={styles.detailValue}
                        id={`contact-${item.id}`}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className={styles.detailValue}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className={styles.actionBtns}>
              <button
                id="copy-email-btn"
                className={`${styles.actionBtn} ${styles.copyBtn} ${copied ? styles.copied : ""}`}
                onClick={handleCopyEmail}
                aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
              >
                {copied ? (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy Email
                  </>
                )}
              </button>

              <a
                id="contact-download-resume-btn"
                href="/resume.pdf"
                download
                className={`${styles.actionBtn} ${styles.resumeBtn}`}
                aria-label="Download Anushka's resume"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>

          {/* ——— RIGHT: CONTACT FORM ——— */}
          <div className={`reveal reveal-delay-2 ${styles.rightCol}`}>
            <div className={styles.formCard}>

              {/* SUCCESS STATE */}
              {submitStatus === "success" ? (
                <div className={styles.successState} role="status" aria-live="polite">
                  <div className={styles.successIcon} aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>Message Sent!</h3>
                  <p className={styles.successText}>
                    Thanks for reaching out. I&apos;ll get back to you shortly — looking
                    forward to connecting!
                  </p>
                  <button
                    className={`${styles.actionBtn} ${styles.resumeBtn}`}
                    onClick={handleReset}
                    id="contact-send-another-btn"
                  >
                    Send Another
                  </button>
                </div>
              ) : submitStatus === "error" ? (
                /* ERROR STATE */
                <div className={styles.successState} role="alert" aria-live="polite">
                  <div className={styles.successIcon} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#ef4444" }} aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <h3 className={styles.successTitle} style={{ color: "#f87171" }}>Something went wrong</h3>
                  <p className={styles.successText}>
                    The message couldn&apos;t be sent right now. Please try again, or email
                    me directly at{" "}
                    <a href="mailto:anushkaadakofficial@gmail.com" style={{ color: "var(--accent-blue)" }}>
                      anushkaadakofficial@gmail.com
                    </a>.
                  </p>
                  <button
                    className={`${styles.actionBtn} ${styles.copyBtn}`}
                    onClick={() => setSubmitStatus("idle")}
                    id="contact-retry-btn"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                >
                  {/* Name + Email row */}
                  <div className={styles.fieldRow}>
                    <Field
                      id="contact-name"
                      name="name"
                      label="Name"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name ? errors.name : ""}
                      autoComplete="name"
                    />
                    <Field
                      id="contact-email"
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email ? errors.email : ""}
                      autoComplete="email"
                    />
                  </div>

                  <Field
                    id="contact-subject"
                    name="subject"
                    label="Subject"
                    type="text"
                    placeholder="Internship opportunity / Collaboration / …"
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.subject ? errors.subject : ""}
                    autoComplete="off"
                  />

                  <TextareaField
                    id="contact-message"
                    name="message"
                    label="Message"
                    placeholder="Tell me about the opportunity, your idea, or just say hello…"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.message ? errors.message : ""}
                  />

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className={`${styles.submitBtn} ${submitStatus === "submitting" ? styles.submitting : ""}`}
                    disabled={submitStatus === "submitting"}
                    aria-label="Send message"
                  >
                    {submitStatus === "submitting" ? (
                      <>
                        <span className={styles.spinner} aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— FIELD SUBCOMPONENT ——— */
function Field({
  id, name, label, type, placeholder, value, onChange, onBlur, error, autoComplete,
}: {
  id: string; name: string; label: string; type: string; placeholder: string;
  value: string; onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>; error: string; autoComplete?: string;
}) {
  return (
    <div className={styles.fieldWrap}>
      <label htmlFor={id} className={styles.fieldLabel}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        className={`${styles.fieldInput} ${error ? styles.fieldError : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span id={`${id}-error`} className={styles.errorMsg} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

/* ——— TEXTAREA SUBCOMPONENT ——— */
function TextareaField({
  id, name, label, placeholder, value, onChange, onBlur, error,
}: {
  id: string; name: string; label: string; placeholder: string;
  value: string; onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>; error: string;
}) {
  return (
    <div className={styles.fieldWrap}>
      <label htmlFor={id} className={styles.fieldLabel}>{label}</label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={5}
        className={`${styles.fieldInput} ${styles.textarea} ${error ? styles.fieldError : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span id={`${id}-error`} className={styles.errorMsg} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
