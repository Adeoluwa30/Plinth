import { Mark, SectionHead } from "./ui";
import { useParallax } from "../lib/useParallax";

const NAV = [
  { label: "Overview", active: true },
  { label: "Sites", active: false },
  { label: "Assets", active: false, count: "1,284" },
  { label: "Work orders", active: false, count: "12" },
  { label: "Findings", active: false, count: "6" },
  { label: "Reports", active: false },
  { label: "Vendors", active: false },
  { label: "Team", active: false },
];

const KPIS = [
  { k: "Open work orders", v: "12", meta: "2 past SLA", tone: "warn" },
  { k: "Findings this week", v: "27", meta: "6 need review", tone: "" },
  { k: "Assets tracked", v: "1,284", meta: "Across 4 sites", tone: "" },
  { k: "Month to date", v: "₦4.82m", meta: "Under budget", tone: "good" },
];

const JOBS = [
  { id: "FM-1042", issue: "Water ingress — ceiling void", site: "Tower B · L3", p: "High", who: "M. Bello", status: "In progress", st: "prog" },
  { id: "FM-1041", issue: "AHU filter change", site: "Annex · L2", p: "Medium", who: "CoolAir Ltd", status: "Scheduled", st: "sched" },
  { id: "FM-1038", issue: "Egress obstruction", site: "Tower A · GF", p: "High", who: "T. Okafor", status: "Resolved", st: "done" },
  { id: "FM-1036", issue: "Generator service — 500kVA", site: "Tower B · Plant", p: "Medium", who: "Powerline", status: "Awaiting parts", st: "wait" },
];

const CHART_FINDINGS = "M0 132 40 118 80 126 120 98 160 106 200 84 240 92 280 64 320 72 360 48 400 58 440 34 480 44 520 22 560 30 600 12";
const CHART_RESOLVED = "M0 150 40 142 80 146 120 128 160 134 200 118 240 124 280 108 320 116 360 98 400 104 440 92 480 100 520 84 560 90 600 76";

export default function Dashboard() {
  const dash = useParallax<HTMLElement>(0.13);

  return (
    <section className="section dashboard-section" id="dashboard">
      <div className="shell">
        <SectionHead index="05" label="The desk view" aside="Desktop · live portfolio" light />

        <div className="dash__head">
          <h2 className="h2 h2--light">
            The view your client
            <br />
            meeting <em>deserves.</em>
          </h2>
          <p className="body-lg body-lg--light">
            Live status across every site, findings that need a human, and spend you can explain.
            The mobile app captures the day; the desktop makes sense of it.
          </p>
        </div>

        <figure className="dash-wrap" ref={dash}>
          <div className="dash">
            <aside className="dash__side">
              <div className="dash__brand">
                <Mark />
              </div>
              <nav className="dash__nav" aria-label="Dashboard navigation">
                {NAV.map((n) => (
                  <span className={`dash__nav-item ${n.active ? "is-active" : ""}`} key={n.label}>
                    {n.label}
                    {n.count ? <span className="mono">{n.count}</span> : null}
                  </span>
                ))}
              </nav>
              <div className="dash__user">
                <span className="avatar">AO</span>
                <div>
                  <strong>Adaeze Okonkwo</strong>
                  <span className="mono">Head of facilities</span>
                </div>
              </div>
            </aside>

            <div className="dash__main">
              <div className="dash__top">
                <div>
                  <span className="mono dash__crumb">Portfolio / Tower B — Lagos</span>
                  <h3>Tower B, Monday</h3>
                </div>
                <div className="dash__top-actions">
                  <span className="mono">12 OCT 2026 · 08:42</span>
                  <span className="dash__btn">New work order +</span>
                </div>
              </div>

              <div className="dash__kpis">
                {KPIS.map((k) => (
                  <div className="kpi" key={k.k}>
                    <span className="mono kpi__k">{k.k}</span>
                    <strong className={`kpi__v ${k.tone ? "is-" + k.tone : ""}`}>{k.v}</strong>
                    <span className="mono kpi__meta">{k.meta}</span>
                  </div>
                ))}
              </div>

              <div className="dash__row">
                <div className="panel">
                  <div className="panel__head">
                    <span className="mono">Findings vs. resolved · 30 days</span>
                    <span className="legend">
                      <i className="legend__l" />
                      Findings
                      <i className="legend__d" />
                      Resolved
                    </span>
                  </div>
                  <svg className="chart" viewBox="0 0 600 170" preserveAspectRatio="none" aria-hidden="true">
                    {[10, 60, 110, 160].map((y) => (
                      <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(239,237,230,.09)" strokeWidth="1" />
                    ))}
                    <path d={`${CHART_FINDINGS} L600 170 L0 170 Z`} fill="url(#fade)" />
                    <defs>
                      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#D9F45C" stopOpacity=".22" />
                        <stop offset="1" stopColor="#D9F45C" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={CHART_RESOLVED} fill="none" stroke="rgba(239,237,230,.35)" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d={CHART_FINDINGS} fill="none" stroke="#D9F45C" strokeWidth="2" />
                    <circle cx="600" cy="12" r="4" fill="#D9F45C" />
                  </svg>
                  <div className="panel__axis mono">
                    <span>01 OCT</span>
                    <span>08 OCT</span>
                    <span>12 OCT</span>
                  </div>
                </div>

                <div className="brief">
                  <div className="brief__top mono">
                    <span className="live"><i />Plinth brief</span>
                    <span>07:00</span>
                  </div>
                  <p className="brief__lead">
                    The east riser is trending. Three damp findings on Level 3 in 11 days —
                    book an inspection before the rains.
                  </p>
                  <div className="brief__item">
                    <span className="mono">01</span>
                    <p>AHU 02 filter efficiency down 18% since service.</p>
                  </div>
                  <div className="brief__item">
                    <span className="mono">02</span>
                    <p>Two vendors approaching SLA on the annex package.</p>
                  </div>
                  <span className="brief__cta">
                    Open today&rsquo;s brief
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 19 19 5M19 5H8M19 5v11" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="panel panel--table">
                <div className="panel__head">
                  <span className="mono">Work orders · all sites</span>
                  <span className="mono">Showing 4 of 12</span>
                </div>
                <div className="table">
                  <div className="table__head mono">
                    <span>Ref</span>
                    <span>Issue</span>
                    <span>Location</span>
                    <span>Priority</span>
                    <span>Owner</span>
                    <span>Status</span>
                  </div>
                  {JOBS.map((j) => (
                    <div className="table__row" key={j.id}>
                      <span className="mono table__id">{j.id}</span>
                      <span className="table__issue">{j.issue}</span>
                      <span className="mono table__loc">{j.site}</span>
                      <span className={`pri pri--${j.p.toLowerCase()}`}>{j.p}</span>
                      <span className="table__who">{j.who}</span>
                      <span className={`pill pill--${j.st}`}>{j.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <figcaption className="mono dash__cap">
            Product view · sample portfolio data · Tower B, Lagos
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
