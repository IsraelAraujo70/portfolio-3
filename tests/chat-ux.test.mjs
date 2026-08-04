import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  chatSuggestions,
  getMessageText,
  isNearScrollEnd,
  parseStoredChatMessages,
  shouldSubmitChatKey,
} from "../src/lib/chat-ux.ts";

test("offers recruiter-oriented suggestions without sending implementation trivia first", () => {
  assert.deepEqual(
    chatSuggestions.map((suggestion) => suggestion.id),
    ["experience", "projects", "opensource", "availability"],
  );
  assert.ok(chatSuggestions.every((suggestion) => suggestion.label.length < suggestion.prompt.length));
  assert.doesNotMatch(chatSuggestions[0].prompt, /Rust/i);
});

test("extracts streamed text parts and ignores unsupported parts", () => {
  assert.equal(
    getMessageText([
      { type: "text", text: "Production " },
      { type: "tool-call" },
      { type: "text", text: "experience" },
    ]),
    "Production experience",
  );
});

test("restores only valid user and assistant messages from session storage", () => {
  const valid = [
    { id: "user-1", role: "user", parts: [{ type: "text", text: "Hello" }] },
    { id: "assistant-1", role: "assistant", parts: [{ type: "text", text: "Hi" }] },
  ];

  assert.deepEqual(parseStoredChatMessages(JSON.stringify(valid)), valid);
  assert.deepEqual(parseStoredChatMessages("not-json"), []);
  assert.deepEqual(
    parseStoredChatMessages(
      JSON.stringify([...valid, { id: "system-1", role: "system", parts: [] }]),
    ),
    valid,
  );
});

test("keeps streaming pinned only while the reader is close to the latest message", () => {
  assert.equal(
    isNearScrollEnd({ scrollTop: 720, clientHeight: 240, scrollHeight: 1000 }),
    true,
  );
  assert.equal(
    isNearScrollEnd({ scrollTop: 400, clientHeight: 240, scrollHeight: 1000 }),
    false,
  );
});

test("uses Enter to submit while preserving Shift+Enter and IME composition", () => {
  assert.equal(shouldSubmitChatKey({ key: "Enter", shiftKey: false, isComposing: false }), true);
  assert.equal(shouldSubmitChatKey({ key: "Enter", shiftKey: true, isComposing: false }), false);
  assert.equal(shouldSubmitChatKey({ key: "Enter", shiftKey: false, isComposing: true }), false);
});

test("wires accessible send, stop, retry, and latest-message controls", async () => {
  const [content, composer, message] = await Promise.all([
    readFile(new URL("../src/components/chat/chat-content.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/chat/chat-composer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/chat/chat-message.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(content, /aria-label="Start a new conversation"/);
  assert.match(content, /aria-label="Scroll to latest message"/);
  assert.match(content, /\bRetry\b/);
  assert.match(composer, /aria-label=\{busy \? "Stop response" : "Send message"\}/);
  assert.match(message, /ReactMarkdown/);
  assert.doesNotMatch(message, /rehypeRaw/);
});
