import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import { OrderModel } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import {
  PROGRAM_FOREX_TRADES_COLUMNS,
  PROGRAM_TRADES_COLUMNS,
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "shared/components/programs/program-details/program-details.constants";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import Tooltip from "shared/components/tooltip/tooltip";
import { IDataModel } from "shared/constants/constants";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

const DECIMAL_SCALE = 8;

const _ProgramTrades: React.FC<Props & InjectedTranslateProps> = ({
  isForex,
  currency,
  programId,
  fetchTrades,
  t
}) => {
  const fetchProgramTrades: GetItemsFuncType = (filters?: FilteringType) =>
    fetchTrades(programId, filters);
  const columns = isForex
    ? PROGRAM_FOREX_TRADES_COLUMNS
    : PROGRAM_TRADES_COLUMNS;
  return (
    <TableModule
      getItems={fetchProgramTrades}
      defaultFilters={PROGRAM_TRADES_DEFAULT_FILTERS}
      filtering={PROGRAM_TRADES_FILTERS}
      renderFilters={(updateFilter, filtering) => (
        <>
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
          />
        </>
      )}
      paging={DEFAULT_PAGING}
      columns={columns}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${
            column.name
          }`}
        >
          {t(`program-details-page.history.trades.${column.name}`)}
        </span>
      )}
      renderBodyRow={(trade: OrderModel) => {
        const volume = +formatValue(trade.volume, DECIMAL_SCALE / 2);
        return (
          <TableRow className="details-trades__row">
            <TableCell className="details-trades__cell program-details-trades__cell--direction/entry">
              <BaseProfitability
                isPositive={trade.direction === "Buy"}
                isNegative={trade.direction === "Sell"}
              >
                {trade.direction}
              </BaseProfitability>
              {` / ${trade.entry}`}
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--symbol">
              {trade.symbol}
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--volume">
              <Tooltip
                disable={trade.volume >= volume}
                render={() => <div>{trade.volume}</div>}
              >
                <span>{trade.volume < volume ? `< ${volume}` : volume}</span>
              </Tooltip>
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--price">
              <NumberFormat
                value={formatValue(trade.price, DECIMAL_SCALE)}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--profit">
              <Profitability
                value={formatValue(trade.profit, DECIMAL_SCALE)}
                prefix={PROFITABILITY_PREFIX.SIGN}
              >
                <NumberFormat
                  value={formatValue(trade.profit, DECIMAL_SCALE)}
                  thousandSeparator=" "
                  allowNegative={false}
                  displayType="text"
                />
              </Profitability>
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--commission">
              <Tooltip
                disable={!trade.showOriginalCommission}
                render={() => (
                  <div>
                    {`${formatValue(trade.originalCommission, DECIMAL_SCALE)} ${
                      trade.originalCommissionCurrency
                    }`}
                  </div>
                )}
              >
                <NumberFormat
                  value={formatValue(trade.commission, DECIMAL_SCALE)}
                  displayType="text"
                  thousandSeparator=" "
                />
              </Tooltip>
            </TableCell>
            {isForex && (
              <TableCell className="details-trades__cell program-details-trades__cell--swap">
                {trade.swap}
              </TableCell>
            )}
            <TableCell className="details-trades__cell program-details-trades__cell--date">
              {moment(trade.date).format()}
            </TableCell>
            {isForex && (
              <TableCell className="details-trades__cell program-details-trades__cell--ticket">
                {trade.ticket}
              </TableCell>
            )}
          </TableRow>
        );
      }}
    />
  );
};

interface Props {
  isForex: boolean;
  currency: CURRENCIES;
  programId: string;
  fetchTrades: (
    programId: string,
    filters?: FilteringType
  ) => Promise<IDataModel>;
}

const ProgramTrades = React.memo(translate()(_ProgramTrades));
export default ProgramTrades;
