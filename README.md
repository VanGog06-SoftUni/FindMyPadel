# FindMyPadel

FindMyPadel is a Next.js app for discovering and hosting padel games.

## Current Features

- Email/password sign up
- Credential-based sign in (NextAuth)
- JWT session strategy
- PostgreSQL persistence via Prisma
- Responsive UI with shadcn/ui + Tailwind CSS

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
- npm
- Docker Desktop (or Docker Engine)

## Environment Variables

Create a `.env` file in the project root:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/findmypadel?schema=public"
NEXTAUTH_SECRET="your-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start Postgres:

```bash
docker compose up -d postgres
```

3. Apply migrations:

```bash
npx prisma migrate deploy
```

4. (Optional) regenerate Prisma client:

```bash
npx prisma generate
```

5. Start the app:

```bash
npm run dev
```

Open http://localhost:3000

## Database Notes

- The current schema contains only a `users` table.
- Auth uses `session.strategy: "jwt"`, so session data is stored in cookies/JWT, not in a `sessions` table.

## Available Scripts

| Command                     | Description              |
| --------------------------- | ------------------------ |
| `npm run dev`               | Start development server |
| `npm run build`             | Build for production     |
| `npm start`                 | Start production server  |
| `npm run lint`              | Run ESLint               |
| `npm run studio`            | Open Prisma Studio       |
| `npx prisma migrate status` | Check migration status   |

## License

MIT — see [LICENSE](LICENSE).
