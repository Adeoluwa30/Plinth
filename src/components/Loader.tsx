import { useEffect, useRef, useState } from "react";

type Mode = "intro" | "quick";

const FLOORS = [
  { n: "00", label: "Lobby" },
  { n: "01", label: "Assets" },
  { n: "02", label: "Intelligence" },
  { n: "03", label: "Operations" },
];

export default function Loader({
  mode,
  phase,
  duration,
}: {
  mode: Mode | null;
  phase: "in" | "out";
  duration: number;
}) {
  const [pct, setPct] = useState(0);
  const raf = useRef(0);
  const active = mode !== null;

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const total = Math.max(240, duration - 900);
    const tick = (now: number) => {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / total);
      setPct(Math.round(p * 100));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, duration]);

  useEffect(() => {
    if (!active) setPct(0);
  }, [active]);

  const floor = FLOORS[Math.min(FLOORS.length - 1, Math.floor(pct / 26))];

  return (
    <div
      className={`loader ${active ? "is-active" : ""} loader--${mode ?? "off"} ${
        phase === "out" ? "is-out" : ""
      }`}
      aria-hidden="true"
    >
      <div className="loader__blinds">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="loader__ui">
        <div className="loader__top">
          <span className="mark loader__mark">
            <span className="mark__glyph">
              <svg viewBox="0 0 32 32" role="presentation">
                <rect width="32" height="32" fill="currentColor" />
                <path
                  className="mark__p"
                  d="M10 23V9h6c3.3 0 5.4 1.9 5.4 5.1 0 3.2-2.1 5.1-5.4 5.1h-2.2V23h-3.8Zm3.8-6.9h1.9c1.1 0 1.8-.5 1.8-1.6 0-1-.7-1.6-1.8-1.6h-1.9v3.2Z"
                  fill="var(--ink)"
                />
                <path d="M22 23v-5h2v5h-2Z" fill="var(--signal)" />
              </svg>
            </span>
            <span className="mark__word">PLINTH</span>
          </span>
          <span className="mono loader__top-label">Facility intelligence</span>
          <span className="mono loader__top-coords">Lagos · 06°27′N 03°23′E</span>
        </div>

        <div className="loader__center">
          <div className="loader__count">
            {String(pct).padStart(2, "0")}
            <span className="loader__pct">%</span>
          </div>
          <div className="loader__floor">
            <span className="mono">Level {floor.n}</span>
            <strong>{floor.label}</strong>
            <span className="loader__floor-line" />
            <span className="mono">{mode === "quick" ? "Changing floor" : "Preparing the floor"}</span>
          </div>
        </div>

        <div className="loader__foot">
          <div className="loader__bar">
            <span style={{ transform: `scaleX(${pct / 100})` }} />
          </div>
          <div className="loader__meta">
            <span className="mono">Plinth Systems</span>
            <span className="mono loader__meta-mid">AI facility operations</span>
            <span className="mono">{String(pct).padStart(2, "0")} / 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
