---
name: "Mytrya"
description: "Field: a forward deployed engineer's office. A sunlit photo of the desk opens the site; the page is warm off-white with near-black type, dark screens and one signal-lime accent."
colors:
  background: "#F7F5F0"
  panel: "#FFFFFF"
  panel-2: "#EEEBE3"
  ink: "#14171C"
  ink-2: "#4A505B"
  ink-3: "#6A707C"
  line: "rgba(20, 23, 28, 0.10)"
  line-2: "rgba(20, 23, 28, 0.20)"
  accent: "#C8F03C"
  accent-ink: "#4A6A08"
  accent-dim: "rgba(160, 200, 30, 0.22)"
  dark: "#0B0E14"
  dark-ink: "#EEF0F4"
  dark-ink-2: "#AAB1C0"
typography:
  display: { fontFamily: "Geist", fontWeight: 600, lineHeight: 1, letterSpacing: "-0.04em" }
  body: { fontFamily: "Geist", fontSize: "17px", lineHeight: 1.65 }
  mono: { fontFamily: "Geist Mono", fontSize: "13.5px" }
  hand: { fontFamily: "Caveat" }
rounded:
  control: "10px"
  card: "12px"
  photo: "4px"
motion:
  easing: "cubic-bezier(0.22, 1, 0.36, 1)"
---

# Mytrya design

The source of truth is `app/globals.css`; this file describes the system so an agent can follow it.
The CSS variables `--sun`, `--sun-ink` and `--font-manrope` keep their old names but now hold the
lime accent, its text colour and Geist.

## Feeling

A real engineer's office in morning light. Practical, direct, technical. The site should read as the
workplace of someone who builds and runs systems, not as a wellness or lifestyle brand: no sunrise,
no lotus, no pastel gradients, no serif.

## Imagery

- **The office** (`public/office.jpg`, sources in `design/office/`). A generated, photorealistic desk
  with two monitors, a whiteboard, a phone and a notebook. It is the home hero (`components/Office.tsx`).
  On wide screens it is pinned: it opens close on the monitors, with the headline on the left screen,
  and pulls back as the page scrolls until the whole room is in view.
- **Things in the room are the navigation.** Object positions are fractions of the photo and live in
  `globals.css` (`.screen`, `.board`, `.pin-*`). If the photo is regenerated, keep every object in the
  same place or update those numbers.
  - Left monitor: the headline, then a morning summary (links to the Support Intelligence case).
  - Right monitor: one support case ticking through (`components/ScreenCase.tsx`).
  - Whiteboard: the four project steps in handwriting (links to Process).
  - Phone and notebook: labels for Book a call and the FAQ.
- **Screens emit light.** Monitor content uses `mix-blend-mode: screen` so the photo's glass, dust and
  reflections show through; whiteboard writing uses `multiply`.
- **The contour map** (`components/Field.tsx`). Slow contour lines on near-black, lit in lime around a
  focus point. It sits behind the closing block on every page.
- **Invented examples are labelled.** Any sample case or summary on a screen says "Invented example".

## Colour

- The page is `background`; text is `ink`, `ink-2` for body, `ink-3` for meta.
- `accent` (lime) is for fills only, with dark text on it. It fails contrast as text on the light page.
- `accent-ink` is the accent for text on the light page: section labels, hovered links, status text.
- Dark surfaces (monitors, the closing block, labels on the photo) use `dark` with `dark-ink`; there,
  lime may be used as text. Add the `on-dark` class to a dark section to switch the tokens.
- Primary buttons are `ink` with light text on the page, and lime with dark text on dark surfaces.

## Type

Geist for everything, weight 600 for display with tight tracking. Geist Mono only for status lines,
logs, labels on the photo and meta text. Caveat only for writing on the whiteboard. Sizes are classes
in `globals.css` (`t-hero`, `t-page`, `t-section`, `t-statement`, `t-offer`, `t-title`, `t-lead`,
`t-body`, `t-body-sm`, `t-label`, `t-small`, `meta`); never write a pixel size in a page.

## Layout

Content sits in a 1120px column with a 16px gutter on phones and 32px from 640px up. Sections are
`band`s with generous vertical space. The header is a translucent off-white bar with a 1px rule.
Below 900px, and under reduced motion, the office is a still, cropped photo under the headline with
no pinning and no labels.

## Motion

- The office zoom is driven by scroll and is the one large moment on the site.
- The headline words come into focus once on load.
- The "Why" statement lights up word by word as it scrolls through the viewport.
- The case demo plays once when it enters view; the monitor case loops while visible.
- Everything is off, or reduced to a still frame, under `prefers-reduced-motion: reduce`.
