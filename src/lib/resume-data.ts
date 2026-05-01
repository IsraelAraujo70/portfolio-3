export const personalInfo = {
  name: "Israel Araújo",
  fullName: "Israel Araújo de Oliveira",
  title: "Full Stack Engineer",
  subtitle: "Building production systems with Python, TypeScript, Go & Rust",
  location: "Brazil",
  email: "israelaraujodeoliveira@gmail.com",
  linkedin: "https://linkedin.com/in/araisr",
  github: "https://github.com/IsraelAraujo70",
  x: "https://x.com/calop1337",
};

export const stats = [
  { label: "PRs Shipped at Current Role", value: "438" },
  { label: "Stars in OSS Repos I Contributed To", value: "255k+" },
  { label: "Provider Integrations in Prod", value: "10+" },
  { label: "Production Repos Owned", value: "8" },
];

export const skillCategories = [
  { name: "Languages", items: ["Python", "TypeScript", "Go", "Rust", "PHP", "SQL"] },
  { name: "Backend", items: ["Django", "FastAPI", "Node.js", "Serverless", "GraphQL", "WebSockets"] },
  { name: "Frontend", items: ["React", "Next.js", "Tauri v2", "Wails"] },
  { name: "AI & LLMs", items: ["Claude API", "OpenAI", "OpenRouter", "RAG", "Document Extraction"] },
  { name: "Cloud & DevOps", items: ["AWS Lambda", "DynamoDB", "S3", "SQS", "Terraform", "Docker", "GitHub Actions"] },
  { name: "Architecture", items: ["Hexagonal", "Clean Architecture", "DDD", "Microservices", "Event-Driven"] },
  { name: "Databases", items: ["PostgreSQL", "DynamoDB", "Redis", "SQLite"] },
];

export const experience = [
  {
    company: "GarantiaBR",
    role: "Full Stack Python Developer",
    period: "Oct 2025 – Present",
    highlights: [
      "Stepped into tech lead responsibilities after the previous lead left — took ownership of architectural decisions and mentorship across 8 production repositories",
      "Shipped 438 PRs in 6 months across backend, frontend, infra, and CI/CD — averaging ~3 PRs/day across the stack",
      "Built a multi-tenant SaaS from scratch: row-level security, RBAC with permission matrix, audit logging with real IP propagation, and organizational hierarchy modeling",
      "Architected integration engine connecting 10+ banking and government providers as AWS Lambda microservices — TLS/SNI handling, async flows, domain adapters (Hexagonal Architecture)",
      "Built AI-powered document extraction pipeline that replaced manual form analysis — LLM classification, S3 presigned URLs, automated ingestion",
      "Engineered billing engine processing per-tenant invoicing via SQS workers with usage tracking and consumption summaries",
      "Designed CI/CD pipeline with AI-powered PR review, weighted scoring for PR sizing, migration detection, and security review flags",
    ],
  },
  {
    company: "AdaSistemas",
    role: "Junior → Mid-Level Developer → Project Coordinator",
    period: "Jan 2025 – Oct 2025",
    highlights: [
      "Promoted twice in 9 months — Junior to Mid-Level in 4 months, then to Project Coordinator",
      "Built secure REST APIs for banking integration processing real financial transactions in production",
      "Introduced E2E testing with Cypress to a legacy codebase with zero test coverage — caught 3 production regressions before deploy",
      "Led technical coordination: sprint planning, code review, and architectural decisions for the team",
    ],
  },
  {
    company: "Freelance",
    role: "Frontend Developer",
    period: "Jun 2023 – Jun 2025",
    highlights: [
      "Delivered React.js applications for clients focusing on performance and accessibility",
      "Integrated third-party APIs and built automated test suites with Jest",
    ],
  },
];

export const projects = [
  {
    name: "Prism",
    tagline: "Desktop GitHub PR Client",
    description:
      "Full PR review with unified diffs, multi-line drag-select comments, notification inbox with deduplication, and auto-updates. Cross-platform release pipeline via GitHub Actions.",
    tech: ["Tauri v2", "Rust", "TypeScript", "GitHub Actions"],
    github: "https://github.com/IsraelAraujo70/prism",
    stats: "61 commits · 94 files",
  },
  {
    name: "Flux-Oriented Architecture",
    tagline: "Backend Flow Orchestration Framework",
    description:
      "Original framework with declarative JSON-based flow orchestration, plugin system (auth, cache, database, email), CLI with 6 commands, interpolation engine, and validator.",
    tech: ["TypeScript", "Node.js", "npm"],
    github: "https://github.com/IsraelAraujo70/flux-oriented-architecture",
    stats: "Published on npm · 15 test files",
  },
  {
    name: "Money-2099",
    tagline: "AI-Powered Personal Finance",
    description:
      "Full stack monorepo — Next.js (web) + React Native (mobile) + Convex (serverless). AI financial assistant via OpenRouter, auto-categorization, budgets, debts, investments.",
    tech: ["Next.js", "React Native", "Convex", "OpenRouter"],
    github: "https://github.com/IsraelAraujo70/money-2099",
    stats: "251 files · 56 commits",
  },
  {
    name: "OpenVoice",
    tagline: "Voice-to-Clipboard Transcription",
    description:
      "Push-to-talk dictation app for Linux using OpenRouter API and Tauri v2. Wayland-native, lightweight, always-on.",
    tech: ["Rust", "Tauri v2", "OpenRouter"],
    github: "https://github.com/IsraelAraujo70/openvoice",
    stats: "Desktop app · Wayland-native",
  },
];

export const openSourceContributions = [
  {
    project: "OpenCode",
    description: "The open source coding agent — 152k+ stars",
    stars: "152k+",
    language: "TypeScript",
    url: "https://github.com/anomalyco/opencode",
    prs: [
      {
        title: "Multi-account support with auto-rotation",
        url: "https://github.com/anomalyco/opencode/pull/13378",
      },
      {
        title: "Native Wayland toggle on Linux",
        url: "https://github.com/anomalyco/opencode/pull/11971",
      },
      {
        title: "Clean up orphaned sidecar processes on Linux",
        url: "https://github.com/anomalyco/opencode/pull/11961",
      },
      {
        title: "Fix long session titles from wrapping",
        url: "https://github.com/anomalyco/opencode/pull/8960",
      },
    ],
  },
  {
    project: "Zed Editor",
    description: "High-performance code editor from the creators of Atom and Tree-sitter",
    stars: "80k+",
    language: "Rust",
    url: "https://github.com/zed-industries/zed",
    prs: [
      {
        title: "Git graph view implementation",
        url: "https://github.com/zed-industries/zed/pull/43106",
      },
      {
        title: "Add Minimal Mode (file finder + terminal support)",
        url: "https://github.com/zed-industries/zed/pull/49144",
      },
      {
        title: "File finder with preview and tree browsing",
        url: "https://github.com/zed-industries/zed/pull/49711",
      },
    ],
  },
  {
    project: "T3Code",
    description: "AI coding tool by Ping.gg",
    stars: "10.7k",
    language: "TypeScript",
    url: "https://github.com/pingdotgg/t3code",
    prs: [
      {
        title: "Add Debian desktop packaging support",
        url: "https://github.com/pingdotgg/t3code/pull/544",
      },
      {
        title: "Fix Codex app-server enum serialization",
        url: "https://github.com/pingdotgg/t3code/pull/541",
      },
    ],
  },
  {
    project: "opencode-antigravity-auth",
    description: "OAuth plugin for OpenCode with Google credentials",
    stars: "10.3k",
    language: "TypeScript",
    url: "https://github.com/NoeFabris/opencode-antigravity-auth",
    prs: [
      {
        title: "Treat 'Resource exhausted' as temporary capacity error",
        url: "https://github.com/NoeFabris/opencode-antigravity-auth/pull/194",
      },
    ],
  },
];

export const education = [
  { degree: "BSc Software Engineering", institution: "UNINTER", period: "2025 – 2029" },
  { degree: "BSc Science and Technology", institution: "UNIFAL", period: "2022 – 2025" },
  { degree: "Full Stack Python Development", institution: "EBAC", period: "2024 – 2025" },
];

export const systemPrompt = `You are the AI assistant on Israel Araújo's portfolio website. You represent Israel and answer questions about his professional experience, skills, projects, and background. Speak naturally and with personality — you're helpful, enthusiastic about technology, and concise.

## About Israel
Full Stack Software Engineer with 2+ years of experience. Based in Brazil, fluent in Portuguese and English. Ships production systems in Python, TypeScript, Go, and Rust. Open source contributor to repos with 255k+ combined stars.

## Current Role — GarantiaBR (Oct 2025 – Present)
Full Stack Python Developer. Stepped into tech lead responsibilities when the previous lead left — had the deepest context on business and codebase. Owns 8 production repositories. Shipped 438 PRs in 6 months across backend, frontend, infra, and CI/CD.

Key outcomes:
- Built multi-tenant SaaS from scratch: row-level security, RBAC with permission matrix, audit logging with real IP propagation, org hierarchy modeling
- Architected integration engine connecting 10+ banking/government providers as AWS Lambda microservices — TLS/SNI handling, Hexagonal Architecture
- AI-powered document extraction pipeline replaced manual form analysis — LLM classification, S3 presigned URLs, automated ingestion
- Billing engine processing per-tenant invoicing via SQS workers with usage tracking
- CI/CD pipeline with AI-powered PR review, weighted scoring, migration detection, security flags
- RPA engine with Playwright + residential proxy for automated data retrieval from external portals

## Previous — AdaSistemas (Jan–Oct 2025)
Promoted twice in 9 months (Junior → Mid → Project Coordinator). Built banking integration APIs processing real financial transactions. Introduced E2E testing with Cypress to a zero-coverage codebase — caught 3 production regressions before deploy. Led sprint planning and architectural decisions.

## Previous — Freelance (Jun 2023 – Jun 2025)
Frontend Developer. React.js apps, REST API integrations, Jest testing.

## Tech Stack
Languages: Python, TypeScript, Go, Rust, PHP, SQL
Backend: Django, FastAPI, Node.js, Serverless Framework, GraphQL, WebSockets
Frontend: React, Next.js, Tauri v2, Wails
AI/LLMs: Claude API, OpenAI API, OpenRouter, RAG, prompt engineering, document extraction
Cloud: AWS (Lambda, DynamoDB, S3, SQS, SNS, Cognito), Terraform, Docker, GitHub Actions
Architecture: Hexagonal, Clean Architecture, DDD, Microservices, Serverless, Event-Driven
Databases: PostgreSQL, DynamoDB, Redis, SQLite
Testing: pytest, Jest, Cypress, Playwright, E2E, TDD

## Notable Projects
1. Prism — Desktop GitHub PR client (Tauri v2 + Rust + TypeScript). Full PR review, unified diffs, multi-line drag-select comments, notification inbox, auto-updates. 61 commits, 94 files.
2. Flux-Oriented Architecture — Original backend framework published on npm. Declarative JSON-based flow orchestration, plugin system, CLI with 6 commands, interpolation engine, validator. 15 test files.
3. Money-2099 — AI-powered finance app (Next.js + React Native + Convex + OpenRouter). AI financial assistant, auto-categorization, budgets, debts, investments. 251 files.
4. OpenVoice — Voice-to-clipboard transcription (Rust + Tauri v2 + OpenRouter). Push-to-talk dictation, Wayland-native Linux app.

## Open Source (11 PRs to repos with 255k+ combined stars)
- OpenCode (TypeScript, 152k+ stars): 4 PRs — multi-account auth with auto-rotation, native Wayland toggle, orphaned sidecar cleanup, UI fix
- Zed Editor (Rust, 80k+ stars): 3 PRs — git graph view, minimal mode, file finder with preview/tree browsing
- T3Code (TypeScript, 10.7k stars): 2 PRs — Debian packaging, enum serialization fix
- opencode-antigravity-auth (10.3k stars): 1 PR — resource exhaustion handling

## Education
- BSc Software Engineering — UNINTER (2025–2029)
- BSc Science and Technology — UNIFAL (2022–2025)
- Full Stack Python — EBAC (2024–2025)

## Guidelines
- Answer in the same language the visitor uses (default to English)
- Keep responses under 150 words unless more detail is needed
- Be friendly and show genuine enthusiasm for tech
- If asked about availability: Israel is open to new opportunities, especially international/remote positions
- If asked something not covered here, say so honestly
- Never invent or exaggerate facts — all stats are verifiable on GitHub`;
