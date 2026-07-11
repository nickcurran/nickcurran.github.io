# tcob.com

The source for [tcob.com](https://tcob.com), the personal home page of Nick Curran.

It's a [Next.js](https://nextjs.org) app originally generated with `npx create-next-app@latest`
(TypeScript, ESLint, Tailwind CSS, App Router, Turbopack, no `src` directory, `@/*` import alias).

## Stack

* **[Next.js](https://nextjs.org/docs/app) App Router** with [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)
* **Static export** — `output: 'export'` in [`next.config.ts`](next.config.ts) builds a fully static site so it can be hosted on GitHub Pages. There is no server at runtime; anything dynamic happens in the browser.
* **[TypeScript](https://www.typescriptlang.org)** (linted with [`ts-standard`](https://github.com/standard/ts-standard) + [ESLint](https://eslint.org))
* **[Tailwind CSS v4](https://tailwindcss.com)** plus a small amount of hand-written CSS in [`app/globals.css`](app/globals.css)
* **[MDX](https://nextjs.org/docs/app/guides/mdx)** via `@next/mdx` for prose content

## Architecture

The site is a mix of two content models:

1. **MDX "stories"** — mostly-static prose pages rendered through a single dynamic route.
2. **The Movies app** — a self-contained interactive, client-side page.

Everything is wrapped by a shared root layout and navigated with a shared `Menu` component.

```
app/
  layout.tsx        Root layout: <html>/<body> shell + footer, applied to every page
  page.tsx          Home page ("/") — the "Taking Care of Business" banner
  globals.css       Global styles, fonts, and per-section CSS
  [slug]/           Dynamic route that renders MDX stories
    layout.tsx      Story layout: Menu + centered article container
    page.tsx        Imports stories/<slug>.mdx and renders it
  movies/           The interactive Movies section (see below)
stories/            MDX source for each story page (about, photos, prk, tray)
components/
  Menu.tsx          Top navigation + social links (shared by stories and movies)
  Icon.tsx          Light/dark-aware SVG icon (used for social links)
mdx-components.tsx  Global MDX component overrides (currently pass-through)
public/icons/       Social icon SVGs (a `-dark.svg` variant per icon)
```

### Root layout & home page

[`app/layout.tsx`](app/layout.tsx) is the shell for the whole site: it sets page
metadata, renders the `<html>`/`<body>`, centers the `main` content, and adds the
footer. [`app/page.tsx`](app/page.tsx) is the landing page — the large
"Taking Care of Business" banner (using the Outfit Google font) that links through
to `/about`.

### Stories (MDX)

Most content lives in [`stories/*.mdx`](stories) and is served by one dynamic route that
imports the MDX for the requested slug. See **[docs/stories.md](docs/stories.md)** for how
the route works, how to add a story, and a rundown of the current ones.

### Movies

[`app/movies/`](app/movies) is the one genuinely interactive section — a client-side app that
fetches showtimes from a third-party API and caches them in the browser. See
**[docs/movies.md](docs/movies.md)** for the data flow and component breakdown.

### Navigation & icons

[`components/Menu.tsx`](components/Menu.tsx) is the shared top nav used by both the story and
movies layouts. It renders the section links (highlighting the current path) and the social
links, and collapses to a hamburger menu on mobile. Social links use
[`components/Icon.tsx`](components/Icon.tsx), which serves a light or dark SVG from
`public/icons/` based on the viewer's `prefers-color-scheme`.

### Styling

Tailwind utility classes handle most layout. [`app/globals.css`](app/globals.css) adds the
global bits Tailwind doesn't: the color variables (including light/dark backgrounds), the
Outfit heading font, the responsive banner sizing, the `#menu` and `#story` styles, and the
photo grid.

## Development

```bash
npm run dev     # start the dev server (Turbopack) at http://localhost:3000
npm run build   # static export to ./out
npm run lint    # ESLint / ts-standard
```

## Deploy

Pushes to `main` are built and deployed automatically via
[GitHub Actions](https://github.com/nickcurran/nickcurran.github.io/actions). The
`output: 'export'` build produces a static site suitable for GitHub Pages.
