"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { stats, skillCategories } from "@/lib/resume-data";

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="About"
          subtitle="A quick overview of who I am"
        />

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-8 h-full">
              <p className="text-gray-300 leading-relaxed mb-6">
                I build backend systems that handle real money and real
                compliance — multi-tenant SaaS with row-level security, banking
                integrations via AWS Lambda, and AI-powered document pipelines.
                I ship in{" "}
                <span className="text-cyan-400">Python</span>,{" "}
                <span className="text-cyan-400">TypeScript</span>,{" "}
                <span className="text-cyan-400">Go</span>, and{" "}
                <span className="text-cyan-400">Rust</span>.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Open source contributor to{" "}
                <span className="text-white font-medium">OpenCode</span>{" "}
                (152k+ stars) and{" "}
                <span className="text-white font-medium">Zed Editor</span>{" "}
                (80k+ stars). Built my own backend framework published on npm
                and desktop apps with Tauri/Rust.
              </p>
              <p className="text-gray-400 text-sm">
                Open to international and remote opportunities where I can own
                systems end-to-end and ship fast.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <GlassCard key={stat.label} className="p-5 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <p className="text-2xl font-bold text-cyan-400">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                  </motion.div>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="p-6 flex-1">
              <p className="text-sm font-medium text-gray-400 mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {skillCategories
                  .flatMap((c) => c.items)
                  .slice(0, 18)
                  .map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                <span className="text-xs px-2.5 py-1 text-gray-500">
                  +more
                </span>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
