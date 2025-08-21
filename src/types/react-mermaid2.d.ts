declare module 'react-mermaid2' {
  import React from 'react';

  interface MermaidConfig {
    theme?: 'default' | 'dark' | 'forest' | 'neutral' | 'base';
    securityLevel?: 'strict' | 'loose' | 'antiscript' | 'sandbox';
    themeVariables?: {
      // Background and container
      background?: string;
      primaryBackgroundColor?: string;
      secondaryBackgroundColor?: string;

      // Text and fonts
      primaryColor?: string;
      secondaryColor?: string;
      tertiaryColor?: string;
      fontFamily?: string;

      // Lines and connections
      lineColor?: string;
      primaryBorderColor?: string;
      secondaryBorderColor?: string;

      // Node colors
      nodeTextColor?: string;
      clusterBkg?: string;
      clusterBorder?: string;

      // Edge colors
      edgeLabelBackground?: string;
      errorBkgColor?: string;
      errorTextColor?: string;

      [key: string]: any;
    };
    [key: string]: any;
  }

  interface MermaidProps {
    chart: string;
    className?: string;
    style?: React.CSSProperties;
    config?: MermaidConfig;
  }

  const Mermaid: React.FC<MermaidProps>;
  export default Mermaid;
}
