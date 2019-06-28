import { OrderSignalModel } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import FeeCommission from "shared/components/fee-commission/fee-commission";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";
import { formatCurrencyValue } from "shared/utils/formatter";

const _FeesTooltip: React.FC<Props> = ({ trade, t }) => {
  return (
    <Tooltip
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      className={"fees-tooltip"}
      render={() => (
        <div className="profile-menu">
          <div className="profile-menu__header">
            <FeeCommission
              title={t(`investor.copytrading-tables.fees.trading`)}
              value={formatCurrencyValue(
                trade.originalCommission,
                trade.originalCommissionCurrency
              )}
              currency={trade.originalCommissionCurrency}
            />
            {trade.totalCommissionByType.map((commission, index) => {
              return (
                <FeeCommission
                  key={index}
                  title={t(
                    `investor.copytrading-tables.fees.${commission.type}`
                  )}
                  value={formatCurrencyValue(
                    commission.amount,
                    commission.currency
                  )}
                  currency={commission.currency}
                />
              );
            })}
          </div>
          {trade.totalCommissionByType.length > 0 ? (
            <div className={"fees-tooltip__footer "}>
              <FeeCommission
                title={t(`investor.copytrading-tables.fees.total`)}
                value={formatCurrencyValue(
                  trade.totalCommission,
                  trade.currency
                )}
                currency={trade.currency}
              />
            </div>
          ) : null}
        </div>
      )}
    >
      <div>{formatCurrencyValue(trade.totalCommission, trade.currency)}</div>
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
