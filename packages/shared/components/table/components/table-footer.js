import React from "react";
import ItemsCounter from "shared/components/table/components/table-items-counter";

import Paging from "./paging/paging";

const TableFooter = ({ isPending, paging, updatePaging }) => {
  if (paging.totalPages <= 1) return null;

  return (
    <div className="table__footer">
      <ItemsCounter {...paging} />
      <Paging
        paging={{ total: paging.totalPages, current: paging.currentPage }}
        hide={isPending}
        updatePaging={next => updatePaging(next.currentPage)}
      />
    </div>
  );
};

export default TableFooter;
