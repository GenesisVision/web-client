import "./wallet-deposit.scss";

import { CHIP_SIZE, CHIP_TYPE } from "components/chip/chip";
import ChipButton from "components/chip/chip-button";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import WalletAddFundsPopup from "modules/wallet-add-funds/wallet-add-funds-popup";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

const _WalletDeposit: React.FC<Props> = ({
  type,
  disabled,
  currency = "GVT"
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const Button =
    type === WALLET_DEPOSIT_BUTTON_TYPE.SMALL ? SmallButton : FullButton;
  return (
    <>
      <Button disabled={disabled} onClick={setOpenPopup} />
      <WalletAddFundsPopup
        currentCurrency={currency}
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
    <GVButton size={GV_BTN_SIZE.LARGE} disabled={disabled} onClick={onClick}>
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
      <ChipButton
        onClick={onClick}
        size={CHIP_SIZE.SMALL}
        chipLabel={"+"}
        type={CHIP_TYPE.POSITIVE}
      />
    );
  }
);

interface Props {
  currency?: CurrencyEnum;
  disabled?: boolean;
  type?: WALLET_DEPOSIT_BUTTON_TYPE;
}

export enum WALLET_DEPOSIT_BUTTON_TYPE {
  SMALL = "SMALL",
  FULL = "FULL"
}

const WalletDeposit = React.memo(_WalletDeposit);
export default WalletDeposit;
