import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  to?: string;
};

export function ArticleBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[#53635A]">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            to="/"
            className="inline-flex items-center gap-1 rounded-full text-[#006838] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={`${item.label}-${item.to ?? "current"}`} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-[#8AA18F]" aria-hidden="true" />
            {item.to ? (
              <Link
                to={item.to}
                className="rounded-full text-[#006838] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-[#203D2A]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
