import { prisma } from "@/lib/prisma";

import GameCard from "./GameCard";

export default async function Page() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const games = await prisma.game.findMany({
    where: {
      date: {
        gte: today,
      },
    },
    include: {
      players: {
        include: {
          user: true,
        },
      },
      host: true,
    },
    orderBy: [{ date: "asc" }, { startIndex: "asc" }],
  });

  return (
    <section className="relative overflow-hidden bg-secondary min-h-[calc(100vh-4rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-secondary/35"
      />

      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col gap-8">
          {games.length === 0 && (
            <div className="text-muted-foreground">
              No upcoming games found.
            </div>
          )}

          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {games.map((game, index) => (
                <GameCard key={game.id} game={game} index={index + 1} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
