"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
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
          Let&apos;s work together<span className="text-cyan-400">.</span>
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          Open to international and remote opportunities.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.05 }}
        style={{backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)"}} className="liquid-glass-light rounded-xl p-6"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {contactLinks.map(({ icon: Icon, label, value, href, isSvg }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-gray-400 hover:text-cyan-400 transition-colors group"
            >
              {isSvg ? (
                <Icon width={18} height={18} className="group-hover:scale-110 transition-transform" />
              ) : (
                <Icon size={18} className="group-hover:scale-110 transition-transform" />
              )}
              <span className="text-sm">{value}</span>
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
