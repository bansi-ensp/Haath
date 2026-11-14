"use client";

import Link from "next/link";
import { useState } from "react";
import { TrustLabel } from "@/components/TrustLabel";
import { getWorker, lakshmiRequests } from "@/lib/data";

type Answer = "accepted" | "declined";

const STEPS = [
  { name: "Photo", done: true },
  { name: "Voice intro", done: true },
  { name: "Work and rate", done: true },
  { name: "ID check", done: true },
  { name: "References", done: false, note: "1 of 2 called" },
];

export function WorkerHome() {
  const me = getWorker("lakshmi")!;
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [confirming, setConfirming] = useState<string | null>(null);

  const waiting = lakshmiRequests.filter((r) => !answers[r.id]).length;

  return (
    <>
      <section className="hello">
        <h1 className="h1">Namaste, {me.name}</h1>
        <button type="button" className="btn btn-quiet listen">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" /><path d="M16 8.5a5 5 0 010 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          Listen
        </button>
      </section>

      <section aria-labelledby="req-h">
        <h2 id="req-h" className="h2">
          {waiting > 0 ? `${waiting} request${waiting > 1 ? "s" : ""} waiting` : "No requests waiting"}
        </h2>
        <ul className="requests">
          {lakshmiRequests.map((r) => {
            const answer = answers[r.id];
            return (
              <li key={r.id} className={`request ${answer ?? ""}`}>
                <p className="request-work">{r.work}</p>
                <p className="request-line">
                  <PinIcon /> {r.locality}
                </p>
                <p className="request-line">
                  <ClockIcon /> {r.when}
                </p>
                <p className="request-note">&ldquo;{r.note}&rdquo;</p>
                <TrustLabel kind={r.employerVerified ? "employer_verified" : "employer_unverified"} />

                {!answer && confirming !== r.id && (
                  <div className="answer-row">
                    <button type="button" className="btn btn-accept" onClick={() => setConfirming(r.id)}>
                      <CheckIcon /> Accept
                    </button>
                    <button
                      type="button"
                      className="btn btn-decline"
                      onClick={() => setAnswers((a) => ({ ...a, [r.id]: "declined" }))}
                    >
                      <CrossIcon /> Decline
                    </button>
                  </div>
                )}

                {!answer && confirming === r.id && (
                  <div className="confirm">
                    <p>Share your number with this family? You will see their number too.</p>
                    <div className="answer-row">
                      <button
                        type="button"
                        className="btn btn-accept"
                        onClick={() => {
                          setAnswers((a) => ({ ...a, [r.id]: "accepted" }));
                          setConfirming(null);
                        }}
                      >
                        Yes, share
                      </button>
                      <button type="button" className="btn btn-quiet" onClick={() => setConfirming(null)}>
                        Not now
                      </button>
                    </div>
                  </div>
                )}

                {answer === "accepted" && (
                  <div className="outcome" role="status">
                    <p>Accepted. Call the family:</p>
                    <a className="phone" href={`tel:${r.employerPhone.replace(/\s/g, "")}`}>
                      {r.employerPhone}
                    </a>
                    <p className="muted small">If anything goes wrong, you can block or report them from Help.</p>
                  </div>
                )}
                {answer === "declined" && (
                  <p className="outcome muted" role="status">
                    Declined. Nothing was shared.
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="pp-h" className="progress">
        <h2 id="pp-h" className="h2">
          My Passport
        </h2>
        <ol className="steps">
          {STEPS.map((s) => (
            <li key={s.name} className={s.done ? "step done" : "step"}>
              <span className="step-dot" aria-hidden="true">
                {s.done && <CheckIcon />}
              </span>
              <span>
                {s.name}
                {s.note && <span className="muted small block">{s.note}</span>}
              </span>
              <span className="visually-hidden">{s.done ? "done" : "not done"}</span>
            </li>
          ))}
        </ol>
        <Link href="/worker/passport" className="btn btn-quiet btn-block">
          See my Passport as employers see it
        </Link>
      </section>

      <section className="help">
        <a className="btn btn-quiet btn-block" href="tel:+910000000000">
          Call my coordinator
        </a>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}
function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 21s-6-5.5-6-11a6 6 0 0112 0c0 5.5-6 11-6 11z" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="10" r="2" fill="currentColor" /></svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M12 8v4l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
  );
}
