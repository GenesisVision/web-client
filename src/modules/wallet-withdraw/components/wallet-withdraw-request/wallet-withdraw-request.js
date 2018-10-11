import "./wallet-withdraw-request.scss";

import React from "react";
import { translate } from "react-i18next";
import PaperPlan from "shared/media/paper-plane.svg";

const WalletWithdrawRequest = ({ t }) => {
  return (
    <div className="dialog__top dialog-withdraw-request">
      <img
        className="dialog-withdraw-request__image"
        src={PaperPlan}
        alt="Confirm withdrawal"
      />
      <p>{t("wallet-withdraw.withdraw-request")}</p>
    </div>
  );
};

export default translate()(WalletWithdrawRequest);
