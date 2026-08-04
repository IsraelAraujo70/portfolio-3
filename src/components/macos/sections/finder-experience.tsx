"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/resume-data";

export function FinderExperience() {
  return (
    <section className="border-b border-white/[0.06] px-6 py-10 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 className="mb-1 text-2xl font-bold text-white">
          Experience<span className="text-cyan-400">.</span>
        </h2>
        <p className="mb-8 text-sm text-gray-500">Production ownership, progression, and impact</p>
      </motion.div>

      <div className="relative mx-auto max-w-5xl">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-cyan-400 via-cyan-400/25 to-transparent md:left-1/2 md:-translate-x-px"
        />

        <ol className="space-y-8 md:space-y-10">
          {experience.map((job, i) => (
            <motion.li
              key={job.company}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              className="relative pl-10 md:grid md:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] md:pl-0"
            >
              <div
                aria-hidden="true"
                className="absolute left-3 top-6 z-10 size-2 -translate-x-[3.5px] rounded-full bg-cyan-400 ring-4 ring-[#11151d] transition-transform duration-200 md:relative md:left-auto md:top-6 md:col-start-2 md:row-start-1 md:mx-auto md:translate-x-0"
              />

              <p
                className={`hidden pt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-gray-600 md:block ${
                  i % 2 === 0
                    ? "col-start-3 row-start-1 text-left"
                    : "col-start-1 row-start-1 text-right"
                }`}
              >
                {job.period}
              </p>

              <div
                className={`liquid-glass-light row-start-1 rounded-xl p-5 transition-colors duration-200 hover:border-cyan-400/20 ${
                  i % 2 === 0 ? "md:col-start-1" : "md:col-start-3"
                }`}
              >
                <div className="mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white">{job.company}</h3>
                    {i === 0 ? (
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-emerald-300">
                        Current
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-xs leading-5 text-cyan-400">{job.role}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-gray-600 md:hidden">
                    {job.period}
                  </p>
                </div>

                <ul className="space-y-2">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2.5 text-xs leading-[1.55] text-gray-400">
                      <span aria-hidden="true" className="mt-[0.48rem] size-1 shrink-0 rounded-full bg-cyan-400/60" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 border-t border-white/[0.06] pt-3 font-mono text-[9px] uppercase leading-4 tracking-[0.1em] text-gray-600">
                  {job.stack}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
