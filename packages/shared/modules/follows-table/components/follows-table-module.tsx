import * as React from "react";
import TableModule, {
  ITableModuleProps
} from "shared/components/table/components/table-module";
import { TableToggleFavoriteType } from "shared/components/table/components/table.types";

import FollowTableHeaderCell from "./follow-table-header-cell";
import FollowTableRow from "./follow-table-row";
import { followListLoaderData } from "./follow-table.loader-data";
import { FAVORITE_COLUMN_NAME } from "./follows-table";
import { FOLLOW_COLUMNS } from "./follows.constants";

const FollowsTableModule: React.FC<Props> = React.memo(
  ({
    renderMappings,
    getItems,
    renderFilters,
    sorting,
    filtering,
    defaultFilters,
    paging,
    isAuthenticated,
    showRating,
    title,
    disableTitle,
    toggleFavorite,
    columns
  }) => (
    <TableModule
      loaderData={followListLoaderData}
      renderMappings={renderMappings}
      disableTitle={disableTitle}
      getItems={getItems}
      defaultFilters={defaultFilters}
      filtering={filtering}
      sorting={sorting}
      renderFilters={renderFilters}
      paging={paging}
      title={title}
      columns={columns || FOLLOW_COLUMNS}
      renderHeader={column => (
        <FollowTableHeaderCell
          condition={
            !isAuthenticated ||
            (isAuthenticated && column.name !== FAVORITE_COLUMN_NAME)
          }
          column={column}
        />
      )}
      renderBodyRow={(
        follow,
        updateRow: any //TODO fix updateRow
      ) => (
        <FollowTableRow
          showRating={showRating}
          title={title}
          follow={follow}
          toggleFavorite={toggleFavorite(follow, updateRow)}
          isAuthenticated={isAuthenticated}
        />
      )}
    />
  )
);

interface Props extends ITableModuleProps {
  isAuthenticated?: boolean;
  showRating?: boolean;
  title: string;
  toggleFavorite: TableToggleFavoriteType;
}

export default FollowsTableModule;
