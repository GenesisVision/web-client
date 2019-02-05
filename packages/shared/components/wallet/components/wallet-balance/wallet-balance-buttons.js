import "./wallet-balance.scss";

import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import ArrowIcon from "shared/media/arrow-up.svg";
import ConvertIcon from "shared/media/convert.svg";

const WalletBalanceButtons = ({ t, handleAddFunds, handleWithdraw }) => {
  return (
    <div className="wallet-balance__buttons">
      <GVButton onClick={handleAddFunds}>
        <span className="wallet-balance__button-icon wallet-balance__button-icon--sign">
          +
        </span>
        {t("wallet-page.add-funds")}
      </GVButton>
      <GVButton color="secondary" variant="outlined" onClick={handleWithdraw}>
        <img
          className="wallet-balance__button-icon"
          src={ArrowIcon}
          alt="Arrow icon"
        />
        {t("wallet-page.withdraw")}
      </GVButton>
      <GVButton color="secondary" variant="outlined" onClick={handleWithdraw}>
        <img
          className="wallet-balance__button-icon"
          src={ConvertIcon}
          alt="Convert icon"
        />
        {t("wallet-page.convert")}
      </GVButton>
    </div>
  );
};

export default translate()(WalletBalanceButtons);
