export interface TUIOptions {
  write: (data: string) => void;
  cols: number;
  rows: number;
  onExit: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ESC = "\x1b[";
const ENTER_ALT = "\x1b[?1049h";
const LEAVE_ALT = "\x1b[?1049l";
const HIDE_CURSOR = "\x1b[?25l";
const SHOW_CURSOR = "\x1b[?25h";
const CLEAR_SCREEN = "\x1b[2J";
const CLEAR_LINE = "\x1b[2K";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const INVERSE = "\x1b[7m";
const CYAN = "\x1b[38;5;81m";
const GRAY = "\x1b[38;5;245m";
const MAGENTA = "\x1b[38;5;141m";
const RED = "\x1b[38;5;203m";

const WELCOME_LINES = [
  "",
  `  ${GRAY}Welcome! Ask me anything about Israel's`,
  "  experience, skills, or projects.",
  "",
  "  Type a message and press Enter to send.",
  `  Ctrl+C or /exit to return to the terminal.${RESET}`,
  "",
];

function moveTo(row: number, col: number): string {
  return `${ESC}${row};${col}H`;
}

function wrapText(text: string, width: number): string[] {
  if (width <= 0) return [""];
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    if (paragraph === "") {
      lines.push("");
      continue;
    }
    let current = "";
    for (const word of paragraph.split(" ")) {
      if (current === "") {
        current = word;
      } else if (current.length + 1 + word.length <= width) {
        current += " " + word;
      } else {
        lines.push(current);
        current = word;
      }
      while (current.length > width) {
        lines.push(current.slice(0, width));
        current = current.slice(width);
      }
    }
    if (current !== "") lines.push(current);
  }
  if (lines.length === 0) lines.push("");
  return lines;
}

export class TerminalTUI {
  private write: (data: string) => void;
  private onExit: () => void;
  private cols: number;
  private rows: number;

  private messages: Message[] = [];
  private inputBuffer = "";
  private cursorPos = 0;
  private scrollOffset = 0;
  private isStreaming = false;
  private currentStreamText = "";
  private abortController: AbortController | null = null;
  private wrappedCache: Map<number, string[]> = new Map();
  private destroyed = false;

  constructor(options: TUIOptions) {
    this.write = options.write;
    this.cols = options.cols;
    this.rows = options.rows;
    this.onExit = options.onExit;
    this.write(ENTER_ALT + CLEAR_SCREEN);
    this.render();
  }

  private get messageHeight(): number {
    return Math.max(1, this.rows - 3);
  }

  private get contentWidth(): number {
    return Math.max(10, this.cols - 2);
  }

  handleInput(data: string): void {
    if (this.destroyed) return;

    if (data === "\x03") {
      if (this.isStreaming) {
        this.abortController?.abort();
      } else {
        this.exit();
      }
      return;
    }

    if (data === "\t") return;

    if (data === "\r") {
      const text = this.inputBuffer.trim();
      if (!text || this.isStreaming) return;

      if (text === "/exit") {
        this.exit();
        return;
      }
      if (text === "/clear") {
        this.messages = [];
        this.wrappedCache.clear();
        this.currentStreamText = "";
        this.scrollOffset = 0;
        this.inputBuffer = "";
        this.cursorPos = 0;
        this.render();
        return;
      }

      this.messages.push({ role: "user", content: text });
      this.wrappedCache.clear();
      this.inputBuffer = "";
      this.cursorPos = 0;
      this.scrollOffset = 0;
      this.render();
      this.sendMessage();
      return;
    }

    if (data === "\x7f" || data === "\b") {
      if (this.cursorPos > 0) {
        this.inputBuffer =
          this.inputBuffer.slice(0, this.cursorPos - 1) +
          this.inputBuffer.slice(this.cursorPos);
        this.cursorPos--;
        this.renderInput();
      }
      return;
    }

    if (data.startsWith("\x1b[")) {
      const code = data.slice(2);
      if (code === "A") {
        this.scrollUp(1);
      } else if (code === "B") {
        this.scrollDown(1);
      } else if (code === "C") {
        if (this.cursorPos < this.inputBuffer.length) {
          this.cursorPos++;
          this.renderInput();
        }
      } else if (code === "D") {
        if (this.cursorPos > 0) {
          this.cursorPos--;
          this.renderInput();
        }
      } else if (code === "5~") {
        this.scrollUp(this.messageHeight);
      } else if (code === "6~") {
        this.scrollDown(this.messageHeight);
      } else if (code === "H") {
        this.cursorPos = 0;
        this.renderInput();
      } else if (code === "F") {
        this.cursorPos = this.inputBuffer.length;
        this.renderInput();
      }
      return;
    }

    if (data === "\x01") {
      this.cursorPos = 0;
      this.renderInput();
      return;
    }
    if (data === "\x05") {
      this.cursorPos = this.inputBuffer.length;
      this.renderInput();
      return;
    }

    for (const ch of data) {
      if (ch >= " " && ch !== "\x7f") {
        this.inputBuffer =
          this.inputBuffer.slice(0, this.cursorPos) +
          ch +
          this.inputBuffer.slice(this.cursorPos);
        this.cursorPos++;
      }
    }
    this.renderInput();
  }

  resize(cols: number, rows: number): void {
    this.cols = cols;
    this.rows = rows;
    this.wrappedCache.clear();
    this.write(CLEAR_SCREEN);
    this.render();
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.abortController?.abort();
    this.write(LEAVE_ALT);
  }

  private exit(): void {
    this.destroy();
    this.onExit();
  }

  private formatMessages(): string[] {
    if (this.messages.length === 0 && !this.currentStreamText) {
      return WELCOME_LINES;
    }

    const maxTextWidth = this.contentWidth - 6;
    const lines: string[] = [""];

    for (let i = 0; i < this.messages.length; i++) {
      const msg = this.messages[i];
      let wrapped = this.wrappedCache.get(i);
      if (!wrapped) {
        wrapped = wrapText(msg.content, maxTextWidth);
        this.wrappedCache.set(i, wrapped);
      }

      const label =
        msg.role === "user"
          ? `${CYAN}${BOLD} You ${RESET} `
          : `${MAGENTA}${BOLD} AI  ${RESET} `;
      const indent = "      ";

      lines.push(label + wrapped[0]);
      for (let j = 1; j < wrapped.length; j++) {
        lines.push(indent + wrapped[j]);
      }
      lines.push("");
    }

    if (this.currentStreamText) {
      const wrapped = wrapText(this.currentStreamText, maxTextWidth);
      const label = `${MAGENTA}${BOLD} AI  ${RESET} `;
      const indent = "      ";

      lines.push(label + wrapped[0]);
      for (let j = 1; j < wrapped.length; j++) {
        lines.push(indent + wrapped[j]);
      }
      lines.push("");
    } else if (this.isStreaming) {
      lines.push(`${GRAY} ...${RESET}`);
      lines.push("");
    }

    return lines;
  }

  private render(): void {
    if (this.destroyed) return;

    if (this.rows < 8 || this.cols < 30) {
      this.write(HIDE_CURSOR + CLEAR_SCREEN + moveTo(1, 1));
      this.write(`${RED}Terminal too small. Please resize.${RESET}`);
      this.write(SHOW_CURSOR);
      return;
    }

    let buf = HIDE_CURSOR;
    buf += this.buildHeader();
    buf += this.buildMessages();
    buf += this.buildSeparator();
    buf += this.buildInput();
    buf += SHOW_CURSOR;
    this.write(buf);
  }

  private renderInput(): void {
    if (this.destroyed) return;
    this.write(HIDE_CURSOR + this.buildInput() + SHOW_CURSOR);
  }

  private buildHeader(): string {
    const title = " Chat with Israel's AI ";
    const hint = " Ctrl+C to quit ";
    const sep = "│";
    const text = `${title}${sep}${hint}`;
    const pad = Math.max(0, this.cols - text.length);
    return (
      moveTo(1, 1) +
      CLEAR_LINE +
      INVERSE +
      text +
      " ".repeat(pad) +
      RESET
    );
  }

  private buildMessages(): string {
    const allLines = this.formatMessages();
    const totalLines = allLines.length;
    const viewHeight = this.messageHeight;
    const maxScroll = Math.max(0, totalLines - viewHeight);
    if (this.scrollOffset > maxScroll) this.scrollOffset = maxScroll;

    const start = Math.max(0, totalLines - viewHeight - this.scrollOffset);
    const visible = allLines.slice(start, start + viewHeight);

    let buf = "";
    for (let i = 0; i < viewHeight; i++) {
      const row = i + 2;
      buf += moveTo(row, 1) + CLEAR_LINE;
      if (i < visible.length) {
        buf += " " + visible[i];
      }
    }
    return buf;
  }

  private buildSeparator(): string {
    const sepRow = this.rows - 1;
    return (
      moveTo(sepRow, 1) +
      CLEAR_LINE +
      DIM +
      "─".repeat(this.cols) +
      RESET
    );
  }

  private buildInput(): string {
    const inputRow = this.rows;
    const prompt = `${CYAN}❯${RESET} `;
    const promptLen = 2;
    const maxVisible = this.cols - promptLen - 1;

    let visibleText = this.inputBuffer;
    let cursorCol = this.cursorPos;

    if (visibleText.length > maxVisible) {
      const windowStart = Math.max(
        0,
        Math.min(this.cursorPos - Math.floor(maxVisible / 2), visibleText.length - maxVisible),
      );
      visibleText = visibleText.slice(windowStart, windowStart + maxVisible);
      cursorCol = this.cursorPos - windowStart;
    }

    return (
      moveTo(inputRow, 1) +
      CLEAR_LINE +
      prompt +
      visibleText +
      moveTo(inputRow, promptLen + cursorCol + 1)
    );
  }

  private scrollUp(n: number): void {
    const allLines = this.formatMessages();
    const maxScroll = Math.max(0, allLines.length - this.messageHeight);
    this.scrollOffset = Math.min(this.scrollOffset + n, maxScroll);
    this.write(HIDE_CURSOR + this.buildMessages() + SHOW_CURSOR);
  }

  private scrollDown(n: number): void {
    this.scrollOffset = Math.max(0, this.scrollOffset - n);
    this.write(HIDE_CURSOR + this.buildMessages() + SHOW_CURSOR);
  }

  private async sendMessage(): Promise<void> {
    this.isStreaming = true;
    this.abortController = new AbortController();
    this.render();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Format": "text" },
        body: JSON.stringify({ messages: this.messages }),
        signal: this.abortController.signal,
      });

      if (!response.ok) throw new Error("API error");
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No stream");

      const decoder = new TextDecoder();
      this.currentStreamText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        this.currentStreamText += decoder.decode(value, { stream: true });
        this.scrollOffset = 0;
        this.wrappedCache.clear();
        this.render();
      }

      this.messages.push({ role: "assistant", content: this.currentStreamText });
      this.currentStreamText = "";
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        if (this.currentStreamText) {
          this.messages.push({
            role: "assistant",
            content: this.currentStreamText + " [interrupted]",
          });
        }
        this.currentStreamText = "";
      } else {
        this.messages.push({
          role: "assistant",
          content: "[Error: Failed to get response]",
        });
      }
    } finally {
      this.isStreaming = false;
      this.abortController = null;
      this.wrappedCache.clear();
      this.render();
    }
  }
}
