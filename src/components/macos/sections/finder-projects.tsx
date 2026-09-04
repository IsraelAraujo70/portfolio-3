"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Code2,
  FileCode2,
  Folder,
  Layers,
  HardDrive,
  Workflow,
  PanelTop,
} from "lucide-react";
import { additionalProjects, featuredProjects } from "@/lib/resume-data";

const projectIcons = [Layers, HardDrive, Workflow];

/** File selection shows one case study in place, without hiding the other projects. */
export function FinderProjects() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = featuredProjects[selectedIndex];

  return (
    <section
      className="project-library"
      aria-labelledby="project-library-title"
    >
      <div className="project-library-heading">
        <div>
          <h2 id="project-library-title">Selected work</h2>
          <p>A few things I&apos;ve built, from the ground up.</p>
        </div>
        <span className="project-count">
          <Folder size={14} /> {featuredProjects.length} projects
        </span>
      </div>
      <div
        className="project-files"
        role="group"
        aria-label="Choose a project to preview"
      >
        {featuredProjects.map((project, index) => {
          const Icon = projectIcons[index] ?? Code2;
          return (
            <button
              key={project.name}
              type="button"
              className="project-file"
              aria-pressed={index === selectedIndex}
              aria-controls="project-preview"
              onClick={() => setSelectedIndex(index)}
            >
              <span className="project-folder" aria-hidden="true">
                <Icon strokeWidth={1.8} />
              </span>
              <span className="project-file-name">{project.name}</span>
              <span className="project-file-kind">{project.tagline}</span>
            </button>
          );
        })}
      </div>
      {selected && (
        <article
          id="project-preview"
          className="project-preview"
          aria-labelledby="project-preview-title"
          aria-live="polite"
        >
          <div className="project-preview-bar">
            <span>
              <PanelTop size={14} /> Quick Look
            </span>
            <a
              className="mac-button"
              href={selected.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${selected.name} source on GitHub`}
            >
              <Code2 size={13} /> View source <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="project-preview-body">
            <h3 id="project-preview-title" className="project-preview-title">
              {selected.name}
            </h3>
            <p className="project-preview-description">
              {selected.description}
            </p>
            <div className="project-tech">
              {selected.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            {selected.caseStudy && (
              <div className="project-case">
                <div>
                  <h4>The problem</h4>
                  <p>{selected.caseStudy.problem}</p>
                  <h4>My contribution</h4>
                  <p>{selected.caseStudy.contribution}</p>
                </div>
                <div>
                  <h4>Engineering decisions</h4>
                  <ul>
                    {selected.caseStudy.decisions.map((decision) => (
                      <li key={decision}>
                        <Check size={13} />
                        {decision}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <p className="project-evidence">
            {selected.caseStudy?.evidence ?? selected.stats}
          </p>
        </article>
      )}
      <div className="project-more" aria-label="More projects">
        {additionalProjects.map((project) => (
          <a
            key={project.name}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileCode2 size={23} strokeWidth={1.3} />
            <span>
              <strong>{project.name}</strong>
              <small>{project.tagline}</small>
            </span>
            <ArrowUpRight size={14} />
          </a>
        ))}
      </div>
    </section>
  );
}
