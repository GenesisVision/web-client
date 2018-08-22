import Paging from "modules/paging/components/paging/paging";
import React from "react";

import { TableContext } from "./table";

const TableFooter = ({ paging }) => {
  return (
    <div className="table__footer">
      <TableContext.Consumer>
        {context => (
          <Paging
            paging={{ total: paging.total, current: paging.current }}
            hide={context.isPending}
            updatePaging={next => paging.updatePaging(next.currentPage)}
          />
        )}
      </TableContext.Consumer>
    </div>
  );
};

export default TableFooter;
