import "modules/programs-table/components/programs-table/programs.scss";

import { Table } from "components/table/components";
import { ITableProps } from "components/table/components/table";
import { FollowDetailsListItem } from "gv-api-web";
import * as React from "react";

import FollowCard from "./follow-card";
import FollowTableHeaderCell from "./follow-table-header-cell";
import FollowTableRowShort from "./follow-table-row-short";
import FollowTableSortingValue from "./follow-table-sorting";
import { followListLoaderData } from "./follow-table.loader-data";
import { FOLLOW_COLUMNS } from "./follows.constants";

export const FAVORITE_COLUMN_NAME = "favorite";

interface IFollowsTableProps extends ITableProps {
  showRating?: boolean;
  data?: FollowDetailsListItem[];
  isAuthenticated?: boolean;
  title: string;
  redirectToLogin?: () => void;
}

const _FollowsTable: React.FC<IFollowsTableProps> = ({
  renderMappings,
  disableTitle,
  columns,
  showRating,
  showSwitchView,
  data,
  sorting,
  updateSorting,
  filtering,
  updateFilter,
  renderFilters,
  paging,
  updatePaging,
  isAuthenticated,
  title
}) => {
  return (
    <Table
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
      renderHeader={column => (
        <FollowTableHeaderCell
          condition={
            !isAuthenticated ||
            (isAuthenticated && column.name !== FAVORITE_COLUMN_NAME)
          }
          column={column}
        />
      )}
      renderSorting={column => (
        <FollowTableSortingValue
          condition={
            !isAuthenticated ||
            (isAuthenticated && column.name !== FAVORITE_COLUMN_NAME)
          }
          column={column}
        />
      )}
      renderBodyRow={(follow: FollowDetailsListItem) => (
        <FollowTableRowShort
          withDispatch
          showRating={Boolean(showRating)}
          follow={follow}
          isAuthenticated={Boolean(isAuthenticated)}
        />
      )}
      renderBodyCard={(follow: FollowDetailsListItem) => (
        <FollowCard title={title} follow={follow} />
      )}
    />
  );
};

const FollowsTable = React.memo(_FollowsTable);
export default FollowsTable;
