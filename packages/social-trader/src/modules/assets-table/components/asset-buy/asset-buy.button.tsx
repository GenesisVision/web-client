import { Button } from "components/button/button";
import { Center } from "components/center/center";
import { CHIP_TYPE } from "components/chip/chip";
import ChipButton from "components/chip/chip-button";
import { RowItem } from "components/row-item/row-item";
import useIsOpen from "hooks/is-open.hook";
import WalletAddFundsPopup from "modules/wallet-add-funds/wallet-add-funds-popup";
import WalletBnbDepositPopup from "modules/wallet-bnb-popup/wallet-bnb-deposit-popup";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Clickable, CurrencyEnum } from "utils/types";

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
      {currency === "BNB" ? (
        <WalletBnbDepositPopup
          currentCurrency={currency}
          onClose={setClosePopup}
          open={isOpenPopup}
        />
      ) : (
        <WalletAddFundsPopup
          currentCurrency={currency}
          onClose={setClosePopup}
          open={isOpenPopup}
        />
      )}
    </>
  );
};

interface IFullButtonProps extends Clickable {
  disabled?: boolean;
}

const Icon = styled(RowItem)`
  font-size: 18px;
`;

const FullButton: React.FC<IFullButtonProps> = React.memo(
  ({ disabled, onClick }) => {
    const [t] = useTranslation();
    const label = t("wallet-page:deposit");
    return (
      <Button
        className={label}
        size={"large"}
        disabled={disabled}
        onClick={onClick}
      >
        <Center>
          <Icon size={"small"}>+</Icon>
          <RowItem>{label}</RowItem>
        </Center>
      </Button>
    );
  }
);

interface ISmallButtonProps extends Clickable {
  disabled?: boolean;
}

const SmallButton: React.FC<ISmallButtonProps> = React.memo(
  ({ onClick, disabled }) => {
    const [t] = useTranslation();
    const label = t("wallet-page:deposit");
    return (
      <ChipButton
        disabled={disabled}
        className={label}
        onClick={onClick}
        size={"small"}
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
