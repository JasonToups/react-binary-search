# React Concepts Page Structure

I want Markdown Component that renders Markdown on a Page.

Here's what i want for the React Concepts pages.

I will write the guide in Markdown for the concept, and render it in a Markdown Component. It will include Mermaid charts.

Then we will have an interactive section where we build a Component unique to this page.

Then I will follow up with another Markdown code block for a further exploration of the concept.

This is the basic structure that I want to use for all of the React Concepts.

## Requiements

We need to be able to render the markdown from 2 markdown files. concept.md and explanation.md

## Required Packages

1. Core Markdown Rendering

react-markdown
Main library for rendering Markdown content in React.

```shell
npm install react-markdown
```

2. GitHub-Flavored Markdown (Tables, Strikethrough, Task Lists)

remark-gfm
Adds GFM (GitHub Flavored Markdown) support to react-markdown.

```shell
npm install remark-gfm
```

Usage:

```jsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
```

3. Syntax Highlighting for Code Blocks

Option A — Recommended (Shiki via rehype-pretty-code)

If you want beautiful, VS Code-like syntax highlighting:

```shell
npm install rehype-pretty-code
```

usage

```jsx
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

<ReactMarkdown
  components={{
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter style={oneDark} language={match[1]} {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  }}>
  {content}
</ReactMarkdown>;
```

4. Mermaid Diagram Rendering

mermaid — Core Mermaid library
react-mermaid2 — React wrapper for Mermaid

```shell
npm install mermaid react-mermaid2
```

Example Integration:

```jsx
import ReactMarkdown from 'react-markdown';
import Mermaid from 'react-mermaid2';

function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      components={{
        code({ className, children }) {
          if (className === 'language-mermaid') {
            return <Mermaid chart={String(children).trim()} />;
          }
          return <code className={className}>{children}</code>;
        },
      }}>
      {content}
    </ReactMarkdown>
  );
}
```

5. (Optional but Recommended) Styling

If you want a GitHub-style look, install:

```shell
npm install github-markdown-css
```

Then import in your app:

```jsx
import 'github-markdown-css/github-markdown.css';

function App() {
  return <div className="markdown-body">{content}</div>;
}
```

📜 Final Install Command

If you want everything at once:

```shell
npm install react-markdown remark-gfm rehype-pretty-code react-syntax-highlighter mermaid react-mermaid2 github-markdown-css
```

Component structure:

````jsx
/**
 * MarkdownViewer.tsx
 *
 * INSTALL:
 *   npm install react-markdown remark-gfm react-syntax-highlighter mermaid react-mermaid2 github-markdown-css
 *
 * OPTIONAL (if you prefer VS Code-like highlighting with rehype-pretty-code):
 *   npm install rehype-pretty-code shiki
 *
 * USAGE:
 *   import "github-markdown-css/github-markdown.css"; // optional GitHub-like styling
 *   import MarkdownViewer from "./MarkdownViewer";
 *
 *   export default function Page() {
 *     const content = `
 * # Hello Markdown
 * - Task list:
 *   - [x] done
 *   - [ ] todo
 *
 * \`\`\`tsx
 * export const hi = (name: string) => console.log('Hi', name);
 * \`\`\`
 *
 * \`\`\`mermaid
 * flowchart TD
 *   A[Start] --> B{Choice?}
 *   B -->|Yes| C[Do thing]
 *   B -->|No| D[Stop]
 * \`\`\`
 *     `;
 *     return (
 *       <div className="markdown-body max-w-3xl mx-auto p-6">
 *         <MarkdownViewer content={content} />
 *       </div>
 *     );
 *   }
 */

import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ---- Syntax Highlighting (react-syntax-highlighter) ----
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// ---- Mermaid Rendering ----
import Mermaid from 'react-mermaid2';

// ---- Types ----
type MarkdownViewerProps = {
  content: string,
  className?: string,
  /**
   * Override the syntax highlighting theme if desired.
   * Example: import { duotoneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
   */
  syntaxTheme?: any,
  /**
   * Render a custom fallback for code blocks that don't specify a language.
   */
  inlineCodeFallback?: (
    props: React.ComponentProps<'code'> & { children: React.ReactNode }
  ) => React.ReactElement,
};

/**
 * MarkdownViewer
 * - Renders Markdown with GFM
 * - Syntax highlights fenced code blocks (```lang)
 * - Renders Mermaid diagrams for ```mermaid blocks
 * - Escapes raw HTML by default for safety (react-markdown default)
 */
const MarkdownViewer: React.FC<MarkdownViewerProps> = memo(
  ({ content, className, syntaxTheme = oneDark, inlineCodeFallback }) => {
    return (
      <div className={className}>
        <ReactMarkdown
          // SECURITY NOTE:
          // By default, react-markdown *escapes* HTML. If you enable raw HTML with rehype-raw,
          // you must sanitize untrusted input.
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const raw = String(children ?? '');
              const match = /language-(\w+)/.exec(className || '');

              // Mermaid blocks: ```mermaid
              if (!inline && match?.[1]?.toLowerCase() === 'mermaid') {
                return <Mermaid chart={raw.trim()} />;
              }

              // Fenced code blocks with language
              if (!inline && match) {
                return (
                  <SyntaxHighlighter
                    // trim a trailing newline that react-markdown often keeps
                    children={raw.replace(/\n$/, '')}
                    style={syntaxTheme}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                );
              }

              // Inline code or unknown language: render a <code> element
              if (inline) {
                return inlineCodeFallback ? (
                  inlineCodeFallback({ className, children, ...props })
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              // Fallback for code blocks without a language
              return (
                <SyntaxHighlighter style={syntaxTheme} PreTag="div" {...props}>
                  {raw.replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            },
            // Optional: style tables (GFM)
            table({ children, ...props }) {
              return (
                <table
                  {...props}
                  style={{ borderCollapse: 'collapse', width: '100%', display: 'table' }}>
                  {children}
                </table>
              );
            },
            th({ children, ...props }) {
              return (
                <th
                  {...props}
                  style={{
                    borderBottom: '1px solid #ddd',
                    padding: '0.5rem',
                    textAlign: 'left',
                    fontWeight: 600,
                  }}>
                  {children}
                </th>
              );
            },
            td({ children, ...props }) {
              return (
                <td
                  {...props}
                  style={{
                    borderBottom: '1px solid #eee',
                    padding: '0.5rem',
                    verticalAlign: 'top',
                  }}>
                  {children}
                </td>
              );
            },
          }}>
          {content}
        </ReactMarkdown>
      </div>
    );
  }
);

MarkdownViewer.displayName = 'MarkdownViewer';

export default MarkdownViewer;

/* ===========================
   OPTIONAL: rehype-pretty-code (Shiki)
   ---------------------------
   If you prefer VS Code-like themes and server-friendly highlighting, you can
   swap the code renderer above with rehype-pretty-code. Example:

   import rehypePrettyCode from "rehype-pretty-code";

   <ReactMarkdown
     remarkPlugins={[remarkGfm]}
     rehypePlugins={[
       [rehypePrettyCode, {
         theme: "github-dark",        // or a Shiki theme object
         keepBackground: true,
       }]
     ]}
     components={{
       code({ node, inline, className, children, ...props }) {
         const lang = (className || "").replace("language-", "");
         if (!inline && lang.toLowerCase() === "mermaid") {
           return <Mermaid chart={String(children).trim()} />;
         }
         return <code className={className} {...props}>{children}</code>;
       }
     }}
   >
     {content}
   </ReactMarkdown>

   NOTE: When using rehype-pretty-code, the plugin injects <pre> and <code> with
   highlight markup. You typically style via CSS instead of React components.
   =========================== */
````
