export interface Node {
  value: number;
  left: Node | null;
  right: Node | null;
}

// Binary Search Tree
export class BST {
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

// Algorithm configuration
export interface AlgorithmConfig {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  timeComplexity: string;
  spaceComplexity: string;
  traverseOrder: string;
  explanation: string;
  usage: string;
  codeString: string;
}

export const ALGORITHMS: Record<string, AlgorithmConfig> = {
  BFS: {
    id: 'BFS',
    name: 'Breadth-First Search',
    description: 'Level-order traversal visiting nodes layer by layer from left to right',
    difficulty: 'Beginner',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(w)',
    traverseOrder: '(Level by level, left → right within each level)',
    explanation:
      'Breadth-First Search visits nodes in increasing distance from the start: it processes all nodes at the current depth before moving to the next depth. Implementation uses a FIFO queue; for graphs, also track a visited set to avoid revisiting nodes.',
    usage:
      'Use to find the shortest path (in number of edges) in unweighted graphs, check connectivity, and produce level-order listings of a tree (e.g., showing nodes by depth in a UI).',
    codeString: `// Breadth First Search
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
}`,
  },
  DFSPreOrder: {
    id: 'DFSPreOrder',
    name: 'Depth-First Search — Pre-Order',
    description: 'Visit root, then left subtree, then right subtree',
    difficulty: 'Beginner',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    traverseOrder: '(Node, Left, Right)',
    explanation:
      'Visit the current node first, then recursively traverse the left subtree, then the right subtree.',
    usage: 'Use when you want to process a node before its children (e.g., serialize/copy a tree).',
    codeString: `// Depth First Search - PreOrder
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
}`,
  },
  DFSPostOrder: {
    id: 'DFSPostOrder',
    name: 'Depth-First Search — Post-Order',
    description: 'Visit left subtree, then right subtree, then root',
    difficulty: 'Intermediate',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    traverseOrder: '(Left, Right, Node)',
    explanation:
      'Depth-First Search — Post-Order (LRN): recursively traverse the left subtree, then the right subtree, and visit the current node last.',
    usage:
      'Use when you need results from children before the parent (e.g., delete/free a tree, compute sizes).',
    codeString: `// Depth First Search - PostOrder
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
}`,
  },
  DFSInOrder: {
    id: 'DFSInOrder',
    name: 'Depth-First Search — In-Order',
    description: 'Visit left subtree, then root, then right subtree (sorted output for BST)',
    difficulty: 'Beginner',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    traverseOrder: '(Left, Node, Right)',
    explanation:
      'Depth-First Search — In-Order (LNR, binary trees only): recursively traverse the left subtree, visit the current node, then traverse the right subtree. On a Binary Search Tree, this yields values in ascending order.',
    usage:
      'Use when you need results from children before the parent (e.g., delete/free a tree, compute sizes).',
    codeString: `// Depth First Search - InOrder
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
}`,
  },
};

// Tree data structure
export const TREE_DATA = [47, 21, 76, 18, 27, 52, 82];
