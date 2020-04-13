import { Table } from "components/table/components";
import { ITableProps } from "components/table/components/table";
import { FollowDetailsListItem } from "gv-api-web";
import FollowCard from "modules/follows-table/components/follow-card";
import FollowTableRowShort from "modules/follows-table/components/follow-table-row-short";
import "modules/programs-table/components/programs-table/programs.scss";
import * as React from "react";
import { useCallback } from "react";

import FollowTableHeaderCell from "./follow-table-header-cell";
import FollowTableSortingValue from "./follow-table-sorting";
import { followListLoaderData } from "./follow-table.loader-data";
import { FOLLOW_COLUMNS } from "./follows.constants";

interface IFollowsTableProps extends ITableProps {
  data?: FollowDetailsListItem[];
  title?: string;
}

const _FollowsTable: React.FC<IFollowsTableProps> = ({
  outerView,
  renderMappings,
  disableTitle,
  columns,
  showSwitchView,
  data,
  sorting,
  updateSorting,
  filtering,
  updateFilter,
  renderFilters,
  paging,
  updatePaging,
  title,
  asLinkPagination
}) => {
  return (
    <Table
      outerView={outerView}
      asLinkPagination={asLinkPagination}
      loaderData={followListLoaderData}
      renderMappings={renderMappings}
      disableTitle={disableTitle}
      title={title}
      showSwitchView={showSwitchView}
      sorting={sorting}
      filtering={filtering}
      updateFilter={updateFilter}
      updateSorting={updateSorting}
      paging={paging}
      updatePaging={updatePaging}
      columns={columns || FOLLOW_COLUMNS}
      items={data}
      renderFilters={renderFilters}
      renderHeader={useCallback(
        column => (
          <FollowTableHeaderCell column={column} />
        ),
        []
      )}
      renderSorting={useCallback(
        column => (
          <FollowTableSortingValue column={column} />
        ),
        []
      )}
      renderBodyRow={useCallback(
        (follow: FollowDetailsListItem) => (
          <FollowTableRowShort withDispatch follow={follow} />
        ),
        []
      )}
      renderBodyCard={useCallback(
        (follow: FollowDetailsListItem) => (
          <FollowCard follow={follow} />
        ),
        []
      )}
    />
  );
};

const FollowsTable = React.memo(_FollowsTable);
export default FollowsTable;
