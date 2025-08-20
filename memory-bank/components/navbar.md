# Navbar

## New Feature - Auto Generate Links to Routes

I would like to create a utility that will automatically generate the NAV bar links to the page structure that we are developing in our next JS project.

This way whenever we create a new page in our router, it will automatically show up on our NAV bar.

Also, I see that we have a /pages folder that's not being used.
src/pages

If the NextJS default routing uses /src/app let's keep that structure and remove src/pages.

## Description

I Pulled this code structure from @https://pro.aceternity.com/products/navbars

```html
<div class="w-full">
  <div
    class="z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-white px-4 py-2 lg:flex dark:bg-neutral-950 sticky inset-x-0 top-40">
    <a
      class="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
      href="/"
      ><img
        alt="logo"
        loading="lazy"
        width="30"
        height="30"
        decoding="async"
        data-nimg="1"
        style="color: transparent;"
        srcset="
          /_next/image?url=https%3A%2F%2Fassets.aceternity.com%2Flogo-dark.png&amp;w=32&amp;q=75 1x,
          /_next/image?url=https%3A%2F%2Fassets.aceternity.com%2Flogo-dark.png&amp;w=64&amp;q=75 2x
        "
        src="/_next/image?url=https%3A%2F%2Fassets.aceternity.com%2Flogo-dark.png&amp;w=64&amp;q=75" /><span
        class="font-medium text-black dark:text-white"
        >DevStudio</span
      ></a
    >
    <div
      class="hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2">
      <nav
        class="relative flex justify-center space-x-4 rounded-full bg-white px-4 py-3 dark:bg-neutral-950">
        <div class="relative">
          <p class="cursor-pointer text-neutral-700 hover:opacity-[0.9] dark:text-neutral-300">
            Services
          </p>
        </div>
        <div class="relative">
          <p class="cursor-pointer text-neutral-700 hover:opacity-[0.9] dark:text-neutral-300">
            Products
          </p>
        </div>
        <div class="relative">
          <p class="cursor-pointer text-neutral-700 hover:opacity-[0.9] dark:text-neutral-300">
            Pricing
          </p>
        </div>
      </nav>
    </div>
    <button
      class="hidden rounded-full bg-black px-8 py-2 text-sm font-bold text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] md:block dark:bg-white dark:text-black">
      Book a call
    </button>
  </div>
  <div
    class="relative mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-white px-4 py-2 lg:hidden dark:bg-neutral-950"
    style="border-radius: 2rem;">
    <div class="flex w-full flex-row items-center justify-between">
      <a
        class="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
        href="/"
        ><img
          alt="logo"
          loading="lazy"
          width="30"
          height="30"
          decoding="async"
          data-nimg="1"
          style="color: transparent;"
          srcset="
            /_next/image?url=https%3A%2F%2Fassets.aceternity.com%2Flogo-dark.png&amp;w=32&amp;q=75 1x,
            /_next/image?url=https%3A%2F%2Fassets.aceternity.com%2Flogo-dark.png&amp;w=64&amp;q=75 2x
          "
          src="/_next/image?url=https%3A%2F%2Fassets.aceternity.com%2Flogo-dark.png&amp;w=64&amp;q=75" /><span
          class="font-medium text-black dark:text-white"
          >DevStudio</span
        ></a
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-black dark:text-white">
        <path d="M4 6l16 0"></path>
        <path d="M4 12l16 0"></path>
        <path d="M4 18l16 0"></path>
      </svg>
    </div>
  </div>
</div>
```

Where I would like our project name on the left "React Study Buddy", which will link to Home.
Then two hoverable menu items iN the middle: algorithms, react
On the right i would like a light/dark toggle, and create a Contact button, and we'll figure out where that links later.

Here's a component we can use immediately and customize it.
https://ui.aceternity.com/components/navbar-menu

```shell
pnpm dlx shadcn@latest add https://ui.aceternity.com/registry/navbar-menu.json
```
