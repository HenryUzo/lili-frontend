import { ArrowDownRight } from "lucide-react";

export function DecorativeAnnotation({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none hidden items-center gap-2 text-[#204E1C] lg:flex ${className}`}>
      <p className="font-queen text-4xl leading-none">{children}</p>
      <ArrowDownRight className="h-10 w-10 rotate-12" aria-hidden="true" />
    </div>
  );
}
