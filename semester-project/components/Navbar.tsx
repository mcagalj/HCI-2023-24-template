import Logo from "@/components/Logo";
import MainNav from "@/components/MainNav";

export type Page = {
  href: string;
  title: string;
};

// Get this info from some external source (e.g. CMS)
const pages: Page[] = [
  { href: "/", title: "Home" },
  { href: "/showcase", title: "Showcase" },
  { href: "/blog", title: "Blog" },
  { href: "/about", title: "About Us" },
  { href: "/contact", title: "Contact Us" },
  { href: "/signin", title: "Sign In" },
];

const NavBar = () => {
  return (
    <div className="container flex items-center justify-between">
      <Logo />
      <MainNav pages={pages} />
    </div>
  );
};

export default NavBar;
