import { TopBar } from "@/components/TopBar";
import { WorkerHome } from "./WorkerHome";

export default function WorkerPage() {
  return (
    <>
      <TopBar back="/" title="Haath" />
      <main className="screen">
        <WorkerHome />
      </main>
    </>
  );
}
