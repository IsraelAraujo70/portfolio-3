"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { personalInfo, stats } from "@/lib/resume-data";

export function FinderHero({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <section className="px-6 py-10 md:px-12 md:py-14 border-b border-white/[0.06]">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative shrink-0"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full liquid-glass-light p-1 flex items-center justify-center">
            <img
              src="/profile-picture.jpeg"
              alt={personalInfo.fullName}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full border-4 border-[#0a0a0f] bg-emerald-400" aria-label="Available for remote opportunities">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-950" />
          </span>
        </motion.div>

        <div className="text-center md:text-left flex-1 min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-cyan-400 font-mono text-[11px] uppercase tracking-[0.2em] mb-3"
          >
            Full Stack Engineer · Backend-leaning
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-white mb-3"
          >
            {personalInfo.name}
            <span className="text-cyan-400">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-lg md:text-xl text-gray-200 mb-1"
          >
            {personalInfo.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl text-gray-400 text-sm md:text-base leading-relaxed mb-5"
          >
            {personalInfo.summary}
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.33 }}
            className="mb-6 flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-start"
          >
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-sm font-semibold text-white">{stat.value}</dd>
                <span className="text-[10px] uppercase tracking-wide text-gray-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.dl>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-3"
          >
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("finder-projects");
                const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                el?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
              }}
              className="flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-cyan-950 transition-colors hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
            >
              View selected work
              <ArrowRight size={15} />
            </button>
            <button
              type="button"
              onClick={onOpenChat}
              className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-gray-300 transition-colors hover:border-cyan-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
            >
              <MessageCircle size={16} />
              Talk to my AI
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
