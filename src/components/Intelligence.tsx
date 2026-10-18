import { SectionHead } from "./ui";

function VisionGlyph() {
  return (
    <svg viewBox="0 0 100 64" className="glyph" aria-hidden="true">
      <path d="M6 32s16-20 44-20 44 20 44 20-16 20-44 20S6 32 6 32Z" stroke="currentColor" fill="none" />
      <circle cx="50" cy="32" r="13" stroke="currentColor" fill="none" />
      <circle cx="50" cy="32" r="4" fill="var(--lime)" stroke="none" />
      <path d="M4 10v-6h8M96 10v-6h-8M4 54v6h8M96 54v6h-8" stroke="var(--lime)" />
    </svg>
  );
}

function MemoryGlyph() {
  return (
    <svg viewBox="0 0 100 64" className="glyph" aria-hidden="true">
      <path d="M14 20 50 8l36 12-36 12-36-12Z" stroke="currentColor" fill="none" />
      <path d="M14 32 50 44l36-12" stroke="currentColor" fill="none" />
      <path d="M14 44 50 56l36-12" stroke="currentColor" fill="none" />
      <path d="M50 20v12M50 44v12" stroke="var(--lime)" />
    </svg>
  );
}

function ForesightGlyph() {
  return (
    <svg viewBox="0 0 100 64" className="glyph" aria-hidden="true">
      <path d="M8 52h84M8 52V8" stroke="currentColor" />
      <path d="M14 44 34 34l14 6 18-16" stroke="currentColor" fill="none" />
      <path d="M66 24h12v12" stroke="currentColor" fill="none" />
      <path d="M62 18h18v18" stroke="var(--lime)" strokeDasharray="3 4" fill="none" />
      <circle cx="66" cy="24" r="3" fill="var(--lime)" />
    </svg>
  );
}

const CARDS = [
  {
    n: "A",
    kicker: "Vision",
    title: "The camera is the form.",
    copy: "Photograph a defect and Plinth returns a finding: what it sees, how serious it is, what to do next. Damp, corrosion, blockage, damage, safety risk — described in plain language, in seconds.",
    glyph: <VisionGlyph />,
    specs: ["Image → finding", "Severity + confidence", "Asset & level attached"],
  },
  {
    n: "B",
    kicker: "Memory",
    title: "Your building, remembered.",
    copy: "Every finding, job and invoice is filed against the asset that caused it. Ask what keeps failing on Level 3 and get the history — not somebody's opinion.",
    glyph: <MemoryGlyph />,
    specs: ["Asset-level history", "Ask in plain language", "Recurring-fault detection"],
  },
  {
    n: "C",
    kicker: "Foresight",
    title: "Fix it before the complaint.",
    copy: "Plinth watches the pattern — the same pump, the same vendor, the same rainy season — and puts the work on the calendar while it is still small.",
    glyph: <ForesightGlyph />,
    specs: ["Preventive schedules", "SLA risk alerts", "Spend & budget outlook"],
  },
];

export default function Intelligence() {
  return (
    <section className="section intelligence" id="intelligence">
      <div className="shell">
        <SectionHead index="02" label="The intelligence" aside="Models trained on real buildings" light />

        <div className="intel__head">
          <h2 className="h2 h2--light">
            One system that sees, remembers
            <br />
            <em>and thinks ahead.</em>
          </h2>
          <p className="body-lg body-lg--light">
            Three layers, working on the same data. The photo you take today makes tomorrow&rsquo;s
            decision faster — for this building, and for every building you run.
          </p>
        </div>

        <div className="intel__grid">
          {CARDS.map((c) => (
            <article className="intel-card" key={c.n}>
              <div className="intel-card__top">
                <span className="mono intel-card__n">{c.n}</span>
                <span className="mono intel-card__kicker">{c.kicker}</span>
              </div>
              <div className="intel-card__glyph">{c.glyph}</div>
              <h3 className="h3 h3--light">{c.title}</h3>
              <p className="intel-card__copy">{c.copy}</p>
              <ul className="intel-card__specs">
                {c.specs.map((s) => (
                  <li key={s}>
                    <span className="tick" />
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="intel__foot">
          <p className="intel__creed">
            Every photo becomes a record. Every record becomes a pattern.{" "}
            <em>Every pattern becomes a decision.</em>
          </p>
          <a className="link-arrow link-arrow--light" href="#product">
            See the intelligence at work
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 12h17M14 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
