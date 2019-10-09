import "./program-financial-statistic.scss";

import { ProgramPeriodViewModel } from "gv-api-web";
import React from "react";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { TableCell, TableRow } from "shared/components/table/components";
import { formatDate } from "shared/utils/dates";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const _ProgramFinancialStatisticRow: React.FC<Props> = ({
  period,
  currency,
  showCommissionRebateSometime
}) => {
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
        {formatDate(period.dateFrom)}
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
};

interface Props {
  showCommissionRebateSometime: boolean;
  period: ProgramPeriodViewModel;
  currency: CurrencyEnum;
}

const ProgramFinancialStatisticRow = React.memo(_ProgramFinancialStatisticRow);
export default ProgramFinancialStatisticRow;
