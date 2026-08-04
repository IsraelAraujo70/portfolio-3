"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import { additionalProjects, featuredProjects } from "@/lib/resume-data";

export function FinderProjects() {
  return (
    <section className="px-6 py-10 md:px-12 border-b border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 className="text-2xl font-bold text-white mb-1">
          Selected work<span className="text-cyan-400">.</span>
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Product problems, engineering decisions, and proof of execution
        </p>
      </motion.div>

      <div className="space-y-5">
        {featuredProjects.map((project, i) => {
          if (!project.caseStudy) return null;

          return (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              style={{ backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }}
              className="liquid-glass-light overflow-hidden rounded-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.07] px-5 py-4 md:px-6">
                <div className="min-w-0">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-400/80">
                    Case study {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg font-bold text-white">{project.name}</h3>
                  <p className="text-xs text-gray-400">{project.tagline}</p>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.name} on GitHub`}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-gray-400 transition-colors hover:border-cyan-400/30 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <GitHubIcon width={14} height={14} />
                  <span className="hidden sm:inline">Source</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>

              <div className="grid gap-6 px-5 py-5 md:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(240px,0.85fr)]">
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-wide text-gray-500">
                    The problem
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {project.caseStudy.problem}
                  </p>

                  <p className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-wide text-gray-500">
                    My contribution
                  </p>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {project.caseStudy.contribution}
                  </p>
                </div>

                <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.035] p-4">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-wide text-cyan-400">
                    Engineering decisions
                  </p>
                  <ul className="space-y-2.5">
                    {project.caseStudy.decisions.map((decision) => (
                      <li key={decision} className="flex gap-2 text-xs leading-relaxed text-gray-300">
                        <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-cyan-400/70" />
                        {decision}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/[0.07] bg-black/10 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] text-gray-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
                <p className="font-mono text-[10px] text-gray-500">
                  {project.caseStudy.evidence}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center gap-3">
          <h3 className="text-sm font-semibold text-white">More work</h3>
          <div className="h-px flex-1 bg-white/[0.07]" />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {additionalProjects.map((project) => (
            <a
              key={project.name}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-light group rounded-xl p-4 transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <h4 className="text-sm font-semibold text-white">{project.name}</h4>
                <ArrowUpRight size={13} className="shrink-0 text-gray-600 transition-colors group-hover:text-cyan-400" />
              </div>
              <p className="mb-3 text-[11px] leading-relaxed text-gray-500">
                {project.tagline}
              </p>
              <p className="font-mono text-[9px] leading-relaxed text-gray-600">
                {project.stats}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
