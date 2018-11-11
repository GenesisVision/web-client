import React from "react";
import { translate } from "react-i18next";
import { formatValue } from "shared/utils/formatter";

const DepositTop = ({ info, t, program }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>
          {program ? t("deposit-program.title") : t("deposit-fund.title")}
        </h2>
        <p>{info.title}</p>
      </div>
      {program && (
        <div className="dialog-field">
          <div className="dialog-field__description">
            {t("deposit-program.available-to-invest-in-program")}
          </div>
          <div className="dialog-field__value">
            {formatValue(info.availableToInvest)} GVT
          </div>
        </div>
      )}
      <div className="dialog-field">
        <div className="dialog-field__description">
          {program
            ? t("deposit-program.available-in-wallet")
            : t("deposit-fund.available-to-invest-in-fund")}
        </div>
        <div className="dialog-field__value">
          {formatValue(info.availableInWallet)} GVT
        </div>
      </div>
    </div>
  );
};

DepositTop.propTypes = {};

export default translate()(DepositTop);
