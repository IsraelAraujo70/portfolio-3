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
          About<span className="text-cyan-400">.</span>
        </h2>
        <p className="text-gray-500 text-sm mb-6">A quick overview of who I am</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          style={{backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)"}} className="liquid-glass-light rounded-xl p-6"
        >
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            I build backend systems that handle real money and real
            compliance — multi-tenant SaaS with row-level security, banking
            integrations via AWS Lambda, and AI-powered document pipelines.
            I ship in{" "}
            <span className="text-cyan-400">Python</span>,{" "}
            <span className="text-cyan-400">TypeScript</span>,{" "}
            <span className="text-cyan-400">Go</span>, and{" "}
            <span className="text-cyan-400">Rust</span>.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Open source contributor to{" "}
            <span className="text-white font-medium">OpenCode</span>{" "}
            (152k+ stars) and{" "}
            <span className="text-white font-medium">Zed Editor</span>{" "}
            (80k+ stars). Built my own backend framework published on npm
            and desktop apps with Tauri/Rust.
          </p>
          <p className="text-gray-500 text-xs">
            Open to international and remote opportunities where I can own
            systems end-to-end and ship fast.
          </p>
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
                style={{backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)"}} className="liquid-glass-light rounded-xl p-4 text-center"
              >
                <p className="text-xl font-bold text-cyan-400">{stat.value}</p>
                <p className="text-[11px] text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div style={{backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)"}} className="liquid-glass-light rounded-xl p-5 flex-1">
            <p className="text-xs font-medium text-gray-400 mb-2">Tech Stack</p>
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
