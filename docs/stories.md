# Stories (MDX)

Most content on [tcob.com](https://tcob.com) lives in [`stories/*.mdx`](../stories) and is
served by a single dynamic route.

## How it works

* [`app/[slug]/page.tsx`](../app/[slug]/page.tsx) dynamically imports `@/stories/${slug}.mdx`
  and renders it. `generateStaticParams` enumerates the valid slugs
  (`about`, `prk`, `tray`, `photos`) so each is prerendered at build time, and
  `dynamicParams = false` makes any other slug 404.
* [`app/[slug]/layout.tsx`](../app/[slug]/layout.tsx) wraps every story in the `Menu`
  and a centered `#story` article container styled in `globals.css`.

MDX supports JSX, so stories mix Markdown with React (e.g. `next/link`) and inline HTML.
[`mdx-components.tsx`](../mdx-components.tsx) is where global element overrides would go;
today it passes components through unchanged.

## Adding a story

1. Drop a new `.mdx` file in [`stories/`](../stories).
2. Add its slug to the array in `generateStaticParams` in
   [`app/[slug]/page.tsx`](../app/[slug]/page.tsx).
3. If it should appear in the nav, add it to `items` in
   [`components/Menu.tsx`](../components/Menu.tsx).

## The current stories

* **about** — the main bio/"about me" page (`/about`), the primary landing target from the
  home-page banner.
* **photos** — a curated grid of photo highlights. Each `<section>` links out to a full
  gallery hosted on [SmugMug](https://photos.tcob.com); images are hot-linked from SmugMug.
* **prk** & **tray** — older long-form blog posts.
