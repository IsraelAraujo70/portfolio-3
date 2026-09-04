import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  experience,
  personalInfo,
  stats,
  systemPrompt,
} from "../src/lib/resume-data.ts";

const source = await readFile(
  new URL("../src/lib/resume-data.ts", import.meta.url),
  "utf8",
);
const publicCopy = (
  await Promise.all(
    [
      "../src/lib/resume-data.ts",
      "../src/lib/terminal-sdk.ts",
      "../src/components/terminal.tsx",
      "../src/app/layout.tsx",
    ].map((path) => readFile(new URL(path, import.meta.url), "utf8")),
  )
).join("\n");

test("presents the current ComicConnect role and production scope", () => {
  assert.match(source, /company: "ComicConnect"/);
  const current = experience.find((role) => role.company === "ComicConnect");
  assert.match(current.role, /Full Stack Software Engineer.*Contract/);
  assert.equal(current.period, "Apr 2026 – Present");
  assert.ok(
    current.highlights.some((highlight) => /Terraform/.test(highlight)),
  );
  assert.ok(
    systemPrompt.includes(
      JSON.stringify(current, null, 2).split("\n")[1].trim(),
    ),
  );
});

test("positions Israel for international mid-level roles", () => {
  assert.equal(personalInfo.level, "Mid-level");
  assert.equal(
    stats.find((stat) => stat.label === "Experience").value,
    "3+ years",
  );
  assert.match(personalInfo.subtitle, /TypeScript.*Node.js.*Python.*AWS/);
  assert.match(personalInfo.availability, /international remote/);
});

test("does not expose outdated or business-specific role wording", () => {
  for (const banned of [
    "Metropolis Comics",
    "customers reply BUY",
    "residential proxy",
    "2+ years of experience",
    "438 PRs",
  ]) {
    assert.doesNotMatch(
      publicCopy,
      new RegExp(banned.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    );
  }
});
