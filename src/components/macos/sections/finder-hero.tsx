"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowDown } from "lucide-react";
import { personalInfo } from "@/lib/resume-data";

export function FinderHero({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <section className="px-8 py-12 md:px-12 md:py-16 border-b border-white/[0.06]">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="shrink-0"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full liquid-glass-light p-1 flex items-center justify-center">
            <img
              src="/profile-picture.jpeg"
              alt={personalInfo.fullName}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </motion.div>

        <div className="text-center md:text-left flex-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-cyan-400 font-mono text-sm mb-2"
          >
            Hi, my name is
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2"
          >
            {personalInfo.name}
            <span className="text-cyan-400">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-lg md:text-xl text-gray-400 mb-1"
          >
            {personalInfo.title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 font-mono text-sm mb-6"
          >
            {personalInfo.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-3"
          >
            <button
              onClick={onOpenChat}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/25 hover:border-cyan-400/50 transition-all text-sm"
            >
              <MessageCircle size={16} />
              Talk to my AI
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("finder-projects");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm"
            >
              View Projects
              <ArrowDown size={14} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
