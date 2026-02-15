import { Menu } from "lucide-react";
import Link from "next/link";

import { PadelBall } from "./PadelBall";

/**
 * Navigation header component
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold leading-none text-secondary">
            Find<span className="text-primary">My</span>Padel
          </span>
          <PadelBall className="relative top-px h-6 w-6 shrink-0 text-primary" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/"
            aria-current="page"
            className="inline-flex items-center pb-px text-base font-semibold text-secondary border-b-2 border-primary"
          >
            Home
          </Link>
          <Link
            href="/games"
            className="inline-flex items-center pb-px text-base font-medium text-secondary/80 border-b-2 border-transparent transition-colors hover:text-secondary"
          >
            Find Games
          </Link>
          <Link
            href="/host"
            className="inline-flex items-center pb-px text-base font-medium text-secondary/80 border-b-2 border-transparent transition-colors hover:text-secondary"
          >
            Host a Game
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center space-x-4">
          <button className="hidden md:inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Sign In
          </button>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-foreground">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
