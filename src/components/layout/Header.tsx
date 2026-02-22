"use client";

import { LogOut, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PadelBall } from "@/components/layout/padelBall";
import { Button } from "@/components/ui/button";

/**
 * Navigation header component
 */
export function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

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
            aria-current={pathname === "/" ? "page" : undefined}
            className={
              `inline-flex items-center pb-px text-base font-medium border-b-2 transition-colors ` +
              (pathname === "/"
                ? "font-semibold text-secondary border-primary"
                : "text-secondary/80 border-transparent hover:text-secondary")
            }
          >
            Home
          </Link>
          <Link
            href="/games"
            aria-current={pathname === "/games" ? "page" : undefined}
            className={
              `inline-flex items-center pb-px text-base font-medium border-b-2 transition-colors ` +
              (pathname === "/games"
                ? "font-semibold text-secondary border-primary"
                : "text-secondary/80 border-transparent hover:text-secondary")
            }
          >
            Find Games
          </Link>
          <Link
            href="/host"
            aria-current={pathname === "/host" ? "page" : undefined}
            className={
              `inline-flex items-center pb-px text-base font-medium border-b-2 transition-colors ` +
              (pathname === "/host"
                ? "font-semibold text-secondary border-primary"
                : "text-secondary/80 border-transparent hover:text-secondary")
            }
          >
            Host a Game
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {status === "loading" ? (
            <div className="hidden md:block h-9 w-20 animate-pulse rounded-md bg-muted" />
          ) : session?.user ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm font-medium text-secondary">
                {session.user.firstName}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="gap-2 hover:bg-primary hover:text-white hover:border-primary"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              asChild
              className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
          )}

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
