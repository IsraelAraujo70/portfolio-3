import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GitBranch, Milestone } from "lucide-react";
import { experience } from "@/lib/resume-data";

export const metadata: Metadata = {
  title: "Experience Timeline Lab | Israel Araújo",
  description: "Four experience timeline directions for Israel Araújo's portfolio.",
};

const references = [
  { label: "Flowbite vertical timeline", href: "https://flowbite.com/docs/components/timeline/" },
  { label: "Material UI alternating timeline", href: "https://mui.com/material-ui/react-timeline/" },
  { label: "CSS timeline collection", href: "https://freefrontend.org/css-timelines" },
];

function ImpactList({ highlights, limit = 2 }: { highlights: string[]; limit?: number }) {
  return (
    <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-400">
      {highlights.slice(0, limit).map((highlight) => (
        <li key={highlight} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-[0.65rem] size-1 shrink-0 rounded-full bg-cyan-300" />
          <span>{highlight}</span>
        </li>
      ))}
    </ul>
  );
}

function OptionHeading({
  option,
  title,
  description,
  recommendation,
}: {
  option: string;
  title: string;
  description: string;
  recommendation?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300">Option {option}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
      </div>
      {recommendation ? (
        <span className="w-fit rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-200">
          {recommendation}
        </span>
      ) : null}
    </div>
  );
}

export default function TimelineLabPage() {
  return (
    <main className="min-h-screen bg-[#090c12] text-slate-100 selection:bg-cyan-300 selection:text-slate-950">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-70 [background-image:radial-gradient(circle_at_15%_5%,rgba(34,211,238,0.09),transparent_25%),linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:auto,32px_32px,32px_32px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:px-12">
        <header className="border-b border-white/10 pb-12 pt-4 sm:pb-16 sm:pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to portfolio
          </Link>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300">Design exploration · Experience</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl">
                Four ways to make the career story easier to scan.
              </h1>
            </div>
            <p className="border-l border-cyan-300/30 pl-5 text-sm leading-6 text-slate-400">
              Compare hierarchy, density, and progression. The content is intentionally identical so the visual structure is the only variable.
            </p>
          </div>

          <nav aria-label="Timeline options" className="mt-10 flex flex-wrap gap-2">
            {[
              ["A", "Recruiter rail"],
              ["B", "Career ladder"],
              ["C", "Git log"],
              ["D", "Alternating path"],
            ].map(([option, label]) => (
              <a
                key={option}
                href={`#option-${option.toLowerCase()}`}
                className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-xs text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                {option} · {label}
              </a>
            ))}
          </nav>
        </header>

        <section id="option-a" className="scroll-mt-6 py-16 sm:py-24">
          <OptionHeading
            option="A"
            title="Recruiter rail"
            description="A compact two-column ledger. Dates stay fixed on the left while role, company, impact, and stack form a predictable reading path."
            recommendation="Recommended"
          />

          <div className="border-y border-white/10">
            {experience.map((job, index) => (
              <article
                key={job.company}
                className="group grid gap-4 border-b border-white/10 py-7 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:gap-8"
              >
                <div className="relative font-mono text-[11px] leading-5 text-slate-500">
                  <span>{job.period}</span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-7 right-0 top-7 hidden w-px bg-white/10 sm:block"
                  />
                </div>
                <div className="relative sm:pl-8">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[2.22rem] top-2 hidden size-2.5 rounded-full border-2 border-[#090c12] bg-cyan-300 ring-1 ring-cyan-300/30 transition-transform group-hover:scale-125 sm:block"
                  />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                    <p className="text-sm text-slate-500">{job.company}</p>
                  </div>
                  <ImpactList highlights={job.highlights} />
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-600">{job.stack}</p>
                  {index === 0 ? (
                    <span className="mt-4 inline-flex rounded-full bg-emerald-400/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-emerald-300">
                      Current role
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="option-b" className="scroll-mt-6 border-t border-white/10 py-16 sm:py-24">
          <OptionHeading
            option="B"
            title="Career ladder"
            description="Progression becomes the visual thesis. Each role occupies a rung, with the promotion story pulled out as evidence instead of being buried in a bullet."
            recommendation="Best for progression"
          />

          <div className="relative ml-3 border-l border-dashed border-cyan-300/25 pl-8 sm:ml-6 sm:pl-12">
            {experience.map((job, index) => (
              <article key={job.company} className="relative pb-12 last:pb-0">
                <div className="absolute -left-[2.72rem] top-0 flex size-5 items-center justify-center rounded-sm border border-cyan-300/35 bg-[#0d131c] font-mono text-[9px] text-cyan-200 sm:-left-[3.72rem]">
                  {experience.length - index}
                </div>
                <div className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.025] p-5 transition-colors hover:border-white/20 sm:grid-cols-[1fr_9rem] sm:p-6">
                  <div>
                    <p className="text-xs text-cyan-300">{job.company}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{job.role}</h3>
                    <ImpactList highlights={job.highlights} limit={1} />
                  </div>
                  <div className="border-t border-white/10 pt-4 font-mono text-[10px] uppercase leading-5 tracking-[0.1em] text-slate-500 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                    <p>{job.period}</p>
                    <p className="mt-3 text-slate-600">{job.stack.split(" · ").slice(0, 2).join(" · ")}</p>
                  </div>
                </div>
                {job.company === "AdaSistemas" ? (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-amber-300/20 bg-amber-300/[0.06] px-3 py-2 text-xs text-amber-100/80">
                    <Milestone aria-hidden="true" className="size-3.5 text-amber-300" />
                    Promoted from junior to mid-level within four months
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="option-c" className="scroll-mt-6 border-t border-white/10 py-16 sm:py-24">
          <OptionHeading
            option="C"
            title="Git log"
            description="The timeline borrows the visual language of version control: branches, commits, tags, and a clear HEAD marker for the current role."
            recommendation="Most distinctive"
          />

          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#070a0f] font-mono shadow-2xl shadow-black/20">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.025] px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-slate-500">
              <GitBranch aria-hidden="true" className="size-3.5 text-cyan-300" />
              career.log · main
            </div>
            <div className="p-5 sm:p-7">
              {experience.map((job, index) => (
                <article key={job.company} className="relative grid grid-cols-[1.5rem_1fr] gap-4 pb-10 last:pb-0">
                  <div className="relative flex justify-center">
                    <span className={`z-10 mt-1 size-3 rounded-full border-2 border-[#070a0f] ${index === 0 ? "bg-emerald-300 ring-2 ring-emerald-300/20" : "bg-cyan-300"}`} />
                    {index < experience.length - 1 ? (
                      <span aria-hidden="true" className="absolute bottom-[-0.25rem] top-3 w-px bg-cyan-300/25" />
                    ) : null}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.12em]">
                      <span className="text-cyan-300">commit {String(index + 1).padStart(2, "0")}</span>
                      {index === 0 ? <span className="rounded bg-emerald-300/10 px-1.5 py-0.5 text-emerald-300">HEAD</span> : null}
                      <span className="text-slate-600">{job.period}</span>
                    </div>
                    <h3 className="mt-2 font-sans text-lg font-semibold text-white">{job.role}</h3>
                    <p className="mt-1 font-sans text-sm text-slate-400">{job.company}</p>
                    <p className="mt-3 max-w-3xl font-sans text-sm leading-6 text-slate-500">{job.highlights[0]}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.stack.split(" · ").map((technology) => (
                        <span key={technology} className="rounded border border-white/10 px-2 py-1 text-[9px] uppercase text-slate-500">
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="option-d" className="scroll-mt-6 border-t border-white/10 py-16 sm:py-24">
          <OptionHeading
            option="D"
            title="Alternating path"
            description="A more expressive editorial timeline. It creates rhythm and strong chronology, but asks the reader to move between both sides of the axis."
            recommendation="Best for storytelling"
          />

          <div className="relative">
            <div aria-hidden="true" className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-cyan-300 via-cyan-300/20 to-transparent sm:left-1/2" />
            <div className="space-y-10">
              {experience.map((job, index) => (
                <article
                  key={job.company}
                  className={`relative pl-10 sm:grid sm:grid-cols-2 sm:gap-14 sm:pl-0 ${index % 2 === 0 ? "" : "sm:[&>div]:col-start-2"}`}
                >
                  <span aria-hidden="true" className="absolute left-[0.55rem] top-6 size-2 rounded-full bg-cyan-300 ring-4 ring-[#090c12] sm:left-1/2 sm:-translate-x-1/2" />
                  <div className={`rounded-lg border border-white/10 bg-white/[0.025] p-5 ${index % 2 === 0 ? "sm:text-right" : ""}`}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">{job.period}</p>
                    <p className="mt-3 text-xs text-cyan-300">{job.company}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{job.role}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{job.highlights[0]}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 py-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-300">Next decision</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Choose A, B, C, or D.</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Once selected, the chosen structure can replace the current Experience section without changing the career content.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-xs text-slate-500">
              <span className="font-mono uppercase tracking-[0.12em] text-slate-600">Research references</span>
              {references.map((reference) => (
                <a
                  key={reference.href}
                  href={reference.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                >
                  {reference.label}
                  <ArrowUpRight aria-hidden="true" className="size-3" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
