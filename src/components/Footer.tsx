import { useEffect, useState } from "react";
import { Arrow, Mark } from "./ui";
import { useParallax } from "../lib/useParallax";

/* The swatches below are printed from the live design tokens, so the hex code
   shown on the page is always the value the site is actually painted with.
   Change --signal in base.css and both the accent and its code follow. */
const PALETTE = [
  { name: "Paper", token: "--paper" },
  { name: "Ink", token: "--ink" },
  { name: "Signal", token: "--signal" },
  { name: "Lime deep", token: "--lime-deep" },
  { name: "Alert", token: "--alert" },
  { name: "Green", token: "--green" },
];

function toHex(value: string, fallback: string) {
  const v = value.trim();
  if (/^#[0-9a-f]{6}$/i.test(v)) return v.toUpperCase();
  if (/^#[0-9a-f]{3}$/i.test(v))
    return ("#" + v.slice(1).split("").map((c) => c + c).join("")).toUpperCase();
  const rgb = v.match(/\d+/g);
  if (rgb && rgb.length >= 3)
    return (
      "#" +
      rgb
        .slice(0, 3)
        .map((n) => Number(n).toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()
    );
  return fallback;
}

const COLS = [
  {
    head: "Product",
    links: ["Overview", "Visual triage", "Work orders", "Reports", "Desktop"],
  },
  {
    head: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    head: "Resources",
    links: ["Help centre", "Security", "Status", "API"],
  },
  {
    head: "Legal",
    links: ["Privacy", "Terms", "DPA", "Cookies"],
  },
];

export default function Footer() {
  const word = useParallax<HTMLSpanElement>(0.12);
  const [tokens, setTokens] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const read = () => {
      const cs = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};
      PALETTE.forEach((p) => {
        next[p.token] = toHex(cs.getPropertyValue(p.token), "—");
      });
      setTokens(next);
    };
    read();
  }, []);

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__brand">
            <Mark title />
            <p>
              AI facility operations,
              <br />
              from the ground up.
            </p>
            <a className="footer__mail" href="mailto:hello@plinth.systems">
              hello@plinth.systems <Arrow size={14} />
            </a>
          </div>

          <div className="footer__cols">
            {COLS.map((c) => (
              <div className="footer__col" key={c.head}>
                <span className="mono footer__col-head">{c.head}</span>
                {c.links.map((l) => (
                  <a href="#top" key={l}>
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="footer__word-wrap">
          <span className="footer__word" aria-hidden="true" ref={word}>
            PLINTH
          </span>
          <span className="footer__lime" aria-hidden="true" />
        </div>

        <div className="footer__palette">
          <span className="mono footer__palette-label">
            Palette / {String(PALETTE.length).padStart(2, "0")}
          </span>
          {PALETTE.map((c) => (
            <span className="footer__swatch" key={c.name} title={c.token}>
              <i style={{ background: `var(${c.token})` }} />
              <span className="mono">{c.name}</span>
              <strong>{tokens?.[c.token] ?? "—"}</strong>
            </span>
          ))}
        </div>

        <div className="footer__bottom">
          <span className="mono">© 2026 Plinth Systems Ltd.</span>
          <span className="mono">Lagos · 06°27′N 03°23′E</span>
          <a className="mono footer__top-link" href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
