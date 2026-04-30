"use client";

import { motion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { personalInfo } from "@/lib/resume-data";

export function Hero({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-cyan-400 font-mono text-sm mb-6"
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4"
        >
          {personalInfo.name}
          <span className="text-cyan-400">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 mb-4"
        >
          {personalInfo.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 font-mono text-sm mb-10 max-w-xl mx-auto"
        >
          {personalInfo.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onOpenChat}
            className="group flex items-center gap-2 px-6 py-3 bg-cyan-400/10 border border-cyan-400/30 rounded-xl text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300"
          >
            <MessageCircle size={18} />
            Talk to my AI
          </button>
          <a
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
          >
            View Projects
            <ArrowDown size={18} />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about">
          <ArrowDown
            size={20}
            className="text-gray-600 animate-bounce"
          />
        </a>
      </motion.div>
    </section>
  );
}
