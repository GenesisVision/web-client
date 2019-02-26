import { ProgramInvestInfo } from "gv-api-web";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ASSET, ROLE } from "shared/constants/constants";
import { formatCurrencyValue } from "shared/utils/formatter";

export interface IDepositTop {
  currency: string;
  info: ProgramInvestInfo;
  asset: ASSET;
  role: ROLE;
}
const DepositTop: React.FC<IDepositTop & InjectedTranslateProps> = ({
  currency,
  info,
  t,
  asset,
  role
}) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("deposit-asset.title")}</h2>
        <p>{info.title}</p>
      </div>
      <div className="dialog-field">
        {asset === ASSET.PROGRAM && role === ROLE.INVESTOR && (
          <StatisticItem
            label={t("deposit-asset.program.available-to-invest")}
            big
          >
            {formatCurrencyValue(info.availableToInvest, currency)} {currency}
          </StatisticItem>
        )}
      </div>
    </div>
  );
};

export default translate()(DepositTop);
