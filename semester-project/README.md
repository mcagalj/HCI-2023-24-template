# Vježba 4: Implementacija dizajna - Navbar i CTA

## Uvod

U ovoj vježbi ćemo implementirati Hi-Fi dizajn koji smo napravili za demo stranicu. Fokusirat ćemo se na implementaciju navigacije i CTA (call to action) segmenta (modula).

Implementacija se sastoji od pisanja HTML koda sa TailwindCSS klasama i dodavanja malo JavaScripta za interakciju. Nema puno stvari za pojasniti, zato će fokus biti na strukturiranju projekta i organizaciji koda te primjerima kako će izgledati neke stvari u praksi.

Dobar dio vježbe zapravo će biti copy-paste koda kojeg smo pripremili jer je to najbrži način da se dođe do rezultata. Objasnit ćemo što se događa u kodu i kako se stvari povezuju te sve zahtjevnije stvari ćemo implementirati ručno za demonstraciju.

## Korak 1: Root layout komponenta

Zadnji put smo već malo sredili navigaciju, ali sad je cilj doći do navigacije koja odgovara dizajnu. U ovom koraku ćemo dodati još neke stvari koje su nam potrebne za dizajn.

Layout komponentu ćemo malo rasteretiti tako što ćemo izdvojiti navigaciju u zasebnu komponentu. Ovo je dobra praksa jer se navigacija koristi na svim stranicama i ne treba se ponavljati kod. Također, ako se nešto promijeni u navigaciji, promjena će se odraziti na svim stranicama.

Kreirajte novu komponentu `components/Navbar.tsx`. Neka bude prazna komponenta koja vraća samo div. Ovo je dobar početak jer ćemo u nju dodavati stvari kako budemo išli.

Stvorimo još i Footer komponentu koja će također biti prazna komponenta koja vraća samo div.

Sad kad imamo dvije komponente, možemo ih koristiti u layout komponenti:

```tsx
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
const pages = {
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

> ℹ️ Dobra točka za commit!  
> `git add .`  
> `git commit -m "Vjezba 4: Update root layout, prepare empty components"`

## Korak 2: Basic navigacija

Sad kad je navigacija izdvojena u zasebnu komponentu, možemo se fokusirati na nju. U ovom koraku ćemo ponovno dodati navigaciju.

### 2.1. Pages prop u Navbar komponenti

Možda možemo imati više navigacija u našoj aplikaciji, što znači da se stranice na koje trebamo navigirati mogu razlikovati. Zato ćemo dodati prop `pages` u Navbar komponentu koji će sadržavati objekt sa stranicama i njihovim URL-ovima.

```tsx
import { FC } from "react";

interface NavbarProps {
  // Record of string keys and string values where each value is a path starting with a slash
  pages: Record<string, `/${string}`>;
}

const Navbar: FC<NavbarProps> = ({ pages }) => {
  return <div>Navbar here soon</div>;
};

export default Navbar;
```

### 2.2. Proslijedimo prop u Navbar komponentu

Budući da koristimo pages varijablu koja je inferiranog tipa `Record<string, string>`, moramo je proslijediti u Navbar komponentu. Ovo nam daje **TypeError**. Razlog je što string i `/${string}` nisu kompatibilni. Da bi bili kompatibilni, moramo koristiti `` Record<string, `/${string}`> `` type za `pages` ili dodati `as const`. Ovo je zato što je pages promjenjiv pa je inferirani tip `Record<string, string>`. Ako nije promjenjiv, inferirani tip će biti `Record<string, `/${string}`>`.

```tsx
// ... skip ....

const pages: Record<string, `/${string}`> = {
  home: "/",
  showcase: "/showcase",
  blog: "/blog",
  about: "/about",
  contact: "/contact",
}; // ili dodajte "as const" ovdje

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
```

### 2.3. Dodajmo navigaciju

Vratimo naš stari kod za navigaciju:

```tsx
const Navbar: FC<NavbarProps> = ({ pages }) => {
  return (
    <nav className="flex items-center justify-center p-4">
      <ul className="flex gap-8">
        {Object.entries(pages).map(([name, path]) => (
          <li key={name}>
            <Link href={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

> ℹ️ Dobra točka za commit!  
> `git add .`  
> `git commit -m "Vjezba 4: Extract navigation"`

## Korak 3: Add some style

Sad kad imamo navigaciju, možemo joj dodati malo stila. U ovom koraku ćemo dodati malo boje i fonta. Također, želimo označiti trenutno aktivnu stranicu.

```tsx
const baseClass =
  "uppercase whitespace-nowrap font-roboto-condensed text-base px-5 py-3 rounded-sm text-brand-purple-900 hover:bg-brand-purple-200";

const Navbar: FC<NavbarProps> = ({ pages }) => {
  const pathName = usePathname();

  return (
    <nav className="flex items-center justify-center p-4">
      <ul className="flex gap-2">
        {Object.entries(pages).map(([name, path]) => (
          <li key={name}>
            <Link href={path}>
              <span
                className={clsx(baseClass, {
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
  );
};
```

Nema baš neke razlike 🤔. Ako pogledamo u Tailwind kod vidimo `text-brand-purple`. To nije tailwind boja!  
Profesor je dodao custom boju za svoj brand. Da bismo je koristili, moramo je dodati u `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        "roboto-condensed": ["var(--font-roboto-condensed)"],
        inter: ["var(--font-inter)"],
        playfair: ["var(--font-playfair)"],
      },
      colors: {
        "brand-purple": {
          50: "#F2F4FE",
          100: "#D8DBFD",
          200: "#C5CAFC",
          300: "#ABB2FA",
          400: "#9AA3F9",
          500: "#818CF8",
          600: "#757FE2",
          700: "#5C63B0",
          800: "#474D88",
          900: "#363B68",
        },
        "brand-orange": {
          50: "#FFF5E6",
          600: "#E88C00",
          800: "#8C5500",
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

Sad kad dodamo svoju boju navigacija bi trebala izgledati kako treba 🎉.

> ℹ️ Dobra točka za commit!  
> `git add .`  
> `git commit -m "Vjezba 4: Style navigation"`

## Korak 4: Add Logo to navigation

Stvorimo prvo direktorij za React SVG icon komponente u `components/icons` i dodajmo logo u njega:

```tsx
import { FC, SVGProps } from "react";

const LogoIcon: FC<SVGProps<SVGSVGElement>> = ({
  width = 42,
  height = 42,
  ...rest
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 226 226"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M132.198 221.586H92.4717V183.625H132.198V221.586ZM105.714 212.758H118.956V196.867H105.714V212.758Z"
        fill="#8B8992"
      />
      <path
        d="M112.997 196.867H118.956V212.758H112.997V221.586H132.198V183.625H112.997V196.867Z"
        fill="#57555C"
      />
      <path
        d="M212.093 165.969H13.9014V60.0312H212.093V165.969Z"
        fill="#6366F1"
      />
      <path
        d="M212.091 60.0312H112.996V165.969H212.091V60.0312Z"
        fill="#818CF8"
      />
      <path d="M145.439 212.758H79.228V226H145.439V212.758Z" fill="#4F46E5" />
      <path
        d="M105.714 165.969H65.9873V75.4805H105.714V165.969Z"
        fill="#B87FD9"
      />
      <path
        d="M105.714 165.969H85.8506V75.4805H105.714V165.969Z"
        fill="#8034AD"
      />
      <path
        d="M127.869 57.8242H43.3909L26.2153 0H51.4827C60.5047 0 71.0053 3.22845 79.2295 9.04971V0H145.045L127.869 57.8242Z"
        fill="#8B8992"
      />
      <path d="M145.044 0H85.6299V57.8242H127.869L145.044 0Z" fill="#57555C" />
      <path
        d="M109.687 88.7227H62.0146C51.062 88.7227 42.1514 79.812 42.1514 68.8594V44.582H129.55V68.8594C129.55 79.812 120.639 88.7227 109.687 88.7227Z"
        fill="#E3CEF0"
      />
      <path
        d="M85.8506 44.582V88.7227H109.687C120.639 88.7227 129.55 79.812 129.55 68.8594V44.582H85.8506Z"
        fill="#D5B4E8"
      />
      <path
        d="M188.792 52.2387C184.761 52.2387 180.784 51.182 177.2 49.1126C171.82 46.006 167.971 40.9903 166.363 34.989C164.755 28.988 165.58 22.7201 168.687 17.3398C171.793 11.9595 176.809 8.11085 182.81 6.50281L205.277 0.48291L211.297 22.9496C212.905 28.9505 212.08 35.2185 208.973 40.5988C205.866 45.9791 200.851 49.8282 194.85 51.4358C192.846 51.973 190.812 52.2387 188.792 52.2387Z"
        fill="#E0E0E2"
      />
      <path
        d="M211.296 22.9496L205.276 0.48291H205.276L177.2 49.1122C180.784 51.1815 184.761 52.2387 188.791 52.2382C190.812 52.2382 192.846 51.9725 194.849 51.4358C200.85 49.8277 205.866 45.9791 208.973 40.5988C212.079 35.2185 212.904 28.9505 211.296 22.9496Z"
        fill="#ACABB1"
      />
      <path
        d="M123.998 180.988L89.5938 161.124L144.77 65.5572L179.174 85.4205L123.998 180.988Z"
        fill="#FFE477"
      />
      <path
        d="M106.795 171.055L123.996 180.986L179.171 85.4236L161.97 75.4922L106.795 171.055Z"
        fill="#FFA733"
      />
      <path
        d="M177.649 99.8315L133.051 74.083L171.484 30.5215L196.158 44.767L177.649 99.8315Z"
        fill="#FF9A00"
      />
      <path
        d="M196.158 44.767L183.821 37.6445L155.35 86.9571L177.649 99.8316L196.158 44.767Z"
        fill="#E67500"
      />
      <path
        d="M212.093 196.867H13.9014V152.727H212.093V196.867Z"
        fill="#4F46E5"
      />
      <path
        d="M212.091 152.727H112.996V196.867H212.091V152.727Z"
        fill="#312E81"
      />
      <path d="M145.439 212.758H112.333V226H145.439V212.758Z" fill="#312E81" />
    </svg>
  );
};

export default LogoIcon;
```

Zatim koristimo tu ikonu za stvoriti `Logo` komponentu:

```tsx
import { FC } from "react";

import LogoIcon from "./icons/LogoIcon";

const Logo: FC = () => (
  <div className="flex items-center justify-between max-w-min gap-2">
    <LogoIcon />
    <span className="font-roboto-condensed font-bold text-3xl whitespace-nowrap">
      design matters.
    </span>
  </div>
);

export default Logo;
```

I na kraju dodajemo Logo komponentu u Navbar komponentu:

```tsx
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
                  className={clsx(baseClass, {
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
```

> ℹ️ Dobra točka za commit!  
> `git add .`  
> `git commit -m "Vjezba 4: Add logo to navigation"`

## Korak 5: Bugfix - Active tab is dark

Prije nego krenemo dalje, pogledajmo active tab. Iako u tailwindu stavljamo boju na `-100` to nije boja koja je aktivna. Razlog je način na koji TW spaja uvjetne klase sa defaultnima. Koristimo `Tailwind merge` util, ali da bi uporaba bila lakša stvaramo lib sa utilima.

Prvo instalirajmo `tailwind-merge`:

```bash
npm i tailwind-merge
```

Sad stvorimo `lib/utils.ts`:

```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}
```

Sad možemo koristiti `cn` umjesto `clsx`:

```tsx
// components/Navbar.tsx
// .... skip ....
<span
  className={cn(baseClass, {
    "bg-brand-purple-700 text-brand-purple-100 pointer-events-none":
      path === pathName,
  })}
>
  {name}
</span>
// .... skip ....
```

> ℹ️ Dobra točka za commit!  
> `git add .`  
> `git commit -m "Vjezba 4: Bugfix - Active tab is dark"`

## Korak 6: Add Hero section

Hero section je jedan cjelovit modul koji se sastoji od nekoliko dijelova. Takve veće komponente možemo odvojiti od običnih komponenti.
Unutar `/app` direktorija stvorimo `_components` direktorij i unutar njega `HeroSection.tsx` file.
Zašto underscore \_? Objašnjenje je [ovdje](https://nextjs.org/docs/app/building-your-application/routing/colocation#private-folders).

```tsx
import Image, { StaticImageData } from "next/image";

import heroImage1 from "@/public/hero/pierre-chatel-innocenti-pxoZSTdAzeU-unsplash.jpg";
import heroImage2 from "@/public/hero/alex-padurariu-ZR48YvUpk04-unsplash.jpg";
import heroImage4 from "@/public/hero/yoann-siloine-dyaxQ-aoGWY-unsplash.jpg";
import heroImage3 from "@/public/hero/matt-le-SJSpo9hQf7s-unsplash.jpg";

type HeroImageObject = {
  image: StaticImageData;
  borderRadius: string;
};

const images: HeroImageObject[] = [
  { image: heroImage1, borderRadius: "20% 0 0 0" },
  { image: heroImage2, borderRadius: "0 20% 0 0" },
  { image: heroImage3, borderRadius: "0 0 0 20%" },
  { image: heroImage4, borderRadius: "0 0 20% 0" },
];

const HeroSection = () => (
  <section className="container flex justify-between items-center gap-10 w-screen">
    <div className="flex flex-col justify-start gap-5 max-w-xl">
      <h1 className="font-playfair text-6xl font-extrabold text-brand-purple-900 whitespace-break-spaces">
        Where Vision Meets Innovation
      </h1>
      <p className="font-roboto text-lg whitespace-break-spaces">
        Welcome to{" "}
        <span className="font-roboto-condensed font-bold text-xl text-brand-purple-900 whitespace-nowrap">
          design matters.
        </span>
        , where creativity knows no bounds and innovation is our guiding principle.
        At our design studio, we believe in the power of visionary thinking to transform
        ordinary concepts into extraordinary experiences.
      </p>
    </div>
    <div className="flex-shrink-0">
      <div className="grid grid-cols-2 grid-rows-2 gap-2 grow">
        {images.map((imageObj, index) => (
          <div key={index} className="relative h-52 w-52">
            <Image
              src={imageObj.image}
              alt={`Hero image ${index + 1}`}
              fill
              style={{
                objectFit: "cover",
                borderRadius: `${imageObj.borderRadius}`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroSection;
```

Zamijenimo naš Home page tako da prikaže HeroSection komponentu:

```tsx
import HeroSection from "./_components/HeroSection";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center">
      <HeroSection />
    </main>
  );
}
```

> ℹ️ Dobra točka za commit!  
> `git add .`  
> `git commit -m "Vjezba 4: Add Hero section"`

## To be continued...

## Next Image: How to use it

Next Image je komponenta koja nam omogućuje da optimiziramo slike za web.
Ona automatski optimizira slike i koristi lazy loading. Također, možemo koristiti `layout` prop da bi optimizirali slike za različite slučajeve uporabe.

Image komponenta može optimizirati slike koje su dane statički u stranici. Ako se slike mjenanju dinamički onda su optimizacije ograničene.

Image komponenta se korist slično kao i prava HTML slika. Koristi se `src` i `alt` atribute. `src` prop može biti string ili `StaticImageData` objekt. `alt` prop je obavezan.
