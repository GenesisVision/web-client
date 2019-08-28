import * as React from "react";
import TableModule, {
  ITableModuleProps
} from "shared/components/table/components/table-module";
import { TableToggleFavoriteType } from "shared/components/table/components/table.types";

import FundsTableRow from "./fund-table-row";
import FundsTableHeaderCell from "./funds-table-header-cell";
import { FUNDS_TABLE_COLUMNS } from "./funds-table.constants";

interface Props extends ITableModuleProps {
  isAuthenticated?: boolean;
  toggleFavorite: TableToggleFavoriteType;
}

const FundsTableModule: React.FC<Props> = React.memo(
  ({
    getItems,
    renderMappings,
    sorting,
    filtering,
    defaultFilters,
    paging,
    isAuthenticated,
    title,
    disableTitle,
    toggleFavorite
  }) => (
    <TableModule
      disableTitle={disableTitle}
      getItems={getItems}
      defaultFilters={defaultFilters}
      filtering={filtering}
      sorting={sorting}
      renderMappings={renderMappings}
      paging={paging}
      title={title}
      columns={FUNDS_TABLE_COLUMNS}
      renderHeader={column => (
        <FundsTableHeaderCell
          column={column}
          isAuthenticated={isAuthenticated}
        />
      )}
      renderBodyRow={(fund, updateRow = () => {}) => (
        <FundsTableRow
          title={title}
          fund={fund}
          toggleFavorite={toggleFavorite(fund, updateRow)}
          isAuthenticated={isAuthenticated}
        />
      )}
    />
  )
);

export default FundsTableModule;
