import { Arrow, SectionHead } from "./ui";
import { useParallax } from "../lib/useParallax";

const REPORTS = [
  { name: "Daily shift handover", meta: "1 page · 06:30" },
  { name: "Weekly site report", meta: "4 pages · Monday" },
  { name: "Monthly client pack", meta: "8 pages · 1st" },
  { name: "Incident & compliance log", meta: "Live · exportable" },
];

export default function Reports() {
  const doc = useParallax<HTMLDivElement>(0.15);

  return (
    <section className="section reports" id="reports">
      <span className="vlabel" aria-hidden="true">
        Paperwork / 07 — written while you sleep
      </span>
      <div className="shell">
        <SectionHead index="07" label="The paperwork" aside="Written while you sleep" />

        <div className="reports__grid">
          <div className="reports__copy">
            <h2 className="h2">
              07:00 Monday.
              <br />
              <em>The report is already written.</em>
            </h2>
            <p className="body-lg">
              Daily handovers, weekly site reports, monthly client packs — assembled from what
              actually happened, with photos, costs and sign-offs attached. You review, edit
              and send.
            </p>

            <ul className="report-list">
              {REPORTS.map((r) => (
                <li key={r.name}>
                  <span className="report-list__name">{r.name}</span>
                  <span className="mono report-list__meta">{r.meta}</span>
                  <Arrow size={14} />
                </li>
              ))}
            </ul>

            <a className="btn btn--ink" href="#download">
              See a sample report <Arrow size={15} />
            </a>
            <p className="reports__foot mono">
              Export to PDF or share a live link. Your client sees a document, not a spreadsheet.
            </p>
          </div>

          <div className="doc-wrap" ref={doc}>
            <div className="doc">
              <div className="doc__head">
                <span className="mono">Plinth · Facility report</span>
                <span className="mono">01 / 08</span>
              </div>
              <h3 className="doc__title">
                Tower B — Lagos
                <span className="mono">Monthly operations · October 2026</span>
              </h3>
              <div className="doc__kpis">
                <div>
                  <span className="mono">Faults closed</span>
                  <strong>38</strong>
                </div>
                <div>
                  <span className="mono">Avg. response</span>
                  <strong>2h 14m</strong>
                </div>
                <div>
                  <span className="mono">SLA met</span>
                  <strong>96%</strong>
                </div>
              </div>
              <div className="doc__chart">
                <div className="doc__chart-head mono">
                  <span>Response time by week</span>
                  <span>Target &lt; 4h</span>
                </div>
                <div className="doc__bars">
                  {[62, 48, 55, 38, 42, 30, 34, 24].map((h, i) => (
                    <span key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="doc__section">
                <span className="mono doc__label">AI summary</span>
                <p>
                  Water ingress at Level 3 recurred twice this month, both traced to the east
                  riser. A preventive inspection has been scheduled for 2 November. Generator
                  servicing moved to a 250-hour cycle after two late-night outages.
                </p>
              </div>
              <div className="doc__rows">
                <div className="mono"><span>Finding</span><span>Asset</span><span>Status</span></div>
                <div><span>Ceiling void damp</span><span>L3-CV-02</span><span className="doc__ok">Closed</span></div>
                <div><span>AHU filter loading</span><span>L2-AHU-04</span><span className="doc__ok">Closed</span></div>
                <div><span>Riser corrosion</span><span>PL-RS-01</span><span className="doc__warn">Open</span></div>
              </div>
              <div className="doc__foot mono">
                <span>Prepared by Plinth AI · reviewed by A. Okonkwo</span>
                <span>Page 1 of 8</span>
              </div>
            </div>
            <span className="doc-tag mono">PDF · 2.4 MB</span>
            <span className="doc-crop doc-crop--tl" aria-hidden="true" />
            <span className="doc-crop doc-crop--br" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
