import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { AlgorithmCard } from './AlgorithmCard';
import { AlgorithmConfig } from '@/lib/bst';

interface AlgorithmSelectorProps {
  algorithms: Record<string, AlgorithmConfig>;
  onExecute: (type: string) => void;
  processingResults: boolean;
  searchType: string;
}

export function AlgorithmSelector({
  algorithms,
  onExecute,
  processingResults,
  searchType,
}: AlgorithmSelectorProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Binary Search Tree Algorithms
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Explore different tree traversal algorithms and understand their behavior
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        {Object.values(algorithms).map((algorithm) => (
          <AlgorithmCard
            key={algorithm.id}
            title={algorithm.name}
            description={algorithm.description}
            difficulty={algorithm.difficulty}
            timeComplexity={algorithm.timeComplexity}
            spaceComplexity={algorithm.spaceComplexity}
            onExecute={() => onExecute(algorithm.id)}
            isExecuting={processingResults && searchType === algorithm.id}
          />
        ))}
      </div>
    </div>
  );
}
