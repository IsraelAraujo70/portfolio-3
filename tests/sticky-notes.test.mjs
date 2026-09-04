import assert from "node:assert/strict";
import test from "node:test";
import { getNotePosition } from "../src/components/macos/sticky-note-position.ts";

test("keeps notes whose old positions exceeded 100% inside the desktop", () => {
  for (const id of [3, 17]) {
    const position = getNotePosition(id);
    assert.ok(position.x >= 0 && position.x <= 100);
    assert.ok(position.y >= 0 && position.y <= 100);
  }
});

test("keeps placement stable and spreads persisted note IDs across both axes", () => {
  const positions = Array.from({ length: 1000 }, (_, id) => getNotePosition(id + 1));
  for (const { x, y } of positions) {
    assert.ok(x >= 5 && x <= 95);
    assert.ok(y >= 5 && y <= 95);
  }
  assert.ok(positions.some(({ x }) => x < 25));
  assert.ok(positions.some(({ x }) => x > 75));
  assert.ok(positions.some(({ y }) => y < 25));
  assert.ok(positions.some(({ y }) => y > 75));
  assert.deepEqual(getNotePosition(17), positions[16]);
});
