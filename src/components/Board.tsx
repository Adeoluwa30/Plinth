import { useEffect, useRef, useState } from "react";
import { Arrow, SectionHead } from "./ui";

const ROLES = [
  {
    role: "Facility manager",
    sees: "Portfolio live view, today's AI brief, approvals, spend and SLA position.",
    does: "Decides",
    access: "All sites",
  },
  {
    role: "FM supervisor",
    sees: "Daily rounds, task board, photo capture and handover notes.",
    does: "Runs the floor",
    access: "Assigned sites",
  },
  {
    role: "Technician",
    sees: "Assigned jobs, evidence, parts on hand and digital sign-off.",
    does: "Fixes",
    access: "Job scope",
  },
  {
    role: "Contracted vendor",
    sees: "Scoped jobs, the SLA clock, evidence to upload and invoice status.",
    does: "Delivers",
    access: "Contract scope",
  },
  {
    role: "Occupant",
    sees: "A QR request form and status updates. No account, no training.",
    does: "Reports",
    access: "Own floor",
  },
  {
    role: "Owner / landlord",
    sees: "Monthly reports, compliance log, budget against plan.",
    does: "Reviews",
    access: "Read only",
  },
];

export default function Board() {
  const pin = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const pinEl = pin.current;
    const stageEl = stage.current;
    const viewEl = viewport.current;
    const trackEl = track.current;
    if (!pinEl || !stageEl || !viewEl || !trackEl) return;

    const enabled = () =>
      window.innerWidth > 900 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let distance = 0;
    let lastIndex = -1;

    const update = () => {
      const total = pinEl.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const top = pinEl.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, -top / total));
      trackEl.style.transform = `translate3d(${(-p * distance).toFixed(2)}px, 0, 0)`;
      setProgress(p);
      const idx = Math.min(ROLES.length - 1, Math.round(p * (ROLES.length - 1)));
      if (idx !== lastIndex) {
        lastIndex = idx;
        setCurrent(idx);
      }
    };

    const measure = () => {
      if (!enabled()) {
        pinEl.style.height = "";
        trackEl.style.transform = "";
        setPinned(false);
        setProgress(0);
        setCurrent(0);
        lastIndex = -1;
        return;
      }
      setPinned(true);
      distance = Math.max(0, trackEl.scrollWidth - viewEl.clientWidth);
      pinEl.style.height = `${window.innerHeight + distance}px`;
      update();
    };

    let ticking = false;
    const onScroll = () => {
      if (!enabled() || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(trackEl);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="section board" id="stakeholders">
      <div className="shell">
        <SectionHead index="06" label="The directory" aside="Roles, not group chats" />
        <div className="board__lede">
          <h2 className="h2">
            One building.
            <br />
            <em>Everyone on the same floor.</em>
          </h2>
          <p className="body-lg">
            In-house or contracted, on site or off. Each person gets exactly the slice of the
            building their job needs — and every update lands back in the same record.
          </p>
        </div>
      </div>

      <div className={`board__pin ${pinned ? "is-pinned" : ""}`} ref={pin}>
        <div className="board__stage" ref={stage}>
          <div className="board__stage-head mono">
            <span>06 / Floor directory</span>
            <span>Roles, not group chats</span>
          </div>

          <div className="board__main">
          <div className="board__aside">
            <span className="mono board__kicker">
              <i />
              Who&rsquo;s on the floor
            </span>
            <p className="board__hint">
              {pinned ? "Scroll to walk the floor" : "Swipe the plates"}
            </p>
            <div className="board__counter">
              <span className="board__counter-n mono">
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="mono">/ {String(ROLES.length).padStart(2, "0")}</span>
            </div>
            <div className="board__bar">
              <span style={{ transform: `scaleX(${Math.max(progress, 0.02)})` }} />
            </div>
            <span className="mono board__sign">{ROLES[current].does}</span>
            <p className="board__note">
              Permissions are set per site, per role, per contract. Your client sees a report —
              not your vendor negotiations.
            </p>
          </div>

          <div className="board__viewport" ref={viewport}>
            <div className="board__track" ref={track}>
              {ROLES.map((r, i) => (
                <article
                  className={`board-card ${i % 2 === 1 ? "board-card--ink" : ""} ${
                    pinned && i === current ? "is-current" : ""
                  }`}
                  key={r.role}
                >
                  <span className="board-card__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="board-card__head mono">
                    <span className="board-card__dot" />
                    <span>Plate {String(i + 1).padStart(2, "0")}</span>
                    <span className="board-card__access">{r.access}</span>
                  </div>
                  <h3 className="board-card__role">{r.role}</h3>
                  <div className="board-card__body">
                    <span className="mono">Sees in Plinth</span>
                    <p>{r.sees}</p>
                  </div>
                  <div className="board-card__foot">
                    <div>
                      <span className="mono">Accountability</span>
                      <strong>{r.does}</strong>
                    </div>
                    <Arrow size={20} />
                  </div>
                </article>
              ))}
              <span className="board__track-end" aria-hidden="true" />
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
