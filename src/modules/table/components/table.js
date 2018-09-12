import "./table.scss";

import React from "react";

import TableBody from "./table-body";
import TableFooter from "./table-footer";
import TableHeader from "./table-header";
import TableToolbar from "./table-toolbar";

const Table = ({
  title,
  columns,
  items,
  isPending,
  sorting,
  updateSorting,
  paging,
  updatePaging,
  renderFilters,
  renderHeader,
  renderBodyRow
}) => {
  return (
    <div className="table">
      <TableToolbar title={title} renderFilters={renderFilters} />
      <TableHeader
        columns={columns}
        sorting={sorting}
        updateSorting={updateSorting}
      >
        {renderHeader}
      </TableHeader>
      <TableBody items={items}>{renderBodyRow}</TableBody>
      <TableFooter
        paging={paging}
        updatePaging={updatePaging}
        isPending={isPending}
      />
    </div>
  );
};

export default Table;
