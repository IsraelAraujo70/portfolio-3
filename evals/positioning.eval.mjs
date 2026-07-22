import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/lib/resume-data.ts", import.meta.url), "utf8");

const criteria = [
  ["mid-level positioning", /Mid-Level Backend \/ Full-Stack Engineer/],
  ["three years of experience", /3\+ years of professional experience/],
  ["current company", /company: "ComicConnect"/],
  ["contract type", /Developer \(Contract\)/],
  ["target stack", /Python, TypeScript, and AWS/],
  ["event-driven evidence", /event-driven systems/i],
  ["cloud infrastructure evidence", /Terraform AWS infra/],
  ["international availability", /international\/remote positions/],
];

const results = criteria.map(([name, pattern]) => ({ name, passed: pattern.test(source) }));
const passed = results.filter((result) => result.passed).length;
const threshold = 7;

for (const result of results) {
  console.log(`${result.passed ? "PASS" : "FAIL"}: ${result.name}`);
}

console.log(`SCORE: ${passed}/${criteria.length}`);
console.log(`VERDICT: ${passed >= threshold ? "PASS" : "FAIL"}`);

if (passed < threshold) {
  process.exitCode = 1;
}
