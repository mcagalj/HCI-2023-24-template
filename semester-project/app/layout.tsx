import type { Metadata } from "next";
import { Roboto, Roboto_Condensed, Playfair_Display } from "next/font/google";
import clsx from "clsx";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-roboto",
});
const roboto_condensed = Roboto_Condensed({
  weight: ["300", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
});
const playfairDisplay = Playfair_Display({
  weight: ["400", "800"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    template: "Lab project | %s",
    default: "Lab project",
  },
  description: "Next.js lab project",
};

// Get this info from some external source (e.g. CMS)
const pages: Record<string, `/${string}`> = {
  home: "/",
  showcase: "/showcase",
  blog: "/blog",
  about: "/about",
  contact: "/contact",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          roboto.variable,
          roboto_condensed.variable,
          playfairDisplay.variable
        )}
      >
        <Navbar pages={pages} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
