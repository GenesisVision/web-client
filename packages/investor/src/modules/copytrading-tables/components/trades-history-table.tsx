import { OrderSignalModel } from "gv-api-web";
import TradesHistoryRow from "modules/copytrading-tables/components/trades-history-row";
import * as React from "react";
import { useTranslation } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import TableContainer from "shared/components/table/components/table-container";
import { UpdateFilterFunc } from "shared/components/table/components/table.types";

import { getCopytradingTradesHistory } from "../services/copytrading-tables.service";
import { COPYTRADING_TRADES_HISTORY_COLUMNS } from "./copytrading-tables.constants";
import { dashboardTradesHistoryTableSelector } from "./copytrading-tables.selectors";

const _TradesHistoryTable: React.FC<Props> = ({ currency, title }) => {
  const [t] = useTranslation();
  return (
    <TableContainer
      getItems={getCopytradingTradesHistory(currency)}
      dataSelector={dashboardTradesHistoryTableSelector}
      isFetchOnMount={true}
      columns={COPYTRADING_TRADES_HISTORY_COLUMNS}
      renderFilters={(
        updateFilter: UpdateFilterFunc,
        filtering: FilteringType
      ) => {
        return (
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
          />
        );
      }}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${column.name}`}
        >
          {t(
            `investor.copytrading-tables.trades-history-header.${column.name}`
          )}
        </span>
      )}
      renderBodyRow={(trade: OrderSignalModel) => (
        <TradesHistoryRow trade={trade} title={title} />
      )}
    />
  );
};

interface Props {
  title: string;
  currency?: string;
}

const TradesHistoryTable = React.memo(_TradesHistoryTable);
export default TradesHistoryTable;
