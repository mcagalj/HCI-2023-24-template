"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

interface NavbarProps {
  // Record of string keys and string values where each value is a path starting with a slash
  pages: Record<string, `/${string}`>;
}

const baseClass =
  "uppercase whitespace-nowrap font-roboto-condensed text-base px-5 py-3 rounded-sm text-brand-purple-900 hover:bg-brand-purple-200";

const Navbar: FC<NavbarProps> = ({ pages }) => {
  const pathName = usePathname();

  return (
    <section className="container flex items-center justify-between mx-auto">
      <Logo />
      <nav className="flex items-center justify-center p-4">
        <ul className="flex gap-2">
          {Object.entries(pages).map(([name, path]) => (
            <li key={name}>
              <Link href={path}>
                <span
                  className={cn(baseClass, {
                    "bg-brand-purple-700 text-brand-purple-100 pointer-events-none":
                      path === pathName,
                  })}
                >
                  {name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
