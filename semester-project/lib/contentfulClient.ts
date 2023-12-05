import { TypeCategory } from "@/app/(contentful)/types/TypeCategory";
import {
  TypeProductDetailItem,
  TypeProductListItem,
} from "@/app/(contentful)/types/TypeProduct";

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

const getAllCategoriesQuery = `query {
  categoryCollection {
    items {
      label
      }
    }
  }`;

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

interface CategoryCollectionResponse {
  categoryCollection: {
    items: TypeCategory[];
  };
}

interface DetailProductResponse {
  product: {
    name: string;
    imagesCollection: {
      items: {
        url: string;
      }[];
    };
    richTextDescription: {
      json: any;
      links: any;
    };
    price: number;
    currencyCode: "CHF" | "EUR" | "GBP" | "USD";
    listed: boolean;
    categories: {
      label: TypeCategory["label"];
    }[];
    description: string;
    heroImage: {
      url: string;
    };
    categoriesCollection: {
      items: {
        label: TypeCategory["label"];
      }[];
    };
  };
}

const baseUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;

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
      richTextDescription: responseProduct.richTextDescription,
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

const contentfulService = {
  getAllProducts,
  getAllCategories,
  getProductById,
};

export default contentfulService;
