import { OrderSignalModel } from "gv-api-web";
import { ProviderFees } from "modules/copytrading-tables/components/provider-fee";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Tooltip from "shared/components/tooltip/tooltip";
import { formatValue } from "shared/utils/formatter";

const getCommission = (trade: OrderSignalModel) => {
  let commission = trade.tradingFee ? trade.tradingFee.amount : 0;
  trade.providers.forEach(provider => {
    provider.fees.forEach(fee => {
      commission += fee.amount;
    });
  });
  return formatValue(commission, 8);
};

const _FeesPopover: React.FC<Props> = ({ trade, t }) => {
  const commission = getCommission(trade);
  const providers = trade.providers.filter(
    provider => provider.fees.length > 0
  );
  if (commission === "0") return <div>{trade.totalCommission}</div>;
  const isOnlyOne = providers.length === 1;
  return (
    <Tooltip
      render={() => (
        <div className="fees-popover">
          <StatisticItem label={t(`investor.copytrading-tables.fees.trading`)}>
            {`${trade.originalCommission} ${trade.originalCommissionCurrency}`}
          </StatisticItem>
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
