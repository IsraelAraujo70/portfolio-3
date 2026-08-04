"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { personalInfo } from "@/lib/resume-data";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    isSvg: false,
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "araisr",
    href: personalInfo.linkedin,
    isSvg: true,
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: "IsraelAraujo70",
    href: personalInfo.github,
    isSvg: true,
  },
];

export function FinderContact() {
  return (
    <section className="px-8 py-10 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          Build the next system together<span className="text-cyan-400">.</span>
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          Open to mid-level full-stack and backend-leaning remote opportunities.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.05 }}
        style={{ backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }}
        className="liquid-glass-light rounded-xl p-6"
      >
        <div className="mb-6 flex items-center justify-center gap-2 text-xs text-gray-500">
          <MapPin size={14} className="text-cyan-400/70" />
          Brazil · Available for international remote teams
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {contactLinks.map(({ icon: Icon, label, value, href, isSvg }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-gray-400 transition-colors hover:border-cyan-400/20 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {isSvg ? (
                <Icon width={18} height={18} className="group-hover:scale-110 transition-transform" />
              ) : (
                <Icon size={18} className="group-hover:scale-110 transition-transform" />
              )}
              <span className="min-w-0">
                <span className="block font-mono text-[9px] uppercase tracking-wide text-gray-600">
                  {label}
                </span>
                <span className="block truncate text-xs">{value}</span>
              </span>
            </a>
          ))}
        </div>
      </motion.div>

      <p className="text-gray-600 text-[10px] text-center mt-8 font-mono">
        Built with Next.js, Tailwind CSS & AI
      </p>
    </section>
  );
}
