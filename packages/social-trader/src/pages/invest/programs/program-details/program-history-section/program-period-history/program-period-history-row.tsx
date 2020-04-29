import { Center } from "components/center/center";
import { ProfitabilityValuePercent } from "components/profitability/profitability-value-percent";
import { RowItem } from "components/row-item/row-item";
import { TableCell, TableRow } from "components/table/components";
import { ProgramPeriodViewModel } from "gv-api-web";
import { ProgramPeriodHistoryDetailsButton } from "pages/invest/programs/program-details/program-history-section/program-period-history/program-period-history-details.button";
import React from "react";
import NumberFormat from "react-number-format";
import { formatDate, humanizeDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

import "./program-period-history-row.scss";

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
            <ProfitabilityValuePercent
              currency={currency}
              percent={period.profitPercent}
              value={period.profit}
            />
          </TableCell>
          <TableCell>
            <Center className="program-period-history-row__details-cell">
              <RowItem>
                <NumberFormat value={period.investors} displayType="text" />
              </RowItem>
              {haveInfo && (
                <RowItem>
                  <ProgramPeriodHistoryDetailsButton
                    currency={currency}
                    period={period}
                  />
                </RowItem>
              )}
            </Center>
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
