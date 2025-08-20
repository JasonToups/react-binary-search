# Components Directory Structure

This directory contains all React components organized by functionality and purpose.

## Directory Organization

### `/algorithms/`

Components specifically related to algorithm visualization and interaction:

- `BinarySearchTree.tsx` - Main binary search tree component
- `AlgorithmCard.tsx` - Individual algorithm selection card
- `AlgorithmSelector.tsx` - Grid of algorithm options
- `AlgorithmExplanation.tsx` - Detailed algorithm explanation and code
- `CurrentAlgorithmHeader.tsx` - Current algorithm header display
- `TreeVisualizer.tsx` - Tree visualization with SVG connections
- `ResultsDisplay.tsx` - Algorithm execution results display

### `/react/`

Components for React concept demonstrations and utilities:

- `CodeBlock.tsx` - Syntax-highlighted code display component

### `/ui/`

Reusable UI components built with shadcn/ui:

- `alert.tsx` - Alert components
- `badge.tsx` - Badge components
- `button.tsx` - Button components
- `card.tsx` - Card components
- `dialog.tsx` - Dialog/modal components
- `separator.tsx` - Separator components
- `sheet.tsx` - Sheet/sidebar components
- `tabs.tsx` - Tab components

### Root Level

- `Navbar.tsx` - Main navigation component
- `index.ts` - Main export file for all components

## Usage

### Importing Components

```tsx
// Import specific algorithm components
import { BinarySearchTree, AlgorithmCard } from '@/components/algorithms';

// Import React concept components
import { CodeBlock } from '@/components/react';

// Import UI components
import { Button, Card } from '@/components/ui';

// Import from main index (includes all)
import { BinarySearchTree, CodeBlock, Button } from '@/components';
```

### Adding New Components

1. **Algorithm Components**: Place in `/algorithms/` directory
2. **React Concept Components**: Place in `/react/` directory
3. **UI Components**: Place in `/ui/` directory
4. **Update the appropriate index.ts file** to export the new component
5. **Update the main index.ts** if the component should be available globally

## Benefits of This Organization

- **Clear Separation of Concerns**: Each directory has a specific purpose
- **Easy Navigation**: Developers can quickly find relevant components
- **Scalable Structure**: Easy to add new components without cluttering
- **Import Clarity**: Clear import paths indicate component purpose
- **Maintainability**: Related components are grouped together
- **Interview Ready**: Demonstrates professional code organization practices
