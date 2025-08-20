import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from './CodeBlock';
import { AlgorithmConfig } from '@/lib/bst';

interface AlgorithmExplanationProps {
  algorithm: AlgorithmConfig;
}

export function AlgorithmExplanation({ algorithm }: AlgorithmExplanationProps) {
  return (
    <div className="space-y-6 text-left">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{algorithm.name}</CardTitle>
          <Badge variant="outline">{algorithm.traverseOrder}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Explanation</h4>
            <p className="text-muted-foreground">{algorithm.explanation}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Usage</h4>
            <p className="text-muted-foreground">{algorithm.usage}</p>
          </div>
        </CardContent>
      </Card>

      <CodeBlock
        code={algorithm.codeString}
        language="javascript"
        title="Implementation"
        showLineNumbers={true}
      />
    </div>
  );
}
