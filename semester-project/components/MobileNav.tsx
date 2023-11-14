"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Page } from "@/components/NavBar";
import { HamburgerProps } from "@/components/Hamburger";

type MobileNavProps = HamburgerProps & {
  pages: Page[];
};

const MobileNav = ({ pages, open, clickHandler }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex lg:hidden items-center justify-center p-20 w-screen absolute top-0 right-0 z-20 bg-brand-purple-200 opacity-95",
        { hidden: !open }
      )}
      onClick={() => clickHandler(!open)}
    >
      <ul className="flex flex-col gap-8 items-center">
        {pages.map(({ href, title }) => (
          <li key={href}>
            <Link href={href}>
              <span
                className={cn(
                  "uppercase whitespace-nowrap font-roboto-condensed text-base px-5 py-3 rounded-sm text-brand-purple-900 hover:bg-brand-purple-300",
                  {
                    "bg-brand-purple-700 text-brand-purple-100 pointer-events-none":
                      pathname === href,
                  }
                )}
              >
                {title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNav;
