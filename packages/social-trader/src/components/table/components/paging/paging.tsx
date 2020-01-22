import Pager from "components/pager/pager";
import { IPaging } from "components/table/helpers/paging.helpers";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { useCallback } from "react";

interface IPagingProps {
  paging: IPaging;
  hidden?: boolean;
  asLink?: boolean;
  updatePaging(opts: { currentPage: number }): void;
}

export const PAGING_FILTER_NAME = "page";

const _Paging: React.FC<IPagingProps> = ({
  paging,
  hidden,
  updatePaging,
  asLink
}) => {
  const handlePageChange = useCallback(
    (nextPage: number) => updatePaging({ currentPage: nextPage - 1 }),
    [updatePaging]
  );
  return (
    <Pager
      asLink={asLink}
      total={paging.totalPages || 0}
      current={paging.currentPage || 1}
      countVisiblePages={3}
      onPageChanged={handlePageChange}
    />
  );
};

const Paging = withLoader(React.memo(_Paging));
export default Paging;
