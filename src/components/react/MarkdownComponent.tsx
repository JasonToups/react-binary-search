'use client';
import React, { memo, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MermaidChart } from './MermaidChart';

interface MarkdownComponentProps {
  content: string;
  className?: string;
}

export const MarkdownComponent: React.FC<MarkdownComponentProps> = memo(
  ({ content, className = '' }) => {
    const [isClient, setIsClient] = useState(false);

    // Only run on client
    useEffect(() => {
      setIsClient(true);
    }, []);

    // Custom components for react-markdown
    const components = {
      // Override code blocks to use proper syntax highlighting
      code({ node, inline, className, children, ...props }: any) {
        const raw = String(children ?? '');
        const match = /language-(\w+)/.exec(className || '');

        // 1) INLINE CODE: Check multiple conditions for inline code
        const isInline =
          inline ||
          // Check if it's a single line without newlines and not a language block
          (!match && raw.trim().split('\n').length === 1 && raw.trim().length < 100) ||
          // Check if the node indicates it's inline
          node?.type === 'inlineCode' ||
          // Check if className suggests inline
          className?.includes('inline') ||
          // Check if it's a simple word/phrase without complex formatting
          (raw.trim().length < 50 && !raw.includes('\n') && !raw.includes('```'));

        if (isInline) {
          return (
            <code className={`inline-code ${className || ''}`} {...props}>
              {children}
            </code>
          );
        }

        // Mermaid charts: ```mermaid
        if (!inline && match?.[1]?.toLowerCase() === 'mermaid') {
          return <MermaidChart chart={raw.trim()} />;
        }

        // Fenced code blocks with language - use SyntaxHighlighter
        if (match) {
          return (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="pre"
              CodeTag="code"
              children={raw.replace(/\n$/, '')}
              {...props}
            />
          );
        }

        // Fallback for code blocks without language - use SyntaxHighlighter
        return (
          <SyntaxHighlighter style={oneDark} PreTag="pre" CodeTag="code" {...props}>
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

      // Custom paragraph styles - completely exclude any block-level elements
      p: ({ children, ...props }: any) => {
        // Check if this paragraph contains any block-level elements that shouldn't be in p tags
        const hasBlockElements = React.Children.toArray(children).some((child: any) => {
          // Check for code blocks, pre tags, div tags, or other block elements
          return (
            child?.type === 'code' ||
            child?.props?.node?.tagName === 'code' ||
            child?.type === 'pre' ||
            child?.props?.node?.tagName === 'pre' ||
            child?.type === 'div' ||
            child?.props?.node?.tagName === 'div' ||
            // Check if it's a SyntaxHighlighter component
            child?.type?.displayName === 'SyntaxHighlighter' ||
            child?.props?.className?.includes('react-syntax-highlighter') ||
            // Check if it's a Mermaid component
            child?.type === MermaidChart ||
            child?.type?.displayName === 'MermaidChart'
          );
        });

        // If it contains block elements, don't wrap in p tag
        if (hasBlockElements) {
          return <>{children}</>;
        }

        return (
          <p className="mb-4 text-muted-foreground leading-relaxed" {...props}>
            {children}
          </p>
        );
      },

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
      <div className={`prose prose-slate max-w-none markdown-body ${className}`}>
        <ReactMarkdown
          components={components}
          remarkPlugins={[remarkGfm]}
          // Use rehype plugins to ensure proper HTML structure
          rehypePlugins={[]}>
          {content}
        </ReactMarkdown>
      </div>
    );
  }
);

MarkdownComponent.displayName = 'MarkdownComponent';
