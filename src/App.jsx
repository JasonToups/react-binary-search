import React, { useState, useEffect, useRef, useCallback } from 'react';

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

function App() {
  const [clicked, setClicked] = useState(false);
  const [results, setResults] = useState([]);
  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);
  const fourRef = useRef(null);
  const fiveRef = useRef(null);
  const sixRef = useRef(null);
  const sevenRef = useRef(null);
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);

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

      console.log('Container dimensions:', containerRect.width, containerRect.height);
      console.log('Tree dimensions:', treeRect.width, treeRect.height);
      console.log('Tree offset:', treeOffsetX, treeOffsetY);
      console.log('Node positions:', { one, two, three, four, five, six, seven });

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
    console.log('updateNodes called with:', results);

    if (results.length === 0) {
      console.log('No results, returning early');
      return;
    }

    results.forEach((result) => {
      const activeNode = result;
      console.log('Active node:', activeNode);

      const activeNodeElement = document.querySelector(`p[data-value="${activeNode}"]`);
      console.log('Found element:', activeNodeElement);

      if (activeNodeElement) {
        console.log('Adding active class to:', activeNodeElement);
        activeNodeElement.classList.add('active');

        setTimeout(() => {
          console.log('Removing active class and adding passive to:', activeNodeElement);
          activeNodeElement.classList.remove('active');
          activeNodeElement.classList.add('passive');
        }, 10000);
      } else {
        console.log('No element found for node:', activeNode);
      }
    });
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

  return (
    <div className="app" data-clicked={clicked}>
      <header>
        <h1>React Binary Search Tree</h1>
        <aside>An Exporation of Binary Search Operations</aside>
      </header>
      <main>
        <section className="binary-tree-container" ref={containerRef}>
          {/* SVG container positioned behind the tree */}
          <svg className="tree-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {lines.map((line, i) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="blue"
                strokeWidth="2"
              />
            ))}
          </svg>

          {/* Tree nodes positioned on top */}
          <div className="binary-tree">
            <div>
              <p ref={oneRef} data-value="47">
                47
              </p>
            </div>
            <div>
              <p ref={twoRef} data-value="21">
                21
              </p>
            </div>
            <div>
              <p ref={threeRef} data-value="76">
                76
              </p>
            </div>
            <div>
              <p ref={fourRef} data-value="18">
                18
              </p>
            </div>
            <div>
              <p ref={fiveRef} data-value="27">
                27
              </p>
            </div>
            <div>
              <p ref={sixRef} data-value="52">
                52
              </p>
            </div>
            <div>
              <p ref={sevenRef} data-value="82">
                82
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="card">
            <h2>Show the results of a Breadth First Search</h2>
            <div className="button-container">
              <button onClick={() => setResults(myTree.BFS())}>BFS</button>
              <button onClick={() => setResults([])} className="accent">
                Reset
              </button>
            </div>
          </div>
        </section>
        <section>
          {results.length > 0 ? <code>[{results.join(', ')}]</code> : <p>No results yet</p>}
        </section>
      </main>
      <footer>by: Jason Toups</footer>
    </div>
  );
}

export default App;
