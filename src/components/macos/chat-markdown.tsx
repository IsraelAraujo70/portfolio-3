import ReactMarkdown from "react-markdown";

/** Renders streamed Markdown without raw HTML, images, or invented local routes. */
export function ChatMarkdown({ children }: { children: string }) {
  return (
    <div className="chat-markdown">
      <ReactMarkdown
        skipHtml
        disallowedElements={["img"]}
        components={{
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
