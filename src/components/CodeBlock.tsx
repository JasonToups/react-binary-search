'use client';

import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language,
  title,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (codeRef.current && (window as any).hljs) {
        try {
          (window as any).hljs.highlightElement(codeRef.current);
        } catch (error) {
          console.error('Highlight.js error:', error);
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [code]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const lines = code.split('\n');

  return (
    <Card className={cn('w-full', className)}>
      {title && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {language}
            </Badge>
            <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 w-8 p-0">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
      )}

      <CardContent className={title ? 'pt-0' : ''}>
        <div className="relative">
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
            <code
              ref={codeRef}
              className={`hljs language-${language} ${showLineNumbers ? 'line-numbers' : ''}`}
              style={{
                background: 'transparent',
                padding: 0,
              }}>
              {showLineNumbers
                ? lines
                    .map((line, index) => `${(index + 1).toString().padStart(2, ' ')} | ${line}`)
                    .join('\n')
                : code}
            </code>
          </pre>

          {!title && (
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="absolute right-2 top-2 h-8 w-8 p-0">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
