'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check initial theme on mount
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Navigation */}
      <div className="z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-card border border-border px-4 py-2 lg:flex sticky inset-x-0 top-4 shadow-md">
        {/* Left: Logo */}
        <Link
          href="/"
          className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-foreground hover:text-primary transition-colors duration-200">
          <span className="font-bold text-lg text-primary">🌳</span>
          <span className="font-medium text-foreground">React Study Buddy</span>
        </Link>

        {/* Center: Navigation Menu */}
        <div className="hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-muted-foreground transition duration-200 hover:text-foreground lg:flex lg:space-x-2">
          <nav className="relative flex justify-center space-x-8 rounded-full bg-card px-4 py-3 shadow-sm">
            <div className="relative group">
              <Link
                href="/algorithms"
                className="cursor-pointer text-muted-foreground hover:text-foreground transition-all duration-200 hover:text-primary">
                Algorithms
              </Link>
              {/* Hover dropdown for Algorithms */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-card rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link
                    href="/algorithms/binary-search"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200">
                    Binary Search
                  </Link>
                  <Link
                    href="/algorithms/binary-tree"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200">
                    Binary Tree
                  </Link>
                  <Link
                    href="/algorithms/sorting"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200">
                    Sorting Algorithms
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative group">
              <Link
                href="/react-concepts"
                className="cursor-pointer text-muted-foreground hover:text-foreground transition-all duration-200 hover:text-primary">
                React
              </Link>
              {/* Hover dropdown for React */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-card rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link
                    href="/react-concepts/hooks"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200">
                    Hooks
                  </Link>
                  <Link
                    href="/react-concepts/state"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200">
                    State Management
                  </Link>
                  <Link
                    href="/react-concepts/components"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200">
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
            className="p-2 rounded-full hover:bg-muted transition-colors duration-200 text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme">
            {isDark ? (
              <Sun className="h-5 w-5 text-accent" />
            ) : (
              <Moon className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
          <button className="hidden rounded-full bg-primary text-primary-foreground px-6 py-2 text-sm font-bold shadow-md md:block hover:bg-primary/90 transition-colors duration-200">
            Contact
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="relative mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-card border border-border px-4 py-2 lg:hidden rounded-full shadow-md">
        <div className="flex w-full flex-row items-center justify-between">
          {/* Mobile Logo */}
          <Link
            href="/"
            className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-foreground hover:text-primary transition-colors duration-200">
            <span className="font-bold text-lg text-primary">🌳</span>
            <span className="font-medium text-foreground">React Study Buddy</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full hover:bg-muted transition-colors duration-200 text-foreground"
            aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="w-full mt-4 py-4 border-t border-border">
            <div className="space-y-3">
              <Link
                href="/algorithms"
                className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}>
                Algorithms
              </Link>
              <Link
                href="/react-concepts"
                className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}>
                React
              </Link>
              <div className="flex items-center justify-between px-4 py-2">
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  {isDark ? (
                    <>
                      <Sun className="h-4 w-4 text-accent" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 text-muted-foreground" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
                <button className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-bold hover:bg-primary/90 transition-colors duration-200">
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
