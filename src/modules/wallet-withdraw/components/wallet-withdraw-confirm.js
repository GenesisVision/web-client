import "./wallet-withdraw-confirm.scss";

import React from "react";
import { translate } from "react-i18next";
import PaperPlan from "shared/media/paper-plane.svg";

const WalletWithdrawConfirm = ({ t }) => {
  return (
    <div className="dialog__top dialog-confirm">
      <img className="dialog-confirm__image" src={PaperPlan} />
      <p>{t("wallet-withdraw.success")}</p>
    </div>
  );
};

export default translate()(WalletWithdrawConfirm);
