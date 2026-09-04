import { test } from "node:test";
import assert from "node:assert/strict";
import {
  education,
  openSourceContributions,
  portfolioContext,
  projects,
  systemPrompt,
} from "./resume-data";

test("grounds the prompt in the complete shared portfolio without guessed project routes", () => {
  const embedded = systemPrompt.split("Verified portfolio facts:\n")[1];
  assert.deepEqual(JSON.parse(embedded), portfolioContext);
  const social = projects.find((project) => project.name === "SocialTerminal");
  assert.equal(
    social?.website,
    "https://app.socialterminal.israeldeveloper.com.br",
  );
  assert.equal(social?.github, undefined);
  assert.equal(
    projects.some((project) => project.name === "OpenVoice"),
    false,
  );
  for (const project of projects)
    assert.match(project.website ?? project.github ?? "", /^https:\/\//);
});

test("keeps Linux contributions attached to OpenCode and incomplete education explicit", () => {
  const openCode = openSourceContributions.find(
    (contribution) => contribution.project === "OpenCode",
  );
  const zed = openSourceContributions.find(
    (contribution) => contribution.project === "Zed Editor",
  );
  assert.ok(openCode?.prs.some((pr) => pr.title.includes("Wayland")));
  assert.ok(
    zed?.prs.every(
      (pr) =>
        !/Linux|Wayland/.test(pr.title) &&
        pr.url.includes("zed-industries/zed"),
    ),
  );
  assert.equal(
    education.find((entry) => entry.institution === "UNIFAL")?.status,
    "Not completed",
  );
});
