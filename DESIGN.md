---
name: "Mytrya"
description: "First light: a white page, deep indigo type, and one saffron accent that belongs to the lotus and the rising sun."
colors:
  background: "#FFFFFF"
  panel: "#F7F6F9"
  panel-2: "#EFEDF3"
  ink: "#1C1834"
  ink-2: "#4F4B63"
  ink-3: "#77738A"
  line: "rgba(28, 24, 52, 0.08)"
  line-2: "rgba(28, 24, 52, 0.15)"
  sun: "#E0812F"
  sun-ink: "#A9541A"
  sun-dim: "rgba(224, 129, 47, 0.14)"
  sun-glow: "#FFE2C4"
typography:
  display-hero:
    fontFamily: "Manrope"
    fontSize: "76px"
    fontSizeMobile: "48px"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  display-page:
    fontFamily: "Manrope"
    fontSize: "60px"
    fontSizeMobile: "44px"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  display-section:
    fontFamily: "Manrope"
    fontSize: "48px"
    fontSizeMobile: "34px"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Manrope"
    fontSize: "20px"
    fontSizeMobile: "18px"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Manrope"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: "Manrope"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  small:
    fontFamily: "Manrope"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  meta:
    fontFamily: "Manrope"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.55
spacing:
  base: "4px"
  gutter-mobile: "16px"
  gutter: "32px"
  max-width: "1120px"
  breakpoint: "640px"
rounded:
  field: "12px"
  panel: "18px"
  pill: "999px"
motion:
  duration: "120ms–140ms"
  easing: "ease"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    hoverBackgroundColor: "#2D2850"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    minHeight: "46px"
    padding: "0 22px"
  button-secondary:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink}"
    border: "1px solid {colors.line-2}"
    rounded: "{rounded.pill}"
  input:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink}"
    border: "1px solid {colors.line-2}"
    focusBorder: "{colors.sun}"
    rounded: "{rounded.field}"
    minHeight: "46px"
    padding: "10px 13px"
  panel:
    backgroundColor: "{colors.panel}"
    border: "1px solid {colors.line}"
    rounded: "{rounded.panel}"
---

# Mytrya design

The source of truth is `app/globals.css`; this file describes the system so an agent can follow it.
Values were checked against a Dembrandt scan of the live site (`design/dembrandt-baseline.json`).

## Feeling

First light. The page is white and quiet, the type is deep indigo, and there is exactly one warm
accent. The story is change and resilience: a sun coming up, a lotus rising out of the water.
Less text, more air. Nothing should look like a dark console, beige paper, a serif, or monospace.

## Imagery

- **The rising sun.** A soft warm disc (`sun-glow` fading to transparent) with one faint ring, sitting
  low behind a section and cut off by the section's bottom edge, so it reads as rising. Use the `Sun`
  component in a `relative overflow-hidden` parent. It appears behind the home hero, the About hero and
  the closing call to action. Never more than one per screen, never centred on text, never animated
  in a way that pulls the eye.
- **The lotus mark.** Three petals over a waterline (`app/components/Mark.tsx`, same geometry as
  `app/icon.svg`; keep them in sync). Only the centre petal is saffron; the outer petals and the
  waterline take the text colour.
- **Saffron punctuation.** The accent also shows up as the full stop on the hero headline, list
  bullets, live-status dots and the focus ring. Small touches, not fills.
- No stock photos, no illustrations of robots or circuits, no gradients beyond the sun.

## Colour

- `ink` for headings and primary buttons, `ink-2` for body, `ink-3` for meta text.
- `sun` (#E0812F) is for **fills only**. It is 2.86:1 on white and fails contrast for text of any size.
- `sun-ink` (#A9541A, 5.29:1) is the accent for text: kickers, hovered links, step outputs.
- Panels use `panel` with a `line` border. Rules are 1px `line`.

## Type

Manrope only. Use the ten styles in the front matter and nothing between them. Each one is a class
in `app/globals.css`; never write a pixel size in a page. Headings pair a size class with
`.h-display` (800, tight tracking) or `.h-section` (700).

| Style | Class | Desktop / mobile | Used for |
|---|---|---|---|
| display-hero | `t-hero` | 76 / 48, 800 | Home headline |
| display-page | `t-page` | 60 / 44, 800 | Page titles |
| display-section | `t-section` | 48 / 34, 800 | Section headings, CTA |
| title | `t-title` | 22, 700 | Card, row, step, FAQ and principle titles |
| lead | `t-lead` | 20 / 18 | The paragraph under a page title |
| body | `t-body` | 17, line-height 1.65 | Running text |
| body-sm | `t-body-sm` | 16, line-height 1.6 | Text inside cards, rows and grids |
| label | `t-label` | 15 | Buttons, inline links, footer |
| small | `t-small` | 14 | Nav, form errors; `.kicker` is this at 600 in `sun-ink` |
| meta | `meta` | 13.5, `ink-3` | Dates, captions, fine print |

Headings use `text-wrap: balance`. Keep body text to about 50–64 characters per line.

## Layout

Content sits in a 1120px column with a 16px side gutter on phones and 32px from 640px up. There is
one breakpoint. Sections are separated by generous vertical space and a 1px rule, not by background
colour changes. No horizontal scroll at phone width.

## Components

- **Buttons** are pills, 46px tall. Primary is indigo with white text; secondary is white with a
  `line-2` border. Pressing nudges the button down 1px.
- **Inputs** are 46px tall with a 12px radius; focus turns the border saffron with a `sun-dim` halo.
- **Row links** (lists of work) are full-width rows with a top rule; the title turns `sun-ink` on hover.
- **Links** in text are underlined with a faint `line-2` underline that turns saffron on hover.

## Motion

Transitions are short (120–140ms, `ease`) and only on colour, border and a 1px press. Smooth scroll
only when the user hasn't asked for reduced motion.

## Checking for drift

After a design change, rescan the live site and compare against the baseline:

```sh
npx dembrandt@0.39.2 https://mytrya.com --crawl 5 --compare design/dembrandt-baseline.json
```

It exits 1 if anything drifted. If the change was intended, add `--approve` to make the new scan
the baseline, and update this file to match.
