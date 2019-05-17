import "./wallet-balance.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import ArrowIcon from "shared/media/arrow-up.svg";
import ConvertIcon from "shared/media/convert.svg";

const _WalletBalanceButtons: React.FC<Props> = ({
  t,
  handleAddFunds,
  handleWithdraw,
  handleTransfer,
  isDepositEnabled,
  isWithdrawalEnabled
}) => (
  <div className="wallet-balance__buttons">
    <GVButton onClick={handleAddFunds} disabled={isDepositEnabled === false}>
      <>
        <span className="wallet-balance__button-icon wallet-balance__button-icon--sign">
          +
        </span>
        {t("wallet-page.deposit")}
      </>
    </GVButton>
    <GVButton
      color="secondary"
      variant="outlined"
      onClick={handleWithdraw}
      disabled={isWithdrawalEnabled === false}
    >
      <>
        <img
          className="wallet-balance__button-icon"
          src={ArrowIcon}
          alt="Arrow icon"
        />
        {t("wallet-page.withdraw")}
      </>
    </GVButton>
    <GVButton color="secondary" variant="outlined" onClick={handleTransfer}>
      <>
        <img
          className="wallet-balance__button-icon"
          src={ConvertIcon}
          alt="Convert icon"
        />
        {t("wallet-page.transfer")}
      </>
    </GVButton>
  </div>
);

interface Props extends InjectedTranslateProps {
  handleAddFunds: () => void;
  handleWithdraw: () => void;
  handleTransfer: () => void;
  isDepositEnabled?: boolean;
  isWithdrawalEnabled?: boolean;
}

const WalletBalanceButtons = React.memo(translate()(_WalletBalanceButtons));
export default WalletBalanceButtons;
