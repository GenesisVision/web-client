import Tooltip from "components/tooltip/tooltip";
import { OrderSignalModel } from "gv-api-web";
import * as React from "react";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatValue } from "utils/formatter";

import TradesHistoryFeesTooltip from "./trades-history-fees-tooltip";

const _TradesHistoryFeesTooltipWithOwner: React.FC<Props> = ({
  trade,
  children
}) => {
  if (trade.totalCommissionByType)
    return <TradesHistoryFeesTooltip trade={trade} />;
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
        {children}
      </Tooltip>
    );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  trade: OrderSignalModel;
}

const TradesHistoryFeesTooltipWithOwner = React.memo(
  _TradesHistoryFeesTooltipWithOwner
);
export default TradesHistoryFeesTooltipWithOwner;
