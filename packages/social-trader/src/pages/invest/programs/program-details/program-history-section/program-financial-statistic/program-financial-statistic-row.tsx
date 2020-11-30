import FeeCommission from "components/fee-commission/fee-commission";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { Row } from "components/row/row";
import { TableCell, TableRow } from "components/table/components";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { DEFAULT_DECIMAL_SCALE } from "constants/constants";
import { ProgramPeriodViewModel } from "gv-api-web";
import React from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import { formatDate, humanizeDate } from "utils/dates";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

interface Props {
  isExchange?: boolean;
  showCommissionRebateSometime: boolean;
  period: ProgramPeriodViewModel;
  currency: CurrencyEnum;
}

const HelpFees = styled.span`
  cursor: help;
`;

const _ProgramFinancialStatisticRow: React.FC<Props> = ({
  isExchange,
  period,
  currency,
  showCommissionRebateSometime
}) => {
  const {
    managerStatistic: { profit, balance, successFee, entryFee },
    managerDeposit,
    managerWithdraw,
    managerCommissionRebate
  } = period;

  const depositsWithdrawals = +formatValue(
    managerDeposit - managerWithdraw,
    DEFAULT_DECIMAL_SCALE
  );
  return (
    <TableRow stripy>
      {!isExchange && <TableCell>{period.number}</TableCell>}
      <TableCell>{formatDate(period.dateFrom)}</TableCell>
      {isExchange && (
        <TableCell>{humanizeDate(0, period.periodLength)}</TableCell>
      )}
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
          value={formatValue(successFee, 8)}
          suffix={` ${currency}`}
          displayType="text"
        />
      </TableCell>
      <TableCell>
        <NumberFormat
          value={formatValue(entryFee, 8)}
          suffix={` ${currency}`}
          displayType="text"
        />
      </TableCell>
      <TableCell>
        {depositsWithdrawals > 0 ? (
          <Tooltip
            horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
            render={() => (
              <TooltipContent>
                {managerDeposit > 0 && (
                  <Row size={"small"}>
                    <FeeCommission
                      title={"Deposits"}
                      value={managerDeposit}
                      currency={currency}
                    />
                  </Row>
                )}
                {managerWithdraw > 0 && (
                  <Row size={"small"}>
                    <FeeCommission
                      title={"Withdrawals"}
                      value={managerWithdraw}
                      currency={currency}
                    />
                  </Row>
                )}
              </TooltipContent>
            )}
          >
            <HelpFees>
              <Profitability
                prefix={PROFITABILITY_PREFIX.SIGN}
                value={depositsWithdrawals}
              >
                <NumberFormat
                  value={Math.abs(depositsWithdrawals)}
                  thousandSeparator=" "
                  displayType="text"
                  suffix={` ${currency}`}
                />
              </Profitability>
            </HelpFees>
          </Tooltip>
        ) : (
          <Profitability
            prefix={PROFITABILITY_PREFIX.SIGN}
            value={depositsWithdrawals}
          >
            <NumberFormat
              value={Math.abs(depositsWithdrawals)}
              thousandSeparator=" "
              displayType="text"
              suffix={` ${currency}`}
            />
          </Profitability>
        )}
      </TableCell>
      {showCommissionRebateSometime && (
        <TableCell>
          <NumberFormat
            value={formatCurrencyValue(managerCommissionRebate, currency)}
            displayType="text"
            suffix={` ${currency}`}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

const ProgramFinancialStatisticRow = React.memo(_ProgramFinancialStatisticRow);
export default ProgramFinancialStatisticRow;
