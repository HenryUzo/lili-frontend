import { PawPrint } from "lucide-react";
import type { ReactNode } from "react";

export function NotebookInfoCard({
  title,
  children,
  tone = "green",
}: {
  title: string;
  children: ReactNode;
  tone?: "green" | "gold";
}) {
  return (
    <section
      className={`relative rotate-[-0.7deg] rounded-[28px] border-2 border-white p-6 ${
        tone === "gold" ? "bg-[#FFF8D7]" : "bg-[#F2F8EA]"
      }`}
    >
      <PawPrint className="absolute right-5 top-5 h-8 w-8 rotate-12 text-[#006838]/20" aria-hidden="true" />
      <p className="font-queen text-3xl leading-none text-[#ED1C24]">Care note</p>
      <h2 className="mt-2 text-3xl font-bold text-[#073D2A]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
