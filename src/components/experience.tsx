"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/lib/resume-data";

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Experience"
          subtitle="Where I've been building things"
        />

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-white/[0.08]" />

          <div className="space-y-8">
            {experience.map((job, i) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8 md:pl-20"
              >
                <div className="absolute left-0 md:left-8 top-8 w-2 h-2 rounded-full bg-cyan-400 -translate-x-[3.5px]" />

                <GlassCard className="p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {job.company}
                      </h3>
                      <p className="text-cyan-400 text-sm">{job.role}</p>
                    </div>
                    <p className="text-gray-500 text-sm font-mono mt-1 sm:mt-0">
                      {job.period}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {job.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-gray-400 text-sm flex gap-3"
                      >
                        <span className="text-cyan-400/50 mt-1 shrink-0">
                          ▸
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
