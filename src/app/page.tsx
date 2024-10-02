import { PropertyFilter } from "@/components/filter-section/PropertyFilter";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative mt-10  grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16  font-[family-name:var(--font-geist-sans)]">
      <PropertyFilter />
    </div>
  );
}
