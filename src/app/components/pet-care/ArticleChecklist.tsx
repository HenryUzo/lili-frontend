import { CheckCircle2 } from "lucide-react";

export function ArticleChecklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-7 text-[#53635A]">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#008F49]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
