import { useEffect, useRef } from "react";
import { registerParallax } from "./parallax";

/**
 * Moves an element against the scroll and exposes the offset as
 * `--py` (or `--px`) so CSS can compose it with its own transforms.
 */
export function useParallax<T extends HTMLElement>(
  speed = 0.12,
  axis: "y" | "x" = "y",
  rotate = 0,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerParallax(el, { speed, axis, rotate });
  }, [speed, axis, rotate]);

  return ref;
}
