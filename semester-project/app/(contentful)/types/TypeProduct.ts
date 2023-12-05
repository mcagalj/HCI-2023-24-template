// import type {
//   ChainModifiers,
//   Entry,
//   EntryFieldTypes,
//   EntrySkeletonType,
//   LocaleCode,
// } from "contentful";
// import type { TypeCategorySkeleton } from "./TypeCategory";

import { TypeCategory } from "./TypeCategory";

// export interface TypeProductFields {
//   name: EntryFieldTypes.Symbol;
//   id: EntryFieldTypes.Integer;
//   listed: EntryFieldTypes.Boolean;
//   description: EntryFieldTypes.Text;
//   price: EntryFieldTypes.Number;
//   currencyCode: EntryFieldTypes.Symbol<"CHF" | "EUR" | "GBP" | "USD">;
//   categories?: EntryFieldTypes.Array<
//     EntryFieldTypes.EntryLink<TypeCategorySkeleton>
//   >;
//   heroImage: EntryFieldTypes.AssetLink;
//   images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
//   richTextDescription?: EntryFieldTypes.RichText;
// }

// export type TypeProductSkeleton = EntrySkeletonType<
//   TypeProductFields,
//   "product"
// >;
// export type TypeProduct<
//   Modifiers extends ChainModifiers,
//   Locales extends LocaleCode
// > = Entry<TypeProductSkeleton, Modifiers, Locales>;

export interface TypeProductListItem {
  name: string;
  id: string;
  description: string;
  categories: TypeCategory[];
  heroImage: string;
}

export interface TypeProductDetailItem extends TypeProductListItem {
  price: number;
  currencyCode: "CHF" | "EUR" | "GBP" | "USD";
  listed: boolean;
  richTextDescription?: {
    json: any;
    links: any;
  };
  images: string[];
}
