export const personalInfo = {
  name: "Israel Araújo",
  fullName: "Israel Araújo de Oliveira",
  title: "Mid-Level Backend / Full-Stack Engineer",
  subtitle: "Building SaaS, integrations, and event-driven systems with Python, TypeScript & AWS",
  location: "Brazil",
  email: "israelaraujodeoliveira@gmail.com",
  linkedin: "https://linkedin.com/in/araisr",
  github: "https://github.com/IsraelAraujo70",
  x: "https://x.com/calop1337",
  whatsapp: "https://wa.me/5535997421900",
};

export const stats = [
  { label: "Years of Professional Experience", value: "3+" },
  { label: "Provider Integrations in Prod", value: "10+" },
  { label: "Production Repos Owned", value: "8" },
  { label: "Promotions in 9 Months", value: "2" },
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
    company: "ComicConnect",
    role: "TypeScript / PHP / Terraform Developer (Contract)",
    period: "Apr 2026 – Present",
    highlights: [
      "Build and operate a full-stack messaging platform using Next.js, TypeScript, AWS Lambda, and a shared-domain monorepo",
      "Designed event-driven processing with DynamoDB transactions, conditional writes, and SQS FIFO ordering to preserve consistency under concurrent requests",
      "Provisioned AWS infrastructure with Terraform across DynamoDB, Lambda, SQS, API Gateway, Cognito, CloudWatch, and IAM",
      "Integrated Twilio messaging and existing PHP/Laravel services through typed boundaries and asynchronous workflows",
      "Established local cloud parity with LocalStack and automated staging and production delivery through CI/CD pipelines",
    ],
  },
  {
    company: "GarantiaBR",
    role: "Full Stack Python Developer",
    period: "Oct 2025 – May 2026",
    highlights: [
      "Stepped into tech lead responsibilities after the previous lead left — took ownership of architectural decisions and mentorship across 8 production repositories",
      "Delivered production changes across backend, frontend, infrastructure, and CI/CD while coordinating concurrent work across the stack",
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
    name: "Notion Clone",
    tagline: "Collaborative Block Workspace",
    description:
      "Portfolio-grade collaborative workspace: block model, LWW operation log, keyboard-first editor, realtime WebSocket sync, permission-scoped search, trash/restore, and AI that writes through the same op path. Rust backend + Next.js frontend + PostgreSQL/pgvector.",
    tech: ["Rust", "Axum", "Next.js", "PostgreSQL", "pgvector"],
    github: "https://github.com/IsraelAraujo70/notion-clone",
    stats: "30 commits · 275 files",
  },
  {
    name: "Drive Clone",
    tagline: "Personal Cloud Storage",
    description:
      "Google Drive-like app with auth, folders, resumable multipart uploads, share by email, trash/restore, filename search, and quota. Rust API (Axum/SQLx) + Next.js; file bytes on S3-compatible storage; Railway-first deploy.",
    tech: ["Rust", "Axum", "Next.js", "PostgreSQL", "S3"],
    github: "https://github.com/IsraelAraujo70/drive-clone",
    stats: "54 commits · 307 files",
  },
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
    name: "Lurian AI",
    tagline: "AI-Powered Personal Finance",
    description:
      "Full stack finance monorepo — React/Vite (web) + Expo (mobile) + Rust API (Axum/SQLx). Multi-tenant workspaces with RBAC, OpenRouter AI via backend, JWT auth, and Kamal deploy.",
    tech: ["Rust", "Axum", "React", "Expo", "PostgreSQL"],
    github: "https://github.com/IsraelAraujo70/lurian-ai",
    stats: "86 commits · monorepo",
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
Mid-Level Backend / Full-Stack Engineer with 3+ years of professional experience. Based in Brazil, fluent in Portuguese and English. Builds production SaaS, integrations, and event-driven systems with Python, TypeScript, and AWS.

## Current Role — ComicConnect (Contract, Apr 2026 – Present)
TypeScript / PHP / Terraform Developer working on a production messaging platform.

Key outcomes:
- Full-stack monorepo: Next.js admin, TypeScript Lambdas, and shared domain types
- Terraform AWS infra: DynamoDB, Lambda, SQS FIFO, API Gateway, Cognito, CloudWatch, IAM
- Consistent concurrent processing through DynamoDB transactions, conditional writes, and SQS FIFO ordering
- Twilio messaging and Laravel/PHP service integration through typed and asynchronous boundaries
- LocalStack development environment and automated CI/CD for staging and production

## Previous — GarantiaBR (Oct 2025 – May 2026)
Full Stack Python Developer. Stepped into tech lead responsibilities when the previous lead left and owned architecture and delivery across 8 production repositories. Left May 29, 2026.

Key outcomes:
- Built multi-tenant SaaS from scratch: row-level security, RBAC with permission matrix, audit logging with real IP propagation, org hierarchy modeling
- Architected integration engine connecting 10+ banking/government providers as AWS Lambda microservices — TLS/SNI handling, Hexagonal Architecture
- AI-powered document extraction pipeline replaced manual form analysis — LLM classification, S3 presigned URLs, automated ingestion
- Billing engine processing per-tenant invoicing via SQS workers with usage tracking
- CI/CD pipeline with AI-powered PR review, weighted scoring, migration detection, security flags

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
1. Notion Clone — Collaborative block workspace (Rust + Axum + Next.js + PostgreSQL/pgvector). Block model, LWW op log, realtime WebSocket sync, search, trash, AI via same op path. 30 commits, 275 files.
2. Drive Clone — Personal cloud storage (Rust + Axum + Next.js + S3 + PostgreSQL). Resumable multipart uploads, folders, share by email, trash, search, quota. 54 commits, 307 files.
3. Prism — Desktop GitHub PR client (Tauri v2 + Rust + TypeScript). Full PR review, unified diffs, multi-line drag-select comments, notification inbox, auto-updates. 61 commits, 94 files.
4. Lurian AI — AI-powered finance monorepo (Rust/Axum API + React/Vite + Expo). Multi-tenant RBAC, OpenRouter via backend, JWT auth, Kamal deploy. 86 commits.
5. Flux-Oriented Architecture — Original backend framework published on npm. Declarative JSON-based flow orchestration, plugin system, CLI with 6 commands, interpolation engine, validator. 15 test files.
6. OpenVoice — Voice-to-clipboard transcription (Rust + Tauri v2 + OpenRouter). Push-to-talk dictation, Wayland-native Linux app.

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
