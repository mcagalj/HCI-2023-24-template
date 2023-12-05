"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Badge, BadgeProps } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TypeCategory } from "../../types/TypeCategory";

interface CategoryFilterProps {
  categories: TypeCategory[];
}

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const searchParams = useSearchParams();
  const categoryFilter: string = searchParams.get("_category") || "";
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParam = useCallback(
    (name: string, value: string) => {
      const currentParams = searchParams.toString();
      const params = new URLSearchParams(currentParams);

      params.set(name, value);
      // If search params are still the same there's no need to do anything
      if (currentParams === params.toString()) return;

      router.replace(pathname + "?" + params.toString(), { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const deleteSearchParam = useCallback(
    (name: string) => {
      const currentParams = searchParams.toString();
      const params = new URLSearchParams(currentParams);

      params.delete(name);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return (
    <ul className="flex flex-wrap gap-4">
      {categories.map((category) => {
        return (
          <li key={category?.label}>
            <Badge
              variant={category?.label as BadgeProps["variant"]}
              className={cn(
                "cursor-pointer",
                categoryFilter !== "" &&
                  categoryFilter !== category?.label &&
                  "opacity-30"
              )}
              onClick={() =>
                setSearchParam("_category", category?.label as string)
              }
            >
              {category?.label}
            </Badge>
          </li>
        );
      })}
      {categoryFilter !== "" && (
        <li>
          <Badge
            variant={"outline"}
            className="cursor-pointer"
            onClick={() => deleteSearchParam("_category")}
          >
            Reset filter <XMarkIcon className="w-4 h-4 stroke-[2]" />
          </Badge>
        </li>
      )}
    </ul>
  );
};

export default CategoryFilter;
