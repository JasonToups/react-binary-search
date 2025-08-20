import { useState, useEffect, useRef } from 'react';
import { BST, ALGORITHMS, TREE_DATA } from '@/lib/bst';

export function useTreeTraversal() {
  const [results, setResults] = useState<number[]>([]);
  const [searchType, setSearchType] = useState('');
  const [processingResults, setProcessingResults] = useState(false);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(null);

  // Create tree instance
  const treeRef = useRef<BST>();

  useEffect(() => {
    if (!treeRef.current) {
      treeRef.current = new BST();
      TREE_DATA.forEach((value) => treeRef.current!.insert(value));
    }
  }, []);

  const cancelCurrentProcess = () => {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
      setCurrentTimeout(null);
    }
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

  const updateNodes = (results: number[]) => {
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

  const handleSearchType = (type: string) => {
    if (processingResults) {
      cancelCurrentProcess();
    }

    setSearchType(type);

    if (treeRef.current) {
      if (type === 'BFS') {
        setResults(treeRef.current.BFS());
      } else if (type === 'DFSPreOrder') {
        setResults(treeRef.current.DFSPreOrder());
      } else if (type === 'DFSPostOrder') {
        setResults(treeRef.current.DFSPostOrder());
      } else if (type === 'DFSInOrder') {
        setResults(treeRef.current.DFSInOrder());
      }
    }
  };

  const handleReset = () => {
    setResults([]);
    setSearchType('');
  };

  const getCurrentAlgorithm = () => {
    return searchType ? ALGORITHMS[searchType] : null;
  };

  return {
    results,
    searchType,
    processingResults,
    handleSearchType,
    handleReset,
    getCurrentAlgorithm,
    algorithms: ALGORITHMS,
  };
}
