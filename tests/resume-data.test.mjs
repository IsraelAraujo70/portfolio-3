import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../src/lib/resume-data.ts", import.meta.url), "utf8");
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

test("presents the current ComicConnect role as a contract", () => {
  assert.match(source, /company: "ComicConnect"/);
  assert.match(source, /TypeScript \/ PHP \/ Terraform Developer \(Contract\)/);
  assert.match(source, /Current Role — ComicConnect \(Contract, Apr 2026 – Present\)/);
});

test("positions Israel for international mid-level roles", () => {
  assert.match(source, /Mid-Level Backend \/ Full-Stack Engineer/);
  assert.match(source, /3\+ years of professional experience/);
  assert.match(source, /Python, TypeScript, and AWS/);
  assert.match(publicCopy, /Israel Araújo \| Mid-Level Backend \/ Full-Stack Engineer/);
});

test("does not expose outdated or business-specific role wording", () => {
  for (const banned of [
    "Metropolis Comics",
    "customers reply BUY",
    "residential proxy",
    "2+ years of experience",
    "438 PRs",
  ]) {
    assert.doesNotMatch(publicCopy, new RegExp(banned.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
});
