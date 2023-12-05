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
