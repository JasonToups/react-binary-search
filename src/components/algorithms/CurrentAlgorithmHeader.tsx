import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlgorithmConfig } from '@/lib/bst';

interface CurrentAlgorithmHeaderProps {
  algorithm: AlgorithmConfig;
  onReset: () => void;
}

export function CurrentAlgorithmHeader({ algorithm, onReset }: CurrentAlgorithmHeaderProps) {
  return (
    <Card className="w-fit mx-auto">
      <CardContent className="algorithm-header">
        <Button onClick={onReset} variant="ghost" className="p-0">
          <h2 className="text-xl px-3 font-semibold">{algorithm.name}</h2>
        </Button>
      </CardContent>
    </Card>
  );
}
