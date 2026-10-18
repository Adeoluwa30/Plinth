import { useEffect, useRef, useState } from "react";
import { Arrow, SectionHead } from "./ui";

type Phase = "idle" | "scan" | "done";

type DemoCase = {
  tab: string;
  site: string;
  image: string;
  zoom: number;
  origin: string;
  box: { x: number; y: number; w: number; h: number };
  severity: "High" | "Medium";
  confidence: number;
  title: string;
  detail: string;
  tags: string[];
  action: string;
  meta: string;
};

const CASES: DemoCase[] = [
  {
    tab: "Ceiling void",
    site: "Tower B · Level 3 · East wing",
    image: "/img/ceiling.jpg",
    zoom: 1.85,
    origin: "82% 4%",
    box: { x: 44, y: 18, w: 34, h: 38 },
    severity: "High",
    confidence: 94,
    title: "Active water ingress above ceiling void",
    detail:
      "Damp staining is spreading across two tiles with visible sagging. The pattern is consistent with a leaking condensate line or failed flashing above. Isolate the zone and inspect the void before reoccupation.",
    tags: ["Moisture staining", "Tile deformation", "Probable leak above"],
    action: "Create work order · Plumbing · P2",
    meta: "FINDING 0031 · 12 OCT 2026 · 14:32",
  },
  {
    tab: "Air handling",
    site: "Tower B · Level 2 · AHU return",
    image: "/img/ceiling.jpg",
    zoom: 2.15,
    origin: "52% 21%",
    box: { x: 38, y: 9, w: 30, h: 34 },
    severity: "Medium",
    confidence: 88,
    title: "Restricted return airflow at AHU grille",
    detail:
      "Heavy dust loading is visible across the return grille, with localised discolouration around the frame. Airflow is likely reduced, raising cooling load and coil strain. Schedule a filter change and an airflow reading this week.",
    tags: ["Dust loading", "Reduced airflow", "Filter service due"],
    action: "Create work order · HVAC · P3",
    meta: "FINDING 0029 · 12 OCT 2026 · 11:06",
  },
  {
    tab: "Handover snag",
    site: "New wing · Slab edge · Handover",
    image: "/img/site.jpg",
    zoom: 1.3,
    origin: "38% 52%",
    box: { x: 5, y: 45, w: 36, h: 34 },
    severity: "High",
    confidence: 91,
    title: "Incomplete edge protection at slab opening",
    detail:
      "Exposed reinforcement and an unguarded slab edge are visible at the handover zone. Works are still live in this area. Raise a safety observation and withhold practical completion for this section until protection is installed.",
    tags: ["Exposed rebar", "Unguarded edge", "Hold handover"],
    action: "Raise safety observation · Immediate",
    meta: "FINDING 0026 · 11 OCT 2026 · 17:48",
  },
];

const STEPS = ["Detecting defects", "Matching asset & level", "Estimating severity", "Drafting finding"];

export default function Triage() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [created, setCreated] = useState(false);
  const timers = useRef<number[]>([]);
  const c = CASES[active];

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const run = () => {
    clearTimers();
    setPhase("scan");
    setStep(0);
    setCreated(false);
    [1, 2, 3].forEach((i) => {
      timers.current.push(window.setTimeout(() => setStep(i), i * 430));
    });
    timers.current.push(window.setTimeout(() => setPhase("done"), 1950));
  };

  const select = (i: number) => {
    clearTimers();
    setActive(i);
    setPhase("idle");
    setStep(0);
    setCreated(false);
  };

  return (
    <section className="section triage-section" id="product">
      <div className="shell">
        <SectionHead index="03" label="Visual triage" aside="Interactive demo · sample data" />

        <div className="triage__layout">
          <div className="triage__intro">
            <h2 className="h2">
              Point the camera.
              <br />
              <em>Get a decision.</em>
            </h2>
            <p className="body-lg">
              Plinth&rsquo;s vision model reads a scene the way an experienced facility manager
              would: what is wrong, how bad it is, what to do next. The finding arrives with the
              asset, level and time already attached.
            </p>
            <ul className="checks">
              <li>
                <span className="checks__n mono">01</span>
                Under ten seconds, on a mid-range Android.
              </li>
              <li>
                <span className="checks__n mono">02</span>
                Works offline. The finding syncs when you do.
              </li>
              <li>
                <span className="checks__n mono">03</span>
                High severity escalates itself — to you, then to your vendor.
              </li>
              <li>
                <span className="checks__n mono">04</span>
                Your corrections make the model sharper for your buildings.
              </li>
            </ul>
            <p className="triage__caption mono">
              Model output is a decision aid. A competent human still signs it off.
            </p>
          </div>

          <div className="triage">
            <div className="triage__tabs" role="tablist" aria-label="Sample inspections">
              {CASES.map((cs, i) => (
                <button
                  key={cs.tab}
                  role="tab"
                  aria-selected={i === active}
                  className={`triage__tab ${i === active ? "is-active" : ""}`}
                  onClick={() => select(i)}
                >
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  {cs.tab}
                </button>
              ))}
            </div>

            <div className={`triage__view ${phase === "scan" ? "is-scanning" : ""}`}>
              <img
                src={c.image}
                alt={`Inspection photo: ${c.site}`}
                style={{ transform: `scale(${c.zoom})`, transformOrigin: c.origin }}
              />
              <div className="view__grid" aria-hidden="true" />
              <span className="corner corner--tl" />
              <span className="corner corner--tr" />
              <span className="corner corner--bl" />
              <span className="corner corner--br" />

              <div className="view__top mono">
                <span className="live">
                  <i />
                  REC
                </span>
                <span>{c.site}</span>
              </div>

              {phase === "done" ? (
                <div
                  className="detect"
                  style={{
                    left: `${c.box.x}%`,
                    top: `${c.box.y}%`,
                    width: `${c.box.w}%`,
                    height: `${c.box.h}%`,
                  }}
                >
                  <span className="detect__label mono">
                    {c.tags[0]} · {c.confidence}%
                  </span>
                </div>
              ) : null}

              {phase === "scan" ? <div className="scanline" aria-hidden="true" /> : null}

              <div className="view__bottom mono">
                <span>
                  {phase === "idle" ? "Ready to capture" : phase === "scan" ? STEPS[step] : "Finding ready"}
                </span>
                <span>{String(active + 1).padStart(2, "0")} / 03</span>
              </div>
            </div>

            <div className="triage__panel">
              {phase !== "done" ? (
                <div className="triage__idle">
                  <div>
                    <span className="mono triage__idle-kicker">
                      {phase === "scan" ? "Analysing capture" : "Sample capture · 12 Oct"}
                    </span>
                    <p className="triage__idle-copy">
                      {phase === "scan"
                        ? STEPS[step] + "…"
                        : "Run the model on this inspection photo to see the finding a field team would receive."}
                    </p>
                  </div>
                  <button className="btn btn--ink" onClick={run} disabled={phase === "scan"}>
                    {phase === "scan" ? "Analysing" : "Analyse photo"} <Arrow size={15} />
                  </button>
                  <div className="triage__progress" aria-hidden="true">
                    <span className={phase === "scan" ? "is-live" : ""} />
                  </div>
                </div>
              ) : (
                <div className="result" aria-live="polite">
                  <div className="result__meta mono">
                    <span className={`sev sev--${c.severity.toLowerCase()}`}>{c.severity} severity</span>
                    <span>{c.confidence}% confidence</span>
                    <span className="result__id">{c.meta}</span>
                  </div>
                  <h3 className="result__title">{c.title}</h3>
                  <p className="result__detail">{c.detail}</p>
                  <div className="tags">
                    {c.tags.map((t) => (
                      <span className="tag-pill" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="result__actions">
                    <button
                      className="btn btn--ink btn--full"
                      onClick={() => setCreated(true)}
                      disabled={created}
                    >
                      {created ? "Work order created — FM-1043" : c.action}
                      {!created ? <Arrow size={15} /> : <span className="check-dot" />}
                    </button>
                    <button className="btn btn--ghost" onClick={() => select(active)}>
                      Reset
                    </button>
                  </div>
                  <p className="result__foot mono">
                    {created
                      ? "Assigned to M. Bello · evidence attached · SLA 24h"
                      : "Review before sending. AI findings are editable."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
