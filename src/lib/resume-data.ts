export const personalInfo = {
  name: "Israel Araújo",
  fullName: "Israel Araújo de Oliveira",
  title: "Full Stack Engineer",
  subtitle: "TypeScript · Node.js · Python · AWS",
  summary:
    "I build production SaaS, integrations, event-driven systems, and AI-assisted workflows from API design to cloud delivery.",
  location: "Brazil",
  email: "israelaraujodeoliveira@gmail.com",
  linkedin: "https://linkedin.com/in/araisr",
  github: "https://github.com/IsraelAraujo70",
  x: "https://x.com/calop1337",
  whatsapp: "https://wa.me/5535997421900",
};

export const stats = [
  { label: "Professional experience", value: "3+ yrs" },
  { label: "Provider integrations", value: "10+" },
  { label: "Junior to mid-level", value: "4 mo" },
  { label: "Working languages", value: "PT · EN" },
];

export const skillCategories = [
  { name: "Core", items: ["TypeScript", "Python", "Node.js", "AWS", "SQL", "PHP"] },
  { name: "Backend", items: ["Django", "FastAPI", "REST APIs", "Serverless", "GraphQL", "WebSockets"] },
  { name: "Frontend", items: ["React", "Next.js", "AngularJS", "Tailwind CSS"] },
  { name: "AI & LLMs", items: ["OpenAI", "OpenRouter", "RAG", "Document Extraction", "Human Review"] },
  { name: "Cloud & DevOps", items: ["AWS Lambda", "DynamoDB", "S3", "SQS", "SNS", "Terraform", "Docker", "GitHub Actions"] },
  { name: "Architecture", items: ["Multi-tenant SaaS", "Hexagonal", "RBAC", "Event-Driven", "Audit Logging"] },
  { name: "Databases", items: ["PostgreSQL", "DynamoDB", "Redis", "SQLite"] },
  { name: "Additional", items: ["Go", "Rust", "Tauri v2"] },
];

export const experience = [
  {
    company: "ComicConnect",
    role: "Full Stack Software Engineer",
    stack: "TypeScript · PHP · Terraform · AWS",
    period: "Apr 2026 – Present",
    highlights: [
      "Builds and operates a full-stack messaging platform that processes live communication workflows in production",
      "Structures a Next.js and TypeScript monorepo around a shared domain layer, keeping business rules consistent across frontend and backend",
      "Designs event-driven processing with DynamoDB transactions, conditional writes, and SQS FIFO ordering for concurrent workflows",
      "Provisions AWS infrastructure with Terraform and connects Twilio messaging to an existing Laravel/PHP platform",
    ],
  },
  {
    company: "GarantiaBR",
    role: "Full Stack Python Developer → Technical Lead",
    stack: "Python · AWS · Multi-tenant SaaS · AI",
    period: "Oct 2025 – May 2026",
    highlights: [
      "Took on technical leadership after four months, supporting architecture decisions, code review, and mentoring",
      "Architected an integration engine connecting 10+ banking, government, and accounting providers through Python services and AWS Lambda",
      "Built a multi-tenant SaaS platform with granular RBAC, multi-step onboarding, organizational hierarchy, and audit logging",
      "Delivered LLM-assisted document extraction plus event-driven billing and notifications with S3, SQS, and SNS",
    ],
  },
  {
    company: "AdaSistemas",
    role: "Junior → Mid-Level Full Stack Developer",
    stack: "PHP · PostgreSQL · AngularJS · Cypress",
    period: "Jan 2025 – Oct 2025",
    highlights: [
      "Promoted from junior to mid-level within four months, taking on code review and technical decision support",
      "Built secure REST APIs for banking integrations and financial transaction processing with PHP and PostgreSQL",
      "Introduced Cypress E2E testing to a large legacy application, increasing release confidence and regression detection",
      "Delivered production features and internal automations across AngularJS, PHP, and PostgreSQL",
    ],
  },
  {
    company: "Freelance",
    role: "Frontend Developer",
    stack: "React · REST APIs · Jest",
    period: "Jun 2023 – Jun 2025",
    highlights: [
      "Developed React applications for multiple clients with a focus on performance and accessibility",
      "Integrated third-party APIs with explicit data and error handling",
      "Implemented Jest tests and managed delivery timelines and client communication independently",
    ],
  },
];

export interface PortfolioProject {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  github: string;
  stats: string;
  featured: boolean;
  caseStudy?: {
    problem: string;
    decisions: string[];
    contribution: string;
    evidence: string;
  };
}

export const projects: PortfolioProject[] = [
  {
    name: "Reason",
    tagline: "Collaborative AI Workspace",
    description:
      "A collaborative workspace where realtime editing, permission-scoped search, and AI-assisted writing share one consistent operation model.",
    tech: ["Rust", "Axum", "Next.js", "PostgreSQL", "pgvector"],
    github: "https://github.com/IsraelAraujo70/notion-clone",
    stats: "Realtime collaboration · AI on the same write path",
    featured: true,
    caseStudy: {
      problem:
        "Collaborative editors often bolt AI onto the product, creating a second write path that can bypass permissions and history.",
      decisions: [
        "Use an LWW operation log as the shared model for human and AI edits",
        "Scope search and mutations to workspace permissions",
        "Keep the keyboard-first editor synchronized over WebSockets",
      ],
      contribution:
        "Designed and implemented the product end to end across the editor, realtime protocol, search, AI tools, Rust API, and PostgreSQL data model.",
      evidence: "Block model · WebSocket sync · pgvector search · trash/restore",
    },
  },
  {
    name: "Drive Clone",
    tagline: "Cloud Storage Platform",
    description:
      "A full-stack storage product with authorization, resumable uploads, sharing, search, quota enforcement, and S3-compatible object storage.",
    tech: ["Rust", "Axum", "Next.js", "PostgreSQL", "S3"],
    github: "https://github.com/IsraelAraujo70/drive-clone",
    stats: "Resumable uploads · Permission-scoped search · Quotas",
    featured: true,
    caseStudy: {
      problem:
        "Large uploads and shared folders need to survive interrupted connections without weakening authorization or storage limits.",
      decisions: [
        "Separate file metadata in PostgreSQL from bytes in object storage",
        "Use resumable multipart uploads for unreliable networks",
        "Enforce permissions, trash lifecycle, and quotas at the API boundary",
      ],
      contribution:
        "Built the authorization model, storage API, upload lifecycle, search, sharing, background work, and responsive Next.js interface.",
      evidence: "Multipart upload · S3-compatible storage · PostgreSQL metadata",
    },
  },
  {
    name: "Flux-Oriented Architecture",
    tagline: "Backend Flow Orchestration",
    description:
      "A TypeScript framework for composing backend workflows from declarative flows, reusable plugins, validation, and a focused CLI.",
    tech: ["TypeScript", "Node.js", "npm"],
    github: "https://github.com/IsraelAraujo70/flux-oriented-architecture",
    stats: "Declarative flows · Plugin contracts · CLI tooling",
    featured: true,
    caseStudy: {
      problem:
        "Backend products repeatedly wire authentication, caching, data access, and delivery steps with little reuse or visibility into the full flow.",
      decisions: [
        "Represent workflows as validated declarative JSON",
        "Expose capabilities through small plugin contracts",
        "Ship a CLI for creation, validation, and execution workflows",
      ],
      contribution:
        "Created the architecture, interpolation and validation engines, plugin model, CLI, documentation, and npm release workflow.",
      evidence: "Published npm package · Extensible plugins · Automated tests",
    },
  },
  {
    name: "Prism",
    tagline: "Desktop GitHub PR Client",
    description:
      "Full PR review with unified diffs, multi-line drag-select comments, notification inbox with deduplication, and auto-updates. Cross-platform release pipeline via GitHub Actions.",
    tech: ["Tauri v2", "Rust", "TypeScript", "GitHub Actions"],
    github: "https://github.com/IsraelAraujo70/prism",
    stats: "Unified diffs · Review comments · Cross-platform releases",
    featured: false,
  },
  {
    name: "Lurian AI",
    tagline: "AI-Powered Personal Finance",
    description:
      "Full stack finance monorepo — React/Vite (web) + Expo (mobile) + Rust API (Axum/SQLx). Multi-tenant workspaces with RBAC, OpenRouter AI via backend, JWT auth, and Kamal deploy.",
    tech: ["Rust", "Axum", "React", "Expo", "PostgreSQL"],
    github: "https://github.com/IsraelAraujo70/lurian-ai",
    stats: "Multi-tenant RBAC · Web and mobile · AI via backend",
    featured: false,
  },
  {
    name: "OpenVoice",
    tagline: "Voice-to-Clipboard Transcription",
    description:
      "Push-to-talk dictation app for Linux using OpenRouter API and Tauri v2. Wayland-native, lightweight, always-on.",
    tech: ["Rust", "Tauri v2", "OpenRouter"],
    github: "https://github.com/IsraelAraujo70/openvoice",
    stats: "Push-to-talk · Wayland-native · Voice to clipboard",
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const additionalProjects = projects.filter((project) => !project.featured);

export const openSourceContributions = [
  {
    project: "OpenCode",
    description: "Open source coding agent",
    stars: null,
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
    stars: null,
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
    stars: null,
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
    stars: null,
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

export const systemPrompt = `You are the AI assistant on Israel Araújo's portfolio website. You represent Israel and answer questions about his professional experience, skills, projects, and background. Speak naturally, be concise, and prioritize verified facts.

## About Israel
Mid-level Full Stack Engineer with 3+ years of professional software development experience. Based in Brazil, native in Portuguese and professionally proficient in English. Builds production SaaS, integrations, and asynchronous workflows with TypeScript, Node.js, Python, and AWS. Works end to end across APIs, cloud infrastructure, testing, CI/CD, observability, and AI-assisted document workflows.

## Current Role - ComicConnect (Apr 2026 - Present)
Full Stack Software Engineer working with TypeScript, PHP, Terraform, and AWS on a production messaging platform.

Key outcomes:
- Next.js and TypeScript monorepo with a shared domain layer
- Event-driven processing with DynamoDB transactions, conditional writes, and SQS FIFO ordering
- AWS infrastructure provisioned with Terraform
- Twilio messaging integrated with an existing Laravel/PHP platform
- Reproducible local and CI/CD environments with LocalStack and Buddy

## Previous - GarantiaBR (Oct 2025 - May 2026)
Full Stack Python Developer who took on technical leadership after four months.

Key outcomes:
- Integration engine connecting 10+ banking, government, and accounting providers through Python services and AWS Lambda
- Multi-tenant SaaS with granular RBAC, onboarding, organizational hierarchy, and audit logging
- LLM-assisted document extraction with schema validation, S3 uploads, and human-review fallback
- Event-driven billing and notification workflows using SQS and SNS

## Previous - AdaSistemas (Jan 2025 - Oct 2025)
Promoted from junior to mid-level within four months. Built secure banking integration APIs with PHP and PostgreSQL, introduced Cypress E2E testing, and delivered production features across a large legacy application.

## Previous - Freelance (Jun 2023 - Jun 2025)
Frontend Developer delivering React applications, third-party API integrations, Jest tests, and direct client communication.

## Tech Stack
Core: TypeScript, Python, Node.js, AWS, SQL, PHP
Backend and frontend: Django, FastAPI, REST APIs, React, Next.js, AngularJS
AI: OpenAI, OpenRouter, RAG, LLM-assisted document extraction, human-review workflows
Cloud: AWS Lambda, DynamoDB, S3, SQS, SNS, Cognito, Terraform, Docker, GitHub Actions
Architecture: Multi-tenant SaaS, Hexagonal Architecture, RBAC, audit logging, event-driven systems
Databases: PostgreSQL, DynamoDB, Redis, SQLite
Additional working knowledge: Go, Rust, Tauri v2

## Selected Work
1. Reason - Collaborative AI workspace. Uses a block model, LWW operation log, realtime WebSocket sync, permission-scoped search, trash and restore, and AI that writes through the same operation path. Built with Rust, Axum, Next.js, PostgreSQL, and pgvector.
2. Drive Clone - Cloud storage platform with authorization, folders, sharing, resumable multipart uploads, quota enforcement, permission-scoped search, background jobs, PostgreSQL metadata, and S3-compatible object storage.
3. Flux-Oriented Architecture - TypeScript and Node.js framework published on npm for declarative backend workflows, plugin contracts, interpolation, validation, and CLI tooling.

## Open Source
Accepted contributions to OpenCode, Zed Editor, T3Code, and opencode-antigravity-auth. Work includes authentication, Linux and Wayland support, Git tooling, Debian packaging, serialization fixes, and capacity-error handling. The portfolio links directly to each pull request.

## Education
- BSc Software Engineering - UNINTER (2025-2029)
- Science and Technology studies - UNIFAL (2022-2025, not concluded)
- Full Stack Python Development - EBAC (2024-2025)

## Guidelines
- Answer in the same language the visitor uses (default to English)
- Keep responses under 150 words unless more detail is needed
- If asked about availability: Israel is open to new opportunities, especially international/remote positions
- If asked something not covered here, say so honestly
- Never invent or exaggerate facts. Do not infer metrics that are not stated here`;
