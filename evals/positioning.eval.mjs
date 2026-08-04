import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/lib/resume-data.ts", import.meta.url), "utf8");

const criteria = [
  ["mid-level positioning", /Mid-level Full Stack Engineer/],
  ["three years of experience", /3\+ years of professional software development experience/],
  ["current company", /company: "ComicConnect"/],
  ["current production role", /Full Stack Software Engineer working with TypeScript, PHP, Terraform, and AWS/],
  ["target stack", /TypeScript, Node\.js, Python, and AWS/],
  ["event-driven evidence", /event-driven systems/i],
  ["cloud infrastructure evidence", /AWS infrastructure provisioned with Terraform/],
  ["international availability", /international\/remote positions/],
];

const results = criteria.map(([name, pattern]) => ({ name, passed: pattern.test(source) }));
const passed = results.filter((result) => result.passed).length;
const threshold = criteria.length;

for (const result of results) {
  console.log(`${result.passed ? "PASS" : "FAIL"}: ${result.name}`);
}

console.log(`SCORE: ${passed}/${criteria.length}`);
console.log(`VERDICT: ${passed >= threshold ? "PASS" : "FAIL"}`);

if (passed < threshold) {
  process.exitCode = 1;
}
