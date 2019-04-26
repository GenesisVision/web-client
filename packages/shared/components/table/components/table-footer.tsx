import * as React from "react";

import { IPaging } from "../helpers/paging.helpers";
import Paging from "./paging/paging";
import ItemsCounter from "./table-items-counter";

export interface ITableFooterBaseProps {
  paging: IPaging;
}
export interface ITableFooterProps extends ITableFooterBaseProps {
  isPending: boolean;
  updatePaging?(page: number): void;
}

const TableFooter: React.FC<ITableFooterProps> = ({
  isPending,
  paging,
  updatePaging
}) => {
  if (isPending || (paging.totalPages && paging.totalPages < 2)) return null;

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
