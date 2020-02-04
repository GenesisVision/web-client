import withLoader from "decorators/with-loader";
import * as React from "react";
import { useCallback } from "react";

import { IPaging } from "../helpers/paging.helpers";
import Paging from "./paging/paging";
import ItemsCounter from "./table-items-counter";
import { UpdatePagingFuncType } from "./table.types";

export interface ITableFooterProps {
  isPending?: boolean;
  paging?: IPaging;
  updatePaging?: UpdatePagingFuncType;
  asLinkPagination?: boolean;
}

const _TableFooter: React.FC<ITableFooterProps> = ({
  isPending,
  paging = {},
  updatePaging,
  asLinkPagination
}) => {
  const handleUpdate = useCallback(
    next => updatePaging && updatePaging(next.currentPage),
    [updatePaging]
  );
  return (
    <div className="table__footer">
      <ItemsCounter {...paging} condition={!!paging.totalItems} />
      <Paging
        asLink={asLinkPagination}
        condition={!isPending && paging.totalPages !== 0}
        paging={paging}
        hidden={isPending}
        updatePaging={handleUpdate}
      />
    </div>
  );
};

const TableFooter = withLoader(React.memo(_TableFooter));
export default TableFooter;
