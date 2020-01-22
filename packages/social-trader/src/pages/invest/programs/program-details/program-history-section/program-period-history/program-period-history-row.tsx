import classNames from "classnames";
import Popover from "components/popover/popover";
import {
  PopoverContent,
  PopoverContentListItem
} from "components/popover/popover-content";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { TableCell, TableRow } from "components/table/components";
import withLoader from "decorators/with-loader";
import { ProgramPeriodViewModel } from "gv-api-web";
import useAnchor, { TAnchor } from "hooks/anchor.hook";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatDate, humanizeDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _ProgramPeriodHistoryPopupItem: React.FC<{
  label: string;
  value: number;
  currency: CurrencyEnum;
}> = ({ label, value, currency }) => (
  <PopoverContentListItem>
    <div className="details-trades__history-popup-item">
      <div className="details-trades__history-popup-item-name">{label}</div>
      <div className="details-trades__history-popup-item-value">
        {value} {currency}
      </div>
    </div>
  </PopoverContentListItem>
);
const ProgramPeriodHistoryPopupItem = withLoader(
  _ProgramPeriodHistoryPopupItem
);

const ProgramPeriodHistoryPopup: React.FC<ProgramPeriodHistoryPopupProps> = ({
  anchor,
  onClose,
  period,
  currency
}) => {
  const [t] = useTranslation();
  return (
    <Popover ownWidth anchorEl={anchor} onClose={onClose}>
      <PopoverContent type={"list"}>
        <ProgramPeriodHistoryPopupItem
          condition={!!period.investorsDeposit}
          label={t(
            "program-details-page.history.period-history.investors-deposit"
          )}
          value={period.investorsDeposit}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.investorsWithdraw}
          label={t(
            "program-details-page.history.period-history.investors-withdraw"
          )}
          value={period.investorsWithdraw}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.managerDeposit}
          label={t(
            "program-details-page.history.period-history.manager-deposit"
          )}
          value={period.managerDeposit}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.managerWithdraw}
          label={t(
            "program-details-page.history.period-history.manager-withdraw"
          )}
          value={period.managerWithdraw}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.investorsProfitWithdraw}
          label={t(
            "program-details-page.history.period-history.investors-profit-withdraw"
          )}
          value={period.investorsProfitWithdraw}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.platformSuccessFee}
          label={t(
            "program-details-page.history.period-history.platform-success-fee"
          )}
          value={period.platformSuccessFee}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.managerCommissionRebate}
          label={t(
            "program-details-page.history.period-history.manager-commission-rebate"
          )}
          value={period.managerCommissionRebate}
          currency={currency}
        />
      </PopoverContent>
    </Popover>
  );
};

export const ProgramPeriodHistoryRow: React.FC<
  ProgramPeriodHistoryRowProps
> = React.memo(({ period, currency }) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
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
      {haveInfo && (
        <ProgramPeriodHistoryPopup
          period={period}
          currency={currency}
          anchor={anchor}
          onClose={clearAnchor}
        />
      )}
      <TableRow
        stripy
        onClick={setAnchor}
        className={classNames({ "table__row--clickable": haveInfo })}
      >
        <TableCell className="details-trades__cell--period">
          {period.number}
        </TableCell>
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
        <TableCell>
          <NumberFormat value={period.investors} displayType="text" />
        </TableCell>
      </TableRow>
    </>
  );
});

interface ProgramPeriodHistoryRowProps {
  currency: CurrencyEnum;
  period: ProgramPeriodViewModel;
}

interface ProgramPeriodHistoryPopupProps extends ProgramPeriodHistoryRowProps {
  anchor: TAnchor;
  onClose: () => void;
}
