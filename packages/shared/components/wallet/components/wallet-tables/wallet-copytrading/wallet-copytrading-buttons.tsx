import "../wallet-list/wallet-list.scss";

import { CopyTradingAccountInfo } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import translate from "react-i18next/src/translate";

import DepositButton from "../buttons/deposit-button";
import WithdrawButton from "../buttons/withdraw-button";

const _WalletCopytradingButtons: React.FC<Props & InjectedTranslateProps> = ({
  t,
  account,
  handleOpenWithdrawPopup,
  handleOpenAddFundsPopup
}) => (
  <>
    <WithdrawButton handleOpen={handleOpenWithdrawPopup(account)} />
    <DepositButton handleOpen={handleOpenAddFundsPopup(account)} />
  </>
);

interface Props {
  account?: CopyTradingAccountInfo;
  handleOpenWithdrawPopup(
    account?: CopyTradingAccountInfo
  ): (event: React.MouseEvent<HTMLElement>) => void;
  handleOpenAddFundsPopup(
    account?: CopyTradingAccountInfo
  ): (event: React.MouseEvent<HTMLElement>) => void;
}

const WalletCopytradingButtons = translate()(
  React.memo(_WalletCopytradingButtons)
);
export default WalletCopytradingButtons;
