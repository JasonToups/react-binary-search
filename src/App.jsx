import React, { useState, useEffect, useRef } from 'react';

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Binary Search Tree
class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let temp = this.root;
    while (true) {
      if (newNode.value === temp.value) return undefined;
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

  contains(value) {
    if (this.root === null) return false;
    let temp = this.root;
    while (temp) {
      if (value < temp.value) {
        temp = temp.left;
      } else if (value > temp.value) {
        temp = temp.right;
      } else {
        return true;
      }
    }
    return false;
  }

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
  // Depth First Search
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
}

// Create your Tree
let myTree = new BST();
myTree.insert(47);
myTree.insert(21);
myTree.insert(76);
myTree.insert(18);
myTree.insert(27);
myTree.insert(52);
myTree.insert(82);

function Explanation({ algorithm }) {
  const [algorithmName, setAlgorithmName] = useState('');
  const [traverseOrder, setTraverseOrder] = useState('');
  const [explanation, setExplanation] = useState('');
  const [usage, setUsage] = useState('');

  useEffect(() => {
    if (algorithm === 'BFS') {
      const newExplanation =
        'Breadth First Search is a search algorithm that traverses a tree or graph, starting at the root, and exploring all nodes at the current level before moving on to the next level.';
      setExplanation(newExplanation);
    } else if (algorithm === 'DFSPreOrder') {
      setAlgorithmName('Depth-First Search — Pre-Order');
      setTraverseOrder('(Node, Left, Right)');
      setExplanation(
        'Visit the current node first, then recursively traverse the left subtree, then the right subtree.'
      );
      setUsage(
        'Use when you want to process a node before its children (e.g., serialize/copy a tree).'
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
    } else if (algorithm === 'DFSInOrder') {
      setAlgorithmName('Depth-First Search — In-Order');
      setTraverseOrder('(Left, Node, Right)');
      setExplanation(
        'Depth-First Search — In-Order (LNR, binary trees only): recursively traverse the left subtree, visit the current node, then traverse the right subtree. On a Binary Search Tree, this yields values in ascending order.'
      );
      setUsage(
        'Use when you need results from children before the parent (e.g., delete/free a tree, compute sizes).'
      );
    } else {
      console.log('No matching algorithm found');
    }
  }, [algorithm]);

  return (
    <section className="instructions">
      <h3>{algorithmName}</h3>
      <aside>
        <p>
          <span>Traverse Order</span> : {traverseOrder}
        </p>
        <p>
          <span>Explanation</span> : {explanation}
        </p>
        <p>
          <span>Usage</span> : {usage}
        </p>
      </aside>
    </section>
  );
}

function App() {
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [processingResults, setProcessingResults] = useState(false);
  const [currentTimeout, setCurrentTimeout] = useState(null); // Track current timeout
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);
  const fourRef = useRef(null);
  const fiveRef = useRef(null);
  const sixRef = useRef(null);
  const sevenRef = useRef(null);

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
    const treeRect = treeElement.getBoundingClientRect();

    // Calculate the offset of the tree within the container
    const treeOffsetX = treeRect.left - containerRect.left;
    const treeOffsetY = treeRect.top - containerRect.top;

    function getCenter(el) {
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

  const updateNodes = (results) => {
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

      if (activeNodeElement) {
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

  const handleSearchType = (type) => {
    // Allow interruption - cancel current and start new
    if (processingResults) {
      cancelCurrentProcess();
    }

    setSearchType(type);
    setResults(myTree[type]());
  };

  const handleReset = () => {
    setResults([]);
    setSearchType(''); // Clear searchType only when manually resetting
  };

  return (
    <div className="app">
      <header>
        <h1>React Binary Search Tree</h1>
        <aside>An Exploration of Binary Search Operations</aside>
      </header>
      <main>
        <div className="content-container">
          <div className="card color-bg-low">
            <h2>Show the results of Different Search Algorithms</h2>
            <div className="button-container">
              <button onClick={() => handleSearchType('BFS')}>Breadth First Search</button>
              <button className="accent-high" onClick={() => handleSearchType('DFSPreOrder')}>
                Depth First Search - PreOrder
              </button>
              <button className="accent" onClick={() => handleSearchType('DFSPostOrder')}>
                Depth First Search - PostOrder
              </button>
              <button className="accent-low" onClick={() => handleSearchType('DFSInOrder')}>
                Depth First Search - InOrder
              </button>
            </div>
          </div>

          <section className="binary-tree-container" ref={containerRef}>
            {searchType && <h3>{searchType}</h3>}
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
            <>
              <section className="results-container card color-bg-high">
                <div className="results-header">
                  <h3>Results</h3>
                  <button
                    className={`cancel ${processingResults ? 'inactive' : ''}`}
                    onClick={() => setResults([])}>
                    Reset
                  </button>
                </div>
                <code className="code-container">
                  [
                  {results.map((result, index) => (
                    <span key={index} data-value={result} className="result">
                      {result}
                      {index < results.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                  ]
                </code>
              </section>
              {searchType && <Explanation algorithm={searchType} />}
            </>
          ) : (
            <section className="instructions">
              <aside>
                Choose a <span>Search Algorithm</span> to see the results.
              </aside>
            </section>
          )}
        </div>
      </main>
      <footer>
        Lovingly crafted by:{' '}
        <a href="https://jasontoups.github.io/" target="_blank" rel="noopener noreferrer">
          Jason Toups
        </a>
      </footer>
    </div>
  );
}

export default App;
