"use client";

import Link from "next/link";
import { useState } from "react";
import { LOCALITIES } from "@/lib/data";

export function RequestForm({ name, work }: { name: string; work: string }) {
  const [when, setWhen] = useState("Mornings");
  const [locality, setLocality] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="sent" role="status">
        <div className="sent-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="32" height="32"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h1 className="h2">Request sent to {name}</h1>
        <p>
          If {name} accepts, you&rsquo;ll both see each other&rsquo;s number. If {name} declines, nothing is shared.
        </p>
        <dl className="summary">
          <div><dt>Work</dt><dd>{work}</dd></div>
          <div><dt>When</dt><dd>{when}</dd></div>
          <div><dt>Your locality</dt><dd>{locality}</dd></div>
        </dl>
        <Link href="/hire" className="btn btn-quiet btn-block">
          Back to search
        </Link>
      </div>
    );
  }

  const ready = consent && locality !== "";

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) setSent(true);
      }}
    >
      <p className="muted">{name} sees your locality, the work and when. Not your address or number.</p>

      <div className="form-field">
        <span className="form-label">Type of work</span>
        <p className="form-static">{work}</p>
      </div>

      <label className="form-field">
        <span className="form-label">When</span>
        <select value={when} onChange={(e) => setWhen(e.target.value)}>
          <option>Mornings</option>
          <option>Evenings</option>
          <option>Weekends</option>
          <option>One time only</option>
        </select>
      </label>

      <label className="form-field">
        <span className="form-label">Your locality</span>
        <select value={locality} onChange={(e) => setLocality(e.target.value)} required>
          <option value="" disabled>
            Choose a locality
          </option>
          {[...LOCALITIES, "Gachibowli"].map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </label>

      <label className="form-field">
        <span className="form-label">Short note (optional)</span>
        <textarea
          rows={3}
          maxLength={140}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="For example: 2 bedroom flat, family of three"
        />
      </label>

      <label className="consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          Share my phone number with {name} if they accept. I can block them at any time.
        </span>
      </label>

      <button type="submit" className="btn btn-primary btn-block" disabled={!ready}>
        Send request
      </button>
      {!ready && (
        <p className="muted small center">
          {locality === "" ? "Choose your locality" : "Tick the box to agree to share your number"} to send.
        </p>
      )}
    </form>
  );
}
