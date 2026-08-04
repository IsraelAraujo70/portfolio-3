"use client";

import { motion } from "framer-motion";
import { stats, skillCategories } from "@/lib/resume-data";

export function FinderAbout() {
  return (
    <section className="px-8 py-10 md:px-12 border-b border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 className="text-2xl font-bold text-white mb-1">
          How I work<span className="text-cyan-400">.</span>
        </h2>
        <p className="text-gray-500 text-sm mb-6">Product responsibility backed by production evidence</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="liquid-glass-light rounded-xl p-6"
        >
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-400">
            Operating profile
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            I design and ship production SaaS, integrations, and asynchronous
            workflows with <span className="text-cyan-400">TypeScript</span>,{" "}
            <span className="text-cyan-400">Node.js</span>,{" "}
            <span className="text-cyan-400">Python</span>, and{" "}
            <span className="text-cyan-400">AWS</span>. My work spans API design,
            data consistency, cloud infrastructure, testing, observability, and delivery.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            I have built multi-tenant platforms, connected banking and government
            providers, and delivered LLM-assisted document workflows with explicit
            validation and human-review fallbacks. I also contribute accepted code
            to developer tools including OpenCode, Zed, and T3Code.
          </p>
          <div className="border-l-2 border-cyan-400/50 pl-3">
            <p className="text-xs leading-relaxed text-gray-400">
              Best fit: remote product teams where I can own a system end to end,
              make architecture trade-offs explicit, and keep delivery close to users.
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
                className="liquid-glass-light rounded-xl border-t-cyan-400/20 p-4 text-left transition-colors hover:border-cyan-400/20 hover:bg-white/[0.065]"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-400/65">
                  {stat.label}
                </p>
                <p className="mt-2 text-base font-semibold leading-tight text-white">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[10px] leading-4 text-gray-500">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="liquid-glass-light rounded-xl p-5 flex-1">
            <p className="text-xs font-medium text-gray-400 mb-2">Production toolkit</p>
            <div className="flex flex-wrap gap-1.5">
              {skillCategories
                .flatMap((c) => c.items)
                .slice(0, 18)
                .map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              <span className="text-[11px] px-2 py-0.5 text-gray-600">+more</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
