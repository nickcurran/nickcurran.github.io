# Movies

[`app/movies/`](../app/movies) is the one genuinely interactive section of
[tcob.com](https://tcob.com). Because the site is statically exported, it runs entirely in
the browser (`'use client'`) and talks directly to a third-party API.

## Pieces

* [`page.tsx`](../app/movies/page.tsx) — the page component and state hub. It holds the search
  inputs (zip code, radius, and a "Movies vs Theaters" view mode) plus user filters, and
  persists all of them to `localStorage` so they survive reloads. It fetches showtimes and
  renders the results as either a movie-first or theater-first list.
* [`service.ts`](../app/movies/service.ts) — the data layer. `getData` calls the Gracenote/TMS
  ["Movie Showtimes" API](../app/movies/readme.md), normalizes the raw response
  (deduping movies by `rootId`, flattening showtimes, collecting theaters, tidying
  qualifiers like "Closed Captioned" → "CC"), sorts titles, and **caches each
  zip/radius/date query in `localStorage`** so repeat visits don't re-hit the API. A
  "Refresh" button forces a re-fetch, and the cache self-evicts old searches if storage fills up.
* [`movieTypes.ts`](../app/movies/movieTypes.ts) — the `Raw*` API shapes and the cleaned-up
  `Movie`/`Theater`/`Showtime`/`Data`/`Filters` types used throughout the section.

## View components

A small tree renders the normalized data:

* `movieView` / `theaterView` — top-level list items for each mode (a movie with its
  theaters, or a theater with its movies), including artwork and a "hide" filter action.
* `movieShowingsView` / `theaterShowingsView` — the nested, collapsible list of
  showings under each item.
* `showtimesView` — the individual showtimes, with tap-to-reveal qualifiers.
