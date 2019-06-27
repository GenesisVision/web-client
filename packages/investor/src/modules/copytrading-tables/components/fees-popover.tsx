import { OrderSignalModel } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";

const Commission: React.FC<{
  title: string;
  value: number;
  currency: string;
}> = ({ title, value, currency }) => (
  <div className={"fees-tooltip__commission"}>
    <span className={"fees-tooltip__title"}>{title}</span>
    <span className={"fees-tooltip__value"}>
      {value} <span className={"fees-tooltip__currency"}>{currency}</span>
    </span>
  </div>
);

const _FeesPopover: React.FC<Props> = ({ trade, t }) => {
  return (
    <Tooltip
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      className={"fees-tooltip"}
      render={() => (
        <div className="profile-menu">
          <div className="profile-menu__header">
            <Commission
              title={t(`investor.copytrading-tables.fees.trading`)}
              value={trade.originalCommission}
              currency={trade.originalCommissionCurrency}
            />
            {trade.totalCommissionByType.map((commission, index) => {
              return (
                <Commission
                  key={index}
                  title={t(
                    `investor.copytrading-tables.fees.${commission.type}`
                  )}
                  value={commission.amount * -1}
                  currency={commission.currency}
                />
              );
            })}
          </div>
          {trade.totalCommissionByType.length > 0 ? (
            <div className={"fees-tooltip__footer "}>
              <Commission
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

export const FeesPopover = compose<React.FC<OwnProps>>(
  translate(),
  React.memo
)(_FeesPopover);

interface Props extends InjectedTranslateProps, OwnProps {}

interface OwnProps {
  trade: OrderSignalModel;
}
