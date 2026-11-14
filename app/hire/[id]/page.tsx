import Link from "next/link";
import { notFound } from "next/navigation";
import { Passport } from "@/components/Passport";
import { TopBar } from "@/components/TopBar";
import { getWorker, workers } from "@/lib/data";

export function generateStaticParams() {
  return workers.map((w) => ({ id: w.id }));
}

export default async function PassportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const worker = getWorker(id);
  if (!worker) notFound();

  return (
    <>
      <TopBar back="/hire" title="Worker Passport" />
      <main className="screen has-dock">
        <Passport worker={worker} />
      </main>
      <div className="dock">
        <Link href={`/hire/${worker.id}/request`} className="btn btn-primary btn-block">
          Request contact
        </Link>
      </div>
    </>
  );
}
