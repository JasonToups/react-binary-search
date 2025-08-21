'use client';
import React, { useState, useEffect } from 'react';
import { ReactConceptPageLayout } from '@/components/react/ReactConceptPageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import conceptGuide from './concept.md';
import furtherExploration from './explanation.md';

export default function FetchingDataPage() {
  const interactiveComponent = (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Data Fetching Demo</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This demonstrates the three states of data fetching: loading, error, and success.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Loading State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Error State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <Badge variant="destructive">Error</Badge>
              <p className="text-xs text-muted-foreground mt-2">Failed to fetch data</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Success State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <Badge variant="default">Success</Badge>
              <p className="text-xs text-muted-foreground mt-2">Data loaded successfully</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button className="bg-primary hover:bg-primary/90">Simulate Fetch</Button>
      </div>
    </div>
  );

  return (
    <ReactConceptPageLayout
      title="Fetching Data with React"
      description="Learn how to fetch data in React components using useEffect, handle loading states, and implement proper error handling."
      conceptGuide={conceptGuide}
      interactiveComponent={interactiveComponent}
      furtherExploration={furtherExploration}
    />
  );
}
