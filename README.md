# Dealnetxchang

Full-stack Next.js platform with user authentication, real-time event tracking, user dashboard, and admin panel. Built with mobile-first UX and dark theme.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4
- **Package Manager**: Bun
- **Data Persistence**: File-based JSON storage (`/data` directory)
- **Authentication**: HttpOnly cookies (user_id, user_role)

## Project Structure

```
/
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── postcss.config.mjs           # PostCSS (Tailwind) config
├── eslint.config.mjs            # ESLint configuration
├── README.md                    # Project documentation
└── src/
    ├── app/
    │   ├── layout.tsx           # Root layout with mobile nav + footer
    │   ├── page.tsx             # Home page with tracked CTAs
    │   ├── globals.css          # Global styles (mobile-first)
    │   ├── about/
    │   │   └── page.tsx         # About page
    │   ├── login/
    │   │   └── page.tsx         # Login form
    │   ├── register/
    │   │   └── page.tsx         # Register form
    │   ├── dashboard/
    │   │   ├── layout.tsx       # Dashboard shell with sidebar
    │   │   ├── page.tsx         # Dashboard home redirect
    │   │   ├── portfolio/
    │   │   │   └── page.tsx     # Portfolio overview
    │   │   ├── wallet/
    │   │   │   └── page.tsx     # Wallet with deposit/withdraw
    │   │   ├── investments/
    │   │   │   └── page.tsx     # Investment positions
    │   │   └── settings/
    │   │       └── page.tsx     # User settings
    │   ├── admin/
    │   │   ├── layout.tsx       # Admin shell with sidebar + role guard
    │   │   ├── page.tsx         # Admin overview
    │   │   ├── users/
    │   │   │   └── page.tsx     # User management
    │   │   ├── deposits/
    │   │   │   └── page.tsx     # Deposit review
    │   │   ├── withdrawals/
    │   │   │   └── page.tsx     # Withdrawal review
    │   │   ├── kyc/
    │   │   │   └── page.tsx     # KYC review
    │   │   ├── analytics/
    │   │   │   └── page.tsx     # Detailed analytics
    │   │   └── settings/
    │   │       └── page.tsx     # Platform settings
    │   └── api/
    │       ├── track/
    │       │   └── route.ts     # POST - generic event tracking
    │       ├── signup/
    │       │   └── route.ts     # POST - user signup
    │       ├── login/
    │       │   └── route.ts     # POST - user login
    │       ├── register/
    │       │   └── route.ts     # POST - user registration
    │       ├── transactions/
    │       │   └── route.ts     # GET - combined tx history
    │       ├── deposits/
    │       │   └── route.ts     # POST - create deposit
    │       ├── withdrawals/
    │       │   └── route.ts     # GET/POST - withdrawals
    │       ├── stats/
    │       │   └── route.ts     # GET - platform stats
    │       ├── kyc/
    │       │   └── route.ts     # GET/POST - KYC submissions
    │       └── admin/
    │           ├── deposits/
    │           │   └── approve/
    │           │       └── route.ts  # POST - approve deposit
    │           ├── withdrawals/
    │           │   └── approve/
    │           │       └── route.ts  # POST - approve withdrawal
    │           └── kyc/
    │               └── approve/
    │                   └── route.ts  # POST - approve KYC
    ├── components/
    │   ├── MobileNav.tsx        # Mobile navigation header
    │   ├── SiteFooter.tsx       # Site footer
    │   └── TrackButton.tsx      # Tracked CTA button wrapper
    └── lib/
        └── db.ts                # File-based data layer
```

## Pages

### Public Pages
- `/` - Home with hero, features, and tracked CTAs
- `/about` - Platform information
- `/login` - User login
- `/register` - User registration

### User Dashboard (Protected)
- `/dashboard` - Dashboard home
- `/dashboard/portfolio` - Portfolio overview (total value, available, invested)
- `/dashboard/wallet` - Wallet with deposit/withdraw forms and activity
- `/dashboard/investments` - Investment positions list
- `/dashboard/settings` - Account preferences

### Admin Dashboard (Role-Protected)
- `/admin` - Overview stats (users, deposits, withdrawals, pending KYC)
- `/admin/users` - User management table
- `/admin/deposits` - Deposit review and approval
- `/admin/withdrawals` - Withdrawal review and approval
- `/admin/kyc` - KYC submission review and approval
- `/admin/analytics` - Detailed platform metrics and event logs
- `/admin/settings` - Platform settings

## Data Models

- **User**: id, email, name, password, role (user/admin), createdAt
- **Deposit**: id, userId, amount, status, createdAt
- **Withdrawal**: id, userId, amount, status (pending/approved/rejected/completed), createdAt
- **KYC**: id, userId, fullName, documentType, documentNumber, status, submittedAt
- **Portfolio**: id, userId, totalValue, availableBalance, investedBalance, profitLoss, updatedAt
- **Investment**: id, userId, symbol, name, quantity, buyPrice, currentPrice, createdAt
- **Event**: id, userId, type, metadata, createdAt
- **Setting**: id, key, value

## Authentication

- Cookies: `user_id` (httpOnly, 1 year), `user_role` (httpOnly, 1 year)
- User dashboard redirects to `/login` if unauthenticated
- Admin dashboard redirects to `/dashboard` if not admin role

## Event Tracking

Tracked event types:
- `signup` - User registration
- `button_click` - CTA and UI interactions
- `deposit` - Deposit activity
- `withdrawal` - Withdrawal activity
- `conversion` - Goal completions

## Setup

1. Install dependencies:
   ```bash
   bun install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Run development server:
   ```bash
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Build & Deploy

```bash
bun build
bun start
```

## Scripts

| Command | Purpose |
|---------|---------|
| `bun install` | Install dependencies |
| `bun dev` | Start dev server |
| `bun build` | Production build |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |
| `bun typecheck` | Run TypeScript type checking |

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_APP_NAME` | Application name |
| `NEXT_PUBLIC_APP_URL` | Public app URL |
| `NEXT_PUBLIC_API_URL` | Backend API URL |
| `API_SECRET` | Server-side API secret |
| `DATA_DIR` | Data directory for file persistence |

## License

Private
