import { TopBar } from "@/components/TopBar";
import { HireSearch } from "./HireSearch";

export default function HirePage() {
  return (
    <>
      <TopBar back="/" title="Find someone" />
      <main className="screen">
        <HireSearch />
      </main>
    </>
  );
}
