import React from "react";

import Paging from "./paging/paging";

const TableFooter = ({ isPending, paging }) => {
  if (paging.total <= 1) return null;

  return (
    <div className="table__footer">
      <Paging
        paging={{ total: paging.total, current: paging.current }}
        hide={isPending}
        updatePaging={next => paging.updatePaging(next.currentPage)}
      />
    </div>
  );
};

export default TableFooter;
