'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, Zap, BarChart3 } from 'lucide-react';

interface AlgorithmCardProps {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeComplexity: string;
  spaceComplexity: string;
  onExecute: () => void;
  isExecuting?: boolean;
  className?: string;
}

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800 hover:bg-green-200',
  Intermediate: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  Advanced: 'bg-red-100 text-red-800 hover:bg-red-200',
};

export function AlgorithmCard({
  title,
  description,
  difficulty,
  timeComplexity,
  spaceComplexity,
  onExecute,
  isExecuting = false,
  className,
}: AlgorithmCardProps) {
  return (
    <Card className={`w-full max-w-md transition-all duration-200 hover:shadow-lg ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Separator />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <div>
              <div className="font-medium">Time</div>
              <div className="text-muted-foreground">{timeComplexity}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-green-500" />
            <div>
              <div className="font-medium">Space</div>
              <div className="text-muted-foreground">{spaceComplexity}</div>
            </div>
          </div>
        </div>

        <Separator />

        <Button onClick={onExecute} disabled={isExecuting} className="w-full" size="sm">
          {isExecuting ? (
            <>
              <Zap className="mr-2 h-4 w-4 animate-spin" />
              Executing...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Execute Algorithm
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
