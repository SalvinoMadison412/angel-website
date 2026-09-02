"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = new THREE.Color("#ff5722");
const COOL = new THREE.Color("#4a6cff");

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduced;
}

// shared, re-render-free pointers driven off window so the scene reacts to the
// cursor everywhere even though the canvas itself is pointer-events-none
function usePageInput() {
  const scroll = useRef(0);
  const pointer = useRef(new THREE.Vector2(0, 0));
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    };
    const onMove = (e: PointerEvent) => {
      pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return { scroll, pointer };
}

type Input = ReturnType<typeof usePageInput>;

function Network({ count, reduced, input }: { count: number; reduced: boolean; input: Input }) {
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Sprite>(null);
  const { camera } = useThree();

  const { base, colors, lineGeom } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 1.7;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          r * Math.sin(theta) * Math.cos(phi),
          r * Math.sin(theta) * Math.sin(phi) * 0.7,
          r * Math.cos(theta)
        )
      );
      const c = ACCENT.clone().lerp(COOL, Math.random() * 0.55);
      col.set([c.r, c.g, c.b], i * 3);
    }
    const linePos: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      let links = 0;
      for (let j = i + 1; j < pts.length && links < 2; j++) {
        if (pts[i].distanceTo(pts[j]) < 1.6) {
          linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
          links++;
        }
      }
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
    return { base: pts, colors: col, lineGeom: lg };
  }, [count]);

  // live position buffer the frame loop pushes cursor-repulsion into
  const live = useMemo(() => {
    const a = new Float32Array(count * 3);
    base.forEach((v, i) => a.set([v.x, v.y, v.z], i * 3));
    return a;
  }, [base, count]);

  const sprite = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.3, "rgba(255,255,255,0.6)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  const ray = useMemo(() => new THREE.Raycaster(), []);
  const cursorWorld = useMemo(() => new THREE.Vector3(), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const k = Math.min(1, delta * 3);
    const p = input.scroll.current;
    const ptr = input.pointer.current;

    // group orientation follows scroll + cursor
    const targetY = p * Math.PI * 3 + (reduced ? 0 : state.clock.elapsedTime * 0.04);
    const targetX = 0.35 + p * 0.6 + ptr.y * 0.28;
    group.current.rotation.y += (targetY - group.current.rotation.y) * k;
    group.current.rotation.x += (targetX - group.current.rotation.x) * k;
    group.current.rotation.z += (ptr.x * 0.18 - group.current.rotation.z) * k;
    group.current.scale.setScalar(1 + p * 0.25);

    // project cursor onto the z=0 plane in world space
    ray.setFromCamera(ptr as unknown as THREE.Vector2, camera);
    ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), cursorWorld);
    if (glowRef.current) glowRef.current.position.lerp(cursorWorld.clone().multiplyScalar(0.4), k);

    // cursor repulsion: nodes shove away from the cursor, spring back
    if (pointsRef.current) {
      const local = group.current.worldToLocal(cursorWorld.clone());
      for (let i = 0; i < base.length; i++) {
        const bx = base[i].x, by = base[i].y, bz = base[i].z;
        tmp.set(live[i * 3] - local.x, live[i * 3 + 1] - local.y, live[i * 3 + 2] - local.z);
        const d = tmp.length();
        let tx = bx, ty = by, tz = bz;
        if (d < 2.2 && d > 0.001) {
          const push = ((2.2 - d) / 2.2) * 1.4;
          tmp.normalize().multiplyScalar(push);
          tx = bx + tmp.x; ty = by + tmp.y; tz = bz + tmp.z;
        }
        live[i * 3] += (tx - live[i * 3]) * k;
        live[i * 3 + 1] += (ty - live[i * 3 + 1]) * k;
        live[i * 3 + 2] += (tz - live[i * 3 + 2]) * k;
      }
      (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[live, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.13}
          map={sprite}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial color="#ff5722" transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <sprite ref={glowRef} scale={[2.6, 2.6, 1]}>
        <spriteMaterial
          map={sprite}
          color="#ff5722"
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  );
}

export default function Scene3D() {
  const reduced = useReducedMotion();
  const input = usePageInput();
  const [count, setCount] = useState(150);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    setCount(window.innerWidth < 768 ? 80 : 150);
  }, []);

  if (!ready) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <Network count={count} reduced={reduced} input={input} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg" />
    </div>
  );
}
