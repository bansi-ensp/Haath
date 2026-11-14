import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { getWorker, workers } from "@/lib/data";
import { RequestForm } from "./RequestForm";

export function generateStaticParams() {
  return workers.map((w) => ({ id: w.id }));
}

export default async function RequestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const worker = getWorker(id);
  if (!worker) notFound();

  return (
    <>
      <TopBar back={`/hire/${worker.id}`} title={`Request ${worker.name}`} />
      <main className="screen">
        <RequestForm name={worker.name} work={worker.work} />
      </main>
    </>
  );
}
