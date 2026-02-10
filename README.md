# Revenue Lab — Experiment Template

Production-ready Next.js 14 template for Revenue Lab micro-SaaS experiments.

## Quick Start

```bash
# 1. Copy template to new project
cp -r template/ experiments/{slug}/repo/

# 2. Install dependencies
cd experiments/{slug}/repo/
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase, Stripe, and Plausible credentials

# 4. Run dev server
npm run dev

# 5. Build for production
npm run build
```

## Stack

- **Next.js 14** — App Router, static export
- **Tailwind CSS** — shadcn-compatible theming
- **Supabase** — Auth, database, email capture
- **Stripe** — Checkout for Pro tier
- **Plausible** — Privacy-friendly analytics

## Customization Checklist

1. **`src/app/page.tsx`** — Update hero headline, description, and tool section
2. **`src/components/`** — Add your tool's UI components
3. **`src/app/blog/`** — Add real blog posts (update the `posts` object or integrate MDX)
4. **`public/robots.txt`** — Update sitemap URL
5. **`.env.local`** — All environment variables
6. **`src/app/pricing/page.tsx`** — Adjust features and pricing if needed

## Supabase Schema

Run this in your Supabase SQL editor:

```sql
create table contacts (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  consent boolean default true,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz default now()
);

create table usage_events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users,
  event_type text not null,
  metadata jsonb,
  created_at timestamptz default now()
);
```

## Build & Deploy

```bash
npm run build   # Static export to ./out/
```

Deploy `./out/` to Cloudflare Pages, Vercel, or any static host.
