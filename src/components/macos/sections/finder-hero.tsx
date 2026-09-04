"use client";

import Image from "next/image";
import { ArrowUpRight, MessageCircle, MapPin } from "lucide-react";
import { personalInfo } from "@/lib/resume-data";

/** Introduce Israel and expose the two primary portfolio actions. */
export function FinderHero({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <section className="portfolio-hero" aria-labelledby="portfolio-name">
      <div className="portfolio-intro">
        <div>
          <p className="portfolio-eyebrow">
            <MapPin size={13} /> Based in Brazil. Building for the web.
          </p>
          <h1 id="portfolio-name">{personalInfo.name}</h1>
          <p className="portfolio-role">{personalInfo.title}</p>
          <p className="portfolio-summary">{personalInfo.summary}</p>
        </div>
        <Image
          className="portfolio-portrait"
          src="/profile-picture.jpeg"
          alt={personalInfo.fullName}
          width={252}
          height={304}
          priority
        />
      </div>
      <div className="portfolio-actions">
        <button
          type="button"
          className="mac-button mac-button-primary"
          onClick={() => {
            const reduceMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;
            document.getElementById("finder-projects")?.scrollIntoView({
              behavior: reduceMotion ? "instant" : "smooth",
              block: "start",
            });
          }}
        >
          Explore my work <ArrowUpRight size={14} />
        </button>
        <button type="button" className="mac-button" onClick={onOpenChat}>
          <MessageCircle size={14} /> Talk to my AI
        </button>
      </div>
      <div className="portfolio-meta">
        <span>{personalInfo.subtitle}</span>
        <span className="portfolio-availability">
          Open to remote opportunities
        </span>
      </div>
    </section>
  );
}
