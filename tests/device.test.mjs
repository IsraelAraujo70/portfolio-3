import assert from "node:assert/strict";
import test from "node:test";
import { isMobileDevice } from "../src/lib/device.ts";

test("detects mobile requests from client hints", () => {
  assert.equal(isMobileDevice("Mozilla/5.0", "?1"), true);
  assert.equal(isMobileDevice("Mozilla/5.0 (iPhone)", "?0"), false);
});

test("falls back to the user agent when client hints are absent", () => {
  assert.equal(isMobileDevice("Mozilla/5.0 (Linux; Android 11) Mobile", null), true);
  assert.equal(isMobileDevice("Mozilla/5.0 (Macintosh; Intel Mac OS X)", null), false);
  assert.equal(isMobileDevice(null, null), false);
});
