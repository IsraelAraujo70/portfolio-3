"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import { projects } from "@/lib/resume-data";

export function FinderProjects() {
  return (
    <section className="px-8 py-10 md:px-12 border-b border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 className="text-2xl font-bold text-white mb-1">
          Projects<span className="text-cyan-400">.</span>
        </h2>
        <p className="text-gray-500 text-sm mb-6">Things I&apos;ve built from scratch</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05 }}
            style={{backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)"}} className="liquid-glass-light rounded-xl p-5 flex flex-col hover:bg-white/[0.08] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-white">{project.name}</h3>
                <p className="text-cyan-400 text-xs">{project.tagline}</p>
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors shrink-0 ml-3"
              >
                <GitHubIcon width={16} height={16} />
              </a>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed mb-3 flex-1">
              {project.description}
            </p>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-gray-600 font-mono">{project.stats}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
