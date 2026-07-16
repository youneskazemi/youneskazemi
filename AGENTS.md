<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Design Context

Strategic product context and visual system for this portfolio:

| File | Role |
|------|------|
| [`PRODUCT.md`](PRODUCT.md) | Register **brand**, platform **web**, users, positioning, CTAs, principles |
| [`DESIGN.md`](DESIGN.md) | Tokens + “The Quiet Workshop” visual rules (normative) |
| [`.impeccable/design.json`](.impeccable/design.json) | Live-panel sidecar (components, motion, ramps) |
| [`.impeccable/live/config.json`](.impeccable/live/config.json) | `$impeccable live` inject target (`app/layout.tsx`) |

**Defaults to honor:** FA-first RTL, sky accent CTAs, real screenshots as proof, no AI SaaS dark-template clichés. Content lives in `content/site.ts` and `content/projects.ts`.
