import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import { StatusBadge } from "./games/StatusBadge";

/**
 * Home page - Landing page for FindMyPadel
 */
export default async function Home() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const games = await prisma.game.findMany({
    where: {
      date: { gte: today },
    },
    include: {
      players: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              image: true,
            },
          },
        },
      },
      host: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: [{ date: "asc" }, { startIndex: "asc" }],
  });

  const upcomingGames = games
    .filter((game) => (game.players?.length ?? 0) < 4)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary py-20 md:py-32">
        {/* Background image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center"
        />
        {/* Readability overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-secondary/35"
        />

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Your Next <span className="text-primary">Padel Game</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Discover games near you, join matches with players at your level,
              or host your own game and let others join.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/games"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Find Games
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/host"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-white/10"
              >
                Host a Game
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-16 bg-linear-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Nearby Games</h3>
              <p className="text-muted-foreground">
                Discover padel games happening near your location
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Join or Host</h3>
              <p className="text-muted-foreground">
                Join existing games or create your own and invite players
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-muted-foreground">
                Simple booking process with instant confirmations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Games Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming Games</h2>
            <a
              href="/games"
              className="text-primary font-medium hover:underline"
            >
              View all games
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingGames.map((game, idx) => {
              const index = idx + 1;
              const playersCount = game.players ? game.players.length : 0;
              const dateLabel = game.date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={game.id}
                  className="bg-card rounded-xl p-6 shadow-sm border border-border"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Game #{index}</h3>
                      <p className="text-muted-foreground text-sm">
                        Padel court #{index}
                      </p>
                    </div>
                    <StatusBadge isFull={false} />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {dateLabel}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {playersCount}/4 players
                    </span>
                  </div>
                  <Link
                    href="/games"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-secondary py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Empty state - shown when no games available */}
          {false && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No games available</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to host a game in your area!
              </p>
              <button className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground">
                Host a Game
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
