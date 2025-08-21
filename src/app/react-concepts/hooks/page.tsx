import { ReactConceptPageLayout } from '@/components/react/ReactConceptPageLayout';
import conceptGuide from './concept.md';
import furtherExploration from './explanation.md';

export default function HooksPage() {
  const interactiveComponent = (
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-4">Hooks Demo</h3>
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded">
          <p className="text-sm text-muted-foreground">
            Interactive hooks demonstration will go here
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <ReactConceptPageLayout
      title="React Hooks"
      description="Master React hooks: useState, useEffect, useContext, and custom hooks."
      conceptGuide={conceptGuide}
      interactiveComponent={interactiveComponent}
      furtherExploration={furtherExploration}
    />
  );
}
