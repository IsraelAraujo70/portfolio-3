import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { ChatMarkdown } from "./chat-markdown";

test("renders links, lists, emphasis, and code instead of literal Markdown", () => {
  const html = renderToStaticMarkup(
    <ChatMarkdown>
      {
        "See [Reason](https://github.com/IsraelAraujo70/notion-clone).\n\n- **Rust** with `Axum`\n\n```ts\nconst value = 1;\n```"
      }
    </ChatMarkdown>,
  );
  assert.match(
    html,
    /href="https:\/\/github.com\/IsraelAraujo70\/notion-clone"/,
  );
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(
    html,
    /<ul>\s*<li><strong>Rust<\/strong> with <code>Axum<\/code>/,
  );
  assert.match(html, /<pre><code class="language-ts">const value = 1;/);
});

test("ignores active HTML, images, unsafe URLs, and invented local routes", () => {
  const html = renderToStaticMarkup(
    <ChatMarkdown>
      {
        "[wrong](/projects/reason) [unsafe](javascript:alert)\n\n<script>alert(1)</script>\n\n![tracking](https://example.com/track.png)"
      }
    </ChatMarkdown>,
  );
  assert.doesNotMatch(html, /<a |<script|<img|javascript:/);
  assert.match(html, /wrong/);
});

test("renders unfinished code fences safely while a response streams", () => {
  const html = renderToStaticMarkup(
    <ChatMarkdown>{'```ts\nconst html = "<script>"'}</ChatMarkdown>,
  );
  assert.match(html, /<pre><code/);
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>/);
});
