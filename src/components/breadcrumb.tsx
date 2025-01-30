"use client";
import { getPathArray } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export default function PathBreadcrumb() {
  const pathname = usePathname();
  const breadrumbs = getPathArray(pathname);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadrumbs.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/${breadrumbs
                  .slice(0, index + 1)
                  .join("/")
                  .toLocaleLowerCase()}`}
              >
                {item.toLocaleLowerCase() ===
                breadrumbs.slice(-1)[0].toLocaleLowerCase() ? (
                  <BreadcrumbPage>{item}</BreadcrumbPage>
                ) : (
                  item
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadrumbs.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
