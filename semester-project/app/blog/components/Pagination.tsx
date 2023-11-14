import { PaginationProps } from "@/app/blog/page";
import PaginationLink from "@/app/blog/components/PaginationLink";

type PaginationComponentProps = {
  page: number;
  limit?: number;
  pagination: PaginationProps;
};

const Pagination = ({ page, pagination }: PaginationComponentProps) => {
  return (
    <div className="flex items-baseline gap-8 pb-10">
      <div>
        Page {page} of {pagination.last?.page}
      </div>
      <div className="flex gap-4">
        <PaginationLink
          query={{ _page: pagination.first?.page || 1 }}
          text="First"
        />
        <PaginationLink
          query={{ _page: pagination.prev ? pagination.prev.page : 1 }}
          text="Previous"
          disabled={!pagination.prev}
        />
        <PaginationLink
          query={{ _page: pagination.next ? pagination.next.page : page + 1 }}
          text="Next"
          disabled={!pagination.next}
        />
        <PaginationLink
          query={{ _page: pagination.last?.page || 1 }}
          text="Last"
        />
      </div>
    </div>
  );
};

export default Pagination;
