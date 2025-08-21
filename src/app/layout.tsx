import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/app.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'React Binary Search - Algorithm Study Guide',
  description: 'Learn React concepts and binary search algorithms through interactive examples',
  keywords: ['React', 'Algorithms', 'Binary Search', 'TypeScript', 'Learning'],
  authors: [{ name: 'React Binary Search Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
        <script>
          {`
            mermaid.initialize({ 
              startOnLoad: true,
              theme: 'default',
              flowchart: { useMaxWidth: true }
            });
          `}
        </script>
      </head>
      <body className={inter.className}>
        <div className="layout">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
