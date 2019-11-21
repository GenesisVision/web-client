import "./wallet-deposit.scss";

import Chip, { CHIP_TYPE } from "components/chip/chip";
import GVButton from "components/gv-button";
import { walletsSelector } from "components/wallet/reducers/wallet.reducers";
import useIsOpen from "hooks/is-open.hook";
import WalletAddFundsPopup from "modules/wallet-add-funds/wallet-add-funds-popup";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const _WalletDeposit: React.FC<Props> = ({ type, disabled }) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const wallets = useSelector(walletsSelector);
  const Button =
    type === WALLET_DEPOSIT_BUTTON_TYPE.SMALL ? SmallButton : FullButton;
  return (
    <>
      <Button disabled={disabled} onClick={setOpenPopup} />
      <WalletAddFundsPopup
        currentWallet={wallets.find(wallet => wallet.currency === "GVT")!}
        onClose={setClosePopup}
        open={isOpenPopup}
      />
    </>
  );
};

const FullButton: React.FC<{
  disabled?: boolean;
  onClick: () => void;
}> = React.memo(({ disabled, onClick }) => {
  const [t] = useTranslation();
  return (
    <GVButton disabled={disabled} onClick={onClick}>
      <>
        <span className="wallet-deposit__full-button-icon">+</span>
        {t("wallet-page.deposit")}
      </>
    </GVButton>
  );
});

const SmallButton: React.FC<{ onClick: () => void }> = React.memo(
  ({ onClick }) => {
    return (
      <div className="wallet-deposit__small-button" onClick={onClick}>
        <Chip type={CHIP_TYPE.POSITIVE}>+</Chip>
      </div>
    );
  }
);

interface Props {
  disabled?: boolean;
  type?: WALLET_DEPOSIT_BUTTON_TYPE;
}

export enum WALLET_DEPOSIT_BUTTON_TYPE {
  SMALL = "SMALL",
  FULL = "FULL"
}

const WalletDeposit = React.memo(_WalletDeposit);
export default WalletDeposit;
