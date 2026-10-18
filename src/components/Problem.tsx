import { Reveal, SectionHead } from "./ui";

const PROBLEMS = [
  {
    n: "01",
    title: "Evidence with no address",
    copy: "A photo is taken, sent, buried. No asset, no level, no timestamp that survives the scroll. By Friday nobody can find the leak — or prove it was ever reported.",
  },
  {
    n: "02",
    title: "Decisions that wait for people",
    copy: "Approvals move at the speed of who is online. A blocked drain waits for a vendor, a vendor waits for a PO, and a small repair becomes a shutdown.",
  },
  {
    n: "03",
    title: "A building that forgets",
    copy: "The engineer who knew the riser schedule leaves, and the knowledge leaves with them. Every new team starts the same inspection from zero.",
  },
];

const CHAT = [
  {
    who: "Adaeze · Front desk",
    time: "08:12",
    text: "Leak again on the 3rd floor. A ceiling tile just dropped.",
    photo: true,
  },
  { who: "Tunde · Ops", time: "08:14", text: "Which 3rd floor? Tower A or B?" },
  { who: "Adaeze · Front desk", time: "08:19", text: "B. Near the east stair." },
  { who: "Tunde · Ops", time: "08:41", text: "Does anyone have the plumber's number?" },
];

export default function Problem() {
  return (
    <section className="section problem" id="problem">
      <div className="shell">
        <SectionHead index="01" label="The gap" aside="Where facility data goes to die" />

        <div className="problem__grid">
          <Reveal className="problem__intro">
            <h2 className="h2">
              Buildings don&rsquo;t fail loudly.
              <br />
              <em>They fail between messages.</em>
            </h2>
            <p className="body-lg">
              Most facility teams already have the information. It is just spread across four
              group chats, two inboxes, a paper logbook and one person&rsquo;s memory. Plinth
              puts it on the same floor.
            </p>
          </Reveal>

          <Reveal className="chat" delay={120}>
            <div className="chat__head">
              <div>
                <span className="chat__title">Facilities — Tower B</span>
                <span className="mono chat__sub">42 members · 6 admins</span>
              </div>
              <span className="chat__signal mono">No record</span>
            </div>
            <div className="chat__body">
              {CHAT.map((m, i) => (
                <div className="msg" key={i}>
                  <div className="msg__meta">
                    <span>{m.who}</span>
                    <span className="mono">{m.time}</span>
                  </div>
                  <div className="msg__bubble">
                    {m.photo ? (
                      <div className="msg__photo">
                        <img src="/img/ceiling.jpg" alt="Blurry phone photo of a damaged ceiling" />
                        <span className="mono">IMG_4471.jpg</span>
                      </div>
                    ) : null}
                    <p>{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="chat__foot">
              <span className="mono">4 hours later · still not fixed</span>
              <span className="mono chat__stamp">No asset · No level · No record</span>
            </div>
          </Reveal>
        </div>

        <div className="problem__list">
          {PROBLEMS.map((p, i) => (
            <Reveal className="problem__item" key={p.n} delay={i * 80}>
              <span className="problem__n">{p.n}</span>
              <h3 className="h3">{p.title}</h3>
              <p>{p.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
