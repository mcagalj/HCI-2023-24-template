import { PageProps, Post, PaginationProps } from "@/app/blog/page";
import { extractPageAndLimit } from "@/app/blog/lib/utils";
import { BASE_URL, DEFAULT_PAGE, DEFAULT_LIMIT } from "@/app/blog/lib/constants";


export const getPosts = async ({
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT }: PageProps = { page: DEFAULT_PAGE }): Promise<{
        posts: Post[];
        pagination: PaginationProps;
    }> => {
    const response = await fetch(`${BASE_URL}/?_page=${page}&_limit=${limit}`);
    const posts = await response.json();

    const linkHeader = response.headers.get("Link") || "";
    const firstPagination = extractPageAndLimit(linkHeader, "first");
    const prevPagination = extractPageAndLimit(linkHeader, "prev");
    const nextPagination = extractPageAndLimit(linkHeader, "next");
    const lastPagination = extractPageAndLimit(linkHeader, "last");

    return {
        posts,
        pagination: {
            first: firstPagination,
            prev: prevPagination,
            next: nextPagination,
            last: lastPagination,
        },
    };
};

export const getPost = async (id: string): Promise<Post> => {
    const data = await fetch(`${BASE_URL}/${id}`);
    return data.json();
};