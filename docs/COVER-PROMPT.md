# Portfolio cover image prompts

Use these when you have a **full website / app screenshot** and want a clean portfolio showcase still.

Attach the raw PNG as the **reference image**. Prefer cropping to **hero + first content band** before upload when possible.

---

## 1) Web / desktop site (default)

```text
Create a premium portfolio project showcase image from the attached real website screenshot.

Composition:
- Show the website inside a modern dark macOS browser window (traffic lights, subtle URL bar with the real domain if readable)
- Place the browser slightly perspective-tilted (about 3–6 degrees), floating on a deep charcoal/black studio background (#050508)
- Soft cyan ambient glow (#38bdf8) behind the browser, very subtle, not neon
- Crop the screenshot to the hero + first content band only — do not show the entire long page if it is a full-page capture; prioritize the top/hero section so UI stays sharp and readable
- Aspect ratio 16:10, high resolution, sharp UI text, no blurry letters
- Thin soft shadow under the browser; no heavy glassmorphism, no fake phone stack unless the product is a mobile app

Critical rules:
- Keep the attached website UI faithful — same colors, layout, logo, and content as much as possible
- Do not invent a different product or redesign the site
- Do not add fake logos, stock people, or random text
- No watermarks, no “AI portfolio” decorations, no extra floating cards around the browser
- Clean, agency-grade, dark portfolio aesthetic

Output: single showcase still, marketing quality, ready for a Next.js portfolio project card.
```

---

## 2) Short web prompt

```text
Using the attached real website screenshot only: render it inside a dark elegant browser mockup on a near-black background with soft sky-blue glow. Crop to hero section. 16:10. Keep UI accurate. No redesign, no extra elements, sharp text, premium portfolio cover.
```

---

## 3) Telegram mini-app / mobile (e.g. TickTOM)

```text
Using the attached mobile / Telegram mini-app screenshot only: place the screen inside a modern dark smartphone frame, centered on a deep black background with subtle warm gold/orange glow matching the app colors. Keep the UI pixel-faithful. Aspect 16:10 canvas with the phone centered and generous margins. No second phone, no floating icons, no text outside the device. Premium app portfolio shot.
```

---

## 4) Per-project fill-in

```text
Project: [NAME]
Live URL: [https://…]
Type: [WordPress shop / custom Next / Telegram mini-app / SaaS]
Brand accent color: [e.g. emerald / pink / cream]
Priority area of the screenshot: [hero / product grid / dashboard]

[Paste prompt #1 or #3]

Extra: emphasize [Persian RTL layout / beauty products / fitness dark UI / AI dark SaaS].
```

---

## Save path in this repo

```text
public/projects/covers/[slug].jpg
```

Examples: `latorin.jpg`, `rimelcosmetics.jpg`, `ticktom.jpg`

Optional: re-run crop/polish from raws:

```bash
python scripts/make_covers.py
```

---

## Avoid

- “Redesign / make the website prettier” → fake UI  
- Full long-page readable in one frame → mushy text  
- Multi-device collage clutter  
