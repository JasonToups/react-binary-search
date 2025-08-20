# Home Page

## Hero Section

Let's use the Hero Highlight Section from Aceternity UI - https://ui.aceternity.com/components/hero-highlight

```shell
pnpm dlx shadcn@latest add https://ui.aceternity.com/registry/hero-highlight.json
```

## Features Section

Let's use Aceternity UI's Glowing Effect with a Bento Grid

https://ui.aceternity.com/components/glowing-effect

```shell
pnpm dlx shadcn@latest add https://ui.aceternity.com/registry/glowing-effect.json

```

Our Features should include Interactive Algorithm Demos, and In-Depth React Concepts. Also, feel free to include any features you think would work here.

## Page Background

I Like the Aceternity UI Dot Background
https://ui.aceternity.com/components/grid-and-dot-backgrounds

### Install Dependencies

```shell
pnpm i motion clsx tailwind-merge
```

### Add util file

```tsx
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Create Dot Background

```tsx
import { cn } from '@/lib/utils';
import React from 'react';

export function DotBackgroundDemo() {
  return (
    <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          'absolute inset-0',
          '[background-size:20px_20px]',
          '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
          'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]'
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
        Backgrounds
      </p>
    </div>
  );
}
```
