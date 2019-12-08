import TableModule, {
  ITableModuleProps
} from "components/table/components/table-module";
import * as React from "react";

import FundsTableRow from "./fund-table-row";
import { fundListLoaderData } from "./fund-table.loader-data";
import FundsTableHeaderCell from "./funds-table-header-cell";
import { FUNDS_TABLE_COLUMNS } from "./funds-table.constants";

interface Props extends ITableModuleProps {
  isAuthenticated?: boolean;
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
    disableTitle
  }) => {
    return (
      <TableModule
        loaderData={fundListLoaderData}
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
            updateRow={updateRow}
            title={title}
            fund={fund}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
    );
  }
);

export default FundsTableModule;
