import "shared/modules/programs-table/components/programs-table/programs.scss";

import { CopyTradingDetailsList } from "gv-api-web";
import * as React from "react";
import { Table } from "shared/components/table/components";
import { ITableProps } from "shared/components/table/components/table";
import { TableToggleFavoriteHandlerType } from "shared/components/table/components/table.types";

import FollowCard from "./follow-card";
import FollowTableHeaderCell from "./follow-table-header-cell";
import ProgramTableRowShort from "./follow-table-row-short";
import FollowTableSortingValue from "./follow-table-sorting";
import { followListLoaderData } from "./follow-table.loader-data";
import { FOLLOW_COLUMNS } from "./follows.constants";

export const FAVORITE_COLUMN_NAME = "favorite";

interface IFollowsTableProps extends ITableProps {
  showRating?: boolean;
  data?: CopyTradingDetailsList[];
  toggleFavorite: TableToggleFavoriteHandlerType;
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
  toggleFavorite,
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
      renderBodyRow={(program: CopyTradingDetailsList) => (
        <ProgramTableRowShort
          showRating={Boolean(showRating)}
          title={title}
          follow={program}
          toggleFavorite={toggleFavorite}
          isAuthenticated={Boolean(isAuthenticated)}
        />
      )}
      renderBodyCard={(program: CopyTradingDetailsList) => (
        <FollowCard
          title={title}
          follow={program}
          toggleFavorite={toggleFavorite}
        />
      )}
    />
  );
};

const FollowsTable = React.memo(_FollowsTable);
export default FollowsTable;
