"use client";

import { motion } from "framer-motion";
import { Star, GitPullRequest, ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { openSourceContributions } from "@/lib/resume-data";

export function OpenSource() {
  return (
    <section id="opensource" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Open Source"
          subtitle="Contributing to tools I use every day"
        />

        <div className="space-y-6">
          {openSourceContributions.map((contrib, i) => (
            <motion.div
              key={contrib.project}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white">
                      {contrib.project}
                    </h3>
                    {contrib.stars && (
                      <span className="flex items-center gap-1 text-sm text-yellow-400/80">
                        <Star size={14} fill="currentColor" />
                        {contrib.stars}
                      </span>
                    )}
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-gray-400 w-fit">
                    {contrib.language}
                  </span>
                </div>

                {contrib.description && (
                  <p className="text-gray-500 text-sm mb-4">
                    {contrib.description}
                  </p>
                )}

                <div className="space-y-3">
                  {contrib.prs.map((pr) => (
                    <div
                      key={pr.title}
                      className="flex items-start gap-3 group"
                    >
                      <GitPullRequest
                        size={16}
                        className="text-cyan-400/60 mt-0.5 shrink-0"
                      />
                      {pr.url ? (
                        <a
                          href={pr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2"
                        >
                          {pr.title}
                          <ExternalLink
                            size={12}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </a>
                      ) : (
                        <span className="text-sm text-gray-300">
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
                    className="inline-flex items-center gap-2 mt-5 text-sm text-gray-500 hover:text-cyan-400 transition-colors"
                  >
                    View repository
                    <ExternalLink size={14} />
                  </a>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
