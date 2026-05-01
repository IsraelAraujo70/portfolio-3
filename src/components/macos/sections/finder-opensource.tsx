"use client";

import { motion } from "framer-motion";
import { Star, GitPullRequest, ExternalLink } from "lucide-react";
import { openSourceContributions } from "@/lib/resume-data";

export function FinderOpenSource() {
  return (
    <section className="px-8 py-10 md:px-12 border-b border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 className="text-2xl font-bold text-white mb-1">
          Open Source<span className="text-cyan-400">.</span>
        </h2>
        <p className="text-gray-500 text-sm mb-6">Contributing to tools I use every day</p>
      </motion.div>

      <div className="space-y-4">
        {openSourceContributions.map((contrib, i) => (
          <motion.div
            key={contrib.project}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05 }}
            style={{backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)"}} className="liquid-glass-light rounded-xl p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{contrib.project}</h3>
                {contrib.stars && (
                  <span className="flex items-center gap-1 text-xs text-yellow-400/80">
                    <Star size={12} fill="currentColor" />
                    {contrib.stars}
                  </span>
                )}
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-gray-400 w-fit">
                {contrib.language}
              </span>
            </div>

            {contrib.description && (
              <p className="text-gray-500 text-xs mb-3">{contrib.description}</p>
            )}

            <div className="space-y-2">
              {contrib.prs.map((pr) => (
                <div key={pr.title} className="flex items-start gap-2 group">
                  <GitPullRequest size={13} className="text-cyan-400/60 mt-0.5 shrink-0" />
                  {pr.url ? (
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                    >
                      {pr.title}
                      <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <span className="text-xs text-gray-300">{pr.title}</span>
                  )}
                </div>
              ))}
            </div>

            {contrib.url && (
              <a
                href={contrib.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-xs text-gray-500 hover:text-cyan-400 transition-colors"
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
