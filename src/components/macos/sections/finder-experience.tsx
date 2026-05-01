"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/resume-data";

export function FinderExperience() {
  return (
    <section className="px-8 py-10 md:px-12 border-b border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 className="text-2xl font-bold text-white mb-1">
          Experience<span className="text-cyan-400">.</span>
        </h2>
        <p className="text-gray-500 text-sm mb-6">Where I&apos;ve been building things</p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-white/[0.08]" />

        <div className="space-y-6">
          {experience.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              className="relative pl-10"
            >
              <div className="absolute left-3 top-6 w-2 h-2 rounded-full bg-cyan-400 -translate-x-[3.5px]" />

              <div style={{backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)"}} className="liquid-glass-light rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">{job.company}</h3>
                    <p className="text-cyan-400 text-xs">{job.role}</p>
                  </div>
                  <p className="text-gray-500 text-xs font-mono mt-1 sm:mt-0">{job.period}</p>
                </div>
                <ul className="space-y-1.5">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400 text-xs flex gap-2">
                      <span className="text-cyan-400/50 mt-0.5 shrink-0">▸</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
