import Link from "next/link";
import { FC } from "react";

interface NavbarProps {
  // Record of string keys and string values where each value is a path starting with a slash
  pages: Record<string, `/${string}`>;
}

const Navbar: FC<NavbarProps> = ({ pages }) => {
  return (
    <nav className="flex items-center justify-center p-4">
      <ul className="flex gap-2">
        {Object.entries(pages).map(([name, path]) => (
          <li key={name}>
            <Link href={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
