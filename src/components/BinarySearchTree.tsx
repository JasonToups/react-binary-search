'use client';

import React, { useEffect } from 'react';
import { useTreeTraversal } from '@/hooks/useTreeTraversal';
import { useScrollUtils } from '@/hooks/useScrollUtils';
import { AlgorithmSelector } from './AlgorithmSelector';
import { TreeVisualizer } from './TreeVisualizer';
import { ResultsDisplay } from './ResultsDisplay';
import { AlgorithmExplanation } from './AlgorithmExplanation';
import { CurrentAlgorithmHeader } from './CurrentAlgorithmHeader';

function BinarySearchTree() {
  const {
    results,
    searchType,
    processingResults,
    handleSearchType,
    handleReset,
    getCurrentAlgorithm,
    algorithms,
  } = useTreeTraversal();

  const currentAlgorithm = getCurrentAlgorithm();
  const { scrollToTreeHeading, scrollToTop } = useScrollUtils();

  useEffect(() => {
    // Initialize highlight.js
    if ((window as any).hljs) {
      try {
        (window as any).hljs.highlightAll();
      } catch (error) {
        console.error('BinarySearchTree: highlightAll() error:', error);
      }
    }
  }, []);

  const handleResetWithScroll = () => {
    handleReset();
    scrollToTop();
  };

  // Add this useEffect to handle scrolling after results render
  useEffect(() => {
    if (results.length > 0 && searchType) {
      // Results have rendered, now we can scroll
      setTimeout(() => {
        scrollToTreeHeading();
      }, 100); // Small delay to ensure DOM is fully updated
    }
  }, [results, searchType]);

  return (
    <div className="app bg-background">
      <header className="bg-card border-b border-border px-6 py-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">React Binary Search Tree</h1>
        <aside className="text-lg text-muted-foreground">
          An Exploration of Binary Search Operations
        </aside>
      </header>
      <main className="container mx-auto pb-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Only show algorithm cards when no algorithm is running */}
          {!searchType ? (
            <AlgorithmSelector
              algorithms={algorithms}
              onExecute={handleSearchType}
              processingResults={processingResults}
              searchType={searchType}
            />
          ) : (
            /* Show current algorithm info instead */
            currentAlgorithm && (
              <CurrentAlgorithmHeader algorithm={currentAlgorithm} onReset={handleReset} />
            )
          )}

          <TreeVisualizer />

          {results.length > 0 ? (
            <div className="space-y-6">
              <ResultsDisplay results={results} onReset={handleResetWithScroll} />
              {currentAlgorithm && <AlgorithmExplanation algorithm={currentAlgorithm} />}
            </div>
          ) : (
            <ResultsDisplay results={results} onReset={handleResetWithScroll} />
          )}
        </div>
      </main>
      <footer className="bg-card border-t border-border px-6 py-6 text-center">
        <p className="text-muted-foreground">
          Lovingly crafted by:{' '}
          <a
            href="https://jasontoups.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors">
            Jason Toups
          </a>
        </p>
      </footer>
    </div>
  );
}

export default BinarySearchTree;
