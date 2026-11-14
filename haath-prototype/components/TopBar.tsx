import Link from "next/link";

export function TopBar({ back, title }: { back?: string; title?: string }) {
  return (
    <header className="topbar">
      {back ? (
        <Link href={back} className="back" aria-label="Back">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      ) : (
        <Link href="/" className="topbar-mark">
          Haath
        </Link>
      )}
      {title && <span className="topbar-title">{title}</span>}
    </header>
  );
}
