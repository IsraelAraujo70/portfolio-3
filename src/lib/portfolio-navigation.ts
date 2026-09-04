import type { PortfolioProject } from "./resume-data";

export const portfolioSections = {
  hero: "Overview",
  projects: "Projects",
  about: "About Israel",
  experience: "Experience",
  opensource: "Open source",
  contact: "Contact",
} as const;

export const projectFocuses = ["overview", "tech", "decisions"] as const;

export type PortfolioAction =
  | { type: "showProject"; projectId: string; focus: typeof projectFocuses[number] }
  | { type: "showSection"; section: keyof typeof portfolioSections };

export interface NavigationResult {
  title: string;
  detail: string;
}

export type NavigatePortfolio = (action: PortfolioAction) => Promise<NavigationResult>;

export interface NavigationRequest {
  id: string;
  action: PortfolioAction;
}

export interface PortfolioTour {
  title: string;
  steps: Array<{
    title: string;
    narration: string;
    destination: PortfolioAction;
  }>;
}

export interface TourContext {
  destinations: PortfolioAction[];
  index: number;
}

function parseDestination(value: unknown, projects: readonly PortfolioProject[]): PortfolioAction {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid tour destination.");
  }
  const { type, ...input } = value as Record<string, unknown>;
  if (typeof type !== "string") throw new Error("Missing tour destination.");
  return parsePortfolioAction(type, input, projects);
}

function tourText(value: unknown, maxLength: number): string {
  if (typeof value !== "string" || !value.trim() || value.length > maxLength) {
    throw new Error("Tour text is missing or too long.");
  }
  return value.trim();
}

/** Validate the entire generated route before opening any destination. */
export function parsePortfolioTour(value: unknown, projects: readonly PortfolioProject[]): PortfolioTour {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid tour.");
  }
  const fields = value as Record<string, unknown>;
  if (!Array.isArray(fields.steps) || fields.steps.length < 1 || fields.steps.length > 4 ||
      Object.keys(fields).some((key) => key !== "title" && key !== "steps")) {
    throw new Error("A tour needs one to four stops.");
  }
  const seen = new Set<string>();
  const steps = fields.steps.map((value: unknown) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid tour stop.");
    const step = value as Record<string, unknown>;
    if (Object.keys(step).some((key) => !["title", "narration", "destination"].includes(key))) {
      throw new Error("Invalid tour stop fields.");
    }
    const destination = parseDestination(step.destination, projects);
    const target = navigationTarget(destination);
    if (seen.has(target)) throw new Error("Tour stops must be distinct.");
    seen.add(target);
    return {
      title: tourText(step.title, 70),
      narration: tourText(step.narration, 500),
      destination,
    };
  });
  return { title: tourText(fields.title, 80), steps };
}

/** Accept navigation context only; caller-provided prose never becomes verified facts. */
export function parseTourContext(value: unknown, projects: readonly PortfolioProject[]): TourContext | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const fields = value as Record<string, unknown>;
  if (!Array.isArray(fields.destinations) || fields.destinations.length < 1 || fields.destinations.length > 4 ||
      !Number.isInteger(fields.index) || typeof fields.index !== "number" ||
      fields.index < 0 || fields.index >= fields.destinations.length) return null;
  try {
    return { index: fields.index, destinations: fields.destinations.map((item: unknown) => parseDestination(item, projects)) };
  } catch {
    return null;
  }
}

/** Validate model and restored-card inputs against destinations that actually exist. */
export function parsePortfolioAction(
  name: string,
  input: unknown,
  projects: readonly PortfolioProject[],
): PortfolioAction {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Invalid navigation request.");
  }
  const fields = input as Record<string, unknown>;
  if (name === "showSection" && typeof fields.section === "string" &&
      Object.hasOwn(portfolioSections, fields.section) &&
      Object.keys(fields).every((key) => key === "section")) {
    return { type: name, section: fields.section as keyof typeof portfolioSections };
  }
  if (name === "showProject" && typeof fields.projectId === "string" &&
      typeof fields.focus === "string" &&
      projectFocuses.some((focus) => focus === fields.focus) &&
      Object.keys(fields).every((key) => key === "projectId" || key === "focus")) {
    const project = projects.find((candidate) => candidate.id === fields.projectId);
    if (project && (fields.focus !== "decisions" || project.caseStudy)) {
      return { type: name, projectId: project.id, focus: fields.focus as typeof projectFocuses[number] };
    }
  }
  throw new Error("This portfolio destination is unavailable.");
}

/** Resolve only application-owned element IDs, never model-provided selectors. */
export function navigationTarget(action: PortfolioAction): string {
  return action.type === "showSection"
    ? `finder-${action.section}`
    : `project-${action.projectId}-${action.focus}`;
}

/** Describe the destination using portfolio facts after the UI confirms navigation. */
export function navigationResult(action: PortfolioAction, projects: readonly PortfolioProject[]): NavigationResult {
  if (action.type === "showSection") {
    return { title: portfolioSections[action.section], detail: "Section opened in Portfolio." };
  }
  const project = projects.find((candidate) => candidate.id === action.projectId);
  if (!project) throw new Error("Project unavailable.");
  return { title: project.name, detail: action.focus === "tech" ? project.tech.join(" · ") : project.tagline };
}
