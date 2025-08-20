'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // TODO: Implement actual theme switching logic
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="w-full">
      {/* Desktop Navigation */}
      <div className="z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-white px-4 py-2 lg:flex dark:bg-neutral-950 sticky inset-x-0 top-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black dark:text-white">
          <span className="font-bold text-lg text-primary">🌳</span>
          <span className="font-medium text-black dark:text-white">React Study Buddy</span>
        </Link>

        {/* Center: Navigation Menu */}
        <div className="hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2">
          <nav className="relative flex justify-center space-x-4 rounded-full bg-white px-4 py-3 dark:bg-neutral-950">
            <div className="relative group">
              <Link
                href="/algorithms"
                className="cursor-pointer text-neutral-700 hover:opacity-[0.9] dark:text-neutral-300 transition-all duration-200 hover:text-primary">
                Algorithms
              </Link>
              {/* Hover dropdown for Algorithms */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-neutral-950 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-neutral-800">
                <div className="py-2">
                  <Link
                    href="/algorithms/binary-search"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-900">
                    Binary Search
                  </Link>
                  <Link
                    href="/algorithms/binary-tree"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-900">
                    Binary Tree
                  </Link>
                  <Link
                    href="/algorithms/sorting"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-900">
                    Sorting Algorithms
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative group">
              <Link
                href="/react-concepts"
                className="cursor-pointer text-neutral-700 hover:opacity-[0.9] dark:text-neutral-300 transition-all duration-200 hover:text-primary">
                React
              </Link>
              {/* Hover dropdown for React */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-neutral-950 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-neutral-800">
                <div className="py-2">
                  <Link
                    href="/react-concepts/hooks"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-900">
                    Hooks
                  </Link>
                  <Link
                    href="/react-concepts/state"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-900">
                    State Management
                  </Link>
                  <Link
                    href="/react-concepts/components"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-900">
                    Components
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Right: Theme Toggle & Contact */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors duration-200"
            aria-label="Toggle theme">
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
          <button className="hidden rounded-full bg-primary px-6 py-2 text-sm font-bold text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] md:block hover:bg-primary/90 transition-colors duration-200">
            Contact
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="relative mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-white px-4 py-2 lg:hidden dark:bg-neutral-950 rounded-full">
        <div className="flex w-full flex-row items-center justify-between">
          {/* Mobile Logo */}
          <Link
            href="/"
            className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black dark:text-white">
            <span className="font-bold text-lg text-primary">🌳</span>
            <span className="font-medium text-black dark:text-white">React Study Buddy</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors duration-200"
            aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-black dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 text-black dark:text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="w-full mt-4 py-4 border-t border-gray-200 dark:border-neutral-800">
            <div className="space-y-3">
              <Link
                href="/algorithms"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-900 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}>
                Algorithms
              </Link>
              <Link
                href="/react-concepts"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-900 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}>
                React
              </Link>
              <div className="flex items-center justify-between px-4 py-2">
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                  {isDark ? (
                    <>
                      <Sun className="h-4 w-4 text-yellow-500" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 text-gray-600" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
                <button className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90 transition-colors duration-200">
                  Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
