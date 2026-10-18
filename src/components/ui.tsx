import type { CSSProperties, ReactNode } from "react";

export function Mark({ title = false }: { title?: boolean }) {
  return (
    <span className="mark" aria-hidden="true">
      <span className="mark__glyph">
        <svg viewBox="0 0 32 32" role="presentation">
          <rect width="32" height="32" fill="currentColor" />
          <path className="mark__p" d="M10 23V9h6c3.3 0 5.4 1.9 5.4 5.1 0 3.2-2.1 5.1-5.4 5.1h-2.2V23h-3.8Zm3.8-6.9h1.9c1.1 0 1.8-.5 1.8-1.6 0-1-.7-1.6-1.8-1.6h-1.9v3.2Z" fill="var(--paper)" />
          <path d="M22 23v-5h2v5h-2Z" fill="var(--lime)" />
        </svg>
      </span>
      <span className="mark__word">
        PLINTH
        {title ? <sup>®</sup> : null}
      </span>
    </span>
  );
}

export function Arrow({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      className={`arrow ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M19 5H8M19 5v11" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ArrowRight({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12h17M14 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function SectionHead({
  index,
  label,
  aside,
  light = false,
}: {
  index: string;
  label: string;
  aside?: string;
  light?: boolean;
}) {
  return (
    <div className={`shead ${light ? "shead--light" : ""}`}>
      <span className="shead__index">{index}</span>
      <span className="shead__label">{label}</span>
      <span className="shead__rule" />
      {aside ? <span className="shead__aside">{aside}</span> : null}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "figure" | "li";
}) {
  return (
    <Tag
      className={`reveal ${className}`}
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
