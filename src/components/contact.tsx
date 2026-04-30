"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { GlassCard } from "@/components/ui/glass-card";
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

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s work together<span className="text-cyan-400">.</span>
          </h2>
          <p className="text-gray-400 mb-10">
            Open to international and remote opportunities. If you have an
            interesting project or role, I&apos;d love to hear about it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassCard className="p-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {contactLinks.map(({ icon: Icon, label, value, href, isSvg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors group"
                >
                  {isSvg ? (
                    <Icon
                      width={20}
                      height={20}
                      className="group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <Icon
                      size={20}
                      className="group-hover:scale-110 transition-transform"
                    />
                  )}
                  <span className="text-sm">{value}</span>
                </a>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-xs mt-12 font-mono"
        >
          Built with Next.js, Tailwind CSS & AI
        </motion.p>
      </div>
    </section>
  );
}
