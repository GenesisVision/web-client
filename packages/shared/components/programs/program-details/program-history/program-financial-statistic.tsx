import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { TableCell, TableRow } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import TableModule from "shared/components/table/components/table-module";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { IDataModel } from "shared/constants/constants";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { formatCurrencyValue } from "shared/utils/formatter";

import {
  PROGRAM_FINANCIAL_STATISTIC_COLUMNS,
  PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS,
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "../program-details.constants";
import DownloadButtonToolbarAuth from "./download-button-toolbar-auth";

const _ProgramFinancialStatistic: React.FC<Props> = ({
  t,
  fetchFinancialStatistic,
  currency,
  id,
  isGMProgram
}) => {
  const columns = isGMProgram
    ? PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS
    : PROGRAM_FINANCIAL_STATISTIC_COLUMNS;

  const fetchStatistic: GetItemsFuncType = React.useCallback(
    (filters?: FilteringType) => fetchFinancialStatistic(id, filters),
    []
  );
  return (
    <TableModule
      exportButtonToolbarRender={(filtering: any) => (
        <DownloadButtonToolbarAuth
          dateRange={filtering!.dateRange}
          programId={id}
        />
      )}
      getItems={fetchStatistic}
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
          {t(`program-details-page.history.financial-statistic.${column.name}`)}
        </span>
      )}
      renderBodyRow={period => {
        const {
          profit,
          balance,
          deposit,
          withdraw,
          commissionRebate,
          successFee,
          entryFee
        } = period.managerStatistic;
        return (
          <TableRow stripy>
            <TableCell>{period.number}</TableCell>
            <TableCell>
              <NumberFormat
                value={formatCurrencyValue(balance, currency)}
                displayType="text"
                thousandSeparator=" "
                suffix={` ${currency}`}
              />
            </TableCell>
            <TableCell>
              <Profitability value={profit} prefix={PROFITABILITY_PREFIX.SIGN}>
                <NumberFormat
                  value={formatCurrencyValue(profit, currency)}
                  thousandSeparator=" "
                  displayType="text"
                  allowNegative={false}
                  suffix={` ${currency}`}
                />
              </Profitability>
            </TableCell>
            <TableCell>
              <NumberFormat
                value={successFee}
                suffix={` ${currency}`}
                displayType="text"
              />
            </TableCell>
            <TableCell>
              <NumberFormat
                value={entryFee}
                suffix={` ${currency}`}
                displayType="text"
              />
            </TableCell>
            <TableCell>
              {withdraw ? (
                <Profitability
                  prefix={PROFITABILITY_PREFIX.SIGN}
                  value={`-${formatCurrencyValue(withdraw, currency)}`}
                >
                  <NumberFormat
                    value={formatCurrencyValue(withdraw, currency)}
                    thousandSeparator=" "
                    displayType="text"
                    suffix={` ${currency}`}
                  />
                </Profitability>
              ) : (
                <Profitability
                  prefix={PROFITABILITY_PREFIX.SIGN}
                  value={formatCurrencyValue(deposit, currency)}
                >
                  <NumberFormat
                    value={formatCurrencyValue(deposit, currency)}
                    thousandSeparator=" "
                    displayType="text"
                    suffix={` ${currency}`}
                  />
                </Profitability>
              )}
            </TableCell>
            {isGMProgram && (
              <TableCell>
                <NumberFormat
                  value={commissionRebate}
                  displayType="text"
                  suffix={` ${currency}`}
                />
              </TableCell>
            )}
          </TableRow>
        );
      }}
    />
  );
};

const ProgramFinancialStatistic = compose<React.FC<OwnProps>>(translate())(
  _ProgramFinancialStatistic
);

export default ProgramFinancialStatistic;

interface Props extends OwnProps, WithTranslation {}
interface OwnProps {
  id: string;
  isGMProgram?: boolean;
  currency: CURRENCIES;
  fetchFinancialStatistic: (
    programId: string,
    filters?: FilteringType
  ) => Promise<IDataModel>;
}
