import { Arrow, ArrowRight, Reveal } from "./ui";
import { useParallax } from "../lib/useParallax";

const DIRECTORY = [
  { n: "00", label: "Overview", meta: "Live", href: "#intelligence" },
  { n: "01", label: "Assets", meta: "1,284 tracked", href: "#workflow" },
  { n: "02", label: "Open jobs", meta: "12", href: "#workflow" },
  { n: "03", label: "AI findings", meta: "6 to review", href: "#product" },
  { n: "04", label: "Reports", meta: "Draft ready", href: "#reports" },
];

const FACTS = [
  { n: "01", k: "Capture", v: "Photo, voice note, ticket." },
  { n: "02", k: "Understand", v: "AI finding in under 10 seconds." },
  { n: "03", k: "Act", v: "Work orders with evidence attached." },
  { n: "04", k: "Report", v: "Daily to monthly, written for you." },
];

export default function Hero() {
  const shot = useParallax<HTMLDivElement>(0.22);

  return (
    <section className="hero" id="top">
      <div className="shell">
        <div className="hero__meta">
          <span className="tag">
            <i className="dot" />
            AI facility operations
          </span>
          <span className="mono hero__coords">LAGOS · 06°27′N 03°23′E</span>
          <span className="mono hero__est">A workspace by Plinth Systems</span>
        </div>

        <div className="hero__grid">
          <div className="hero__copy">
            <h1 className="hero__title">
              Run the building.
              <br />
              <em>Not</em> the group chat.
            </h1>

            <p className="hero__lede">
              Plinth is the AI operations workspace for facility teams. Every asset, ticket,
              contractor and site photo in one place — read, remembered and turned into a
              decision before the next call comes in.
            </p>

            <div className="hero__actions">
              <a className="btn btn--ink" href="#download">
                Download the app <Arrow size={16} />
              </a>
              <a className="link-arrow" href="#product">
                See how it thinks <ArrowRight size={18} />
              </a>
            </div>

            <p className="hero__note mono">
              <span className="hero__note-mark" />
              Made in Lagos. Built for buildings everywhere.
            </p>
          </div>

          <Reveal className="hero__media" delay={120}>
            <figure className="hero__figure">
              <div className="hero__shot" ref={shot}>
                <img
                  src="/img/hero.jpg"
                  alt="A quiet office corridor with a long perspective of doorways and ceiling lights"
                  width={1200}
                  height={800}
                />
              </div>
              <div className="hero__scrim" />

              <div className="plate">
                <span className="plate__num">03</span>
                <span className="plate__text">
                  Operations
                  <small>All sites · live</small>
                </span>
                <Arrow size={22} />
              </div>

              <div className="hero__dir">
                <div className="hero__dir-head">
                  <span className="mono">Building directory</span>
                  <span className="mono">Updated 08:42</span>
                </div>
                {DIRECTORY.map((d) => (
                  <a className="dir-row" href={d.href} key={d.label}>
                    <span className="dir-row__n mono">{d.n}</span>
                    <span className="dir-row__label">{d.label}</span>
                    <span className="dir-row__meta mono">{d.meta}</span>
                    <Arrow size={13} />
                  </a>
                ))}
              </div>
            </figure>
            <span className="hero__cap mono">
              Fig. 01 — One floor plan for assets, people and evidence.
            </span>
          </Reveal>
        </div>

        <div className="facts">
          {FACTS.map((f) => (
            <div className="fact" key={f.n}>
              <span className="fact__n mono">{f.n}</span>
              <div>
                <h2 className="fact__k">{f.k}</h2>
                <p className="fact__v">{f.v}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
