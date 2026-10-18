import type { CSSProperties } from "react";
import { SectionHead } from "./ui";

const STEPS = [
  {
    n: "01",
    k: "Capture",
    title: "Snap it",
    copy: "Plinth logs the site, level, asset and who is reporting. No form to fill at the bottom of a stairwell.",
    meta: "~8 seconds",
  },
  {
    n: "02",
    k: "Understand",
    title: "Read the finding",
    copy: "The AI names the defect, estimates severity and proposes the next action. You confirm or correct it in one tap.",
    meta: "AI + human",
  },
  {
    n: "03",
    k: "Assign",
    title: "Send it",
    copy: "Route to your technician or a contracted vendor with the photo and finding attached. No phone calls, no re-explaining.",
    meta: "In-house or contracted",
  },
  {
    n: "04",
    k: "Close",
    title: "Sign it off",
    copy: "Evidence, cost and sign-off land in the asset history. Daily, weekly and monthly reports update themselves.",
    meta: "0 retyping",
  },
];

export default function Workflow() {
  return (
    <section className="section workflow" id="workflow">
      <div className="shell">
        <SectionHead index="04" label="How it works" aside="One loop, every stakeholder" />

        <div className="workflow__head">
          <h2 className="h2">
            From sighting
            <br />
            <em>to signed off.</em>
          </h2>
          <p className="body-lg">
            Four steps, one record. The same thread follows the issue from the stairwell to the
            work order to the client report — and nothing is typed twice.
          </p>
        </div>

        <div className="flow">
          {STEPS.map((s, i) => (
            <div
              className="flow__step"
              key={s.n}
              style={{ "--i": i } as CSSProperties}
            >
              <div className="flow__top">
                <span className="flow__n">{s.n}</span>
                <span className="mono flow__k">{s.k}</span>
              </div>
              <div className="flow__rule">
                <span className="flow__dot" />
                {i < STEPS.length - 1 ? (
                  <svg className="flow__arrow" viewBox="0 0 40 8" aria-hidden="true">
                    <path d="M0 4h36M32 1l4 3-4 3" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>
                ) : null}
              </div>
              <h3 className="h3">{s.title}</h3>
              <p>{s.copy}</p>
              <span className="flow__meta mono">{s.meta}</span>
            </div>
          ))}
        </div>

        <div className="workflow__foot">
          <span className="mono">The loop / capture → understand → act → record</span>
          <p>
            Every loop leaves the building a little better documented than it found it.
          </p>
        </div>
      </div>
    </section>
  );
}
