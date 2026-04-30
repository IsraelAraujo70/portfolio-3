"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
        {title}
        <span className="text-cyan-400">.</span>
      </h2>
      {subtitle && <p className="text-gray-400 text-lg">{subtitle}</p>}
    </motion.div>
  );
}
