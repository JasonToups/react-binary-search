'use client';
import React from 'react';
import { MarkdownComponent } from './MarkdownComponent';

interface ReactConceptPageLayoutProps {
  title: string;
  description: string;
  conceptGuide: string;
  interactiveComponent: React.ReactNode;
  furtherExploration: string;
}

export function ReactConceptPageLayout({
  title,
  description,
  conceptGuide,
  interactiveComponent,
  furtherExploration,
}: ReactConceptPageLayoutProps) {
  return (
    <div className="container bg-card text-foreground mx-auto px-6 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="text-center mb-1 bg-card text-foreground border border-border rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-4 text-foreground">{title}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{description}</p>
      </div>

      {/* Concept Guide Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Concept Guide</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <MarkdownComponent content={conceptGuide} />
        </div>
      </section>

      {/* Interactive Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Interactive Example</h2>
        <div className="bg-card border border-border rounded-lg p-6">{interactiveComponent}</div>
      </section>

      {/* Further Exploration Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Further Exploration</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <MarkdownComponent content={furtherExploration} />
        </div>
      </section>
    </div>
  );
}
