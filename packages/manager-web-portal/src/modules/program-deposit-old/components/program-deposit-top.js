import React from "react";
import { translate } from "react-i18next";
import { formatValue } from "shared/utils/formatter";

const ProgramDepositTop = ({ info, t, type }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("deposit-program.title")}</h2>
        <p>{info.title}</p>
      </div>
      <div className="dialog-field">
        <div className="dialog-field__description">
          {type === "fund" && t("deposit-program.available-to-invest-in-fund")}
          {type === "program" &&
            t("deposit-program.available-to-invest-in-program")}
        </div>
        <div className="dialog-field__value">
          {formatValue(info.availableToInvest)} GVT
        </div>
      </div>
      <div className="dialog-field">
        <div className="dialog-field__description">
          {t("deposit-program.available-in-wallet")}
        </div>
        <div className="dialog-field__value">
          {formatValue(info.availableInWallet)} GVT
        </div>
      </div>
    </div>
  );
};

ProgramDepositTop.propTypes = {};

export default translate()(ProgramDepositTop);
