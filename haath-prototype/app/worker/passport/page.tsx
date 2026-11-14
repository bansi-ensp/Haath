import { Passport } from "@/components/Passport";
import { TopBar } from "@/components/TopBar";
import { getWorker } from "@/lib/data";

export default function MyPassportPage() {
  const me = getWorker("lakshmi")!;
  return (
    <>
      <TopBar back="/worker" title="My Passport" />
      <main className="screen">
        <p className="preview-note">This is what employers see. Your number is never shown until you accept.</p>
        <Passport worker={me} />
      </main>
    </>
  );
}
