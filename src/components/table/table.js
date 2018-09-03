import "./table.scss";

import React from "react";

import TableBody from "./table-body";
import TableFooter from "./table-footer";
import TableHeader from "./table-header";
import TableToolbar from "./table-toolbar";

const Table = ({
  title,
  items,
  isPending,
  sorting,
  filtering,
  paging,
  renderFilters,
  renderHeader,
  renderBodyRow
}) => {
  return (
    <div className="table">
      <TableToolbar
        title={title}
        filtering={filtering}
        renderFilters={renderFilters}
      />
      <TableHeader sorting={sorting}>{renderHeader}</TableHeader>
      <TableBody items={items}>{renderBodyRow}</TableBody>
      <TableFooter paging={paging} isPending={isPending} />
    </div>
  );
};

export default Table;
