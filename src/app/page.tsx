import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="app bg-background">
      <header className="bg-card border-b border-border px-6 py-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">React Binary Search Tree</h1>
        <aside className="text-lg text-muted-foreground">
          An Exploration of Binary Search Operations
        </aside>
      </header>

      <main className="container mx-auto pb-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Welcome to React Study Buddy
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Your interactive learning companion for React and algorithms
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-muted-foreground">
                Explore binary search tree algorithms with interactive visualizations and detailed
                explanations.
              </p>
              <Link href="/algorithms">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Learning Algorithms
                </Button>
              </Link>
            </CardContent>
          </Card>
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
