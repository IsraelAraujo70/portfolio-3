import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Renders streamed Markdown without raw HTML, images, or invented local routes. */
export function ChatMarkdown({ children }: { children: string }) {
  return (
    <div className="chat-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        disallowedElements={["img"]}
        components={{
          table: ({ children }) => (
            <div className="chat-markdown-table">
              <table>{children}</table>
            </div>
          ),
          a: ({ href, children }) => {
            if (!href || !/^(https?:\/\/|mailto:)/i.test(href))
              return <span>{children}</span>;
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
