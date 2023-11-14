# Vježba 5: State and responsivness

## Uvod

U dosadašnjim vježbama upoznali smo bitan aspekt React-a, a to je **props**. Koristili smo ga za prosljeđivanje parametara React funkciji tj. komponenti.

```tsx
<Component thisIsAProp="Hi, I'm prop" objectProp={{ iAm: "prop" }} />
```

U ovoj vježbi upoznat ćemo drugi bitan aspekt React-a: **state**

State, props i JSX su srž Reacta. U današnjoj vježbi ćemo pisati manje koda nego inače jer ima dosta teorije za proći.

Za demonstraciju koristimo novi page koji je već dodan, ali nije povezan s navigacijom pa će nam prvi korak biti popraviti navigaciju.

## Tailwind i responsivnost

Ako pogledate strukturu u ovom branchu primjetit ćete da smo doveli stranicu do kraja. Ono što fali je **responzivnost**. To je jedan od najbitnijih aspekata modernog weba. U ovoj vježbi ćemo naučiti kako to napraviti.

Tailwind radi na **mobile-first** principu. To znači da je sve što napišemo za mobitel automatski i za desktop. Ako želimo nešto promijeniti za desktop moramo to eksplicitno napisati.

Official docs:
https://tailwindcss.com/docs/responsive-design

Custom breakpoints:
https://tailwindcss.com/docs/screens

<details>
<summary>
Responsive hero section
</summary>

```tsx
const HeroSection = () => (
  <section className="container flex justify-between items-center gap-10 w-screen mb-8">
    <div className="flex flex-col justify-start gap-5 max-w-xl m-auto lg:m-0">
      <h1 className="font-playfair text-5xl text-center lg:text-left xl:text-6xl font-extrabold text-brand-purple-900 whitespace-break-spaces">
        Where Vision <br />
        Meets Innovation
      </h1>
      <p className="font-roboto text-base text-center lg:text-left xl:text-lg whitespace-break-spaces">
        Welcome to{" "}
        <span className="font-roboto-condensed font-bold text-base xl:text-xl text-brand-purple-900 whitespace-nowrap">
          design matters.
        </span>
        , where creativity knows no bounds and innovation is our guiding principle.
        At our design studio, we believe in the power of visionary thinking to transform
        ordinary concepts into extraordinary experiences.
      </p>

      <div className="flex gap-5 mt-4 self-center lg:self-start">
        <Button
          orange
          className="text-base xl:text-lg xl:px-8"
          iconClassName="xl:w-4 xl:h-4"
        >
          Book a meeting
        </Button>
        <Button
          purple
          className="hidden sm:flex text-base xl:text-lg xl:px-8"
          iconClassName="xl:w-4 xl:h-4"
        >
          Learn more
        </Button>
      </div>
    </div>
    <div className="hidden lg:block flex-shrink-0">
      <HeroImageGrid images={images} />
    </div>
  </section>
);

export default HeroSection;
```

</details>

## Korak 1: Otvorimo "state" stranicu i pripremimo navigaciju

U novoj `components/Navbar.tsx` komponenti dodajmo novi link na `state` page:

```tsx
const pages: Page[] = [
  { href: "/", title: "Home" },
  { href: "/showcase", title: "Showcase" },
  { href: "/blog", title: "Blog" },
  { href: "/about", title: "About Us" },
  { href: "/contact", title: "Contact Us" },
  { href: "/signin", title: "Sign In" },
  { href: "/state", title: "State" }, // <- New page
];
```

## Korak 2: Omogućmo slike na stranici

Kad otoprimo novi page, vidimo da jako cool dizajn (hehe) ali da nema slika. Zakomentirane su u kodu u `app/state/page.tsx`.
Otkomentirajmo slike i dodajmo imgSrc prop u `app/state/page.tsx`:

```tsx
interface StudentProps {
  id: number;
  name: string;
  lastName: string;
  imgSrc: string;
}

const studentsConstArray = [
  {
    id: 1,
    name: "Mate",
    lastName: "Matic",
    imgSrc: "https://unsplash.com/photos/MTZTGvDsHFY/download?force=true&w=500", // Uncomment me
  },
  {
    id: 2,
    name: "Ana",
    lastName: "Jurić",
    imgSrc: "https://unsplash.com/photos/rDEOVtE7vOs/download?force=true&w=500", // Uncomment me
  },
];

// add imgSrc
const Student: FC<StudentProps> = ({ name, lastName, imgSrc }) => {
  return (
    <li className="flex flex-row relative items-center bg-blue-200 mt-2 p-2 rounded-full">
      <section className="mr-5 w-24 mt-5 mb-5 flex-row justify-between flex items-center">
        <p className="text-lg text-brand-purple-800">{name}</p>
        <p className="text-lg text-brand-purple-800">{lastName}</p>
      </section>
      <div className="w-[65px] h-[65px] relative">
        <Image
          src={imgSrc}
          alt="profile image"
          fill={true}
          objectFit="cover"
          className="rounded-full"
        />
      </div>
    </li>
  );
};
```

Error? Nešto ovako možda:

<p text-align="center">
<img src="https://user-images.githubusercontent.com/61914365/177063198-172f9c8b-f4be-40c6-8b16-79e3bcdef6e9.png">
</p>

Razlog je taj što Next Image traži da se doda lista izvora slika. To se radi u `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "picsum.photos",
      "via.placeholder.com",
      "unsplash.com",
    ],
  },
};

module.exports = nextConfig;
```

Ovo morate napraviti za sve public slike tj. njihove domene. Mi smo ovdje dodali više domena da imate za popis servisa koje možete koristiti za free slike (npr. [picsum.photos](https://picsum.photos/), [placeholder.com](https://placeholder.com/), [unsplash.com](https://unsplash.com/)).

Ako error ne odlazi potrebno je ponovno pokrenuti dev server (`npm run dev`).

> ℹ️ Dobra točka za napraviti commit  
> `git add . && git commit -m "Load images"`

## Korak 3: State [WIP]

> ⚠️ Sljedećih par koraka riješit ćemo u par faza tako da će kod raditi ispravno tek nakon nekoliko koraka. Ti neispravni koraci su označeni s [WIP]: **Work in progress**

Ok, dosta o slikama. Prelazimo na React state što je jedan od najbitnijih koncepta u Reactu i tema danasnje vježbe.

Za lagani uvod pokušajmo sakriti ili prikazati listu studenata klikom na Toggle button.

Radimo to u 3 koraka:

1. Definiramo varijablu koja govori je li lista skrivena ili ne
2. Definiramo `onClick` funkciju koja mijenja tu varijablu
3. Ovisno o varijabli vraćamo niz studenata ili prazan tag (možda neku poruku)

Here we go:

> ⚠️ Pripazita na 'use client' upozorenje

```tsx
const StateDemo: FC = () => {
  let shouldHideStudents = false;

  const handleToggleClick = () => {
    shouldHideStudents = !shouldHideStudents;
    console.log({
      shouldHideStudents,
    });
  };

  if (shouldHideStudents) {
    return <p>Sorry! Studenti spavajau 😴</p>;
  }

  return (
    <main className="py-8">
      <h1 className="text-center mt-5 mb-5 font-bold text-4xl underline">
        Welcome to state demo!
      </h1>
      <ul className="flex flex-col items-center justify-around">
        {studentsConstArray.map((el) => (
          <Student key={el.id} {...el} />
        ))}
      </ul>
      <section className="flex flex-col w-64 justify-center items-center my-0 mx-auto border-gray-500">
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Name"
        />
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Last name"
        />
        <button className="my-5 cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Submit
        </button>
      </section>
      <button
        onClick={handleToggleClick}
        className="block mx-auto cursor-pointer bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      >
        Toggle
      </button>
    </main>
  );
};
```

Ako kliknemo na `Toggle` primijetit ćemo da se ne događa ništa 🤨
Dodali smo console.log da vidimo što se događa i vidimo da se varijabla mijenja, ali se ne mijenja UI.

Što se događa?

> ℹ️ Dobra točka za napraviti commit  
> `git add . && git commit -m "[WIP] Impelment toggle"`

## Korak 4: Fixed state

Prije nego što damo rješenje, odgovorimo na pitanje:

### Što je React State?

"Što je React State" pitanje je koje je odgovoreno mnogo puta. Odgovorit ćemo na to vječno pitanje još jedan put i sad, ali dajemo i linkove na druga objašnjenja (primjere).

Naše detaljno objašnjenje [Ovdje](https://github.com/kula124/HCi_2020_Fresh/tree/project-4--state-and-multipage#react-concept)

Službeni docs: [React Docs](https://reactjs.org/docs/faq-state.html)

Prvo odgovorimo na pitanje zašto kod koji smo napisali ne radi. Primijetimo da je kod koji stvara HTML zapravo funkcija. U trenutku kad se pozvala ̨̨`toggle` vrijedost je `false`. Nakon toga mi mijenjamo tu vrijednost, ali ta funkcija se više ne poziva. Budući da se ne poziva, HTML koji je ona stvorila se ne mijenja. Kada bi se ta funkcija pozvala ponovno HTML bi se promijenio.

Znači treba samo pozvati funkciju ponovno!  
Zapravo, možemo i bolje od toga. Zamislimo samo da svaki put moramo ručno pozivati funkciju kad želimo promijeniti HTML. React nam zato daje jedan poseban dio svog API-a: **React state**. To je posebna varijabla koja kad se promijeni automatski ponovno poziva funkciju. Upravo takva varijabla ili više njih unutar komponente je **React component state**

### The Fix

Naoružani novim znanjem popravimo naš kod. React `useState` API je dan [ovdje](https://reactjs.org/docs/hooks-state.html#declaring-a-state-variable), ali ukratko:

1. Koristimo `useState` funkciju iz React paketa
2. Funkcija vraća niz od dva elementa gdje je prvi element _state varijabla_, a druga je _state setter_ tj. funkcija koja mijenja state.

Umjesto da koristimo `let shouldHideStudents` koristimo spomenuti state i umjesto da direktno mijenjamo taj state koristimo `setState(newValue)`. To je sve. Probajmo:

```tsx
const StateDemo: FC = () => {
  const [shouldHideStudents, setShouldHideStudents] = React.useState(false);

  const handleToggleClick = () => {
    setShouldHideStudents(!shouldHideStudents);
  };

  if (shouldHideStudents) {
    return <p>Sorry! Studenti spavajau 😴</p>;
  }

  return (
    <main className="py-8">
      <h1 className="text-center mt-5 mb-5 font-bold text-4xl underline">
        Welcome to state demo!
      </h1>
      <ul className="flex flex-col items-center justify-around">
        {studentsConstArray.map((el) => (
          <Student key={el.id} {...el} />
        ))}
      </ul>
      <section className="flex flex-col w-64 justify-center items-center my-0 mx-auto border-gray-500">
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Name"
        />
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Last name"
        />
        <button className="my-5 cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Submit
        </button>
      </section>
      <button
        onClick={handleToggleClick}
        className="block mx-auto cursor-pointer bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      >
        Toggle
      </button>
    </main>
  );
};
```

Toggle sad ispravno sakriva cijeli page ^ ^

Ovo je malo nezgrapno. Sakrimo rađe samo listu. To možemo napraviti koristeći ternarni operator u JSX-u:

```tsx
const StateDemo: FC = () => {
  const [shouldHideStudents, setShouldHideStudents] = React.useState(false);

  const handleToggleClick = () => {
    setShouldHideStudents(!shouldHideStudents);
  };

  return (
    <main className="py-8">
      <h1 className="text-center mt-5 mb-5 font-bold text-4xl underline">
        Welcome to state demo!
      </h1>
      {shouldHideStudents ? (
        <p className="text-center">Sorry! Studenti spavajau 😴</p>
      ) : (
        <ul className="flex flex-col items-center justify-around">
          {studentsConstArray.map((el) => (
            <Student key={el.id} {...el} />
          ))}
        </ul>
      )}
      <section className="flex flex-col w-64 justify-center items-center my-0 mx-auto border-gray-500">
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Name"
        />
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Last name"
        />
        <button className="my-5 cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Submit
        </button>
      </section>
      <button
        onClick={handleToggleClick}
        className="block mx-auto cursor-pointer bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      >
        Toggle
      </button>
    </main>
  );
};

export default StateDemo;
```

> ℹ️ Dobra točka za napraviti commit
> `git add . && git commit -m "Implement toggle"`

## Korak 5: Add new student [WIP]

Zadatak nam je dodati novog studenta. Kao korisnici upišemo ime i prezime novog studenta i klikom na submit pojavi se u listi. Vidimo da lista radi map nad `studentsConstArray`. To je fiksan niz studenata definiran van komponente. Možemo gledati na to kao na niz kojeg nam vraća neki server.

Za početak zanemarimo input i probajmo samo dodati nekog random sudenta u listu koristeći state čisto da vidimo da radi.

Radimo isto što i za toggle.

```tsx
const StateDemo: FC = () => {
  const [shouldHideStudents, setShouldHideStudents] = useState(false);
  const [students, setStudents] = useState(studentsConstArray);

  const handleToggleClick = () => {
    setShouldHideStudents(!shouldHideStudents);
  };

  const handleAddStudentClick = () => {
    const newStudent = {
      id: students.length + 1,
      name: "Ivo",
      lastName: "Ivic",
      // random image from unsplash
      imgSrc:
        "https://unsplash.com/photos/MTZTGvDsHFY/download?force=true&w=500",
    };

    students.push(newStudent);
    setStudents(students);
    console.log(students);
  };

  return (
    <main className="py-8">
      <h1 className="text-center mt-5 mb-5 font-bold text-4xl underline">
        Welcome to state demo!
      </h1>
      {shouldHideStudents ? (
        <p className="text-center">Sorry! Studenti spavajau 😴</p>
      ) : (
        <ul className="flex flex-col items-center justify-around">
          {students.map((el) => (
            <Student key={el.id} {...el} />
          ))}
        </ul>
      )}
      <section className="flex flex-col w-64 justify-center items-center my-0 mx-auto border-gray-500">
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Name"
        />
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Last name"
        />
        <button
          onClick={handleAddStudentClick}
          className="my-5 cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Submit
        </button>
      </section>
      <button
        onClick={handleToggleClick}
        className="block mx-auto cursor-pointer bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      >
        Toggle
      </button>
    </main>
  );
};
```

> ⚠️ Pripazita da ste zamjenili `studentsConstArray.map()` sa `students.map()`

Ako kliknemo na `submit` vidimo da se ne događa ništa 🤔  
Ali ako kliknemo na `Toggle` pojavili su se novi studenti??  
Zašto?

Saznat ćemo u nastavku 🚀

> ℹ️ Dobra točka za napraviti commit
> `git add . && git commit -m "[WIP] Implement add student"`

## Korak 6: Fixed adding new student

### SetState state comparison

JavaScript je dynamic language što znači da su tipovi dinamički dodijeljeni. Jedini način da to radi kako treba je da su sve varijable (osim nekih) reference tj. pointeri na vrijednost. To znači da svaki put kad napišemo

```js
const arr = [];
```

mi stvaramo novi niz čiji je pointer `arr` tj. `arr` ne sadrži vrijednost niza nego pointer na niz. Prisjetimo se kako radi C :)

```js
const arr1 = [];
const arr2 = arr1;
const arr3 = [];

console.log(arr1 === arr2);
// true
arr1.push(3);
console.log(arr1 === arr2);
// true

console.log(arr1 === arr3 || arr2 === arr3);
// false
console.log([] === []);
// false
console.log({} === {});
// false
```

Zašto su zadnja dva `false`? Jer JS stvara nove objekte i onda uspoređuje njihovu adresu (pointer), ne sadržaj.

!!\***\*Ovo je jako bitno kod React-a\*\***!!

`setState` ima jednu bitnu optimizaciju: ako je novi state jednak starom neće se izvršiti. Pogledajmo što smo napisali:

```jsx
const handleSubmit = () => {
  const newStudent = {
    id: students.length + 1,
    name: "Ivo",
    lastName: "Ivic",
    imgSrc: "<imageUrlHere>",
  };

  students.push(newStudent);
  // Iako se dodaje novi student, adresa niza je ista
  setStudents(students);
  // Što znači da React preskače setState
  console.log(students);
};
```

Na pitanje zašto se pojave studenti ako napravimo toggle sad bismo već trebali znati odgovor.

<details>
<summary>Tko ne zna i zna da ne zna... ili samo želi biti siguran :) </summary>

> Broj studenata se povećao, ali budući da se nije izvršio `setState` nije se ni ponovno pozvala funkcija tako da smo opet na istom problemu kao i na početku. Podatci su točni samo treba pozvati funkciju. Kad kliknemo na Toggle to se dogodi i pojave se novi studenti.

</details>
<br>

### The Fix 2: Return of the state

Ne pozivajmo push! Nikad ne smijemo mutirati React state van poziva `setState` funkcije. Umjesto toga stvaramo novi niz, kopiramo stari niz unutar njega i dodamo novog studenta. Svo ovo je jedna linija koda:

```jsx
const handleSubmit = () => {
  const newStudent = {
    id: students.length + 1,
    name: "Ivo",
    lastName: "Ivic",
    imgSrc: "<link here>",
  };

  setStudents([...students, newStudent]);
  // Ili još bolje:
  // setStudents((prevStudents) => [...prevStudents, newStudent]);
};
```

<details>
<summary>Cijeli kod</summary>

```tsx
"use client";
import React, { FC, useState } from "react";
import Image from "next/image";

interface StudentProps {
  id: number;
  name: string;
  lastName: string;
  imgSrc: string;
}

const studentsConstArray = [
  {
    id: 1,
    name: "Mate",
    lastName: "Matic",
    imgSrc: "https://unsplash.com/photos/MTZTGvDsHFY/download?force=true&w=500",
  },
  {
    id: 2,
    name: "Ana",
    lastName: "Jurić",
    imgSrc: "https://unsplash.com/photos/rDEOVtE7vOs/download?force=true&w=500",
  },
];

const Student: FC<StudentProps> = ({ name, lastName, imgSrc }) => {
  return (
    <li className="flex flex-row relative items-center bg-blue-200 mt-2 p-2 rounded-full">
      <section className="mr-5 w-24 mt-5 mb-5 flex-row justify-between flex items-center">
        <p className="text-lg text-brand-purple-800">{name}</p>
        <p className="text-lg text-brand-purple-800">{lastName}</p>
      </section>
      <div className="w-[65px] h-[65px] relative">
        <Image
          src={imgSrc}
          alt="profile image"
          fill={true}
          objectFit="cover"
          className="rounded-full"
        />
      </div>
    </li>
  );
};

const StateDemo: FC = () => {
  const [shouldHideStudents, setShouldHideStudents] = useState(false);
  const [students, setStudents] = useState(studentsConstArray);

  const handleToggleClick = () => {
    setShouldHideStudents(!shouldHideStudents);
  };

  const handleAddStudentClick = () => {
    const newStudent = {
      id: students.length + 1,
      name: "Ivo",
      lastName: "Ivic",
      // random image from unsplash
      imgSrc:
        "https://unsplash.com/photos/MTZTGvDsHFY/download?force=true&w=500",
    };

    setStudents([...students, newStudent]);
    // setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  return (
    <main className="py-8">
      <h1 className="text-center mt-5 mb-5 font-bold text-4xl underline">
        Welcome to state demo!
      </h1>
      {shouldHideStudents ? (
        <p className="text-center">Sorry! Studenti spavajau 😴</p>
      ) : (
        <ul className="flex flex-col items-center justify-around">
          {students.map((el) => (
            <Student key={el.id} {...el} />
          ))}
        </ul>
      )}
      <section className="flex flex-col w-64 justify-center items-center my-0 mx-auto border-gray-500">
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Name"
        />
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Last name"
        />
        <button
          onClick={handleAddStudentClick}
          className="my-5 cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Submit
        </button>
      </section>
      <button
        onClick={handleToggleClick}
        className="block mx-auto cursor-pointer bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      >
        Toggle
      </button>
    </main>
  );
};

export default StateDemo;
```

</details>

> ℹ️ Dobra točka za napraviti commit
> `git add . && git commit -m "Implement add student"`

## Korak 7: Add new student from input

Pozabavimo se inputima. Za svaki input stvaramo poseban state. Input ima dva propa koja koristimo:

1. `value`: trenutna vrijednost
2. `onChange`: callback funkcija oblika `(event) => {}` koja se poziva kad se promijeni `value`. Novi value se nalazi u `event.target.value`.

Kako to znam?  
Ovo nije vezano za React. Ova dva propa su dio HTML `<input>` definicije. Ono što je novo je spajanje `value` propa na React state. Bacite oko na W3.

```tsx
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

// ---

        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
        />

// --

  const handleAddStudentClick = () => {
    const newStudent = {
      id: students.length + 1,
      name: firstName,
      lastName: lastName,
      imgSrc: `https://source.unsplash.com/300x300/?selfie&sig=${
        students.length + 1
      }`,
    };
    setStudents([...students, newStudent]);
  };
```

> ℹ️ Dobra točka za napraviti commit
> `git add . && git commit -m "Implement add student from input"`

## Korak 8: Add new student from input with object state

Pokazali smo state kao `boolean`, `string` i `array`. Budući da su `string` i `number` slični ostaje nam samo još object state. Pa pokažimo i to. Umjesto četiri state varijable koristimo jednu koja je object i sadrži 4 propertia (polja):

```tsx
type State = {
  firstName: string;
  lastName: string;
  students: StudentProps[];
  shouldHideStudents: boolean;
};

const StateDemo: FC = () => {
  const [state, setState] = useState<State>({
    firstName: "",
    lastName: "",
    students: studentsConstArray,
    shouldHideStudents: false,
  });

  const handleToggleClick = () => {
    setState((state) => ({
      ...state,
      shouldHideStudents: !state.shouldHideStudents,
    }));
  };

  const handleAddStudentClick = () => {
    const newStudent = {
      id: state.students.length + 1,
      name: state.firstName,
      lastName: state.lastName,
      imgSrc: `https://source.unsplash.com/500x500?couple-selfie&sig=${
        state.students.length + 1
      }`,
    };

    setState((state) => ({
      ...state,
      students: [...state.students, newStudent],
    }));
  };

  return (
    <main className="py-8">
      <h1 className="text-center mt-5 mb-5 font-bold text-4xl underline">
        Welcome to state demo!
      </h1>
      {state.shouldHideStudents ? (
        <p className="text-center">Sorry! Studenti spavajau 😴</p>
      ) : (
        <ul className="flex flex-col items-center justify-around">
          {state.students.map((el) => (
            <Student key={el.id} {...el} />
          ))}
        </ul>
      )}
      <section className="flex flex-col w-64 justify-center items-center my-0 mx-auto border-gray-500">
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Name"
          onChange={(e) =>
            setState((state) => ({ ...state, firstName: e.target.value }))
          }
        />
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Last name"
          onChange={(e) =>
            setState((state) => ({ ...state, lastName: e.target.value }))
          }
        />
        <button
          onClick={handleAddStudentClick}
          className="my-5 cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Submit
        </button>
      </section>
      <button
        onClick={handleToggleClick}
        className="block mx-auto cursor-pointer bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      >
        Toggle
      </button>
    </main>
  );
};

export default StateDemo;
```

> ℹ️ Dobra točka za napraviti commit
> `git add . && git commit -m "Refactor to use object state"`

### Korak 9: Filtering

Filtriranje se dosta često koristi u React-u i dio je našeg seminarskog zadatka. Ovdje imamo listu sa studentima i input. Znači sve što nam je potrebno za napraviti filter :)

Filter se sastoji od 4 dijela:

1. Data source
2. Filter funkcija
3. Filtered data
4. Clear filter

Data source su početni podatci. To je u ovom slučaju lista studenata. Kad se filter ugasi onda se vraćamo na početne podatke. To su ujedno i podatci koje filtriramo.

Filter funkcija je funkcija koja radi filtriranje. Najčešće ili prima niz ili se poziva nad nizom. Kod JS-a se poziva nad nizom isto kao i `.map()`. U JS-u vraća novi filtrirani niz, a prima _predikat_ (funkciju koja vraća _boolean_). Filtriranje se vrši na temelju filter inputa.

Nakon filtiranja spremamo novi niz u state. Taj novi state se koristi za rendering umjesto originalnih podataka.

Kada želimo ugasiti filter onda trebamo:

1. Staviti `Filtered Data` da bude jednak `Data sourceu`
2. Isprazniti filter input

U našoj implementaciji taj button se prikaže samo ako filter input nije prazan. Ako jest, onda ga baš i nema smisla prikazivati.

Dakle:

1. Dodajemo još jedan input za filter. Dodajemo i container za button
2. Dodajemo novi state za filter input i filtered data
3. Dodajemo Handler za filter input
4. Dodajemo Handle za clear button
5. Ako je lista prazna prikažemo poruku

```tsx
const [filterValue, setFilterValue] = useState("");
const [showShowClearButton, setShowClearButton] = useState(false);
const handleFilterChange: React.ChangeEventHandler<HTMLInputElement> = (
  event
) => {
  const { value } = event.target;
  setFilterValue(value);
  if (value !== "") {
    setShowClearButton(true);
  } else {
    setShowClearButton(false);
  }
};
const handleClearFilter = () => {
  setFilterValue("");
  setShowClearButton(false);
};

const students =
  filterValue == ""
    ? state.students
    : state.students.filter((student) => {
        return (
          student.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          student.lastName.toLowerCase().includes(filterValue.toLowerCase())
        );
      });
```

Naravno, dodamo i UI:

```tsx
// ---
<ul className="flex flex-col items-center justify-around">
  {students.map((el) => (
    <Student key={el.id} {...el} />
  ))}
</ul>

// ---
<input
  value={filterValue}
  onChange={handleFilterChange}
  className="mx-auto block my-4 appearance-none bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
  type="text"
  placeholder="Filter input"
/>
<button
  onClick={handleClearFilter}
  className={`mx-auto block rounded-md border-2 border-red-400 text-red-500 py-0.5 px-4 ${
    showShowClearButton ? "visible" : "invisible"
  }`}
>
  Clear
</button>
```

Voilà!

```tsx
const StateDemo: FC = () => {
  const [state, setState] = useState<State>({
    firstName: "",
    lastName: "",
    students: studentsConstArray,
    shouldHideStudents: false,
  });

  const handleToggleClick = () => {
    setState((state) => ({
      ...state,
      shouldHideStudents: !state.shouldHideStudents,
    }));
  };

  const handleAddStudentClick = () => {
    if (state.firstName === "" || state.lastName === "") return;

    const newStudent = {
      id: state.students.length + 1,
      name: state.firstName,
      lastName: state.lastName,
      imgSrc: `https://source.unsplash.com/500x500?couple-selfie&sig=${
        state.students.length + 1
      }`,
    };

    setState((state) => ({
      ...state,
      students: [...state.students, newStudent],
    }));
  };

  const [filterValue, setFilterValue] = useState("");
  const [showShowClearButton, setShowClearButton] = useState(false);
  const handleFilterChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value } = event.target;
    setFilterValue(value);
    if (value !== "") {
      setShowClearButton(true);
    } else {
      setShowClearButton(false);
    }
  };
  const handleClearFilter = () => {
    setFilterValue("");
    setShowClearButton(false);
  };

  const students =
    filterValue == ""
      ? state.students
      : state.students.filter((student) => {
          return (
            student.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            student.lastName.toLowerCase().includes(filterValue.toLowerCase())
          );
        });

  return (
    <main className="py-8">
      <h1 className="text-center mt-5 mb-5 font-bold text-4xl underline">
        Welcome to state demo!
      </h1>
      {state.shouldHideStudents ? (
        <p className="text-center">Sorry! Studenti spavajau 😴</p>
      ) : (
        <ul className="flex flex-col items-center justify-around">
          {students.map((el) => (
            <Student key={el.id} {...el} />
          ))}
        </ul>
      )}
      <section className="flex flex-col w-64 justify-center items-center my-0 mx-auto border-gray-500">
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Name"
          onChange={(e) =>
            setState((state) => ({ ...state, firstName: e.target.value }))
          }
        />
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Last name"
          onChange={(e) =>
            setState((state) => ({ ...state, lastName: e.target.value }))
          }
        />
        <button
          onClick={handleAddStudentClick}
          className="my-5 cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Submit
        </button>
      </section>
      <button
        onClick={handleToggleClick}
        className="block mx-auto cursor-pointer bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      >
        Toggle
      </button>
      <input
        value={filterValue}
        onChange={handleFilterChange}
        className="mx-auto block my-4 appearance-none bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
        type="text"
        placeholder="Filter input"
      />
      <button
        onClick={handleClearFilter}
        className={`mx-auto block rounded-md border-2 border-red-400 text-red-500 py-0.5 px-4 ${
          showShowClearButton ? "visible" : "invisible"
        }`}
      >
        Clear
      </button>
    </main>
  );
};

export default StateDemo;
```

> ℹ️ Dobra točka za napraviti commit
> `git add . && git commit -m "Implement filter"`
