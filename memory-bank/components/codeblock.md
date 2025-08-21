# CodeBlock Component

## Overview

The CodeBlock component is a feature-rich code display component based on the [Aceternity UI CodeBlock](https://ui.aceternity.com/components/code-block) implementation. It provides syntax highlighting, copy functionality, and support for multiple tabs.

## Features

- **Syntax Highlighting**: Uses react-syntax-highlighter with Prism for excellent code highlighting
- **Copy to Clipboard**: Built-in copy functionality with visual feedback
- **Multiple Tabs**: Support for displaying multiple code files in tabs
- **Line Highlighting**: Ability to highlight specific lines of code
- **Line Numbers**: Optional line number display
- **Dark Theme**: Beautiful dark theme optimized for code readability

## Dependencies

```bash
npm install motion clsx tailwind-merge react-syntax-highlighter @types/react-syntax-highlighter @tabler/icons-react
```

## Usage

### Basic Usage

```tsx
import { CodeBlock } from '@/components/react/CodeBlock';

<CodeBlock
  code="const hello = 'world';"
  language="javascript"
  filename="example.js"
  showLineNumbers={true}
/>;
```

### With Title Instead of Filename

```tsx
<CodeBlock
  code="const hello = 'world';"
  language="javascript"
  title="Example Code"
  showLineNumbers={true}
/>
```

### With Line Highlighting

```tsx
<CodeBlock
  code="const hello = 'world';\nconsole.log(hello);"
  language="javascript"
  filename="example.js"
  highlightLines={[2]}
  showLineNumbers={true}
/>
```

### With Multiple Tabs

```tsx
<CodeBlock
  language="javascript"
  filename="Multiple Files"
  tabs={[
    {
      name: 'Component.jsx',
      code: 'const Component = () => <div>Hello</div>;',
      language: 'jsx',
    },
    {
      name: 'styles.css',
      code: '.component { color: blue; }',
      language: 'css',
    },
  ]}
/>
```

## Props

| Prop              | Type               | Required    | Description                                           |
| ----------------- | ------------------ | ----------- | ----------------------------------------------------- |
| `language`        | `string`           | Yes         | Programming language for syntax highlighting          |
| `code`            | `string`           | Conditional | Code content to display (use with single code)        |
| `tabs`            | `Array<TabConfig>` | Conditional | Array of tab configurations (use with multiple files) |
| `filename`        | `string`           | No          | Name of the file to display                           |
| `title`           | `string`           | No          | Title to display (alternative to filename)            |
| `highlightLines`  | `number[]`         | No          | Array of line numbers to highlight                    |
| `showLineNumbers` | `boolean`          | No          | Whether to show line numbers (default: true)          |

## TabConfig Structure

```tsx
interface TabConfig {
  name: string; // Tab name
  code: string; // Code content
  language?: string; // Override default language
  highlightLines?: number[]; // Lines to highlight for this tab
}
```

## Implementation Details

- **Client Component**: Uses `"use client"` directive for React hooks
- **Syntax Highlighter**: Built on react-syntax-highlighter with Prism
- **Theme**: Uses atomDark theme for optimal code readability
- **Copy Functionality**: Native clipboard API with fallback handling
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Benefits Over Previous Implementation

1. **Better Syntax Highlighting**: Prism-based highlighting is more accurate and feature-rich
2. **Multiple Tabs**: Support for displaying multiple files in a single component
3. **Line Highlighting**: Ability to highlight specific lines for educational purposes
4. **Modern Design**: Clean, professional appearance with better typography
5. **Copy Feedback**: Visual confirmation when code is copied
6. **Consistent Styling**: Follows modern design patterns and accessibility standards

## Location

`src/components/react/CodeBlock.tsx`
