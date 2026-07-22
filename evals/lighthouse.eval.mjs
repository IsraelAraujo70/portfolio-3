import { readFile } from "node:fs/promises";

const reportPath = process.argv[2];
if (!reportPath) {
  throw new Error("Usage: npm run eval:lighthouse -- <lighthouse-report.json>");
}

const raw = await readFile(reportPath, "utf8");
const report = JSON.parse(raw.slice(raw.indexOf("{")));
const performance = report.categories.performance.score;
const lcp = report.audits["largest-contentful-paint"].numericValue;
const tbt = report.audits["total-blocking-time"].numericValue;
const cls = report.audits["cumulative-layout-shift"].numericValue;

const criteria = [
  ["performance score >= 0.85", performance >= 0.85, performance],
  ["LCP <= 2.5s", lcp <= 2500, lcp],
  ["TBT <= 200ms", tbt <= 200, tbt],
  ["CLS <= 0.1", cls <= 0.1, cls],
];

for (const [name, passed, value] of criteria) {
  console.log(`${passed ? "PASS" : "FAIL"}: ${name} (${value})`);
}

const passed = criteria.every(([, result]) => result);
console.log(`VERDICT: ${passed ? "PASS" : "FAIL"}`);
if (!passed) process.exitCode = 1;
