import ReactMarkdown from "react-markdown";

/**
 * Reusable Markdown Renderer Component
 * Handles consistent markdown rendering across the app
 * 
 * @param {Object} props
 * @param {string} props.content - The markdown content to render
 * @param {string} props.className - Optional custom className wrapper
 * @param {string} props.variant - 'card' (default) | 'full' | 'preview'
 */
export function MarkdownRenderer({ 
  content, 
  className = "font-inter text-gray-600 prose prose-sm max-w-none",
  variant = "card" 
}) {
  const variants = {
    card: "overflow-hidden line-clamp-3", // Preview in cards
    full: "", // Full display on detail pages
    preview: "line-clamp-2", // Short preview
  };

  const componentStyles = {
    h2: "text-sm font-semibold mt-2 mb-1",
    h3: "text-sm font-semibold mt-2 mb-1",
    h4: "text-xs font-semibold mt-1.5 mb-0.5",
    p: "text-sm leading-snug",
    ul: "list-disc list-inside text-sm",
    ol: "list-decimal list-inside text-sm",
    li: "text-sm",
    hr: "my-1 border-gray-300",
    blockquote: "border-l-4 border-indigo-400 pl-3 italic text-sm text-gray-700",
    code: "bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-red-600",
    pre: "bg-gray-100 p-3 rounded overflow-x-auto text-xs",
  };

  return (
    <div className={`${className} ${variants[variant] || variants.card}`}>
      <ReactMarkdown
        components={{
          h2: ({ node, ...props }) => <h2 className={componentStyles.h2} {...props} />,
          h3: ({ node, ...props }) => <h3 className={componentStyles.h3} {...props} />,
          h4: ({ node, ...props }) => <h4 className={componentStyles.h4} {...props} />,
          p: ({ node, ...props }) => <p className={componentStyles.p} {...props} />,
          ul: ({ node, ...props }) => <ul className={componentStyles.ul} {...props} />,
          ol: ({ node, ...props }) => <ol className={componentStyles.ol} {...props} />,
          li: ({ node, ...props }) => <li className={componentStyles.li} {...props} />,
          hr: ({ node, ...props }) => <hr className={componentStyles.hr} {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className={componentStyles.blockquote} {...props} />,
          code: ({ node, ...props }) => <code className={componentStyles.code} {...props} />,
          pre: ({ node, ...props }) => <pre className={componentStyles.pre} {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}