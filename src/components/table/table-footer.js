import Paging from "modules/paging/components/paging/paging";
import React from "react";

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
