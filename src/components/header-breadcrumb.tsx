// app/components/header-breadcrumb.tsx
"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useSearchParams } from "next/navigation";

export default function HeaderBreadcrumb() {
  const pathname = usePathname();          // "/products/new"
  const searchParams = useSearchParams();
  const segments = pathname.split("/").filter(Boolean); // ["products","new"]

  // Map each segment to a label. This can live in a helper file.
  const label: Record<string, string> = {
    products: "Products",
    new: searchParams.get("id") ? "Edit Product" : "Add Product",
    orders: "Orders",
    // …etc.
  };

  const crumbs = segments.map((seg, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    return { label: label[seg] ?? seg, href };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((c, i) => (
          <BreadcrumbItem key={c.href}>
            {i === crumbs.length - 1 ? (
              <BreadcrumbPage>{c.label}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink asChild>
                  <Link href={c.href}>{c.label}</Link>
                </BreadcrumbLink>
              </>
            )}
            <BreadcrumbSeparator />
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
