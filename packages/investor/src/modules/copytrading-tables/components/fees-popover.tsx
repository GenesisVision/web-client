import { OrderSignalModel } from "gv-api-web";
import { ProviderFees } from "modules/copytrading-tables/components/provider-fee";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import Tooltip from "shared/components/tooltip/tooltip";
import { formatValue } from "shared/utils/formatter";

const _FeesPopover: React.FC<Props> = ({ trade, t }) => {
  const commission = formatValue(trade.totalCommission, 8);
  const providers = trade.providers.filter(
    provider => provider.fees.length > 0
  );
  if (commission === "0") return <div>{commission}</div>;
  const isOnlyOne = providers.length === 1;
  return (
    <Tooltip
      render={() => (
        <div className="fees-popover">
          {trade.tradingFee
            ? t(`investor.copytrading-tables.fees.trading`, trade.tradingFee)
            : null}
          {providers.map(provider => (
            <ProviderFees
              isOnlyOne={isOnlyOne}
              key={provider.programId}
              provider={provider}
            />
          ))}
        </div>
      )}
    >
      <div>{commission}</div>
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
