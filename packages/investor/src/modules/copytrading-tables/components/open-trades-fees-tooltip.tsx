import { OrderSignalModel } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import FeeCommission from "shared/components/fee-commission/fee-commission";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";

const _FeesPopover: React.FC<Props> = ({ trade, t }) => {
  return (
    <Tooltip
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      className={"fees-tooltip"}
      render={() => (
        <div className="profile-menu">
          <div className="profile-menu__header">
            <FeeCommission
              title={t(`investor.copytrading-tables.fees.trading`)}
              value={trade.originalCommission}
              currency={trade.originalCommissionCurrency}
            />
            {trade.totalCommissionByType.map((commission, index) => {
              return (
                <FeeCommission
                  key={index}
                  title={t(
                    `investor.copytrading-tables.fees.${commission.type}`
                  )}
                  value={commission.amount}
                  currency={commission.currency}
                />
              );
            })}
          </div>
          {trade.totalCommissionByType.length > 0 ? (
            <div className={"fees-tooltip__footer "}>
              <FeeCommission
                title={t(`investor.copytrading-tables.fees.total`)}
                value={trade.totalCommission}
                currency={trade.currency}
              />
            </div>
          ) : null}
        </div>
      )}
    >
      <div>{trade.totalCommission}</div>
    </Tooltip>
  );
};

export const OpenTradesFeesTooltip = compose<React.FC<OwnProps>>(
  translate(),
  React.memo
)(_FeesPopover);

interface Props extends InjectedTranslateProps, OwnProps {}

interface OwnProps {
  trade: OrderSignalModel;
}
