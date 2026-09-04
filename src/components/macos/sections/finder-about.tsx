"use client";

import { motion } from "framer-motion";
import { stats, skillCategories } from "@/lib/resume-data";

/** Present the existing portfolio content in the shared portfolio surface. */
export function FinderAbout() {
  return (
    <section className="px-8 py-10 @2xl:px-12 border-b border-mac-line">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 className="text-2xl font-bold text-mac-ink mb-1">How I work</h2>
        <p className="text-mac-muted text-sm mb-6">
          Product responsibility backed by production evidence
        </p>
      </motion.div>

      <div className="grid @2xl:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="portfolio-card rounded-xl p-6"
        >
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-mac-blue">
            Operating profile
          </p>
          <p className="text-mac-secondary text-sm leading-relaxed mb-4">
            I design and ship production SaaS, integrations, and asynchronous
            workflows with <span className="text-mac-blue">TypeScript</span>,{" "}
            <span className="text-mac-blue">Node.js</span>,{" "}
            <span className="text-mac-blue">Python</span>, and{" "}
            <span className="text-mac-blue">AWS</span>. My work spans API
            design, data consistency, cloud infrastructure, testing,
            observability, and delivery.
          </p>
          <p className="text-mac-secondary text-sm leading-relaxed mb-4">
            I have built multi-tenant platforms, connected banking and
            government providers, and delivered LLM-assisted document workflows
            with explicit validation and human-review fallbacks. I also
            contribute accepted code to developer tools including OpenCode, Zed,
            and T3Code.
          </p>
          <div className="border-l-2 border-mac-blue/50 pl-3">
            <p className="text-xs leading-relaxed text-mac-secondary">
              Best fit: remote product teams where I can own a system end to
              end, make architecture trade-offs explicit, and keep delivery
              close to users.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="portfolio-card rounded-xl border-t-mac-blue/20 p-4 text-left transition-colors hover:border-mac-blue/20 hover:bg-mac-surface"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-mac-blue">
                  {stat.label}
                </p>
                <p className="mt-2 text-base font-semibold leading-tight text-mac-ink">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[10px] leading-4 text-mac-muted">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="portfolio-card rounded-xl p-5 flex-1">
            <p className="text-xs font-medium text-mac-secondary mb-2">
              Production toolkit
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skillCategories
                .flatMap((c) => c.items)
                .slice(0, 18)
                .map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-mac-surface border border-mac-line text-mac-secondary"
                  >
                    {skill}
                  </span>
                ))}
              <span className="text-[11px] px-2 py-0.5 text-mac-muted">
                +more
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
