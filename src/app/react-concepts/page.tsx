import { ReactConceptPageLayout } from '@/components/react/ReactConceptPageLayout';
import conceptGuide from './concept.md';
import furtherExploration from './explanation.md';

export default function ReactConceptsPage() {
  const interactiveComponent = (
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-4">React Concepts Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Components</h4>
          <p className="text-sm text-muted-foreground">
            Learn about functional and class components, props, and composition.
          </p>
        </div>
        <div className="p-6 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Hooks</h4>
          <p className="text-sm text-muted-foreground">
            Master useState, useEffect, and custom hooks for state management.
          </p>
        </div>
        <div className="p-6 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Data Fetching</h4>
          <p className="text-sm text-muted-foreground">
            Handle API calls, loading states, and error handling.
          </p>
        </div>
        <div className="p-6 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">State Management</h4>
          <p className="text-sm text-muted-foreground">
            Explore local state, context, and advanced patterns.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <ReactConceptPageLayout
      title="React Concepts"
      description="Learn React fundamentals, hooks, state management, and component architecture."
      conceptGuide={conceptGuide}
      interactiveComponent={interactiveComponent}
      furtherExploration={furtherExploration}
    />
  );
}
