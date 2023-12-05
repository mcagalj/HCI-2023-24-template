import { TypeCategory } from "@/app/(contentful)/types/TypeCategory";
import { TypeProductListItem } from "@/app/(contentful)/types/TypeProduct";

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

const contentfulService = {
  getAllProducts,
};

export default contentfulService;
