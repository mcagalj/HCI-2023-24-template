"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  page: number;
  totalPages: number;
  pathname?: string;
}

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setPageParam = useCallback(
    (name: string, value: number) => {
      const currentPage = searchParams.get("_page");
      if (Number(currentPage) === value) return;

      const params = new URLSearchParams();
      params.set(name, value.toString());

      router.replace(pathname + "?" + params.toString(), { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return (
    <div className="flex items-baseline gap-8">
      <div>
        Page {page} of {totalPages}
      </div>
      <div className="flex gap-4">
        <Button
          className={cn(
            "bg-brand-purple-600 hover:bg-brand-purple-700",
            page === 1 && "pointer-events-none opacity-50"
          )}
          onClick={() => setPageParam("_page", 1)}
        >
          First
        </Button>
        <Button
          className={cn(
            "bg-brand-purple-600 hover:bg-brand-purple-700",
            page === 1 && "pointer-events-none opacity-50"
          )}
          onClick={() => setPageParam("_page", page > 1 ? page - 1 : 1)}
        >
          Previous
        </Button>
        <Button
          className={cn(
            "bg-brand-purple-600 hover:bg-brand-purple-700",
            page >= totalPages && "pointer-events-none opacity-50"
          )}
          onClick={() => setPageParam("_page", page + 1)}
        >
          Next
        </Button>
        <Button
          className={cn(
            "bg-brand-purple-600 hover:bg-brand-purple-700",
            page >= totalPages && "pointer-events-none opacity-50"
          )}
          onClick={() => setPageParam("_page", totalPages)}
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
