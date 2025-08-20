import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ResultsDisplayProps {
  results: number[];
  onReset: () => void;
}

export function ResultsDisplay({ results, onReset }: ResultsDisplayProps) {
  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            Choose a <span className="font-semibold text-primary">Search Algorithm</span> to see the
            results.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Results</CardTitle>
        <Button onClick={onReset} variant="destructive" size="sm">
          Reset
        </Button>
      </CardHeader>
      <CardContent>
        <div className="results-container bg-muted p-4 rounded-lg font-mono text-2xl">
          [
          {results.map((result, index) => (
            <span key={index} data-value={result} className="result">
              {result}
              {index < results.length - 1 ? ', ' : ''}
            </span>
          ))}
          ]
        </div>
      </CardContent>
    </Card>
  );
}
