"use client";

import { useEffect, useRef } from "react";

/**
 * The office hero. On a wide screen the room is pinned: it opens close on the two monitors, with the
 * headline sitting on the left screen, and pulls back as the page scrolls until the whole office is
 * in view and its objects (whiteboard, phone, notebook, screens) become the ways in.
 *
 * Everything is driven by four CSS variables on the pin (--zoom, --copy-o, --shot-o, --pins-o). Their
 * CSS defaults are the opening state, so the first paint is right before this script runs. On narrow
 * screens and under reduced motion the CSS lays the room out flat and this script does nothing.
 */

// Where things sit in public/office.jpg, as fractions of its width and height.
const SCREENS_W = 0.447; // both monitors, side by side
const SCREEN_H = 0.234;
const FOCUS_Y = 0.55; // the monitors' centre line; also the transform origin in CSS
const ASPECT = 2752 / 1536;

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export default function Office({ copy, children }: { copy: React.ReactNode; children: React.ReactNode }) {
  const track = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const room = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = track.current;
    const p = pin.current;
    const r = room.current;
    if (!t || !p || !r) return;
    const live = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");

    let raf = 0;
    const update = () => {
      raf = 0;
      if (!live.matches) {
        ["--zoom", "--copy-o", "--shot-o", "--pins-o", "--mx", "--mw", "--my"].forEach((v) => p.style.removeProperty(v));
        return;
      }
      const vw = p.clientWidth;
      const vh = p.clientHeight;
      const w = r.offsetWidth;
      const h = w / ASPECT;
      const z0 = Math.min((0.86 * vw) / (SCREENS_W * w), (0.6 * vh) / (SCREEN_H * h));
      const mw = (SCREENS_W / 2) * w * z0;
      p.style.setProperty("--mx", `${vw / 2 - mw}px`);
      p.style.setProperty("--mw", `${mw}px`);
      p.style.setProperty("--my", `${vh / 2 + (FOCUS_Y - 0.5) * h}px`);

      const s = clamp(-t.getBoundingClientRect().top / Math.max(1, t.offsetHeight - window.innerHeight));
      p.style.setProperty("--zoom", String(z0 + (1 - z0) * ease(clamp(s / 0.85))));
      p.style.setProperty("--copy-o", String(1 - clamp(s / 0.22)));
      p.style.setProperty("--shot-o", String(clamp((s - 0.16) / 0.25)));
      p.style.setProperty("--pins-o", String(clamp((s - 0.6) / 0.2)));
      p.dataset.copy = s < 0.2 ? "on" : "off";
      p.dataset.pins = s > 0.62 ? "on" : "off";
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    live.addEventListener("change", queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      live.removeEventListener("change", queue);
    };
  }, []);

  return (
    <section ref={track} className="office">
      <div ref={pin} className="office-pin">
        <div className="office-copy">{copy}</div>
        <div className="office-frame">
          <div ref={room} className="office-room">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/office.jpg" alt="" width={2752} height={1536} fetchPriority="high" />
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
