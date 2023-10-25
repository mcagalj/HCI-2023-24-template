# Vježba 3: Dynamic Routing and component props

U ovoj vježbi objasnit ćemo kako se koriste dinamičke rute i kako se podaci prenose iz jedne komponente u drugu koristeći **_props_**. Također ćemo proći korz pripremljeni kod za vježbu i objasniti njegovu strukturu.

Ako ste već prošli kroz vježbu 2, trebali biste imati strukturu sličnu ovoj, ali za svaki slučaj ovaj branch nam daje zajedničku početnu točku.

## Root Layout File

Root layout ima navigaciju koju smo napravili zadnji put i još jedan novi dio: metadata object. Ovaj objekt sadrži informacije o stranici koje se koriste za SEO i druge stvari. U ovom slučaju, koristimo `title` i `description` za SEO, ali možete dodati i druge stvari kao što su `og:image` za Facebook i Twitter.

```ts
export const metadata: Metadata = {
  title: "Next.js lab project",
  description: "Next.js lab project",
};
```

Druga zanimljiva stvar je _pages_ varijabla i `Object.entries` nad tom varijablom:

```tsx
const pages = {
  home: "/",
  showcase: "/showcase",
  blog: "/blog",
  about: "/about",
  contact: "/contact",
};

// ...

<ul className="flex gap-8">
  {Object.entries(pages).map(([name, path]) => (
    <li key={name}>
      <Link href={path}>{name}</Link>
    </li>
  ))}
</ul>;
```

`Object.entries` je jedna od mnogih temeljnih funkcija za rad sa Javascript jezikom. Među njima su i `Array.map`, `Array.filter`, `Array.reduce` i mnoge druge. Ove funkcije su vrlo korisne i trebali biste ih znati koristiti. U ovom slučaju, `Object.entries` vraća niz parova ključ/vrijednost iz objekta. Ovaj niz možemo mapirati (koristeći `.map()`) i tako dinamički prikazati navigaciju.

```js
const object1 = {
  a: "somestring",
  b: 42,
};

Object.entries(object1).map((keyValuePair) => {
  console.log(keyValuePair);
  //1. ["a", "somestring"]
  //2. ["b", 42]
  const [key, value] = keyValuePair;
  console.log(key);
  //1. "a"
  //2. "b"
  console.log(value);
  //1. "somestring"
  //2. 42
});
```

## Dynamic Routing

Sve rute koje vidimo sad su statičke. To znači da su sve rute definirane u `app` direktoriju i da se ne mogu mijenjati. U stvarnom svijetu, to nije uvijek slučaj. Ponekad želimo da se rute dinamički generiraju na temelju podataka koje dobivamo iz baze podataka ili nekog drugog izvora. U ovom slučaju, želimo da se podatci u ruti stvaraju na temelju odgovora sa API-a.

U NextJS 13 to radimo tako da stvaramo folder koji u nazivu ima `[]`. U ovom slučaju, to je `app/blog/[postId]/page.tsx`. Naziv `postId` je proizvoljan i može biti bilo što. Ono što je bitno je da se u tom folderu nalazi `page.tsx` datoteka. Ova datoteka će se koristiti za prikazivanje podataka za svaki `postId` koji dobijemo. Uz taj folder, moramo napraviti i `page.tsx` datoteku koja će se koristiti za prikazivanje svih postova i linkat će na svaki pojedinačni post.

Prevedeno u navigaciju ako idemo na
`/blog/` pogađamo `blog` root tj. `page.tsx` koji stoji pored foldera `[postId]`

Ako idemo na `/blog/1` pogađamo `[postId]` folder i `page.tsx` koji stoji u njemu.
Ali kako ta stranica zna koji smo `postId` poslali? To je ono što ćemo objasniti u nastavku.

## React Props

Props je kratica za properties i koristi se za prijenos podataka iz jedne komponente u drugu. Budući da su sve React komponente zapravo funkcije, **_props_** su parametri tih funkcija. To znači da su i `page.tsx` stranice isto funkcije. Next koristi tu činjenicu i **_props_** za prijenos podataka u `blog/[postId]/page.tsx` stranicu.

## Početak rada

Krenimo s radom!

### Korak 1: Stvaranje `blog/[postId]` stranice

U `/blog` folderu stvaramo novi podfolder `[postId]` i u njemu `page.tsx` datoteku. U `page.tsx` datoteku kopiramo sljedeći kod:

```tsx
interface Params {
  postId: string;
}

export interface BlogPostParams {
  params: Params;
}

export default function BlogPost({ params }: BlogPostParams) {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-3xl font-bold p-10">Post #{params.postId}</h1>
    </main>
  );
}
```

Ako idemo na `/blog/1` trebali bi vidjeti `Post #1` na ekranu.

> ℹ️ Dobra točka za napraviti commit!  
> `git add .`  
> `git commit -m "Vjezba 3: Create blog/[postId]/page.tsx"`

### Korak 2: Stvaranje `blog/page.tsx` stranice sa linkovima

U `/blog` modificiramo `page.tsx` datoteku tako da linka na svaki pojedinačni post. To bi nam trebalo biti poznato budući da smo to radili u vježbi 2 u `layout.tsx` datoteci. U `page.tsx` datoteku kopiramo sljedeći kod:

```tsx
import Link from "next/link";

export const metadata = {
  title: "Blog",
};

const posts = [12, 3, 56, 7, 89];

export default function Blog() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-3xl font-bold p-10">Blog Page</h1>
      <ul className="flex flex-col gap-8">
        {posts.map((postId) => (
          <li key={postId}>
            <Link href={`blog/${postId}`}>Post {postId}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

Primijetite da opet koristimo `.map()` 🙂

Ako idemo na `/blog` trebali bi vidjeti listu linkova na svaki pojedinačni post.

> ℹ️ Dobra točka za napraviti commit!  
> `git add .`  
> `git commit -m "Vjezba 3: Create blog/page.tsx"`

### Korak 3: Koristimo API za dohvaćanje podataka

Meet https://jsonplaceholder.typicode.com! Ovo je API koji vraća dummy podatke. U ovom slučaju, koristit ćemo `/posts` endpoint koji vraća listu objekata koji predstavljaju postove. Svaki post ima `id`, `title`, `body` i `userId` polja. Mi ćemo koristiti `id` i `title` polja za prikazivanje podataka.

Trrebamo napraviti dvije promjene u kodu:

1. u `blog/page.tsx` umjesto zakucanih postova dohvaćamo podatke sa API-a i onda njih linkamo
2. u `blog/[postId]/page.tsx` umjesto zakucanog posta dohvaćamo podatke sa API-a i onda ih prikazujemo. Koristimo `postId` za dohvat ispravnog posta

U `blog/page.tsx` datoteku kopiramo sljedeći kod:

```tsx
import Link from "next/link";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

const getPosts = async (): Promise<Post[]> => {
  const data = await fetch(`${BASE_API_URL}/posts`);
  return data.json();
};

export default async function Blog() {
  const posts = await getPosts();
  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-bold p-10">Blog Index Page</h1>
      <ul className="flex flex-col gap-8">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`blog/${post.id}`}>
              <span className="text-2xl text-purple-500">
                Post {post.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

U `blog/[postId]/page.tsx` datoteku kopiramo sljedeći kod:

```tsx
import { Post } from "../page";

interface Params {
  postId: string;
}

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

const getPost = async (id: string): Promise<Post> => {
  const data = await fetch(`${BASE_API_URL}/posts/${id}`);
  return data.json();
};

export default async function BlogPost({ params }: { params: Params }) {
  const post = await getPost(params.postId);

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-bold p-10 capitalize">
        <span className="text-neutral-400">Post {post.id}:</span> {post.title}
      </h1>
      <p className="text-xl p-10">{post.body}</p>
    </main>
  );
}
```

Ako idemo na `/blog` trebali bi vidjeti listu linkova na svaki pojedinačni post. Ako idemo na `/blog/1` trebali bi vidjeti podatke za post 1.

> ℹ️ Dobra točka za napraviti commit!
> `git add .` > `git commit -m "Vjezba 3: Use API to fetch data"`

### Korak 4: Paginacija

Dodat ćemo jednostavnu komponentu za paginaciju koja će nam omogućiti da se krećemo kroz postove.  
Na taj način nećemo imati svih 100 postova na jednoj stranici.  
Paginacija se sastoji od 3 dijela:

- ukupan broj postova
- trenutna stranica
- broj postova po stranici

Sa te tri informacije možemo stvoriti paginaciju koja će nam omogućiti da se krećemo kroz postove.

#### Ukupan broj postova

Prvo ćemo dohvatiti ukupan broj postova. Na sreću, API nam to omogućava.
Ako zatražimo `/posts` endpoint, dobit ćemo listu postova i `headers` objekt koji sadrži `x-total-count` polje koje nam govori koliko postova ima ukupno. Da ne radimo data transfer samo da bismo dobili header, koristimo HEAD http metodu koja vraća samo header.

#### Trenutna stranica i broj postova po stranici

Ova dva parametra su pod našom kontrolom i stavljamo ih u query string. Srećom, NextJS nam daje query string na serveru! Ne treba nam promjena query-ija ovisna o akciji korisnika pa nam to dosta pojednostavljuje stvari.

```tsx
import Link from "next/link";
import clsx from "clsx";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Pagination {
  limit: number;
  page: number;
}

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

const getPosts = async (
  pagination: Pagination = {
    limit: 9999,
    page: 1,
  }
): Promise<Post[]> => {
  const data = await fetch(
    `${BASE_API_URL}/posts?_limit=${pagination.limit}&_page=${pagination.page}`
  );
  return data.json();
};

const getTotalPosts = async (): Promise<number> => {
  const response = await fetch(`${BASE_API_URL}/posts?_limit=1`, {
    method: "HEAD",
  });
  // get x-total-count header
  return parseInt(response.headers.get("x-total-count") || "1", 10);
};

export default async function Blog({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { _limit, _page } = searchParams;
  const [pageSize, page] = [_limit, _page].map(Number);
  const totalPosts = await getTotalPosts();
  const totalPages = Math.ceil(totalPosts / pageSize);

  const posts = await getPosts({
    limit: pageSize,
    page: page,
  });

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-bold p-10">Blog Index Page</h1>

      {_limit && _page && (
        <div className="flex items-baseline gap-8 pb-10">
          <div>
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-4">
            <Link
              href={{
                pathname: "/blog",
                query: { _page: 1, _limit: pageSize },
              }}
              className="rounded border bg-gray-100 px-3 py-1 text-gray-800"
            >
              First
            </Link>
            <Link
              href={{
                pathname: "/blog",
                query: { _page: page > 1 ? page - 1 : 1, _limit: pageSize },
              }}
              className={clsx(
                "rounded border bg-gray-100 px-3 py-1 text-gray-800",
                page === 1 && "pointer-events-none opacity-50"
              )}
            >
              Previous
            </Link>
            <Link
              href={{
                pathname: "/blog",
                query: { _page: page + 1, _limit: pageSize },
              }}
              className={clsx(
                "rounded border bg-gray-100 px-3 py-1 text-gray-800",
                page === totalPages && "pointer-events-none opacity-50"
              )}
            >
              Next
            </Link>
            <Link
              href={{
                pathname: "/blog",
                query: { _page: totalPages, _limit: pageSize },
              }}
              className="rounded border bg-gray-100 px-3 py-1 text-gray-800"
            >
              Last
            </Link>
          </div>
        </div>
      )}

      <ul className="flex flex-col gap-8">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`blog/${post.id}`}>
              <span className="text-2xl text-purple-500">
                Post {post.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

Ako idemo na `/blog` trebali bi vidjeti listu linkova na svaki pojedinačni post. Ako idemo na `/blog?_page=1&_limit=10` trebali bi vidjeti listu linkova na svaki pojedinačni post i paginaciju.

> ℹ️ Dobra točka za posljednji commit!  
> `git add .`  
> `git commit -m "Vjezba 3: Add pagination"`
