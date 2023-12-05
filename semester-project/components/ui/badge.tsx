import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
        outline: "text-slate-950 dark:text-slate-50",
        clothing:
          "border-transparent bg-slate-700 text-slate-50 hover:bg-slate-600/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
        cosmetics:
          "border-transparent bg-pink-600 text-white hover:bg-pink-500/80 dark:bg-pink-200 dark:text-pink-800 dark:hover:bg-pink-200/80",
        entertainment:
          "border-transparent bg-red-700 text-white hover:bg-red-500/80 dark:bg-red-200 dark:text-red-800 dark:hover:bg-red-200/80",
        food: "border-transparent bg-green-600 text-white hover:bg-green-500/80 dark:bg-green-200 dark:text-green-800 dark:hover:bg-green-200/80",
        technology:
          "border-transparent bg-blue-800 text-white hover:bg-blue-500/80 dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-200/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
