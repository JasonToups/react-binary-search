'use client';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { CodeBlock } from './CodeBlock';

interface MarkdownComponentProps {
  content: string;
  className?: string;
}

export function MarkdownComponent({ content, className = '' }: MarkdownComponentProps) {
  // Initialize Mermaid after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).mermaid) {
      (window as any).mermaid.init();
    }
  }, []);

  // Custom components for react-markdown
  const components = {
    // Override code blocks to use our CodeBlock component
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const code = String(children).replace(/\n$/, '');

      if (inline) {
        return (
          <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono" {...props}>
            {children}
          </code>
        );
      }

      // Handle Mermaid charts
      if (language === 'mermaid') {
        return (
          <div className="my-6 p-4 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Mermaid Chart</div>
            <div className="mermaid" key={Math.random()}>
              {code}
            </div>
          </div>
        );
      }

      // Use our CodeBlock component for other code blocks
      return (
        <CodeBlock
          code={code}
          language={language}
          filename={language === 'jsx' ? 'Component' : 'Code'}
          showLineNumbers={true}
        />
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
  };

  return (
    <div className={`prose prose-slate max-w-none ${className}`}>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
