"use client";

import { useEffect, useRef } from "react";

// Particle-sphere background, drawn straight to a 2D canvas with an additive
// pixel buffer — no WebGL, no 3D library. Transparent canvas, so the page's
// black shows through and the sphere reads as part of the background.
//
// Deliberately structure-free: points are randomly placed (no lattice, so no
// spiral banding) and clumped by a noise field into wisps and voids. It is a
// HOLLOW shell — the hollow middle plus the extra surface seen edge-on is what
// makes it read as a sphere; nothing brightens the silhouette, so there is no
// outline and no hard border.
//
// ponytail: ImageData splatting rather than a shader. Fine to ~30k points;
// if the count ever needs to go much higher, move it to WebGL points.

const ACCENT = [255, 87, 34]; // #FF5722

// Cheap smooth field over the sphere, used to clump the surface into wisps.
function clump(x: number, y: number, z: number) {
  return (
    Math.sin(x * 4.1 + y * 2.3) * 0.45 +
    Math.sin(y * 5.7 - z * 3.1) * 0.33 +
    Math.sin(z * 6.9 + x * 3.7) * 0.22
  );
}

// Spring-damper on each point's offset from home. Underdamped on purpose:
// the overshoot-and-settle is what makes the cursor interaction feel fluid.
const STIFFNESS = 16;
const DAMPING = 4.6;

type Cloud = {
  n: number;
  hx: Float32Array; hy: Float32Array; hz: Float32Array; // home position
  ox: Float32Array; oy: Float32Array; oz: Float32Array; // offset from home
  vx: Float32Array; vy: Float32Array; vz: Float32Array; // offset velocity
  ws: Float32Array; // how strongly this point rides the flow field
  b: Float32Array; // brightness
  o: Uint8Array; // 1 = accent-coloured
};

function build(n: number): Cloud {
  const c: Cloud = {
    n,
    hx: new Float32Array(n), hy: new Float32Array(n), hz: new Float32Array(n),
    ox: new Float32Array(n), oy: new Float32Array(n), oz: new Float32Array(n),
    vx: new Float32Array(n), vy: new Float32Array(n), vz: new Float32Array(n),
    ws: new Float32Array(n),
    b: new Float32Array(n),
    o: new Uint8Array(n),
  };

  for (let i = 0; i < n; i++) {
    // uniform random direction — random, not a lattice, so there is no
    // spiral or banding for the eye to lock onto
    let dx = 0,
      dy = 0,
      dz = 0;
    // rejection-sample against a noise field so the surface comes out clumpy:
    // wisps and voids rather than an even dusting
    for (let tries = 0; tries < 6; tries++) {
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      dx = s * Math.cos(th);
      dy = u;
      dz = s * Math.sin(th);
      const cl = 0.42 + 0.58 * (0.5 + 0.5 * clump(dx, dy, dz));
      if (Math.random() < cl) break;
    }

    // A THIN SHELL — points sit on the surface, hollow inside. This is what
    // makes the middle read as open and packs the silhouette on its own:
    // no rim highlight, just more surface per pixel edge-on.
    const r = 1 + (Math.random() - 0.5) * 0.05;

    c.hx[i] = dx * r;
    c.hy[i] = dy * r;
    c.hz[i] = dz * r;

    // how strongly this point rides the flow field — varied so the currents
    // shear against each other instead of moving as one rigid sheet
    c.ws[i] = 0.08 + Math.random() * 0.16;

    // wide brightness spread — single dots stay resolvable instead of fog
    const orange = Math.random() < 0.1;
    c.o[i] = orange ? 1 : 0;
    c.b[i] = 0.5 + Math.pow(Math.random(), 1.4) * 0.5;
  }
  return c;
}

export default function ParticleSphere({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    const c = build(mobile ? 4500 : 11000);

    let w = 0,
      h = 0,
      dpr = 1,
      img: ImageData | null = null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      // Render 1:1 with CSS pixels on purpose. Each particle is a single pixel,
      // and on a retina buffer that would be a sub-CSS-pixel speck — dim and
      // mushy. 1:1 keeps every dot crisp and individually resolvable.
      dpr = 1;
      w = Math.round(rect.width);
      h = Math.round(rect.height);
      canvas.width = w;
      canvas.height = h;
      img = ctx.createImageData(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // pointer in canvas space, itself eased so the disturbance trails the
    // cursor rather than snapping to it
    let rawX = -1e4,
      rawY = -1e4,
      mx = -1e4,
      my = -1e4,
      tiltX = 0,
      tiltY = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      rawX = (e.clientX - r.left) * dpr;
      rawY = (e.clientY - r.top) * dpr;
      tiltY = (e.clientX / window.innerWidth - 0.5) * 0.55;
      tiltX = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    const onLeave = () => {
      rawX = rawY = -1e4;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);

    let rot = 0,
      rotX = 0,
      rotY = 0,
      time = 0,
      raf = 0,
      last = performance.now();

    const draw = (dt: number) => {
      if (!img || !w || !h) return;

      time += dt;
      if (!reduced) rot += dt * 0.075;
      const ease = Math.min(1, dt * 3);
      rotX += (tiltX - rotX) * ease;
      rotY += (tiltY - rotY) * ease;
      // pointer lags the real cursor — the wake feels like it has weight
      mx += (rawX - mx) * Math.min(1, dt * 9);
      my += (rawY - my) * Math.min(1, dt * 9);

      const buf = img.data;
      buf.fill(0);

      const cx = w / 2,
        cy = h / 2;
      // keep a wide margin so displaced points and dust never reach a canvas
      // edge — that clipping is what read as an invisible square
      const radius = Math.min(w, h) * 0.38;
      const cosY = Math.cos(rot + rotY),
        sinY = Math.sin(rot + rotY);
      const cosX = Math.cos(0.18 + rotX),
        sinX = Math.sin(0.18 + rotX);
      const pushR = radius * 0.55;
      const pushR2 = pushR * pushR;
      const live = rawX > -1e3;
      // the whole cloud swells and contracts, the way the reference pulses
      const breathe = 1 + Math.sin(time * 0.34) * 0.07;
      const ft = time * 0.5;

      for (let i = 0; i < c.n; i++) {
        const hx = c.hx[i],
          hy = c.hy[i],
          hz = c.hz[i];

        // Advect through a shared flow field. Because the field is sampled at
        // the point's own position, neighbours get near-identical displacement
        // and travel together — that coherence is what reads as water rather
        // than as each dot twinkling on its own.
        const amp = c.ws[i];
        const gx = hx + Math.sin(hy * 2.2 + ft) * amp;
        const gy = hy + Math.sin(hz * 2.0 - ft * 0.9) * amp;
        const gz = hz + Math.sin(hx * 2.4 + ft * 1.1) * amp;

        // Project straight back onto the shell, so the flow is purely
        // tangential: dots slide across the surface like water over a ball
        // and the silhouette stays a clean circle instead of bulging.
        const inv = breathe / (Math.sqrt(gx * gx + gy * gy + gz * gz) || 1);

        const x0 = gx * inv + c.ox[i];
        const y0 = gy * inv + c.oy[i];
        const z0 = gz * inv + c.oz[i];

        // rotate: Y then X
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;
        const y2 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        const persp = 2.6 / (2.6 - z2);
        const sx = cx + x1 * radius * persp;
        const sy = cy + y2 * radius * persp;

        // spring-damper: cursor adds force, spring pulls home, damping settles.
        // Underdamped, so points swing past and drift back instead of snapping.
        let fx = -STIFFNESS * c.ox[i] - DAMPING * c.vx[i];
        let fy = -STIFFNESS * c.oy[i] - DAMPING * c.vy[i];
        let fz = -STIFFNESS * c.oz[i] - DAMPING * c.vz[i];

        if (live) {
          const ddx = sx - mx,
            ddy = sy - my;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < pushR2) {
            const d = Math.sqrt(d2) || 1;
            // cosine falloff — no visible edge to the disturbed region
            const k = 0.5 + 0.5 * Math.cos((d / pushR) * Math.PI);
            const g = k * 3.2;
            fx += (ddx / d) * g;
            fy += (ddy / d) * g;
            fz += k * 1.6;
          }
        }

        c.vx[i] += fx * dt;
        c.vy[i] += fy * dt;
        c.vz[i] += fz * dt;
        c.ox[i] += c.vx[i] * dt;
        c.oy[i] += c.vy[i] * dt;
        c.oz[i] += c.vz[i] * dt;

        const px = sx | 0,
          py = sy | 0;
        if (px < 0 || py < 0 || px >= w || py >= h) continue;

        // depth only — no rim boost. The shell being hollow is what packs the
        // silhouette; brightness stays flat so it never becomes an outline.
        const a = Math.min(1, c.b[i] * (0.72 + (z2 + 1) * 0.24));
        const o = (py * w + px) * 4;
        const cr = c.o[i] ? ACCENT[0] : 255;
        const cg = c.o[i] ? ACCENT[1] : 255;
        const cb = c.o[i] ? ACCENT[2] : 255;
        buf[o] += cr * a;
        buf[o + 1] += cg * a;
        buf[o + 2] += cb * a;
        buf[o + 3] += 255 * a;
        // single crisp pixels — no splat, so dots stay individually resolvable
      }

      ctx.putImageData(img, 0, 0);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      draw(dt);
    };
    draw(0); // paint once up front so the canvas is never blank
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
