"use client";

import { useEffect, useRef } from "react";

/**
 * The field map behind the hero and the closing block: slow-moving contour lines, drawn by a small
 * fragment shader, lit in the accent colour around a focus point. `focus` is where the light sits,
 * as a fraction of the canvas (x from the left, y from the top).
 *
 * Without WebGL the section keeps its plain background; under reduced motion one still frame is drawn.
 */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;

const FRAG = `
#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform vec2 uRes;
uniform vec2 uFocus;
uniform float uTime;
uniform float uSeed;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * f * (f * (f * 6. - 15.) + 10.);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y);
}
float fbm(vec2 p){ float a = .5, s = 0.; for (int i = 0; i < 3; i++){ s += a * noise(p); p = p * 1.9 + vec2(11.3, 7.1); a *= .45; } return s; }

void main(){
  vec2 p = gl_FragCoord.xy / uRes.y;
  float t = uTime;
  vec2 w = p * 1.25 + uSeed;
  w += .35 * vec2(fbm(w + vec2(0., t * .012)), fbm(w + vec2(5.2, -t * .010)));
  float h = fbm(w + vec2(t * .006, 0.)) * 16.;

  float aa = max(fwidth(h), .0001);
  float line = 1. - smoothstep(0., 1.3, abs(fract(h) - .5) / aa);
  float major = step(mod(floor(h), 4.), .5);

  vec2 f = vec2(uFocus.x * uRes.x / uRes.y, 1. - uFocus.y);
  float lit = smoothstep(.95, .05, length(p - f));
  // A slow sweep outward from the focus, like a survey pass.
  float sweep = fract(length(p - f) * .9 - t * .05);
  lit *= .55 + .45 * smoothstep(.0, .08, sweep) * smoothstep(.5, .08, sweep);

  vec3 bg = vec3(.043, .055, .078);
  vec3 col = bg + vec3(.55, .62, .75) * line * mix(.055, .13, major);
  col += vec3(.78, .94, .24) * line * lit * mix(.22, .6, major);
  col += vec3(.78, .94, .24) * .035 * lit;

  float edge = smoothstep(0., .22, gl_FragCoord.y / uRes.y);
  col = mix(bg, col, edge);
  gl_FragColor = vec4(col, 1.);
}`;

export default function Field({ focus = [0.72, 0.5], seed = 0 }: { focus?: [number, number]; seed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [fx, fy] = focus;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl || !gl.getExtension("OES_standard_derivatives")) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    gl.uniform2f(gl.getUniformLocation(prog, "uFocus"), fx, fy);
    gl.uniform1f(gl.getUniformLocation(prog, "uSeed"), seed);

    const draw = (t: number) => {
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.dataset.on = "1";
    };
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
      if (still) draw(20);
    };
    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    size();
    if (still) return () => ro.disconnect();

    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    const frame = (now: number) => {
      draw((now - t0) / 1000 + 20);
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      cancelAnimationFrame(raf);
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      kick();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", kick);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", kick);
    };
  }, [fx, fy, seed]);

  return <canvas ref={ref} className="fieldmap" aria-hidden />;
}
