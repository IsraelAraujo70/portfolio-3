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

test("presents the current ComicConnect role and production scope", () => {
  assert.match(source, /company: "ComicConnect"/);
  assert.match(source, /role: "Full Stack Software Engineer"/);
  assert.match(source, /Current Role - ComicConnect \(Apr 2026 - Present\)/);
  assert.match(source, /AWS infrastructure provisioned with Terraform/);
});

test("positions Israel for international mid-level roles", () => {
  assert.match(source, /Mid-level Full Stack Engineer/);
  assert.match(source, /3\+ years of professional software development experience/);
  assert.match(source, /TypeScript, Node\.js, Python, and AWS/);
  assert.match(publicCopy, /Israel Araújo \| Full Stack Engineer/);
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
