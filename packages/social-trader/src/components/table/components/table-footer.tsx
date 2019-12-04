import withLoader from "decorators/with-loader";
import * as React from "react";

import { IPaging } from "../helpers/paging.helpers";
import Paging from "./paging/paging";
import ItemsCounter from "./table-items-counter";
import { UpdatePagingFuncType } from "./table.types";

export interface ITableFooterProps {
  isPending?: boolean;
  paging?: IPaging;
  updatePaging?: UpdatePagingFuncType;
}

const _TableFooter: React.FC<ITableFooterProps> = ({
  isPending,
  paging = {},
  updatePaging
}) => (
  <div className="table__footer">
    <ItemsCounter {...paging} condition={!!paging.totalItems} />
    <Paging
      condition={!isPending && paging.totalPages !== 0}
      paging={paging}
      hidden={isPending}
      updatePaging={next => updatePaging && updatePaging(next.currentPage)}
    />
  </div>
);

const TableFooter = withLoader(React.memo(_TableFooter));
export default TableFooter;
