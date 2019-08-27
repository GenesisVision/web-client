import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import { OrderModel } from "gv-api-web";
import moment from "moment";
import { useCallback } from "react";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import {
  generateProgramTradesColumns,
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
import { DEFAULT_DECIMAL_SCALE, IDataModel } from "shared/constants/constants";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import filesService from "shared/services/file-service";
import { formatValue } from "shared/utils/formatter";

import DownloadButtonToolbar from "./download-button-toolbar/download-button-toolbar";

const _ProgramTrades: React.FC<Props> = ({
  showSwaps,
  showTickets,
  currency,
  programId,
  fetchTrades,
  t
}) => {
  const fetchProgramTrades: GetItemsFuncType = useCallback(
    (filters?: FilteringType) => fetchTrades(programId, filters),
    [fetchTrades, programId]
  );
  const columns = generateProgramTradesColumns(!showSwaps, !showTickets);

  return (
    <TableModule
      exportButtonToolbarRender={(filtering: any) => (
        <DownloadButtonToolbar
          filtering={filtering!.dateRange}
          programId={programId}
          getExportFileUrl={filesService.getTradesExportFileUrl}
        />
      )}
      getItems={fetchProgramTrades}
      defaultFilters={PROGRAM_TRADES_DEFAULT_FILTERS}
      filtering={PROGRAM_TRADES_FILTERS}
      renderFilters={(updateFilter, filtering) => (
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.program-start")}
        />
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
        const volume = +formatValue(trade.volume, DEFAULT_DECIMAL_SCALE / 2);
        return (
          <TableRow stripy>
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
                value={formatValue(trade.price, DEFAULT_DECIMAL_SCALE)}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--profit">
              <Profitability
                value={formatValue(trade.profit, DEFAULT_DECIMAL_SCALE)}
                prefix={PROFITABILITY_PREFIX.SIGN}
              >
                <NumberFormat
                  value={formatValue(trade.profit, DEFAULT_DECIMAL_SCALE)}
                  thousandSeparator=" "
                  allowNegative={false}
                  displayType="text"
                />
              </Profitability>
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--commission">
              <Tooltip
                render={() =>
                  trade.showOriginalCommission ? (
                    <div>
                      {`${formatValue(
                        trade.originalCommission,
                        DEFAULT_DECIMAL_SCALE
                      )} ${trade.originalCommissionCurrency}`}
                    </div>
                  ) : (
                    <div>
                      {`${formatValue(
                        trade.commission,
                        DEFAULT_DECIMAL_SCALE
                      )} ${trade.originalCommissionCurrency}`}
                    </div>
                  )
                }
              >
                <NumberFormat
                  value={formatValue(trade.commission, DEFAULT_DECIMAL_SCALE)}
                  displayType="text"
                  thousandSeparator=" "
                />
              </Tooltip>
            </TableCell>
            {showSwaps && (
              <TableCell className="details-trades__cell program-details-trades__cell--swap">
                {trade.swap}
              </TableCell>
            )}
            <TableCell className="details-trades__cell program-details-trades__cell--date">
              {moment(trade.date).format()}
            </TableCell>
            {showTickets && (
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

interface OwnProps {
  showSwaps: boolean;
  showTickets: boolean;
  currency: CURRENCIES;
  programId: string;
  fetchTrades: (
    programId: string,
    filters?: FilteringType
  ) => Promise<IDataModel>;
}

interface Props extends WithTranslation, OwnProps {}

const ProgramTrades = translate()(React.memo(_ProgramTrades));
export default ProgramTrades;
