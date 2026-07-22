# Seif Amr Attia — Portfolio

A dynamic, animation-forward personal portfolio. Single-page, section-scroll, fully static (no backend).

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis (smooth scroll) · self-hosted fonts via `next/font`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (must pass clean)
npm run lint
```

Node 18+.

## Where things live

- **Content** — all real copy lives in `src/data/*.ts` (`profile`, `experience`, `projects`, `certificates`, `skills`, `site`). Edit content there; components never hardcode it.
- **Design tokens** — defined in `src/data/site.ts` and mirrored into `src/app/globals.css` as CSS variables, exposed to Tailwind v4 via `@theme` (`bg-ink`, `text-paper`, `text-accent`, …).
- **Fonts** — Inter + JetBrains Mono (Google) and Clash Display (self-hosted in `public/fonts/`).
- **Motion** — shared variants in `src/lib/motion.ts`; reveal primitives in `src/components/ui/Reveal.tsx`. All motion respects `prefers-reduced-motion`.
- **Resume** — drop the PDF at `public/resume.pdf` (already present). All Download buttons point at `/resume.pdf`.
- **SEO** — metadata + Open Graph in `src/app/layout.tsx`; the social card is generated dynamically by `src/app/opengraph-image.tsx`; favicon at `src/app/icon.svg`.

## Editing content

- A project/social link left as a `TODO_…` value is hidden gracefully (the link just doesn't render).
- Certificate cards with a `credentialUrl` become external links (new tab); the CIB entry has none and renders as a static badge.
- After the first deploy, set `site.seo.url` in `src/data/site.ts` to the live URL so Open Graph tags use it.

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo in Vercel — it auto-detects Next.js; no config needed.
3. (Optional) add a custom domain, then update `site.seo.url`.
4. Run Lighthouse on the deployed URL and confirm ≥90 performance/accessibility.
