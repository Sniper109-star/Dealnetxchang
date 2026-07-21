# Active Context: Next.js Starter Template

## Current State

**Template Status**: ✅ Ready for development

The template is a clean Next.js 16 starter with TypeScript and Tailwind CSS 4. It's ready for AI-assisted expansion to build any type of application.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] Responsive website platform UI (header, footer, hero, sections)
- [x] User dashboard with deposit form and history
- [x] Admin panel dashboard with real platform metrics
- [x] Real event tracking system (sign-ups, deposits, button clicks, conversions)
- [x] File-based data persistence layer (`src/lib/db.ts`)
- [x] Environment setup with `.env.example`

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page with CTAs | ✅ Ready |
| `src/app/layout.tsx` | Root layout | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `src/app/signup/page.tsx` | User sign-up | ✅ Ready |
| `src/app/dashboard/` | User dashboard | ✅ Ready |
| `src/app/admin/page.tsx` | Admin panel | ✅ Ready |
| `src/app/api/` | API routes for tracking, deposits, stats | ✅ Ready |
| `src/lib/db.ts` | File-based persistence layer | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

The platform is ready with:
- Website UI (responsive)
- User signup and dashboard
- Admin panel with real aggregated stats
- Tracking for sign-ups, deposits, button clicks, conversions
- No mock data — all data is real via API + file persistence

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add more recipes (auth, email, etc.)
- [ ] Add example components
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-07-21 | Website platform UI, user/admin dashboards, real event tracking, file persistence |
