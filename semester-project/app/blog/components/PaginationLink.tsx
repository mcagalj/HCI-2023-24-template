import Link from "next/link";
import clsx from "clsx";
import { BASE_BLOG_PATH } from "@/app/blog/lib/constants";

type PaginationLinkProps = {
  href?: string;
  query: { _page: number };
  text: string;
  disabled?: boolean;
};

const PaginationLink = ({
  href = BASE_BLOG_PATH,
  query,
  text,
  disabled,
}: PaginationLinkProps) => (
  <Link
    href={{ pathname: href, query }}
    className={clsx(
      "rounded border bg-gray-100 px-3 py-1 text-gray-800",
      disabled && "pointer-events-none opacity-50"
    )}
  >
    {text}
  </Link>
);

export default PaginationLink;
