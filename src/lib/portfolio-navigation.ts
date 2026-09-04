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
