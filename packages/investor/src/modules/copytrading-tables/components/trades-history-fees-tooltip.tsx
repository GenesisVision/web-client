import { OrderSignalModel } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import FeeCommission from "shared/components/fee-commission/fee-commission";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";
import { formatValue } from "shared/utils/formatter";

const _FeesTooltip: React.FC<Props> = ({ trade, t }) => {
  return (
    <Tooltip
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      className="fees-tooltip"
      render={() => (
        <div className="fees-tooltip-container">
          <div className="fees-tooltip-container__header">
            <FeeCommission
              title={t(`investor.copytrading-tables.fees.trading`)}
              value={formatValue(trade.originalCommission, 8)}
              currency={trade.originalCommissionCurrency}
            />
            {trade.totalCommissionByType.map((commission, index) => (
              <FeeCommission
                key={index}
                title={t(`investor.copytrading-tables.fees.${commission.type}`)}
                value={formatValue(commission.amount, 8)}
                currency={commission.currency}
              />
            ))}
          </div>
          {trade.totalCommissionByType.length > 0 ? (
            <div className="fees-tooltip-container__footer">
              <FeeCommission
                className={"fee-commission__total"}
                title={t(`investor.copytrading-tables.fees.total`)}
                value={formatValue(trade.totalCommission, 8)}
                currency={trade.currency}
              />
            </div>
          ) : null}
        </div>
      )}
    >
      <div>{formatValue(trade.totalCommission, 8)}</div>
    </Tooltip>
  );
};

const TradesHistoryFeesTooltip = compose<React.FC<OwnProps>>(
  translate(),
  React.memo
)(_FeesTooltip);

export default TradesHistoryFeesTooltip;

interface Props extends InjectedTranslateProps, OwnProps {}

interface OwnProps {
  trade: OrderSignalModel;
}
