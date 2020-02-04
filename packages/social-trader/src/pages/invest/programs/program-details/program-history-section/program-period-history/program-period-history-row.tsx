import "./program-period-history-row.scss";

import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { TableCell, TableRow } from "components/table/components";
import { ProgramPeriodViewModel } from "gv-api-web";
import { ProgramPeriodHistoryDetailsButton } from "pages/invest/programs/program-details/program-history-section/program-period-history/program-period-history-details.button";
import React from "react";
import NumberFormat from "react-number-format";
import { formatDate, humanizeDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

export const ProgramPeriodHistoryRow: React.FC<ProgramPeriodHistoryRowProps> = React.memo(
  ({ period, currency }) => {
    const haveInfo =
      !!period.investorsDeposit ||
      !!period.investorsWithdraw ||
      !!period.managerDeposit ||
      !!period.managerWithdraw ||
      !!period.investorsProfitWithdraw ||
      !!period.platformSuccessFee ||
      !!period.managerCommissionRebate;
    return (
      <>
        <TableRow stripy>
          <TableCell>{period.number}</TableCell>
          <TableCell>{formatDate(period.dateFrom)}</TableCell>
          <TableCell>{humanizeDate(0, period.periodLength)}</TableCell>
          <TableCell>
            <NumberFormat
              value={formatCurrencyValue(period.balance, currency)}
              displayType="text"
              thousandSeparator=" "
              suffix={` ${currency}`}
            />
          </TableCell>
          <TableCell>
            <Profitability
              value={period.profit}
              prefix={PROFITABILITY_PREFIX.SIGN}
            >
              <NumberFormat
                value={formatCurrencyValue(period.profit, currency)}
                thousandSeparator=" "
                displayType="text"
                allowNegative={false}
                suffix={` ${currency}`}
              />
            </Profitability>
          </TableCell>
          <TableCell className="program-period-history-row__details-cell">
            <div className="program-period-history-row__investors-container">
              <NumberFormat value={period.investors} displayType="text" />
            </div>
            {haveInfo && (
              <ProgramPeriodHistoryDetailsButton
                currency={currency}
                period={period}
              />
            )}
          </TableCell>
        </TableRow>
      </>
    );
  }
);

export interface ProgramPeriodHistoryRowProps {
  currency: CurrencyEnum;
  period: ProgramPeriodViewModel;
}
