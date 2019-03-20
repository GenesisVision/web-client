import "./funds-table.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Table } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";

import FundCard from "./fund-card";
import FundsTableRow from "./fund-table-row";
import FundTableSortingValue from "./fund-table-sorting";
import FundsTableHeaderCell from "./funds-table-header-cell";
import { FUNDS_TABLE_COLUMNS } from "./funds-table.constants";
import { ITableProps } from "shared/components/table/components/table";
import { FundsList } from "gv-api-web";
import { IApiState } from "shared/reducers/api-reducer/api-reducer";

interface Props extends ITableProps {
  data: FundsList & IApiState<FundsList>;
  toggleFavorite(id: string, selected: boolean): void;
  isAuthenticated: boolean;
}

const FundsTable: React.FC<Props & InjectedTranslateProps> = ({
  t,
  data,
  isPending,
  sorting,
  updateSorting,
  filtering,
  updateFilter,
  paging,
  updatePaging,
  toggleFavorite,
  isAuthenticated,
  title
}) => {
  return (
    <Table
      title={title}
      sorting={sorting}
      updateSorting={updateSorting}
      paging={paging}
      updatePaging={updatePaging}
      columns={FUNDS_TABLE_COLUMNS}
      items={data.funds}
      isPending={data.isPending}
      showSwitchView
      renderFilters={() => (
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering && filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.fund-start")}
        />
      )}
      renderHeader={column => (
        <FundsTableHeaderCell
          column={column}
          isAuthenticated={isAuthenticated}
        />
      )}
      renderSorting={column => (
        <FundTableSortingValue
          column={column}
          isAuthenticated={isAuthenticated}
        />
      )}
      renderBodyRow={fund => (
        <FundsTableRow
          title={title}
          fund={fund}
          toggleFavorite={toggleFavorite}
          isAuthenticated={isAuthenticated}
        />
      )}
      renderBodyCard={fund => (
        <FundCard title={title} fund={fund} toggleFavorite={toggleFavorite} />
      )}
    />
  );
};

export default translate()(FundsTable);
