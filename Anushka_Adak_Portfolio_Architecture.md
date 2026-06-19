# Master Architecture Document: Premium Portfolio for Anushka Adak

## Role & Objective
Act as an elite frontend engineer and UI/UX designer. Build a ultra-premium, modern, highly polished personal portfolio website. The website should feel like a premium SaaS landing page or a highly curated product showcase rather than a typical student portfolio. Every section must be intentional, spacious, and serve a unique purpose with zero information overlap.

## Design System & Visual Identity
- **Theme**: Pure Obsidian Dark Mode.
- **Colors**:
  - Background: `#000000` (Pure Black)
  - Secondary Surface: `#0A0A0C` (Deep Matte Gray)
  - Card Background: `#111115` with subtle backdrop-blur (Glassmorphism)
  - Card Border: `1px solid rgba(255, 255, 255, 0.08)`
  - Primary Text: `#F8FAFC`
  - Secondary Text: `#94A3B8`
  - Primary Accent: `#3B82F6` (Vibrant Blue)
  - Secondary Accent: `#8B5CF6` (Vivid Purple)
  - Highlight Accent: `#06B6D4` (Electric Cyan)
- **Typography**:
  - Headings: 'Cal Sans' (or 'Plus Jakarta Sans' as fallback) - bold, geometric, authoritative.
  - Body Text: 'Poppins' - clean, modern, highly readable.
- **CSS Layout Principle**: Prioritize heavy whitespace and generous, deliberate layout padding. Everything must "breathe." Avoid crowded grids or plastered text elements. 

## Navigation
- Sticky Navbar that transitions into a compact glassmorphic bar on scroll.
- Sections: Home, About, Projects, Recognition, Developer Profile, Contact.
- Right Side: A prominent, styled "Resume" button that opens/downloads her resume instantly.
- Behavior: Impeccable smooth scrolling across all viewports.

---

## SECTION 1 — HERO
- **Purpose**: Establish immediate high-end credibility and identity.
- **Layout**: Asymmetric split screen.
- **Left Column**:
  - Name: Anushka Adak
  - Title: Software Developer • Public Speaker • 2× Smart India Hackathon Finalist
  - Subtitle: Building scalable software, AI-powered systems, and impactful digital experiences that solve real-world problems.
  - Single Call-to-Action: "View Projects" button (Smooth scrolls to Featured Work).
  - Achievement Badges: Subtle, minimal row of tags: `[🏆 SIH Finalist 2024] [🏆 SIH Finalist 2025] [🚀 IDE Bootcamp 2026]`
- **Right Column**: Premium animated profile card.
  - Content: A high-contrast, black-and-white editorial-style portrait with sharp shadows.
  - Effect: Subtly layered over a slowly moving glassmorphic element or ambient back-glow orb to separate it from the pure black background. No text or icons on the image itself.

## SECTION 2 — HIGHLIGHTS
- **Purpose**: Quantifiable impact at an immediate glance.
- **Layout**: Large, borderless metric cards that fade and stagger-animate into view on scroll. 
- **Displays**:
  - 2× Smart India Hackathon Finalist
  - 1× IDE Bootcamp Participant
  - 4+ Featured Projects
  - 200+ GitHub Contributions
  - 100+ DSA Problems Solved
  - AI + Full Stack + Database Systems
  - Public Speaker
- **Strict Constraint**: No links, no buttons, no contact details here. Pure impact data.

## SECTION 3 — ABOUT + TECH ECOSYSTEM
- **Purpose**: Deep-dive into who Anushka is and her capabilities.
- **Layout**: Balanced split layout.
- **Left Column (The Narrative)**:
  - Profile: B.Tech in Computer Science and Business Systems student at Techno Main Salt Lake. Driven by software engineering, full-stack architecture, and building products with real-world utility.
  - Highlight: Emphasize deep system-level logic, backend processing, AI/ML implementations, and her execution mindset—bridging tech with business as demonstrated through her personal entrepreneurial ventures.
- **Right Column (Interactive Tech Ecosystem)**: 
  - Structure: Grouped interactive chip arrays (No generic skill percentage bars).
  - Categories & Tags:
    - Frontend: React, Next.js, Tailwind CSS, shadcn/ui, material-ui,bootstrap
    - Backend: Node.js, Express.js, Java
    - Databases: MongoDB, MySQL, Firebase, TiDB
    - Languages: Java, C++, C, Python, JavaScript, TypeScript
    - Tools: Git, GitHub, Railway, Vercel, Render
    - Core CS: Object-Oriented Programming, Data Structures and Algorithms, Database Management Systems, Computer Networks, Operating Systems, Artificial Intelligence, Machine Learning

## SECTION 4 — FEATURED WORK
- **Purpose**: The visual centerpiece of the portfolio. 
- **Layout**: Alternating full-width project rows with rich spacing. 
- **Features**: Every project card must be fully clickable, redirecting seamlessly to its respective GitHub repository. Descriptions must be extensive, featuring bold text highlights explaining the overarching purpose and technical complexity.
- **Projects**:
  1. **ClassSphere**: A real-time virtual classroom platform supporting live classes, screensharing, attendance tracking, assignments uploads, role-based access and user engagement. Engineered using TypeScript, Next.js, Firebase, WebRTC.
  2. **QuickShow**: High-performance movie booking platform featuring robust state management. Engineered using React, Node.js, Express.js, MySQL, and TiDB Cloud.
  3. **CacheNexus**: An intelligent caching simulator engineered to test, benchmark, and visualize low-level data optimization strategies.
  4. **Iris Classification**: A clean, highly optimized machine learning classification system assessing multivariate data points.

## SECTION 5 — NATIONAL RECOGNITION (CASE STUDY FOCUS)
- **Purpose**: Tell the story behind elite national achievements. Designed like a venture case study.
- **Section Title**: "From Ideas to National Recognition"
- **Narrative Angle**: Expressly highlight her role as the Solution Architect & Designer. Emphasize that her work encompassed the entire lifecycle—mapping systemic solutions, architectural blueprints, and experience design before a single line of code was written, and validating them long after.
- **The Case Studies**:
  - **Smart India Hackathon (SIH) 2024**: Solution Architect for "LawAI" – AI powered Legal Assistant App engineered for the Madhya Pradesh Police.
  - **Smart India Hackathon (SIH) 2025**: Solution Architect for "Nayantra" – A secure, smart, blockchain-driven Direct Benefit Transfer (DBT) system facilitating victims under the PCR and POA Acts.
  - **IDE Bootcamp 2026**: Selected as a pitch-ready team for Keystone Ventures with the startup idea "GhostProof" – An AI-powered web browser extension designed to detect and flag fraudulent job listings.

## SECTION 6 — DEVELOPER PROFILE
- **Purpose**: Provide raw, irrefutable technical credibility.
- **Layout**: Dashboard grid inspired by the clean UI of GitHub and Linear.
- **Requirement**: Must fetch data dynamically via API to show real-time statistics.
  - GitHub: Dynamically pull/display live commit activity graphs, active repository count, and contribution metrics.
  - LeetCode: Real-time counter showing 100+ problems solved alongside a language/difficulty breakdown widget.

## SECTION 7 — ASK ADAK AI
- **Purpose**: Memorable, interactive AI-themed user engagement.
- **Layout**: Floating glassmorphic chat widget.
- **Suggested Quick-Click Prompts Included**:
  - "Tell me about Anushka"
  - "What is your tech stack?"
  - "Tell me about your SIH experience"
  - "What is Nayantra?"
  - "Are you looking for internships?"
  - "Share your entrepreneurship journey / experience" (When clicked, talk about GhostProof).

## SECTION 8 — CONTACT
- **Purpose**: Strict conversion funnel. This is the ONLY section where contact info exists.
- **Headline**: "Let's Build Something Meaningful Together."
- **Subheadline**: "Whether it's an internship opportunity, collaboration, hackathon, or a conversation about technology, I'd love to connect."
- **Left Side (Primary Details)**:
  - 📧 Email | 💼 LinkedIn | 💻 GitHub | 🧩 LeetCode | 📍 Kolkata, India
  - Interactive features: "Copy Email" button & second "Download Resume" button.
- **Right Side (Modern Minimal Form)**:
  - Fields: Name, Email, Subject, Message. Clean focus rings with glow states. Fast, seamless custom success animation on submission.

## Footer
- Ultra-minimal: Anushka Adak | Software Developer • Public Speaker | © 2026. No social links, no clutter.

## Animation System Guidelines
- **Allowed**: Smooth scroll-driven page fades, subtle Y-axis transitions (translating up 15px), stagger-loaded grid elements, and premium light glare/border shifts on card hover states.
- **Prohibited**: Heavy bounce physics, chaotic layout shifts, rotation transitions, or animations that slow down readability or performance.
