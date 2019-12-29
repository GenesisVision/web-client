import Tooltip from "components/tooltip/tooltip";
import { OrderSignalModel } from "gv-api-web";
import * as React from "react";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatValue } from "utils/formatter";

import TradesHistoryFeesTooltip from "./trades-history-fees-tooltip";

const _TradesHistoryFeesTooltipWithOwner: React.FC<Props> = ({ trade }) => {
  if (trade.totalCommissionByType)
    return (
      <TradesHistoryFeesTooltip trade={trade}>
        <span>{formatValue(trade.totalCommission, DEFAULT_DECIMAL_SCALE)}</span>
      </TradesHistoryFeesTooltip>
    );
  else
    return (
      <Tooltip
        render={() =>
          trade.showOriginalCommission ? (
            <div>
              {`${formatValue(
                trade.originalCommission,
                DEFAULT_DECIMAL_SCALE
              )} ${trade.originalCommissionCurrency}`}
            </div>
          ) : (
            <div>
              {`${formatValue(trade.commission, DEFAULT_DECIMAL_SCALE)} ${
                trade.originalCommissionCurrency
              }`}
            </div>
          )
        }
      >
        <span>{formatValue(trade.commission, DEFAULT_DECIMAL_SCALE)} </span>
      </Tooltip>
    );
};

interface Props {
  trade: OrderSignalModel;
}

const TradesHistoryFeesTooltipWithOwner = React.memo(
  _TradesHistoryFeesTooltipWithOwner
);
export default TradesHistoryFeesTooltipWithOwner;
