import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
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
    <Row className="table__footer">
      <ItemsCounter {...paging} condition={!!paging.totalItems} />
      <RowItem className="table__paging">
        <Paging
          asLink={asLinkPagination}
          condition={paging.totalPages !== 0}
          paging={paging}
          hidden={isPending}
          updatePaging={handleUpdate}
        />
      </RowItem>
    </Row>
  );
};

const TableFooter = withLoader(React.memo(_TableFooter));
export default TableFooter;
