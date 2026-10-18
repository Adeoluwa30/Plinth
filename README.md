# Plinth — AI facility operations (marketing site)

A single-page marketing site for **Plinth**, an AI operations platform for facility
managers and their teams. The visual language is drawn from three places: office
**wayfinding signage** (directory plates, level numbers, arrows, pictograms), **Swiss**
grid discipline (flush-left type, hairline rules, one accent colour) and **French
editorial** typography (Instrument Serif italics inside a Bricolage Grotesque frame).

## Stack

- Vite + React 18 + TypeScript
- Hand-written CSS design system (no framework) — `src/styles/base.css`, `src/styles/sections.css`
- Fonts: **Bricolage Grotesque** (variable, optical size 12–96), Instrument Serif, IBM Plex Mono
- Motion: custom loader / page-transition provider, rAF parallax registry, pinned horizontal section

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
# on a Cloud preview hostname, pass it at start-up:
# PREVIEW_ALLOWED_HOST=<host> npm run dev
npm run build    # type-check + production build to dist/
npm run preview
```

## Structure

```
src/
  App.tsx                 composition, scroll reveals, parallax init
  lib/
    transition.tsx        branded load screen, in-page transition router
    parallax.ts           single-rAF parallax registry (CSS custom properties)
    useParallax.ts        React hook wrapper
  components/
    Loader.tsx            loading door: counter, floor labels, blind exit
    Nav.tsx               sticky nav + full-screen mobile menu
    Hero.tsx              headline, signage plate, directory card (parallax photo)
    Ticker.tsx            double marquee — lime promises forward, ink stats counter-scrolling
    Problem.tsx           group-chat artefact + three failure modes
    Intelligence.tsx      dark section: Vision / Memory / Foresight
    Triage.tsx            interactive AI photo-triage demo (3 sample inspections)
    Workflow.tsx          capture → understand → assign → close (stair-step desktop)
    Dashboard.tsx         desktop product mock (KPIs, chart, AI brief, work orders)
    Board.tsx             horizontal pinned "floor directory" of roles
    Reports.tsx           report templates + sample document (parallax)
    Download.tsx          device cards, waitlist form, phone mock
    Footer.tsx            links, oversized wordmark, live palette colophon (hex codes)
    ui.tsx                Mark, Arrow, SectionHead, Reveal primitives
```

## Motion system

- **Loading door** — a full-screen signage panel counts from 00 to 100 with floor labels
  (“Lobby / Assets / Intelligence / Operations”), then the screen lifts away as five
  full-height columns in a staggered curtain (`base.css` → `.loader__blinds`). It plays
  the full 2.1s intro once per browser session; return visits get a 0.9s wipe.
  Every in-page anchor is intercepted and routed through the same transition, so the
  loader doubles as the link between pages/views. The overlay is unmounted only after the
  last column has cleared the frame, so the page is never left under a transparent, still
  click-blocking panel.
- **Parallax** — `lib/parallax.ts` keeps one scroll listener for all elements and writes
  `--py`; CSS composes it with each element's own transform. Applied to the hero photo,
  report document, phone mock, dashboard and footer wordmark. Speeds are tuned per
  element (0.12–0.22) so drift is visible without tearing the grid; each element is
  skipped once it leaves the viewport ±200px.
- **Horizontal section** — `Board.tsx` pins a 100vh stage and translates the directory
  plates horizontally as the page scrolls. The wrapper height is measured at runtime so
  scroll distance maps 1:1 to horizontal travel, and a trailing spacer keeps the last
  plate inside the frame instead of clipping it at the right edge. Below 900px it becomes
  a native swipe rail (vertical page scroll preserved).
- **Stair-step workflow** — each step's top rule drops 30px on desktop, so the process
  reads like descending floor plates.
- **Reduced motion** — the loader, parallax, pin behaviour, marquee and reveal
  transitions are all disabled or neutralised under `prefers-reduced-motion: reduce`.

## Design system

Tokens live at the top of `src/styles/base.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#efece4` | base surface |
| `--paper-2` | `#e6e2d7` | alternating section surface |
| `--paper-3` | `#f7f5ee` | card / plate surface |
| `--ink` | `#121210` | type + dark sections |
| `--signal` | `#d9f45c` | the single accent (signage highlight) |
| `--lime-deep` | `#c4e23d` | pressed / hover accent |
| `--alert` | `#b8461f` | severity / risk |
| `--green` | `#2f6242` | passed / closed |

**To change the brand accent**, edit `--signal` only — everything (buttons, plates,
highlights, loader bar, board markers, marquee) references it.

The **palette colophon at the bottom of the page is printed from the tokens at runtime**
(`Footer.tsx` reads each custom property with `getComputedStyle` and normalises it to a
hex string), so the hex code shown on the page is always the value the site is actually
painted with — change `--signal` and both the accent and its printed code follow. When you
change a token, also update `theme-color` and the favicon in `index.html`, which are
static.

Display type uses Bricolage's optical-size axis (`opsz 72`) for headlines; body copy sets
`opsz 14`. Section heads repeat the same `index / label / rule / aside` pattern.

## Placeholders that need real values before launch

- **Waitlist form** (`Download.tsx`) is client-side only — it validates the address and
  shows a success state. Wire `submit()` to your email service or a `/api/waitlist` route.
- **“Sign in”** and the nav CTA point at `#download`; point them at your app URL.
- **App store / desktop links** on the device cards (`DEVICES`) are labels, not links yet.
- **Footer links** all point at `#top` — replace with real routes.
- **Copy claims** are product-marketing defaults, not audited numbers: “under ten
  seconds”, “free for your first site”, “support in English & Yoruba”,
  `hello@plinth.systems`, “© 2026 Plinth Systems Ltd.” Review these before publishing.
- **Photography** is from Unsplash (office corridor, ceiling services, handover site) and
  is used for demonstration only — swap for your own site photography.

## Responsive behaviour

Verified at 390, 768, 1024, 1440 and 1920px with no horizontal page overflow at any
width. The pinned horizontal section is desktop-only (>900px); below that the directory
becomes a swipeable rail with the next plate peeking to signal the gesture. The nav
collapses to a full-screen menu at 900px, the chat artefact and report document reflow to
a single column, and the directory marquee rows keep their speed regardless of viewport.

## Accessibility / behaviour notes

- Semantic landmarks, skip link, visible focus rings, `aria-selected` tabs, `role="status"`
  form feedback, `aria-live` on the AI finding, `aria-hidden` on the decorative loader.
- Scroll is locked while the loading door is closed and restored on exit.
- The demo's “analysing” sequence is a simulated 2s pipeline; no model is called.
