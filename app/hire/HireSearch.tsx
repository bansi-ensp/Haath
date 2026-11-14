"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Avatar } from "@/components/Avatar";
import { LOCALITIES, WORK_TYPES, workers } from "@/lib/data";

export function HireSearch() {
  const [work, setWork] = useState<string>("All");
  const [locality, setLocality] = useState<string>("Anywhere");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const results = useMemo(
    () =>
      workers.filter(
        (w) =>
          (work === "All" || w.work === work) &&
          (locality === "Anywhere" || w.locality === locality) &&
          (!verifiedOnly || w.idCheck.status === "verified"),
      ),
    [work, locality, verifiedOnly],
  );

  return (
    <>
      <div className="chips" role="group" aria-label="Type of work">
        {["All", ...WORK_TYPES].map((t) => (
          <button key={t} type="button" className="chip" aria-pressed={work === t} onClick={() => setWork(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="filter-row">
        <label className="select">
          <span className="visually-hidden">Locality</span>
          <select value={locality} onChange={(e) => setLocality(e.target.value)}>
            <option>Anywhere</option>
            {LOCALITIES.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>
        <label className="toggle">
          <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} />
          ID verified only
        </label>
      </div>

      {results.length === 0 ? (
        <div className="empty">
          <p>No one matches these filters yet.</p>
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => {
              setWork("All");
              setLocality("Anywhere");
              setVerifiedOnly(false);
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="results">
          {results.map((w) => {
            const refs = w.references.filter((r) => r.status === "verified").length;
            return (
              <li key={w.id}>
                <Link href={`/hire/${w.id}`} className="result">
                  <Avatar initials={w.initials} tone={w.tone} />
                  <span className="result-body">
                    <span className="result-name">{w.name}</span>
                    <span className="result-line">
                      {w.work}, {w.years} years
                    </span>
                    <span className="result-line muted">{w.locality}</span>
                    <span className="result-checks">
                      <span className={w.idCheck.status === "verified" ? "mini mini-seal" : "mini mini-pending"}>
                        {w.idCheck.status === "verified" ? "ID verified" : "ID not verified yet"}
                      </span>
                      {refs > 0 && (
                        <span className="mini mini-seal">
                          {refs} reference{refs > 1 ? "s" : ""} verified
                        </span>
                      )}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <p className="muted small center">Results show locality only, never home addresses.</p>
    </>
  );
}
