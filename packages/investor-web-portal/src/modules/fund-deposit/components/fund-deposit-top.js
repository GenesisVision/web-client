import React from "react";
import { translate } from "react-i18next";
import { formatValue } from "utils/formatter";

const FundDepositTop = ({ info, t }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("deposit-fund.title")}</h2>
        <p>{info.title}</p>
      </div>
      <div className="dialog-field">
        <div className="dialog-field__description">
          {t("deposit-fund.available-to-invest-in-fund")}
        </div>
        <div className="dialog-field__value">
          {formatValue(info.availableInWallet)} GVT
        </div>
      </div>
      {/*<div className="dialog-field">
        <div className="dialog-field__description">
          {t("deposit-fund.available-in-wallet")}
        </div>
        <div className="dialog-field__value">
          {formatValue(info.availableInWallet)} GVT
        </div>
      </div>*/}
    </div>
  );
};

FundDepositTop.propTypes = {};

export default translate()(FundDepositTop);
