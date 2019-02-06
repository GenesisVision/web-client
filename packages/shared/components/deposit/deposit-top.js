import React from "react";
import { translate } from "react-i18next";
import { formatCurrencyValue } from "shared/utils/formatter";

import StatisticItem from "../statistic-item/statistic-item";

const DepositTop = ({ info, t, program, investor }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{program ? t("deposit-asset.title") : t("deposit-asset.title")}</h2>
        <p>{info.title}</p>
      </div>
      <div className="dialog-field">
        {program && investor && (
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

DepositTop.propTypes = {};

export default translate()(DepositTop);
