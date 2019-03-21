import * as React from "react";

import { IPaging } from "../helpers/paging.helpers";
import Paging from "./paging/paging";
import ItemsCounter from "./table-items-counter";

export interface ITableFooterProps {
  isPending?: boolean;
  paging?: IPaging;
  updatePaging?(page: number): void;
}

const TableFooter: React.FC<ITableFooterProps> = ({
  isPending,
  paging = {},
  updatePaging
}) => {
  if (!paging || (paging.totalPages && paging.totalPages < 2)) return null;

  return (
    <div className="table__footer">
      <ItemsCounter {...paging} />
      <Paging
        paging={paging}
        hidden={isPending}
        updatePaging={next => updatePaging && updatePaging(next.currentPage)}
      />
    </div>
  );
};

export default React.memo(TableFooter);
