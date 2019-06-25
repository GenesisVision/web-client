import { OrderSignalProgramInfo } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import StatisticItem from "shared/components/statistic-item/statistic-item";

const _ProviderFees: React.FC<Props> = ({ provider, isOnlyOne, t }) => {
  const { program, fees } = provider;
  return (
    <div className="provider-fees">
      {!isOnlyOne ? (
        <div className="provider-fees__avatar">{program.title}</div>
      ) : null}
      {fees.map(fee => {
        return (
          <StatisticItem
            label={t(`investor.copytrading-tables.fees.${fee.type}`)}
          >
            {`-${fee.amount} ${fee.currency}`}
          </StatisticItem>
        );
      })}
    </div>
  );
};

export const ProviderFees = compose<React.FC<OwnProps>>(
  translate(),
  React.memo
)(_ProviderFees);

interface OwnProps {
  provider: OrderSignalProgramInfo;
  isOnlyOne: boolean;
}

interface Props extends InjectedTranslateProps, OwnProps {}
