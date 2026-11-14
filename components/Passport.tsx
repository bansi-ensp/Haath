import type { Worker } from "@/lib/data";
import { Avatar } from "./Avatar";
import { TrustLabel } from "./TrustLabel";
import { VoiceIntro } from "./VoiceIntro";

export function Passport({ worker }: { worker: Worker }) {
  const id = worker.idCheck;
  return (
    <article className="passport">
      <div className="passport-head">
        <Avatar initials={worker.initials} tone={worker.tone} size={72} />
        <div>
          <h1 className="passport-name">{worker.name}</h1>
          <p className="passport-sub">
            {worker.work}, {worker.locality}
          </p>
          <div className="passport-idline">
            <TrustLabel
              kind={id.status === "verified" ? "id_verified" : id.status === "in_review" ? "id_review" : "id_none"}
              date={id.checkedOn}
            />
          </div>
        </div>
      </div>

      <VoiceIntro name={worker.name} seconds={worker.introSeconds} />

      <dl className="fields">
        <Field title="Work" kind="self">
          {worker.specialty}
          <br />
          {worker.years} years&rsquo; experience
        </Field>
        <Field title="Languages" kind="self">
          {worker.languages.join(", ")}
        </Field>
        <Field title="Rate and limits" kind="self">
          {worker.rate}
          {worker.limits.map((l) => (
            <span key={l} className="limit">
              {l}
            </span>
          ))}
        </Field>
        <div className="field">
          <dt>References</dt>
          <dd>
            {worker.references.length === 0 && <span className="muted">No references added yet</span>}
            <ul className="refs">
              {worker.references.map((r) => (
                <li key={r.who}>
                  <span>
                    {r.who}
                    <span className="muted small block">{r.detail}</span>
                  </span>
                  <TrustLabel kind={r.status === "verified" ? "ref_verified" : "ref_review"} date={r.checkedOn} />
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <p className="freshness">
        Passport created {worker.createdOn}
        <br />
        Last updated {worker.updatedOn}
      </p>
      {worker.sharedPhone && <p className="muted small">Requests go to a phone {worker.name} shares with family.</p>}
      <p className="privacy-note">
        <LockIcon /> Phone number and home address stay hidden until {worker.name} accepts a request.
      </p>
    </article>
  );
}

function Field({ title, kind, children }: { title: string; kind: "self"; children: React.ReactNode }) {
  return (
    <div className="field">
      <dt>
        {title}
        <TrustLabel kind={kind} />
      </dt>
      <dd>{children}</dd>
    </div>
  );
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11V8a4 4 0 018 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
