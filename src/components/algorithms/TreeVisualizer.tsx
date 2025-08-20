import React from 'react';
import { useTreeVisualization } from '@/hooks/useTreeVisualization';

export function TreeVisualizer() {
  const { lines, containerRef, oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, sevenRef } =
    useTreeVisualization();

  return (
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
  );
}
