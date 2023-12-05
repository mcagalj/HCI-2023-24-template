import { SearchParams } from "@/app/blog/page";
import { BadgeProps, Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import CategoryFilter from "../_components/CategoryFilter";
import { FC } from "react";
import { TypeProductListItem } from "../../types/TypeProduct";
import Image from "next/image";
import { cn } from "@/lib/utils";
// import { products, categories } from "./productList";
import contentfulService from "@/lib/contentfulClient";

export interface HeroImageProps {
  productName: string;
  image?: string;
  className?: string;
}

export const HeroImage = ({
  image,
  productName,
  className,
}: HeroImageProps) => {
  if (!image) return null;

  return (
    <div className={cn("relative w-96 h-60", className)}>
      <Image
        src={image}
        fill
        style={{ objectFit: "cover" }}
        className="rounded-md hover:opacity-70"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
        alt={productName || "product"}
      />
    </div>
  );
};

const ProductCard: FC<TypeProductListItem> = ({
  name,
  description,
  heroImage,
  id,
  categories,
}) => (
  <Card className="w-fit">
    <CardHeader>
      <CardTitle className="text-brand-purple-800">{name}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Link href={`products/${id}`}>
        <div className="relative w-96 h-60">
          <Image
            src={heroImage}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md hover:opacity-70"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            alt={name}
          />
        </div>
      </Link>
    </CardContent>
    <CardFooter>
      {categories?.map((category) => (
        <Badge variant={category?.label as BadgeProps["variant"]} key={id}>
          {category?.label}
        </Badge>
      ))}
    </CardFooter>
  </Card>
);

const CmsPage: FC<SearchParams> = async ({ searchParams }) => {
  const products = await contentfulService.getAllProducts();
  const categories = await contentfulService.getAllCategories();

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
