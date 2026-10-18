import { useState } from "react";
import type { FormEvent } from "react";
import { Arrow, SectionHead } from "./ui";
import { useParallax } from "../lib/useParallax";

const DEVICES = [
  { label: "iOS", meta: "iPhone · iOS 16+", glyph: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 1.6a.9.9 0 0 0-.9.9v14.9c0 .5.4.9.9.9h10a.9.9 0 0 0 .9-.9V4.5a.9.9 0 0 0-.9-.9H7Zm4 15.6h2v.9h-2v-.9Z" },
  { label: "Android", meta: "Android 10+", glyph: "M6 9h12v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9Zm-3 .5a1.5 1.5 0 0 1 3 0v6a1.5 1.5 0 0 1-3 0v-6ZM18 9.5a1.5 1.5 0 0 1 3 0v6a1.5 1.5 0 0 1-3 0v-6ZM7 6.5C7 3.5 9.2 1 12 1s5 2.5 5 5.5H7Zm3-2.2a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8Zm4 0a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8ZM8 20.5h3v2H9a1 1 0 0 1-1-1v-1Zm5 0h3v1a1 1 0 0 1-1 1h-2v-2Z" },
  { label: "Desktop", meta: "macOS · Windows", glyph: "M3 4h18v11H3V4Zm2 2v7h14V6H5Zm3 10h8l1 3H7l1-3Z" },
];

export default function Download() {
  const phone = useParallax<HTMLDivElement>(0.17);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [error, setError] = useState("");

  // Client-side only: wire this to your email service or /api/waitlist before launch.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("Enter a valid work email so we can send the link.");
      return;
    }
    setError("");
    setStatus("sent");
  };

  return (
    <section className="section download" id="download">
      <div className="shell">
        <SectionHead index="08" label="Get the keys" aside="Early access · iOS, Android, desktop" />

        <div className="download__grid">
          <div className="download__copy">
            <h2 className="h2 h2--xl">
              Put the building
              <br />
              <em>in your pocket.</em>
            </h2>
            <p className="body-lg">
              Capture from the stairwell. Approve from the airport. Review the whole portfolio
              from your desk. One account, every surface — and everything stays in sync.
            </p>

            <div className="device-grid">
              {DEVICES.map((d) => (
                <div className="device" key={d.label}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={d.glyph} fill="currentColor" />
                  </svg>
                  <strong>{d.label}</strong>
                  <span className="mono">{d.meta}</span>
                </div>
              ))}
            </div>

            <form className="signup" onSubmit={submit} noValidate>
              <label className="mono signup__label" htmlFor="email">
                Get the download link
              </label>
              <div className={`signup__row ${status === "sent" ? "is-sent" : ""}`}>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@yourfacility.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  disabled={status === "sent"}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "email-error" : undefined}
                />
                <button className="btn btn--ink" type="submit" disabled={status === "sent"}>
                  {status === "sent" ? "Link on its way" : "Send link"}
                  {status === "sent" ? <span className="check-dot" /> : <Arrow size={15} />}
                </button>
              </div>
              {error ? (
                <p className="signup__msg" id="email-error" role="alert">
                  {error}
                </p>
              ) : null}
              {status === "sent" ? (
                <p className="signup__msg signup__msg--ok" role="status">
                  You&rsquo;re on the list. We&rsquo;ll send iOS, Android and desktop links to{" "}
                  {email.trim()}.
                </p>
              ) : (
                <p className="signup__note mono">
                  Free for your first site · No card · Set-up in under a day
                </p>
              )}
            </form>

            <p className="download__place mono">
              Built in Lagos · Working everywhere · Support in English &amp; Yoruba
            </p>
          </div>

          <div className="phone-wrap" ref={phone}>
            <span className="phone-wrap__word mono">Field capture</span>
            <div className="phone">
              <div className="phone__notch" />
              <div className="phone__screen">
                <div className="phone__status mono">
                  <span>09:41</span>
                  <span className="phone__status-icons">▮▮▮ ⌁</span>
                </div>
                <div className="phone__head">
                  <span className="mono">PLINTH · LEVEL 03</span>
                  <span className="phone__avatar">AO</span>
                </div>
                <div className="phone__photo">
                  <img src="/img/ceiling.jpg" alt="Ceiling inspection inside the Plinth app" />
                  <div className="phone__detect">
                    <span className="mono">Ceiling void · 94%</span>
                  </div>
                  <span className="phone__flash mono">L3 · TOWER B</span>
                </div>
                <div className="phone__finding">
                  <span className="mono">AI finding · High severity</span>
                  <strong>Active water ingress</strong>
                  <p>Isolate zone. Inspect void above before reoccupation.</p>
                </div>
                <div className="phone__actions">
                  <span className="phone__btn">Create work order</span>
                  <span className="phone__btn phone__btn--ghost">Edit</span>
                </div>
                <div className="phone__recent">
                  <div className="phone__recent-head mono">
                    <span>Today · Tower B</span>
                    <span>3 captures</span>
                  </div>
                  <div className="phone__recent-row">
                    <span className="mono">14:06</span>
                    <span>AHU return · L2</span>
                    <span className="mono">88%</span>
                  </div>
                  <div className="phone__recent-row">
                    <span className="mono">11:31</span>
                    <span>Riser door · GF</span>
                    <span className="mono">91%</span>
                  </div>
                  <div className="phone__recent-row">
                    <span className="mono">09:14</span>
                    <span>Ceiling void · L3</span>
                    <span className="mono">94%</span>
                  </div>
                </div>
                <div className="phone__tabs">
                  <span className="is-on">Capture</span>
                  <span>Jobs</span>
                  <span>Brief</span>
                </div>
              </div>
            </div>
            <span className="phone-wrap__tag mono">iOS · Android</span>
          </div>
        </div>
      </div>
    </section>
  );
}
