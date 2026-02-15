# FindMyPadel

A padel game booking app where users can host games and others can join them. Discover games near you, join matches with players at your level, or host your own game and let others join.

## Features

- **Find Nearby Games** — discover padel games happening in your area
- **Host a Game** — create your own game and invite players
- **Easy Booking** — simple booking process with instant confirmations
- **Responsive Design** — fully responsive UI for mobile and desktop

## Tech Stack

| Layer             | Technology                 | Version |
| ----------------- | -------------------------- | ------- |
| **Framework**     | Next.js (App Router)       | 16.1.6  |
| **Language**      | TypeScript                 | 5.x     |
| **UI Components** | shadcn/ui (New York style) | 3.x     |
| **Styling**       | Tailwind CSS               | 4.x     |
| **Icons**         | Lucide React               | 0.564.x |
| **Fonts**         | Geist & Geist Mono         | —       |

### Planned (not yet installed)

| Layer              | Technology  |
| ------------------ | ----------- |
| **Database**       | PostgreSQL  |
| **ORM**            | Prisma      |
| **Authentication** | NextAuth.js |
| **Deployment**     | Vercel      |

## Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or later
- npm (comes with Node.js)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/VanGog06-SoftUni/FindMyPadel.git
   cd FindMyPadel
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create an optimized production build |
| `npm start`     | Start the production server          |
| `npm run lint`  | Run ESLint                           |

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles & padel theme CSS variables
│   ├── layout.tsx         # Root layout with Header and fonts
│   └── page.tsx           # Landing page (hero, features, upcoming games)
├── components/
│   ├── layout/
│   │   ├── Header.tsx     # Sticky navigation header with logo
│   │   └── PadelBall.tsx  # Custom SVG padel ball icon
│   └── ui/                # shadcn/ui components (auto-generated)
└── lib/
    └── utils.ts           # Utility functions (cn helper)
```

Other notable files:

| File              | Purpose                  |
| ----------------- | ------------------------ |
| `components.json` | shadcn/ui configuration  |
| `next.config.ts`  | Next.js configuration    |
| `tsconfig.json`   | TypeScript configuration |

## Design Theme

The app uses a padel-inspired color palette:

| Token         | Hex       | Inspiration   |
| ------------- | --------- | ------------- |
| **Primary**   | `#CCFF00` | Padel ball    |
| **Secondary** | `#1E3A5F` | Padel court   |
| **Accent**    | `#14B8A6` | Court surface |
| **Neutral**   | `#1C1C1C` | Racket        |

All theme tokens are defined as CSS custom properties in [src/app/globals.css](src/app/globals.css) and consumed via Tailwind's theme layer.

## License

This project is licensed under the [MIT License](LICENSE).
