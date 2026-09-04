import { experience, personalInfo, stats } from "../src/lib/resume-data.ts";
const current = experience.find((role) => role.company === "ComicConnect");
const criteria = [
  ["mid-level positioning", personalInfo.level === "Mid-level"],
  [
    "three years of experience",
    stats.some(
      (stat) => stat.label === "Experience" && stat.value === "3+ years",
    ),
  ],
  ["current company", !!current],
  [
    "current production role",
    /Contract/.test(current.role) && current.period === "Apr 2026 – Present",
  ],
  [
    "target stack",
    /TypeScript.*Node.js.*Python.*AWS/.test(personalInfo.subtitle),
  ],
  [
    "event-driven evidence",
    current.highlights.some((line) => /event-driven/.test(line)),
  ],
  [
    "cloud infrastructure evidence",
    current.highlights.some((line) => /Terraform/.test(line)),
  ],
  [
    "international availability",
    /international remote/.test(personalInfo.availability),
  ],
];

const results = criteria.map(([name, passed]) => ({ name, passed }));
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
