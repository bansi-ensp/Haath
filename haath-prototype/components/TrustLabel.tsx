"use client";

import Link from "next/link";
import { useRef } from "react";

export type LabelKind =
  | "id_verified"
  | "id_review"
  | "id_none"
  | "ref_verified"
  | "ref_review"
  | "self"
  | "employer_verified"
  | "employer_unverified";

const LABELS: Record<LabelKind, { text: string; style: "seal" | "pending" | "self"; meaning: string }> = {
  id_verified: {
    text: "ID verified",
    style: "seal",
    meaning:
      "A Haath team member checked a government ID and confirmed it belongs to this person. It does not tell you how good their work is.",
  },
  id_review: {
    text: "ID check in review",
    style: "pending",
    meaning: "This person has submitted an ID. Haath has not finished checking it yet.",
  },
  id_none: {
    text: "ID not checked",
    style: "pending",
    meaning: "This person has not been through an ID check yet.",
  },
  ref_verified: {
    text: "Reference verified",
    style: "seal",
    meaning:
      "Haath called this past employer, who confirmed this person worked for them. Haath does not record opinions from the call.",
  },
  ref_review: {
    text: "Reference not called yet",
    style: "pending",
    meaning: "The worker gave this reference. Haath has not called them yet.",
  },
  self: {
    text: "Self-reported",
    style: "self",
    meaning: "Written by the worker in their own words. Haath has not checked it.",
  },
  employer_verified: {
    text: "Verified employer",
    style: "seal",
    meaning: "A Haath team member checked this employer's government ID. Their number stays hidden until you accept.",
  },
  employer_unverified: {
    text: "Employer not verified",
    style: "pending",
    meaning: "This employer has not been through an ID check. You can still accept or decline.",
  },
};

export function TrustLabel({ kind, date }: { kind: LabelKind; date?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const label = LABELS[kind];

  return (
    <>
      <button
        type="button"
        className={`label label-${label.style}`}
        onClick={() => ref.current?.showModal()}
        aria-haspopup="dialog"
      >
        {label.style === "seal" && <SealIcon />}
        {label.text}
      </button>
      <dialog ref={ref} className="sheet" onClick={(e) => e.target === ref.current && ref.current?.close()}>
        <div className="sheet-body">
          <p className={`label label-${label.style} label-static`}>
            {label.style === "seal" && <SealIcon />}
            {label.text}
          </p>
          <p>{label.meaning}</p>
          {date && <p className="muted">Checked on {date}</p>}
          <div className="sheet-actions">
            <Link href="/trust" className="text-link">
              How verification works
            </Link>
            <button type="button" className="btn btn-quiet" onClick={() => ref.current?.close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

function SealIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        d="M8 .8l1.6 1.3 2-.3.8 1.9 1.9.8-.3 2L15.2 8l-1.3 1.6.3 2-1.9.8-.8 1.9-2-.3L8 15.2l-1.6-1.3-2 .3-.8-1.9-1.9-.8.3-2L.8 8l1.3-1.6-.3-2 1.9-.8.8-1.9 2 .3z"
        fill="currentColor"
      />
      <path d="M5 8.2l2 2 4-4.2" fill="none" stroke="var(--seal-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
