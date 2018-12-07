import React from "react";
import { translate } from "react-i18next";
import { formatValue } from "shared/utils/formatter";

import StatisticItem from "../statistic-item/statistic-item";

const DepositTop = ({ info, t, program }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{program ? t("deposit-asset.title") : t("deposit-asset.title")}</h2>
        <p>{info.title}</p>
      </div>
      <div className="dialog-field">
        {program && (
          <StatisticItem
            label={t("deposit-asset.program.available-to-invest")}
            big
          >
            {formatValue(info.availableToInvest)} GVT
          </StatisticItem>
        )}
        <StatisticItem
          label={
            program
              ? t("deposit-asset.program.available-in-wallet")
              : t("deposit-asset.fund.available-to-invest")
          }
          big
        >
          {formatValue(info.availableInWallet)} GVT
        </StatisticItem>
      </div>
    </div>
  );
};

DepositTop.propTypes = {};

export default translate()(DepositTop);
