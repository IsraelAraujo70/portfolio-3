import assert from "node:assert/strict";
import test from "node:test";
import { convertToModelMessages } from "ai";
import { projects } from "../src/lib/resume-data.ts";
import { hasNavigationResult, parseStoredChatMessages } from "../src/lib/chat-ux.ts";
import { navigationResult, navigationTarget, parsePortfolioAction } from "../src/lib/portfolio-navigation.ts";

test("resolves a Rust project to its actual case and stack target", () => {
  const action = parsePortfolioAction("showProject", { projectId: "reason", focus: "tech" }, projects);
  assert.equal(navigationTarget(action), "project-reason-tech");
  assert.equal(navigationResult(action, projects).title, "Reason");
  assert.match(navigationResult(action, projects).detail, /Rust/);
});

test("supports additional projects without inventing missing case-study sections", () => {
  const action = parsePortfolioAction("showProject", { projectId: "socialterminal", focus: "overview" }, projects);
  assert.equal(navigationTarget(action), "project-socialterminal-overview");
  assert.throws(() => parsePortfolioAction("showProject", { projectId: "socialterminal", focus: "decisions" }, projects));
});

test("rejects unknown tools, destinations, selectors, and executable fields", () => {
  const requests = [
    ["execute", { code: "alert(1)" }],
    ["showSection", { section: "__proto__" }],
    ["showSection", { section: "contact", url: "https://example.com" }],
    ["showProject", { projectId: "reason", focus: "tech", selector: "body" }],
    ["showProject", { projectId: "missing", focus: "overview" }],
    ["showProject", { projectId: "reason", focus: "#contact" }],
  ];
  for (const [name, input] of requests) assert.throws(() => parsePortfolioAction(name, input, projects));
  assert.equal(navigationTarget(parsePortfolioAction("showSection", { section: "experience" }, projects)), "finder-experience");
  assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);
});

test("restores completed actions as history and makes interrupted calls safe for the next model request", async () => {
  const messages = [
    { id: "u1", role: "user", parts: [{ type: "text", text: "Show Reason" }] },
    { id: "a1", role: "assistant", parts: [{
      type: "tool-showProject", toolCallId: "call-1", state: "output-available",
      input: { projectId: "reason", focus: "tech" }, output: { title: "Reason", detail: "Rust" },
    }, {
      type: "tool-showSection", toolCallId: "call-2", state: "input-available",
      input: { section: "contact" },
    }] },
  ];
  const restored = parseStoredChatMessages(JSON.stringify(messages));
  assert.deepEqual(restored[1].parts[0], messages[1].parts[0]);
  assert.equal(restored[1].parts[1].state, "output-error");
  const modelMessages = await convertToModelMessages(restored);
  assert.ok(modelMessages.some((message) => message.role === "tool"));
  assert.equal(hasNavigationResult(restored), true);
  restored.push({ id: "u2", role: "user", parts: [{ type: "text", text: "Show experience" }] });
  assert.equal(hasNavigationResult(restored), false);
});
