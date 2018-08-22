import "./table.scss";

import React from "react";

import TableBody from "./table-body";
import TableFilters from "./table-filters";
import TableFooter from "./table-footer";
import TableHeader from "./table-header";

const Table = ({
  name,
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
      <div className="table__name">{name}</div>
      <TableFilters filtering={filtering}>{renderFilters}</TableFilters>
      <TableHeader sorting={sorting}>{renderHeader}</TableHeader>
      <TableBody items={items}>{renderBodyRow}</TableBody>
      <TableFooter paging={paging} isPending={isPending} />
    </div>
  );
};

export default Table;
