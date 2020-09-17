import { Center } from "components/center/center";
import Profitability from "components/profitability/profitability";
import { ProfitabilityValuePercent } from "components/profitability/profitability-value-percent";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { RowItem } from "components/row-item/row-item";
import { TableCell, TableRow } from "components/table/components";
import { ProgramPeriodViewModel } from "gv-api-web";
import { ProgramAnalyticsDetailsButton } from "pages/invest/programs/program-details/program-history-section/program-analytics/program-analytics-details.button";
import React from "react";
import NumberFormat from "react-number-format";
import { formatDate, humanizeDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

export interface ProgramAnalyticsRowProps {
  currency: CurrencyEnum;
  period: ProgramPeriodViewModel;
}

export const ProgramAnalyticsRow: React.FC<ProgramAnalyticsRowProps> = React.memo(
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
              value={formatCurrencyValue(period.profit, currency)}
              prefix={PROFITABILITY_PREFIX.SIGN}
            >
              <NumberFormat
                value={formatCurrencyValue(period.profit, currency)}
                suffix={` ${currency}`}
                allowNegative={false}
                displayType="text"
              />
            </Profitability>
          </TableCell>
          <TableCell>
            <Center>
              <RowItem wide>
                <NumberFormat value={period.investors} displayType="text" />
              </RowItem>
              {haveInfo && (
                <RowItem>
                  <ProgramAnalyticsDetailsButton
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
