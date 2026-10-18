import { useEffect, useState } from "react";
import { Arrow, Mark } from "./ui";

const LINKS = [
  { label: "Intelligence", href: "#intelligence", n: "02" },
  { label: "Visual triage", href: "#product", n: "03" },
  { label: "Workflow", href: "#workflow", n: "04" },
  { label: "Directory", href: "#stakeholders", n: "06" },
  { label: "Reports", href: "#reports", n: "07" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-menu" : ""}`}>
        <div className="nav__inner">
          <a className="nav__brand" href="#top" aria-label="Plinth home">
            <Mark />
          </a>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a className="nav__signin" href="#download">
              Sign in
            </a>
            <a className="btn btn--ink btn--sm" href="#download">
              Get the app
              <Arrow size={14} />
            </a>
            <button
              className={`nav__burger ${open ? "is-open" : ""}`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="menu__top">
          <span className="mono">INDEX / PLINTH</span>
          <span className="mono">06°27′N 03°23′E</span>
        </div>
        <nav className="menu__links" aria-label="Mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              <span className="mono">{l.n}</span>
              {l.label}
              <Arrow size={26} />
            </a>
          ))}
          <a href="#download" onClick={() => setOpen(false)}>
            <span className="mono">08</span>
            Download
            <Arrow size={26} />
          </a>
        </nav>
        <div className="menu__foot">
          <p>AI facility operations, from the ground up.</p>
          <a className="btn btn--ink" href="#download" onClick={() => setOpen(false)}>
            Get the app <Arrow size={14} />
          </a>
        </div>
      </div>
    </>
  );
}
