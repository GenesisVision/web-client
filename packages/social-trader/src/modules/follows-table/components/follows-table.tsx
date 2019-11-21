import "modules/programs-table/components/programs-table/programs.scss";

import { Table } from "components/table/components";
import { ITableProps } from "components/table/components/table";
import { TableToggleFavoriteHandlerType } from "components/table/components/table.types";
import { FollowDetailsList } from "gv-api-web";
import * as React from "react";

import FollowCard from "./follow-card";
import FollowTableHeaderCell from "./follow-table-header-cell";
import ProgramTableRowShort from "./follow-table-row-short";
import FollowTableSortingValue from "./follow-table-sorting";
import { followListLoaderData } from "./follow-table.loader-data";
import { FOLLOW_COLUMNS } from "./follows.constants";

export const FAVORITE_COLUMN_NAME = "favorite";

interface IFollowsTableProps extends ITableProps {
  showRating?: boolean;
  data?: FollowDetailsList[];
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
      renderBodyRow={(follow: FollowDetailsList) => (
        <ProgramTableRowShort
          showRating={Boolean(showRating)}
          title={title}
          follow={follow}
          toggleFavorite={toggleFavorite}
          isAuthenticated={Boolean(isAuthenticated)}
        />
      )}
      renderBodyCard={(program: FollowDetailsList) => (
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
