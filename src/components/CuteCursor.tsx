"use client";
import { useRef, useEffect, useState } from "react";

/* A cute sparkle cursor that matches the portfolio's neon / starfield theme.
   - the sparkle sits exactly on the pointer (precise clicks)
   - a soft ring trails behind and expands over clickable elements
   Pure CSS/SVG: no WebGL context, pointer-events:none so nothing is blocked. */
export default function CuteCursor() {
  const sparkleRef = useRef<HTMLDivElement>(null); // exact pointer position
  const ringRef = useRef<HTMLDivElement>(null); // trailing halo
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clickId, setClickId] = useState(0);

  // only on devices with a fine pointer (mouse)
  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  // hide the native cursor while ours is active
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor-on");
    return () => document.documentElement.classList.remove("custom-cursor-on");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...pos };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (sparkleRef.current) {
        sparkleRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      const el = e.target as HTMLElement | null;
      setHovering(!!el?.closest("a, button, input, textarea, select, label, [role='button']"));
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onDown = () => setClickId((n) => n + 1);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* trailing halo ring */}
      <div
        ref={ringRef}
        className="custom-cursor fixed left-0 top-0 z-[9998] pointer-events-none"
        style={{ transform: "translate3d(-100px,-100px,0) translate(-50%,-50%)" }}
      >
        <div
          className="rounded-full transition-all duration-200 ease-out"
          style={{
            width: hovering ? 44 : 28,
            height: hovering ? 44 : 28,
            marginLeft: hovering ? -22 : -14,
            marginTop: hovering ? -22 : -14,
            border: "1.5px solid",
            borderColor: hovering ? "#a29bfe" : "rgba(108,99,255,0.55)",
            background: hovering ? "rgba(108,99,255,0.08)" : "transparent",
            boxShadow: hovering
              ? "0 0 16px rgba(162,155,254,0.55)"
              : "0 0 10px rgba(108,99,255,0.30)",
          }}
        />
      </div>

      {/* sparkle core at the exact pointer */}
      <div
        ref={sparkleRef}
        className="custom-cursor fixed left-0 top-0 z-[9999] pointer-events-none"
        style={{ transform: "translate3d(-100px,-100px,0) translate(-50%,-50%)" }}
      >
        {/* click ripple */}
        {clickId > 0 && (
          <span
            key={clickId}
            className="absolute left-1/2 top-1/2 rounded-full border border-accent-light"
            style={{
              width: 30,
              height: 30,
              marginLeft: -15,
              marginTop: -15,
              animation: "cursor-ripple 0.5s ease-out forwards",
            }}
          />
        )}

        <div
          className="cute-sparkle"
          style={{ transform: `scale(${hovering ? 1.4 : 1})` }}
        >
          <div className="sparkle-spin">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="cuteSparkleGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a29bfe" />
                  <stop offset="55%" stopColor="#6c63ff" />
                  <stop offset="100%" stopColor="#74b9ff" />
                </linearGradient>
              </defs>
              <path
                d="M12 0 C13.2 8 16 10.8 24 12 C16 13.2 13.2 16 12 24 C10.8 16 8 13.2 0 12 C8 10.8 10.8 8 12 0 Z"
                fill="url(#cuteSparkleGrad)"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
