import "./program-financial-statistic.scss";

import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { TableCell, TableRow } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

import {
  PROGRAM_FINANCIAL_STATISTIC_COLUMNS,
  PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS
} from "../../program-details.constants";
import { financialStatisticTableSelector } from "../../reducers/program-history.reducer";
import { getFinancialStatistics } from "../../services/program-details.service";
import DownloadButtonToolbarAuth from "../download-button-toolbar/download-button-toolbar-auth";

const _ProgramFinancialStatistic: React.FC<Props> = ({
  showCommissionRebateSometime,
  currency,
  id,
  title
}) => {
  const columns = showCommissionRebateSometime
    ? PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS
    : PROGRAM_FINANCIAL_STATISTIC_COLUMNS;

  const [t] = useTranslation();
  return (
    <TableContainer
      className="program-financial-statistic"
      exportButtonToolbarRender={(filtering: any) => (
        <DownloadButtonToolbarAuth
          dateRange={filtering!.dateRange}
          programId={id}
          title={title}
        />
      )}
      getItems={getFinancialStatistics(id)}
      dataSelector={financialStatisticTableSelector}
      isFetchOnMount={true}
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

const ProgramFinancialStatistic = React.memo(_ProgramFinancialStatistic);

export default ProgramFinancialStatistic;

interface Props extends OwnProps {}
interface OwnProps {
  showCommissionRebateSometime: boolean;
  id: string;
  title: string;
  currency: CurrencyEnum;
}
