'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AlgorithmCard } from './AlgorithmCard';
import { CodeBlock } from './CodeBlock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Node {
  value: number;
  left: Node | null;
  right: Node | null;
}

// Binary Search Tree
class BST {
  root: Node | null;

  constructor() {
    this.root = null;
  }

  insert(value: number): BST {
    const newNode: Node = { value, left: null, right: null };
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let temp = this.root;
    while (true) {
      if (newNode.value === temp.value) return this;
      if (newNode.value < temp.value) {
        if (temp.left === null) {
          temp.left = newNode;
          return this;
        }
        temp = temp.left;
      } else {
        if (temp.right === null) {
          temp.right = newNode;
          return this;
        }
        temp = temp.right;
      }
    }
  }

  contains(value: number): boolean {
    if (this.root === null) return false;
    let temp = this.root;
    while (temp) {
      if (value < temp.value) {
        temp = temp.left!;
      } else if (value > temp.value) {
        temp = temp.right!;
      } else {
        return true;
      }
    }
    return false;
  }

  // Breadth First Search
  BFS(): number[] {
    let currentNode = this.root;
    let queue: Node[] = [];
    let results: number[] = [];
    if (!currentNode) return results;
    queue.push(currentNode);

    while (queue.length) {
      currentNode = queue.shift()!;
      results.push(currentNode.value);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return results;
  }

  // Depth First Search
  DFSPreOrder(): number[] {
    let rootNode = this.root;
    let results: number[] = [];
    if (!rootNode) return results;

    const traverse = (currentNode: Node) => {
      results.push(currentNode.value);
      if (currentNode.left) traverse(currentNode.left);
      if (currentNode.right) traverse(currentNode.right);
    };

    traverse(rootNode);
    return results;
  }

  DFSPostOrder(): number[] {
    let rootNode = this.root;
    let results: number[] = [];
    if (!rootNode) return results;

    const traverse = (currentNode: Node) => {
      if (currentNode.left) traverse(currentNode.left);
      if (currentNode.right) traverse(currentNode.right);
      results.push(currentNode.value);
    };

    traverse(rootNode);
    return results;
  }

  DFSInOrder(): number[] {
    let rootNode = this.root;
    let results: number[] = [];
    if (!rootNode) return results;

    const traverse = (currentNode: Node) => {
      if (currentNode.left) traverse(currentNode.left);
      results.push(currentNode.value);
      if (currentNode.right) traverse(currentNode.right);
    };

    traverse(rootNode);
    return results;
  }
}

interface ExplanationProps {
  algorithm: string;
}

function Explanation({ algorithm }: ExplanationProps) {
  const [algorithmName, setAlgorithmName] = useState('');
  const [traverseOrder, setTraverseOrder] = useState('');
  const [explanation, setExplanation] = useState('');
  const [codeString, setCodeString] = useState(`const add = (a, b) => a + b;`);
  const [usage, setUsage] = useState('');

  useEffect(() => {
    if (algorithm === 'BFS') {
      setAlgorithmName('Breadth-First Search');
      setTraverseOrder('(Level by level, left → right within each level)');
      setExplanation(
        'Breadth-First Search visits nodes in increasing distance from the start: it processes all nodes at the current depth before moving to the next depth. Implementation uses a FIFO queue; for graphs, also track a visited set to avoid revisiting nodes.'
      );
      setUsage(
        'Use to find the shortest path (in number of edges) in unweighted graphs, check connectivity, and produce level-order listings of a tree (e.g., showing nodes by depth in a UI).'
      );
      setCodeString(`
// Breadth First Search
BFS() {
  let currentNode = this.root;
  let queue = [];
  let results = [];
  if (!currentNode) return results;
  queue.push(currentNode);

  while (queue.length) {
    currentNode = queue.shift();
    results.push(currentNode.value);
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }
  return results;
}
      `);
    } else if (algorithm === 'DFSPreOrder') {
      setAlgorithmName('Depth-First Search — Pre-Order');
      setTraverseOrder('(Node, Left, Right)');
      setExplanation(
        'Visit the current node first, then recursively traverse the left subtree, then the right subtree.'
      );
      setUsage(
        'Use when you want to process a node before its children (e.g., serialize/copy a tree).'
      );
      setCodeString(
        `
// Depth First Search - PreOrder
DFSPreOrder() {
  let rootNode = this.root;
  let results = [];
  if (!rootNode) return results;

  const traverse = (currentNode) => {
    results.push(currentNode.value);
    if (currentNode.left) traverse(currentNode.left);
    if (currentNode.right) traverse(currentNode.right);
  };

  traverse(rootNode);
  return results;
}
      `.trim()
      );
    } else if (algorithm === 'DFSPostOrder') {
      setAlgorithmName('Depth-First Search — Post-Order');
      setTraverseOrder('(Left, Right, Node)');
      setExplanation(
        'Depth-First Search — Post-Order (LRN): recursively traverse the left subtree, then the right subtree, and visit the current node last.'
      );
      setUsage(
        'Use when you need results from children before the parent (e.g., delete/free a tree, compute sizes).'
      );
      setCodeString(
        `
// Depth First Search - PostOrder
DFSPostOrder() {
  let rootNode = this.root;
  let results = [];
  if (!rootNode) return results;

  const traverse = (currentNode) => {
    if (currentNode.left) traverse(currentNode.left);
    if (currentNode.right) traverse(currentNode.right);
    results.push(currentNode.value);
  };

  traverse(rootNode);
  return results;
}
      `.trim()
      );
    } else if (algorithm === 'DFSInOrder') {
      setAlgorithmName('Depth-First Search — In-Order');
      setTraverseOrder('(Left, Node, Right)');
      setExplanation(
        'Depth-First Search — In-Order (LNR, binary trees only): recursively traverse the left subtree, visit the current node, then traverse the right subtree. On a Binary Search Tree, this yields values in ascending order.'
      );
      setUsage(
        'Use when you need results from children before the parent (e.g., delete/free a tree, compute sizes).'
      );
      setCodeString(
        `
// Depth First Search - InOrder
DFSInOrder() {
  let rootNode = this.root;
  let results = [];
  if (!rootNode) return results;

  const traverse = (currentNode) => {
    if (currentNode.left) traverse(currentNode.left);
    results.push(currentNode.value);
    if (currentNode.right) traverse(currentNode.right);
  };

  traverse(rootNode);
  return results;
}
      `.trim()
      );
    } else {
      console.log('No matching algorithm found');
    }
  }, [algorithm]);

  return (
    <div className="space-y-6 text-left">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{algorithmName}</CardTitle>
          <Badge variant="outline">{traverseOrder}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Explanation</h4>
            <p className="text-muted-foreground">{explanation}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Usage</h4>
            <p className="text-muted-foreground">{usage}</p>
          </div>
        </CardContent>
      </Card>

      <CodeBlock
        code={codeString}
        language="javascript"
        title="Implementation"
        showLineNumbers={true}
      />
    </div>
  );
}

function App() {
  const [results, setResults] = useState<number[]>([]);
  const [searchType, setSearchType] = useState('');
  const [processingResults, setProcessingResults] = useState(false);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(null);
  const [lines, setLines] = useState<Array<{ x1: number; y1: number; x2: number; y2: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const oneRef = useRef<HTMLParagraphElement>(null);
  const twoRef = useRef<HTMLParagraphElement>(null);
  const threeRef = useRef<HTMLParagraphElement>(null);
  const fourRef = useRef<HTMLParagraphElement>(null);
  const fiveRef = useRef<HTMLParagraphElement>(null);
  const sixRef = useRef<HTMLParagraphElement>(null);
  const sevenRef = useRef<HTMLParagraphElement>(null);

  const cancelCurrentProcess = () => {
    // Clear the current timeout
    if (currentTimeout) {
      clearTimeout(currentTimeout);
      setCurrentTimeout(null);
    }

    // Clear any pending timeouts by resetting state
    setProcessingResults(false);

    // Clear any active/passive classes from nodes
    const nodes = document.querySelectorAll('.node');
    nodes.forEach((node) => {
      node.classList.remove('active');
      node.classList.remove('passive');
    });

    // Clear any active/passive classes from results
    const results = document.querySelectorAll('.result');
    results.forEach((result) => {
      result.classList.remove('active');
      result.classList.remove('passive');
    });
  };

  const updateLines = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const treeElement = containerRef.current.querySelector('.binary-tree');
    if (!treeElement) return;

    const treeRect = treeElement.getBoundingClientRect();

    // Calculate the offset of the tree within the container
    const treeOffsetX = treeRect.left - containerRect.left;
    const treeOffsetY = treeRect.top - containerRect.top;

    function getCenter(el: Element) {
      const rect = el.getBoundingClientRect();
      return {
        x: ((rect.left + rect.width / 2 - containerRect.left - treeOffsetX) / treeRect.width) * 100,
        y: ((rect.top + rect.height / 2 - containerRect.top - treeOffsetY) / treeRect.height) * 100,
      };
    }

    if (
      oneRef.current &&
      twoRef.current &&
      threeRef.current &&
      fourRef.current &&
      fiveRef.current &&
      sixRef.current &&
      sevenRef.current
    ) {
      const one = getCenter(oneRef.current);
      const two = getCenter(twoRef.current);
      const three = getCenter(threeRef.current);
      const four = getCenter(fourRef.current);
      const five = getCenter(fiveRef.current);
      const six = getCenter(sixRef.current);
      const seven = getCenter(sevenRef.current);

      setLines([
        // Root connections
        { x1: one.x, y1: one.y, x2: two.x, y2: two.y },
        { x1: one.x, y1: one.y, x2: three.x, y2: three.y },
        // Left subtree connections
        { x1: two.x, y1: two.y, x2: four.x, y2: four.y },
        { x1: two.x, y1: two.y, x2: five.x, y2: five.y },
        // Right subtree connections
        { x1: three.x, y1: three.y, x2: six.x, y2: six.y },
        { x1: three.x, y1: three.y, x2: seven.x, y2: seven.y },
      ]);
    }
  };

  const updateNodes = (results: number[]) => {
    // Cancel any existing process first
    cancelCurrentProcess();

    let currentIndex = 0;
    let timeout = 2000;
    setProcessingResults(true);

    const processNextNode = () => {
      if (currentIndex >= results.length) {
        setProcessingResults(false);
        setCurrentTimeout(null);
        return;
      }

      const activeNode = results[currentIndex];
      const activeNodeElement = document.querySelector(`p[data-value="${activeNode}"]`);
      const activeResultsElement = document.querySelector(`span[data-value="${activeNode}"]`);

      if (activeNodeElement && activeResultsElement) {
        activeNodeElement.classList.add('active');
        activeResultsElement.classList.add('active');

        const timeoutId = setTimeout(() => {
          activeNodeElement.classList.add('passive');
          activeNodeElement.classList.remove('active');
          activeResultsElement.classList.remove('active');

          currentIndex++;
          processNextNode();
        }, timeout);

        setCurrentTimeout(timeoutId);
      } else {
        currentIndex++;
        processNextNode();
      }
    };

    processNextNode();
  };

  useEffect(() => {
    updateNodes(results);
  }, [results]);

  useEffect(() => {
    updateLines();

    // Add resize observer for responsive connections
    const resizeObserver = new ResizeObserver(() => {
      updateLines();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Also update on window resize
    const handleResize = () => {
      updateLines();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Initialize highlight.js
    if ((window as any).hljs) {
      try {
        (window as any).hljs.highlightAll();
      } catch (error) {
        console.error('App: highlightAll() error:', error);
      }
    }
  }, []);

  const scrollToTreeHeading = () => {
    const treeSection = document.querySelector('.binary-tree-container');
    if (treeSection) {
      treeSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSearchType = (type: string) => {
    // Allow interruption - cancel current and start new
    if (processingResults) {
      cancelCurrentProcess();
    }

    setSearchType(type);

    // Type-safe method calls
    if (type === 'BFS') {
      setResults(myTree.BFS());
    } else if (type === 'DFSPreOrder') {
      setResults(myTree.DFSPreOrder());
    } else if (type === 'DFSPostOrder') {
      setResults(myTree.DFSPostOrder());
    } else if (type === 'DFSInOrder') {
      setResults(myTree.DFSInOrder());
    }
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

  const handleReset = () => {
    setResults([]);
    setSearchType(''); // This will show the search buttons again
    scrollToTop();
  };

  // Create your Tree
  const myTree = new BST();
  myTree.insert(47);
  myTree.insert(21);
  myTree.insert(76);
  myTree.insert(18);
  myTree.insert(27);
  myTree.insert(52);
  myTree.insert(82);

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
                <AlgorithmCard
                  title="Breadth-First Search"
                  description="Level-order traversal visiting nodes layer by layer from left to right"
                  difficulty="Beginner"
                  timeComplexity="O(n)"
                  spaceComplexity="O(w)"
                  onExecute={() => handleSearchType('BFS')}
                  isExecuting={processingResults && searchType === 'BFS'}
                />

                <AlgorithmCard
                  title="DFS Pre-Order"
                  description="Visit root, then left subtree, then right subtree"
                  difficulty="Beginner"
                  timeComplexity="O(n)"
                  spaceComplexity="O(h)"
                  onExecute={() => handleSearchType('DFSPreOrder')}
                  isExecuting={processingResults && searchType === 'DFSPreOrder'}
                />

                <AlgorithmCard
                  title="DFS Post-Order"
                  description="Visit left subtree, then right subtree, then root"
                  difficulty="Intermediate"
                  timeComplexity="O(n)"
                  spaceComplexity="O(h)"
                  onExecute={() => handleSearchType('DFSPostOrder')}
                  isExecuting={processingResults && searchType === 'DFSPostOrder'}
                />

                <AlgorithmCard
                  title="DFS In-Order"
                  description="Visit left subtree, then root, then right subtree (sorted output for BST)"
                  difficulty="Beginner"
                  timeComplexity="O(n)"
                  spaceComplexity="O(h)"
                  onExecute={() => handleSearchType('DFSInOrder')}
                  isExecuting={processingResults && searchType === 'DFSInOrder'}
                />
              </div>
            </div>
          ) : (
            /* Show current algorithm info instead */
            <Card className="w-fit mx-auto">
              <CardContent className="algorithm-header">
                <Button onClick={handleReset} variant="ghost" className="p-0">
                  <h2 className="text-xl px-3 font-semibold">{searchType}</h2>
                </Button>
              </CardContent>
            </Card>
          )}

          <section className="binary-tree-container" ref={containerRef}>
            {/* SVG container positioned behind the tree */}
            <svg className="tree-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              {lines.map((line, i) => (
                <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
              ))}
            </svg>

            {/* Tree nodes positioned on top */}
            <div className="binary-tree">
              <div>
                <p className="node" ref={oneRef} data-value="47">
                  47
                </p>
              </div>
              <div>
                <p className="node" ref={twoRef} data-value="21">
                  21
                </p>
              </div>
              <div>
                <p className="node" ref={threeRef} data-value="76">
                  76
                </p>
              </div>
              <div>
                <p className="node" ref={fourRef} data-value="18">
                  18
                </p>
              </div>
              <div>
                <p className="node" ref={fiveRef} data-value="27">
                  27
                </p>
              </div>
              <div>
                <p className="node" ref={sixRef} data-value="52">
                  52
                </p>
              </div>
              <div>
                <p className="node" ref={sevenRef} data-value="82">
                  82
                </p>
              </div>
            </div>
          </section>
          {results.length > 0 ? (
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Results</CardTitle>
                  <Button onClick={handleReset} variant="destructive" size="sm">
                    Reset
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg font-mono text-2xl">
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
              {searchType && <Explanation algorithm={searchType} />}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Choose a <span className="font-semibold text-primary">Search Algorithm</span> to
                  see the results.
                </p>
              </CardContent>
            </Card>
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

export default App;
