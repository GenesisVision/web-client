import "./program-financial-statistic.scss";

import moment from "moment";
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
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

import {
  PROGRAM_FINANCIAL_STATISTIC_COLUMNS,
  PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS,
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "../../program-details.constants";
import DownloadButtonToolbarAuth from "../download-button-toolbar/download-button-toolbar-auth";

const _ProgramFinancialStatistic: React.FC<Props> = ({
  showCommissionRebateSometime,
  t,
  fetchFinancialStatistic,
  currency,
  id,
  title
}) => {
  const columns = showCommissionRebateSometime
    ? PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS
    : PROGRAM_FINANCIAL_STATISTIC_COLUMNS;

  const fetchStatistic: GetItemsFuncType = React.useCallback(
    (filters?: FilteringType) => fetchFinancialStatistic(id, filters),
    [fetchFinancialStatistic, id]
  );
  return (
    <TableModule
      className="program-financial-statistic"
      exportButtonToolbarRender={(filtering: any) => (
        <DownloadButtonToolbarAuth
          dateRange={filtering!.dateRange}
          programId={id}
          title={title}
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
            <TableCell className="program-financial-statistic__cell">
              {period.number}
            </TableCell>
            <TableCell className="program-financial-statistic__cell">
              {moment(new Date(period.dateFrom)).format()}
            </TableCell>
            <TableCell className="program-financial-statistic__cell">
              <NumberFormat
                value={formatCurrencyValue(balance, currency)}
                displayType="text"
                thousandSeparator=" "
                suffix={` ${currency}`}
              />
            </TableCell>
            <TableCell className="program-financial-statistic__cell">
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
            <TableCell className="program-financial-statistic__cell program-financial-statistic__cell--sm-size">
              <NumberFormat
                value={successFee}
                suffix={` ${currency}`}
                displayType="text"
              />
            </TableCell>
            <TableCell className="program-financial-statistic__cell program-financial-statistic__cell--sm-size">
              <NumberFormat
                value={entryFee}
                suffix={` ${currency}`}
                displayType="text"
              />
            </TableCell>
            <TableCell className="program-financial-statistic__cell program-financial-statistic__cell--sm-size">
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
            {showCommissionRebateSometime && (
              <TableCell className="program-financial-statistic__cell program-financial-statistic__cell--sm-size">
                <NumberFormat
                  value={formatCurrencyValue(commissionRebate, currency)}
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

const ProgramFinancialStatistic = compose<React.FC<OwnProps>>(
  translate(),
  React.memo
)(_ProgramFinancialStatistic);

export default ProgramFinancialStatistic;

interface Props extends OwnProps, WithTranslation {}
interface OwnProps {
  showCommissionRebateSometime: boolean;
  id: string;
  title: string;
  currency: CurrencyEnum;
  fetchFinancialStatistic: (
    programId: string,
    filters?: FilteringType
  ) => Promise<IDataModel>;
}
