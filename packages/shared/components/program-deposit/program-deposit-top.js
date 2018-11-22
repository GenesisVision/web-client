import React from "react";
import { translate } from "react-i18next";
import { formatValue } from "shared/utils/formatter";
import StatisticItem from "shared/components/statistic-item/statistic-item";

const ProgramDepositTop = ({ info, t }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("deposit-program.title")}</h2>
        <p>{info.title}</p>
      </div>
      <div className="dialog-field">
        <StatisticItem
          label={t("deposit-program.available-to-invest-in-program")}
          big
        >
          {formatValue(info.availableToInvest)} GVT
        </StatisticItem>
      </div>
      <div className="dialog-field">
        <StatisticItem label={t("deposit-program.available-in-wallet")} big>
          {formatValue(info.availableInWallet)} GVT
        </StatisticItem>
      </div>
    </div>
  );
};

ProgramDepositTop.propTypes = {};

export default translate()(ProgramDepositTop);
