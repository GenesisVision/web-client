import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ASSET, ROLE, ROLE_ENV } from "shared/constants/constants";
import { formatCurrencyValue } from "shared/utils/formatter";

const _DepositTop: React.FC<DepositTopProps & InjectedTranslateProps> = ({
  t,
  asset,
  title,
  currency,
  availableToInvestBase
}) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("deposit-asset.title")}</h2>
        <p>{title}</p>
      </div>
      {asset === ASSET.PROGRAM && ROLE_ENV === ROLE.INVESTOR && (
        <div className="dialog-field">
          <StatisticItem
            label={t("deposit-asset.program.available-to-invest")}
            big
          >
            {`${formatCurrencyValue(
              availableToInvestBase!,
              currency!
            )} ${currency}`}
          </StatisticItem>
        </div>
      )}
    </div>
  );
};

const DepositTop = React.memo(translate()(_DepositTop));
export default DepositTop;

export interface DepositTopProps {
  currency?: string;
  title: string;
  availableToInvestBase?: number;
  asset: ASSET;
}
