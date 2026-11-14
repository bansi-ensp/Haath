import Link from "next/link";

export default function Welcome() {
  return (
    <main className="welcome">
      <h1 className="wordmark">Haath</h1>
      <p className="lede">
        Find work or find help in Hyderabad, with every detail marked as checked or not.
      </p>

      <nav className="roles" aria-label="Choose how you use Haath">
        <Link href="/worker" className="role role-worker">
          <span className="role-title">I&rsquo;m looking for work</span>
          <span className="role-sub">Make your Passport and answer requests</span>
        </Link>
        <Link href="/hire" className="role role-hire">
          <span className="role-title">I want to hire someone</span>
          <span className="role-sub">See Passports and request contact</span>
        </Link>
      </nav>

      <p className="welcome-foot">
        <Link href="/trust" className="text-link">
          How verification works
        </Link>
      </p>
    </main>
  );
}
