import "./table.scss";

import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

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
  updateFilter,
  renderHeader,
  renderBodyRow
}) => {
  return (
    <div className="table">
      <TableToolbar
        title={title}
        renderFilters={renderFilters}
        updateFilter={updateFilter}
      />
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        style={{
          width: "1136px",
          height: `${items && 42 * (items.length + 1)}px`,
          paddingRight: "10px",
          paddingBottom: "14px"
        }}
        className="table__scrollable-container"
      >
        <TableHeader
          columns={columns}
          sorting={sorting}
          updateSorting={updateSorting}
        >
          {renderHeader}
        </TableHeader>
        <TableBody items={items}>{renderBodyRow}</TableBody>
      </Scrollbars>
      <TableFooter
        paging={paging}
        updatePaging={updatePaging}
        isPending={isPending}
      />
    </div>
  );
};

export default Table;
