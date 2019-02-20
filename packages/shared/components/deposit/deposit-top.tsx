import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { formatCurrencyValue } from "shared/utils/formatter";

import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ROLE } from "shared/constants/constants";
import { ProgramInvestInfo } from "gv-api-web";

export interface IDepositTop {
  info: ProgramInvestInfo;
  program: boolean;
  role: ROLE;
}
const DepositTop: React.FC<IDepositTop & InjectedTranslateProps> = ({
  info,
  t,
  program,
  role
}) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{program ? t("deposit-asset.title") : t("deposit-asset.title")}</h2>
        <p>{info.title}</p>
      </div>
      <div className="dialog-field">
        {program && role === ROLE.INVESTOR && (
          <StatisticItem
            label={t("deposit-asset.program.available-to-invest")}
            big
          >
            {formatCurrencyValue(info.availableToInvest, "GVT")} GVT
          </StatisticItem>
        )}
        <StatisticItem
          label={
            program
              ? t("deposit-asset.available-in-wallet")
              : t("deposit-asset.fund.available-to-invest")
          }
          big
        >
          {formatCurrencyValue(info.availableInWallet, "GVT")} GVT
        </StatisticItem>
      </div>
    </div>
  );
};

export default translate()(DepositTop);
