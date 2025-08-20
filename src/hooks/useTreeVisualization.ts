import { useState, useEffect, useRef } from 'react';

export function useTreeVisualization() {
  const [lines, setLines] = useState<Array<{ x1: number; y1: number; x2: number; y2: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const oneRef = useRef<HTMLParagraphElement>(null);
  const twoRef = useRef<HTMLParagraphElement>(null);
  const threeRef = useRef<HTMLParagraphElement>(null);
  const fourRef = useRef<HTMLParagraphElement>(null);
  const fiveRef = useRef<HTMLParagraphElement>(null);
  const sixRef = useRef<HTMLParagraphElement>(null);
  const sevenRef = useRef<HTMLParagraphElement>(null);

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

  return {
    lines,
    containerRef,
    oneRef,
    twoRef,
    threeRef,
    fourRef,
    fiveRef,
    sixRef,
    sevenRef,
  };
}
