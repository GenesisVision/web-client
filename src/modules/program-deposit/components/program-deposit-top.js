import React from "react";
import { translate } from "react-i18next";

const ProgramDepositTop = ({ info, t }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("deposit-program.title")}</h2>
        <p>{info.title}</p>
      </div>
      <div className="dialog-field">
        <div className="dialog-field__description">
          {t("deposit-program.available-to-invest")}
        </div>
        <div className="dialog-field__value">{info.availableToInvest} GVT</div>
      </div>
      <div className="dialog-field">
        <div className="dialog-field__description">
          {t("deposit-program.available-in-wallet")}
        </div>
        <div className="dialog-field__value">{info.availableInWallet} GVT</div>
      </div>
    </div>
  );
};

ProgramDepositTop.propTypes = {};

export default translate()(ProgramDepositTop);
