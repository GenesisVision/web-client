import clsx from "clsx";
import AssetStatusLabel from "components/asset-status/asset-status-label";
import styles from "components/fee-commission/fee-commission.module.scss";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { TableCell, TableRow } from "components/table/components";
import { DEFAULT_DECIMAL_SCALE, STATUS } from "constants/constants";
import { SignalSubscriber } from "gv-api-web";
import React from "react";
import NumberFormat from "react-number-format";
import { formatDate } from "utils/dates";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

import SubscriptionsFeesTooltip from "./program-subscriptions-fees-tooltip";

const _ProgramSubscriptionsRow: React.FC<Props> = ({
  subscription,
  currency
}) => (
  <TableRow stripy>
    <TableCell>{subscription.number}</TableCell>
    <TableCell>{subscription.trades}</TableCell>
    <TableCell>
      <Profitability
        value={formatCurrencyValue(subscription.profit, currency)}
        prefix={PROFITABILITY_PREFIX.SIGN}
      >
        <NumberFormat
          value={formatCurrencyValue(subscription.profit, currency)}
          thousandSeparator=" "
          displayType="text"
          allowNegative={false}
        />
      </Profitability>
    </TableCell>
    <TableCell>
      <SubscriptionsFeesTooltip subscription={subscription}>
        <span
          className={clsx({
            [styles["fee-commission__value"]]:
              subscription.totalCommissionAmount > 0
          })}
        >
          {formatValue(
            subscription.totalCommissionAmount,
            DEFAULT_DECIMAL_SCALE
          )}
        </span>
      </SubscriptionsFeesTooltip>
    </TableCell>
    <TableCell>{subscription.volume}</TableCell>
    <TableCell>{formatDate(subscription.subscriptionDate)}</TableCell>
    <TableCell>
      {subscription.unsubscriptionDate &&
        formatDate(subscription.unsubscriptionDate)}
    </TableCell>
    <TableCell>
      <AssetStatusLabel status={subscription.status as STATUS}>
        {subscription.status}
      </AssetStatusLabel>
    </TableCell>
  </TableRow>
);

interface Props {
  currency: CurrencyEnum;
  subscription: SignalSubscriber;
}

const ProgramSubscriptionsRow = React.memo(_ProgramSubscriptionsRow);
export default ProgramSubscriptionsRow;
