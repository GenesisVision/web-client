import * as React from "react";
import TableModule, {
  ITableModuleProps
} from "shared/components/table/components/table-module";

import FundsTableRow from "./fund-table-row";
import FundsTableHeaderCell from "./funds-table-header-cell";
import { FUNDS_TABLE_COLUMNS } from "./funds-table.constants";
import { TableToggleFavoriteType } from "shared/components/table/components/table.types";

interface Props extends ITableModuleProps {
  isAuthenticated?: boolean;
  toggleFavorite: TableToggleFavoriteType;
}

class FundsTableModule extends React.PureComponent<Props> {
  render() {
    const {
      getItems,
      renderFilters,
      sorting,
      filtering,
      defaultFilters,
      paging,
      isAuthenticated,
      title,
      disableTitle,
      toggleFavorite
    } = this.props;

    return (
      <TableModule
        disableTitle={disableTitle}
        getItems={getItems}
        defaultFilters={defaultFilters}
        filtering={filtering}
        sorting={sorting}
        renderFilters={renderFilters}
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
    );
  }
}

export default FundsTableModule;
