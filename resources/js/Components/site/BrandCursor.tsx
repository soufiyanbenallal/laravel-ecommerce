import { useEffect, useRef, useState } from "react";

/**
 * BrandCursor — A signature branded cursor unique to KENZ Maison.
 * Renders a magnetic golden ring + dot that follows the mouse with a
 * spring-lag effect. Scales on hover over interactive elements.
 */
export function BrandCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a,button,[role=button],[data-cursor-hover]")) {
        setHovering(true);
      }
    };
    const onLeave = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a,button,[role=button],[data-cursor-hover]")) {
        setHovering(false);
      }
    };

    // Spring animation loop
    const animate = () => {
      const lag = hovering ? 0.08 : 0.12;
      ring.current.x += (pos.current.x - ring.current.x) * lag;
      ring.current.y += (pos.current.y - ring.current.y) * lag;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [hovering]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] transition-[width,height,opacity,border-color] duration-200"
        style={{
          width: hovering ? 48 : clicking ? 28 : 36,
          height: hovering ? 48 : clicking ? 28 : 36,
          border: `1px solid ${hovering ? "#B08D57" : "rgba(176,141,87,0.55)"}`,
          borderRadius: "50%",
          mixBlendMode: "normal",
          opacity: clicking ? 0.5 : 1,
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#B08D57",
        }}
      />
    </>
  );
}
