# Vježba 6: CMS - Content Management System featuring Contentful

## Uvod

Zamislite da imate novinsku agenciju u kojoj rade novinari. Svoj online portal napravili ste koristeći React i NextJS jer su to popularne tehnologije za web. Sada želite da novinari mogu sami dodati članke na portal. Osim ako novinari znaju React i NextJS, neće moći dodati članke. Kako riješiti ovaj problem?

Možete ih poslati kod nas na nastavu da nauče git, React i NextJS ili imati neko rješenje koje će im omogućiti da dodaju članke bez da znaju programirati (tada vjerojatno ni ne bi bili novinari). Treba moći i promijeniti tekst članka, dodati slike, izbrisati članke i, naravno, stvoriti novi članak. Zapravo ono što tražimo je nekakav sustav za upravljanje sadržajem (eng. Content Management System, CMS).

Isti problem biste imali i da ste vlasnik online trgovine gdje želite upravljati artiklima koje prodajete. Ako ste dekan fakulteta onda treba dodavati profesore, studente, predmete, materijale...

Očito, ovaj problem je dosta čest. Kad god je problem dosta čest, postoji gotovo i spremno rješenje. U ovom slučaju to je Contentful. Ali doći ćemo do toga.

### Korak 1:

Imamo novu stranicu na `/cms/projects` tako da moramo opet dodati novi unos u navigaciju:  
 `{ href: "/cms/products", title: "Products" }`:

```tsx
// components/Navbar.tsx

const pages: Page[] = [
  { href: "/", title: "Home" },
  { href: "/showcase", title: "Showcase" },
  { href: "/blog", title: "Blog" },
  { href: "/about", title: "About Us" },
  { href: "/contact", title: "Contact Us" },
  { href: "/signin", title: "Sign In" },
  { href: "/cms/products", title: "Products" }, // new!
];
```

> Commit here  
> `git add . && git commit -m "Vjezba 6: Add Products page to Navbar"`

### Korak 2:

Primijetite strukturu cms stranice: `(contentfull)/cms/products`. Zašto zagrada? Jer želimo grupirati stvari pod contentful, ali ne želimo da to bude dio URL-a. Primijetimo da `cms` ulazi u URL i `products` također.

Ako otvorimo novu stranicu vidimo nekoliko primjetnih proizvoda. Pogledajmo kod (glavni dio):

```tsx
const CmsPage: FC<SearchParams> = async ({ searchParams }) => {
  const filteredProducts = searchParams._category
    ? products.filter((product) => {
        return product.categories?.some((category) => {
          return category.label === searchParams._category;
        });
      })
    : products;

  return (
    <main className="container flex flex-col items-center gap-10">
      <h1 className="font-roboto-condensed text-6xl font-extrabold text-brand-purple-900 my-4">
        Products
      </h1>
      <CategoryFilter categories={categories} />
      <ul className="grid grid-cols-2 gap-8">
        {filteredProducts.map((product) => {
          return (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default CmsPage;
```

Cidimo da producti dolaze odnekud:

```tsx
import { products, categories } from "./productList";
```

Ako otvorimo taj file vidimo da je to samo lista proizvoda i kategorija. U stvarnom projektu bi se ovo dohvaćalo iz baze podataka ili CMS-a, što je upravo ono što ćemo učiniti na današnjim vježbama.

Ako kliknemo na Robota dobit ćemo details page. Ali, naravno prvo dobijemo error...
Ovo je poznati error vezan za slike.

Dodajmo novi host za slike `"images.ctfassets.net"` u next.config.js:

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
      "source.unsplash.com",
      "images.ctfassets.net",
    ],
  },
};

module.exports = nextConfig;
```

OK, sad imamo slike. Ali sadržaj izgleda čudno. Za ovaj tip rendera (rich-text) postoji Tailwind plugin.  
Dodajmo ga u `tailwind.config.js`:

```js
import type { Config } from "tailwindcss";

const config: Config = {
  // ... ostaje isto
  plugins: [require("@tailwindcss/typography")],
};
export default config;
```

Sad imamo slike i ispravan prikaz sadržaja. Ali sadržaj je lokalan... U sljedećem koraku dohvaćamo sadržaj sa Contentfula.

> Commit here  
> `git add . && git commit -m "Vjezba 6: Add image domain and TW plugin"`

## Contentful

Contentful je servis koji omogućava upravljanje sadržajem. Sadržajem se upravlja putem web sučelja ili kroz API. Sadržaj se može prikazati na web stranici, mobilnoj aplikaciji, IoT uređaju ili bilo kojem uređaju koji ima pristup internetu. Contentful je headless CMS, što znači da ne nudi gotovo rješenje za prikaz sadržaja. To je naš zadatak. Contentful nudi samo sučelje za upravljanje sadržajem i API za dohvaćanje sadržaja.

### Osnove

Za početak rada s Contentfulom trebat će nam račun. Najlakše je koristiti Github acc za login.
Contentful je organiziran u :

- **Space** - prostor u kojem se nalazi sadržaj. Nama treba samo jedan
- **Content Model** - model sadržaja. Sjetite se tablica u SQL-u. Model bi bio sličan shemi SQL tablice.
- **Content** - sadržaj. Sadržaj je instanca modela. Sadržaj je ono što se prikazuje na web stranici.

Kako koristiti Contentful ostavljamo vama da istražite, ali budući da je namijenjen ljudima koji nisu programeri, ne bi trebalo biti preteško.  
U nastavku ćemo se fokusirati na API.
Jednom kad imate sadržaj koji želite prikazati, trebate ga dohvatiti. Za to će vam trebati ključ i ID vašeg prostora.

<p text-align="center"><img src="./docs/api.png" /> </p>

### Korak 3: Priprema Contentful klijenta

Umjesto korištenja lokalnog sadržaja, sadržaj ćemo dohvatiti sa Contentfula. Prvo se pitamo što nam točno treba...
Pogledajmo trenutni product interface:

```ts
export interface TypeProductListItem {
  id: string;
  name: string;
  description: string;
  categories: TypeCategory[];
  heroImage: string;
}
```

Dakle treba nam lista produkata koja ima ime, id, opis, kategorije i sliku.
Radimo GraphQL query u Contentfulu:

```graphql
query ProductList {
  productCollection {
    items {
      sys {
        id
      }
      name
      description
      heroImage {
        url
        title
      }
      categoriesCollection {
        items {
          label
        }
      }
    }
  }
}
```

Za pisanje GraphQL querya koristimo Contentfulovo web sučelje: GraphQL playground. Možete ga naći pod App -> GraphQL Playground.

<p><img src='./docs/gql.png' /></p>
Ili pokušajte u terminalu:

```
curl 'https://graphql.contentful.com/content/v1/spaces/g853qxkqyatt/environments/master' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://033bad1b-c8e2-4ee5-b8f8-f4c19c33ca37.ctfcloud.net' -H 'Authorization: Bearer aB2Y9knWfSQGbnzAT7nuIoM0iPZ-WXkI-2E4-cEZeCk' --data-binary '{"query":"query ProductList {\n  productCollection {\n    items {\n      sys {\n        id\n      }\n      name,\n      description,\n      heroImage {\n        url,\n        title\n      }\n      categoriesCollection {\n        items {\n          label\n        }\n      }\n    }\n  }\n}"}' --compressed
```

Testirajte na:  
https://httpie.io/app

Pod **Demo Content** možete naći GraphQL explorer za svoj projekt:
https://www.contentful.com/developers/docs/tutorials/general/graphql/

Getting started:
https://www.contentful.com/blog/getting-started-with-contentful-and-graphql/

Good luck 🫡

U svakom slučaju vidimo neki rezultat, znači da query radi kako treba.  
Napišimo sad jednostavan servis. U `lib/contentfulClient.ts` dodajmo file ``:

```ts
const gqlAllProductsQuery = `query ProductList {
  productCollection {
    items {
      sys {
        id
      }
      name,
      description,
      heroImage {
        url,
        title
      }
      categoriesCollection {
        items {
          label
        }
      }
    }
  }
}`;

interface ProductCollectionResponse {
  productCollection: {
    items: ProductItem[];
  };
}

interface ProductItem {
  sys: {
    id: string;
  };
  name: string;
  description: string;
  heroImage: {
    url: string;
    title: string;
  };
  categoriesCollection: {
    items: {
      label: TypeCategory["label"];
    }[];
  };
}
```

### Korak 4: GetAllProducts funkcija

Napišimo funkciju koja nam daje sve produkte. Prvo, dodajmo `baseUrl`:

```ts
const baseUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;
```

Primijetimo `process.env`. Što je to?

`CONTENTFUL_SPACE_ID` je enviroment varijabla (nalazi se na `env` objektu processa). Takve varijable služe
za vrijednosti koje ne želimo u kodu, ali želimo ih mijenjati. Dobar primjer su passwordi, API ključevi, portovi, URL-ovi na backendu i sl.

U našem slučaju, `CONTENTFUL_SPACE_ID` je ID našeg prostora. Treba nam i API ključ. Dodajmo ga u `.env.local`.
Ako file ne postoji dodajte ga. Primijetite da git ne vidi promjenu u tom fileu. To je zato što je `.env.local` na `.gitignore` listi. To je dobro jer ne želimo da se API ključevi i slično nalaze u git repozitoriju.

```
CONTENTFUL_SPACE_ID=g853qxkqyatt
CONTENTFUL_ACCESS_TOKEN=aB2Y9knWfSQGbnzAT7nuIoM0iPZ-WXkI-2E4-cEZeCk
```

Napišimo funkciju `getAllProducts` koja nam vraća sve produkte. Ima sljedeći potpis:

```ts
const getAllProducts = async (): Promise<TypeProductListItem[]>
```

Par uputa:

- `fetch` je funkcija koja šalje HTTP zahtjev. U našem slučaju GraphQL query.
- Metoda je `POST`. Metoda za GraphQL je uvijek `POST` i query je uvijek `query`
- Zadan je return type: `ProductCollectionResponse`, trebamo ga samo mapirati na `TypeProductListItem`
- Auth header je tipa `Bearer` i treba mu API ključ (`CONTENTFUL_ACCESS_TOKEN`, `Authorization: Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`)

Rješenje je ispod u detaljima.

<details>
<summary>Rješenje</summary>

```ts
const getAllProducts = async (): Promise<TypeProductListItem[]> => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: gqlAllProductsQuery }),
    });

    // Get the response as JSON, cast as ProductCollectionResponse
    const body = (await response.json()) as {
      data: ProductCollectionResponse;
    };

    // Map the response to the format we want
    const products: TypeProductListItem[] =
      body.data.productCollection.items.map((item) => ({
        id: item.sys.id,
        name: item.name,
        description: item.description,
        heroImage: item.heroImage.url,
        categories: item.categoriesCollection.items.map((category) => category),
      }));

    return products;
  } catch (error) {
    console.log(error);

    return [];
  }
};
```

</details>

Dodajmo export za svoju funkciju:

```ts
const contentfulService = {
  getAllProducts,
};

export default contentfulService;
```

> Commit here  
> `git add . && git commit -m "Vjezba 6: Add Contentful client and getAllProducts function"`

### Korak 5: Dohvat kategorija

Na isti način možemo dohvatiti i kategorije. Napišimo funkciju `getAllCategories` koja vraća sve kategorije. Ima sljedeći potpis:

```ts
const getAllCategories = async (): Promise<TypeCategory[]>
```

Treba nam i query:

```ts
const getAllCategoriesQuery = `query {
  categoryCollection {
    items {
      label
      }
    }
  }`;
```

Rješenje je ispod u detaljima.

<details>
<summary>Category Rješenje</summary>

```ts
const getAllCategories = async (): Promise<TypeCategory[]> => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: getAllCategoriesQuery }),
    });
    const body = (await response.json()) as {
      data: CategoryCollectionResponse;
    };

    const categories: TypeCategory[] = body.data.categoryCollection.items.map(
      (item) => ({
        label: item.label,
      })
    );

    return categories;
  } catch (error) {
    console.log(error);

    return [];
  }
};
```

</details>
<br/>

Dodajmo export za svoju funkciju:

```ts
const contentfulService = {
  getAllProducts,
  getAllCategories,
};
```

> Commit here  
> `git add . && git commit -m "Vjezba 6: Add getAllCategories function"`

### Korak 6: Korištenje Contentful servisa

Sad kad imamo servis, možemo ga koristiti. U `apps/(contentfull)/cms/products.tsx` više ne trebamo import statičnih podataka:

```tsx
// import { products, categories } from "./productList";
import contentfulService from "@/lib/contentfulClient";

// ...

const CmsPage: FC<SearchParams> = async ({ searchParams }) => {
  const products = await contentfulService.getAllProducts();
  const categories = await contentfulService.getAllCategories();

  // const [products, categoris] = await Promise.all([
  //   contentfulService.getAllProducts(),
  //   contentfulService.getAllCategories(),
  // ]);

  const filteredProducts = searchParams._category
    ? products.filter((product) => {
        return product.categories?.some((category) => {
          return category.label === searchParams._category;
        });
      })
    : products;

  return (
    <main className="container flex flex-col items-center gap-10">
      <h1 className="font-roboto-condensed text-6xl font-extrabold text-brand-purple-900 my-4">
        Products
      </h1>
      <CategoryFilter categories={categories} />
      <ul className="grid grid-cols-2 gap-8">
        {filteredProducts.map((product) => {
          return (
            <li key={product.id}>
              <ProductCard {...product} />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default CmsPage;
```

> Commit here
> `git add . && git commit -m "Vjezba 6: Use Contentful service to get products and categories"`

### Korak 7: Dohvat pojedinog proizvoda

Sad kad imamo listu proizvoda, možemo dohvatiti i pojedini proizvod. Napišimo funkciju `getProductById` koja vraća proizvod po ID-u. Ima sljedeći potpis:

```ts
const getProductById = async (id: string): Promise<TypeProductDetailItem>
```

Treba nam i query. Query ovaj put ima i **varijablu** i to `productid`. Varijabla se definira na početku querya i koristi se u queryu. Varijabla se definira sa `$` i tipom. U našem slučaju je to `String`. Varijabla se koristi sa `$` i imenom varijable. U našem slučaju `$productId`. Uskličnik `!` znači da je varijabla obavezna.

```ts
const gqlProductByIdQuery = `query GetProductById($productId: String!) {
  product(id: $productId) {
    name
    price
    description
    currencyCode
    listed
    heroImage {
      url
    }
    categoriesCollection {
      items {
        label
      }
    }
    imagesCollection {
      items {
        url
      }
    }
  }
}
`;
```

Još par dodataka:

- Kad imamo varijablu, fetch mora imati `variables` property. U našem slučaju je to `{ productId: id }`

Sadržaj unutar rich texta nas ne zanima.

```ts
const getProductById = async (
  id: string
): Promise<TypeProductDetailItem | null> => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: gqlProductByIdQuery,
        variables: { productId: id },
      }),
    });

    const body = (await response.json()) as {
      data: DetailProductResponse;
    };

    const responseProduct = body.data.product;

    const product: TypeProductDetailItem = {
      id: id,
      name: responseProduct.name,
      images: responseProduct.imagesCollection.items.map((item) => item.url),
      price: responseProduct.price,
      currencyCode: responseProduct.currencyCode,
      listed: responseProduct.listed,
      description: responseProduct.description,
      categories: responseProduct.categoriesCollection.items.map((c) => c),
      heroImage: responseProduct.heroImage.url,
    };

    return product;
  } catch (error) {
    console.log(error);

    return null;
  }
};
```

Dodajmo export za svoju funkciju:

```ts
const contentfulService = {
  getAllProducts,
  getAllCategories,
  getProductById,
};
```

Primijenimo funkciju u `apps/(contentfull)/cms/product/[id].tsx`:

```tsx
import contentfulService from "@/lib/contentfulClient";
// ...
const ProductPage = async ({ params }: { params: Params }) => {
  const product = await contentfulService.getProductById(params.productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main className="container flex flex-col items-center gap-10 mb-10">
      <h1 className="font-roboto-condensed text-6xl font-extrabold text-brand-purple-900 my-4">
        {product?.name}
      </h1>
      <div className="grid grid-cols-2 gap-4 w-3/4 relative">
        <Badge className="absolute top-4 left-4 z-40" variant="entertainment">
          {product.currencyCode && currencySymbolMapping[product.currencyCode]}
          {product.price}
        </Badge>
        <HeroImage
          image={product?.heroImage}
          productName={product.name}
          className="w-full h-[400px]"
        />
        <div className="flex flex-col gap-4 justify-between">
          <div className="grid grid-cols-2 gap-2">
            {product.images?.map((image) => (
              <div key={image} className="relative w-full h-32">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={image as string}
                  alt={product.name as string}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="mb-2">{product.description}</div>
            <Button variant="emph">+ Add to cart </Button>
          </div>
        </div>
      </div>
      {/* <div
        className="mt-10 prose prose-h1:text-brand-purple-800"
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(product?.richTextDescription?.json),
        }}
      /> */}
      <div className="mt-10 prose prose-h1:text-brand-purple-800">
        {documentToReactComponents(
          product.richTextDescription?.json,
          renderOptions(product.richTextDescription?.links)
        )}
      </div>
    </main>
  );
};

export default ProductPage;
```

> Commit here  
> `git add . && git commit -m "Vjezba 6: Add getProductById function"`

### Korak 8: Dodajmo rich text description

Za potpuni prikaz nedostaje nam još samo rich text description. Dodajmo ga u clijentu:

```ts
const gqlProductByIdQuery = `query GetProductById($productId: String!) {
  product(id: $productId) {
    name
    price
    description
    currencyCode
    listed
    heroImage {
      url
    }
    categoriesCollection {
      items {
        label
      }
    }
    imagesCollection {
      items {
        url
      }
    }
    richTextDescription {
      json
      links {
        entries {
          __typename
          block {
            sys {
              id
            }
            ... on CodeBlockSection {
              __typename
              title
              language
              content
            }
          }
        }
      }
    }
  }
}
`;

// ...

interface DetailProductResponse {
  // --
  richTextDescription: {
    json: any;
    links: any;
  };
  // --
}

// ...

const product: TypeProductDetailItem = {
  id: id,
  name: responseProduct.name,
  images: responseProduct.imagesCollection.items.map((item) => item.url),
  richTextDescription: responseProduct.richTextDescription, // <-- NEW!
  price: responseProduct.price,
  currencyCode: responseProduct.currencyCode,
  listed: responseProduct.listed,
  description: responseProduct.description,
  categories: responseProduct.categoriesCollection.items.map((c) => c),
  heroImage: responseProduct.heroImage.url,
};
```

Kako radi rich text description?
Primjer koji je dan ovdje prati Contentfulov primjer:
https://www.contentful.com/developers/docs/javascript/tutorials/rendering-contentful-rich-text-with-javascript/

Pronađite section za **React**

> ⚠️ Rich text može biti zahtjevan za implementaciju. Ako vam ne treba, nemojte ga koristiti. Savjetujemo da napravite model bez rich texta. Jednom kad pohvatate konce, možete dodati i rich text. Ako što zapne, naravno, javite 🙂

> Commit here  
> `git add . && git commit -m "Vjezba 6: Add rich text description"`

Toliko od nas
