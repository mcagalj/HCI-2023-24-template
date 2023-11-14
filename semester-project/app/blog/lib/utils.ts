import { PageProps, SearchParams } from "@/app/blog/page";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/app/blog/lib/constants"

// ChatGPT
export const extractPageAndLimit = (
    linkHeader: string,
    rel: string
): PageProps | undefined => {
    const relRegex = new RegExp(
        `<[^>]*\\?_page=(\\d+)&_limit=(\\d+)>;\\s*rel="${rel}"`
    );
    const match = linkHeader.match(relRegex);
    if (match) {
        const [, page, limit] = match.map(Number);
        return { page, limit };
    }
    return undefined;
};


type ParsedSearchParams = {
    page: number;
    limit: number;
};

export const parseSearchParams = ({ searchParams }: SearchParams): ParsedSearchParams => {
    const page =
        typeof searchParams._page === "string" ? Number(searchParams._page) : DEFAULT_PAGE;
    const limit =
        typeof searchParams._limit === "string" ? Number(searchParams._limit) : DEFAULT_LIMIT;

    return {
        page,
        limit,
    };
};
