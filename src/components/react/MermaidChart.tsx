'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Mermaid with no SSR to prevent hydration issues
const Mermaid = dynamic(() => import('react-mermaid2'), {
  ssr: false,
  loading: () => (
    <div className="mermaid-loading">
      <div className="animate-pulse bg-muted rounded-lg p-8 text-center">Loading diagram...</div>
    </div>
  ),
});

interface MermaidChartProps {
  chart: string;
}

export const MermaidChart: React.FC<MermaidChartProps> = ({ chart }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="mermaid-loading">
        <div className="animate-pulse bg-muted rounded-lg p-8 text-center">Loading diagram...</div>
      </div>
    );
  }

  return (
    <Mermaid
      chart={chart}
      config={{
        theme: 'dark',
        securityLevel: 'loose',
      }}
    />
  );
};
