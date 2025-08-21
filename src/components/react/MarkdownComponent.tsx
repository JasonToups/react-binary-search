'use client';
import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownComponentProps {
  content: string;
  className?: string;
}

export const MarkdownComponent: React.FC<MarkdownComponentProps> = memo(
  ({ content, className = '' }) => {
    // Custom components for react-markdown
    const components = {
      // Override code blocks to use proper syntax highlighting
      code({ node, inline, className, children, ...props }: any) {
        const raw = String(children ?? '');
        const match = /language-(\w+)/.exec(className || '');

        // Inline code
        if (inline) {
          return (
            <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono" {...props}>
              {children}
            </code>
          );
        }

        // Mermaid charts
        if (match?.[1]?.toLowerCase() === 'mermaid') {
          return (
            <div className="my-6 p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Mermaid Chart</div>
              <div className="mermaid" key={Math.random()}>
                {raw.trim()}
              </div>
            </div>
          );
        }

        // Fenced code blocks with language
        if (match) {
          return (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              children={raw.replace(/\n$/, '')}
              {...props}
            />
          );
        }

        // Fallback for code blocks without language
        return (
          <SyntaxHighlighter style={oneDark} PreTag="div" {...props}>
            {raw.replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      },

      // Custom heading styles
      h1: ({ children, ...props }: any) => (
        <h1 className="text-3xl font-bold mb-4 text-foreground" {...props}>
          {children}
        </h1>
      ),
      h2: ({ children, ...props }: any) => (
        <h2 className="text-2xl font-semibold mb-3 text-foreground" {...props}>
          {children}
        </h2>
      ),
      h3: ({ children, ...props }: any) => (
        <h3 className="text-xl font-semibold mb-2 text-foreground" {...props}>
          {children}
        </h3>
      ),

      // Custom paragraph styles
      p: ({ children, ...props }: any) => (
        <p className="mb-4 text-muted-foreground leading-relaxed" {...props}>
          {children}
        </p>
      ),

      // Custom list styles
      ul: ({ children, ...props }: any) => (
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground" {...props}>
          {children}
        </ul>
      ),
      ol: ({ children, ...props }: any) => (
        <ol className="list-decimal list-inside mb-4 space-y-1 text-muted-foreground" {...props}>
          {children}
        </ol>
      ),

      // Custom blockquote styles
      blockquote: ({ children, ...props }: any) => (
        <blockquote
          className="border-l-4 border-primary pl-4 py-2 my-4 bg-muted/50 italic text-muted-foreground"
          {...props}>
          {children}
        </blockquote>
      ),

      // Custom link styles
      a: ({ href, children, ...props }: any) => (
        <a
          href={href}
          className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          {...props}>
          {children}
        </a>
      ),

      // Custom table styles for GFM
      table: ({ children, ...props }: any) => (
        <table className="w-full border-collapse mb-4" {...props}>
          {children}
        </table>
      ),
      th: ({ children, ...props }: any) => (
        <th className="border border-border px-3 py-2 text-left font-semibold bg-muted" {...props}>
          {children}
        </th>
      ),
      td: ({ children, ...props }: any) => (
        <td className="border border-border px-3 py-2" {...props}>
          {children}
        </td>
      ),
    };

    return (
      <div className={`prose prose-slate max-w-none ${className}`}>
        <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    );
  }
);

MarkdownComponent.displayName = 'MarkdownComponent';
