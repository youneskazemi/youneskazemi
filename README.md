# Younes Kazemi — Portfolio

Personal freelance portfolio: **Next.js + Tailwind + Framer Motion**, dark FA-first UI with EN toggle.

## Stack

- Next.js (App Router)
- Tailwind CSS v4
- Framer Motion (scroll parallax + section reveals)
- Vercel (recommended host)
- Domain: `youneskazemi.ir`

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit content

| File | What |
|------|------|
| `content/site.ts` | Name, email, Telegram, copy, skills, services, process |
| `content/projects.ts` | Project cards & case studies |
| `public/projects/` | Screenshots (replace SVG placeholders with real PNGs) |

## Contact placeholders

Update in `content/site.ts`:

- `email`
- `telegram` / `telegramHandle`

## Deploy

1. Push to GitHub
2. Import on [Vercel](https://vercel.com)
3. Point `youneskazemi.ir` DNS to Vercel

## Routes

- `/` — full homepage (anchors)
- `/projects/[slug]` — short case study
