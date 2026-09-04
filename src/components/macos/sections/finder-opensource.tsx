"use client";

import { motion } from "framer-motion";
import { GitPullRequest, ExternalLink } from "lucide-react";
import { openSourceContributions } from "@/lib/resume-data";

/** Present the existing portfolio content in the shared portfolio surface. */
export function FinderOpenSource() {
  return (
    <section className="px-8 py-10 @2xl:px-12 border-b border-mac-line">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 className="text-2xl font-bold text-mac-ink mb-1">Open Source</h2>
        <p className="text-mac-muted text-sm mb-6">
          Accepted contributions with direct evidence
        </p>
      </motion.div>

      <div className="space-y-4">
        {openSourceContributions.map((contrib, i) => (
          <motion.div
            key={contrib.project}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05 }}
            className="portfolio-card rounded-xl p-5"
          >
            <div className="flex flex-col gap-2 mb-4 @2xl:flex-row @2xl:items-center @2xl:justify-between">
              <div>
                <h3 className="text-base font-bold text-mac-ink">
                  {contrib.project}
                </h3>
                <p className="mt-0.5 text-xs text-mac-muted">
                  {contrib.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-mac-surface border border-mac-line text-mac-secondary">
                  {contrib.language}
                </span>
                <span className="font-mono text-[10px] text-mac-blue">
                  {contrib.prs.length} linked PR
                  {contrib.prs.length === 1 ? "" : "s"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {contrib.prs.map((pr) => (
                <div key={pr.title} className="flex items-start gap-2 group">
                  <GitPullRequest
                    size={13}
                    className="text-mac-blue mt-0.5 shrink-0"
                  />
                  {pr.url ? (
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-mac-secondary hover:text-mac-blue transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mac-blue rounded-sm"
                    >
                      {pr.title}
                      <ExternalLink
                        size={10}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  ) : (
                    <span className="text-xs text-mac-secondary">
                      {pr.title}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {contrib.url && (
              <a
                href={contrib.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-xs text-mac-muted hover:text-mac-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mac-blue rounded-sm"
              >
                View repository
                <ExternalLink size={11} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
