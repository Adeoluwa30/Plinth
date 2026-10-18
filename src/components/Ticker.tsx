const PHRASES = [
  "From WhatsApp to one source of truth",
  "From reactive to predictive",
  "From photo to work order",
  "From memory to record",
  "From guesswork to evidence",
];

const PHRASES_BACK = [
  "38 faults closed last month",
  "2h 14m average response",
  "96% SLA met",
  "1,284 assets remembered",
  "12 open jobs, 6 AI findings",
];

function Arrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function Row({ items }: { items: string[] }) {
  return (
    <>
      {items.map((p) => (
        <span className="ticker__item" key={p}>
          {p}
          <Arrow />
        </span>
      ))}
    </>
  );
}

function Belt({ items, flip = false }: { items: string[]; flip?: boolean }) {
  return (
    <div className={`ticker__track ${flip ? "ticker__track--flip" : ""}`}>
      <div className="ticker__group">
        <Row items={items} />
      </div>
      <div className="ticker__group" aria-hidden="true">
        <Row items={items} />
      </div>
    </div>
  );
}

export default function Ticker() {
  return (
    <div
      className="ticker-stack"
      aria-label="Plinth replaces scattered chats with one operational record"
    >
      <div className="ticker">
        <Belt items={PHRASES} />
      </div>
      <div className="ticker ticker--reverse" aria-hidden="true">
        <Belt items={PHRASES_BACK} flip />
      </div>
    </div>
  );
}
