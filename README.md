# FindMyPadel

FindMyPadel is a small Next.js application for discovering, hosting, and joining local padel games. It aims to make organizing casual matches fast and social by providing an easy interface for hosts and players to find, schedule, and join nearby games.

## Tech Stack

| Layer      | Technology                |
| ---------- | ------------------------- |
| Framework  | Next.js 16 (App Router)   |
| Language   | TypeScript                |
| Styling    | Tailwind CSS 4            |
| UI         | shadcn/ui                 |
| Auth       | NextAuth v5 (Credentials) |
| Database   | PostgreSQL                |
| ORM        | Prisma                    |
| DB Runtime | Docker Compose (Postgres) |

## Prerequisites

- Node.js 18.18+
- npm (or pnpm/yarn)
- Docker Desktop (or Docker Engine) for local Postgres

## Environment variables

Create a `.env` file in the project root. Minimum required variables:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/findmypadel?schema=public"
NEXTAUTH_SECRET="a-long-random-string"
NEXTAUTH_URL="http://localhost:3000"
```

- `DATABASE_URL`: Postgres connection string used by Prisma.
- `NEXTAUTH_SECRET`: Secret used to sign NextAuth tokens.
- `NEXTAUTH_URL`: Base URL for the Next.js app (used by NextAuth callback URLs).

## Local development (Quickstart)

1. Install dependencies:

```bash
npm install
```

2. Start Postgres (via Docker Compose):

```bash
docker compose up -d
```

3. Apply migrations (creates/updates DB schema):

```bash
npx prisma migrate deploy
```

If you are actively developing schema changes, use:

```bash
npx prisma migrate dev
```

4. Generate Prisma client (if needed):

```bash
npx prisma generate
```

5. Start the app in development:

```bash
npm run dev
```

Open http://localhost:3000

### Note on Docker Compose

The included `docker-compose.yml` defines a `postgres` service (Postgres 16). By default it maps port `5432` on the host. The service mounts a named volume for persistent data.

## Scripts

From `package.json`:

- `npm run dev` — Start Next.js in development mode.
- `npm run build` — Build for production.
- `npm start` — Start the production server.
- `npm run lint` — Run ESLint.
- `npm run studio` — Open Prisma Studio (`npx prisma studio`).

## License

MIT — see [LICENSE](LICENSE).
