import ImageBaseElement from "components/avatar/image-base.element";
import { Button } from "components/button/button";
import { Center } from "components/center/center";
import ChipButton from "components/chip/chip-button";
import { RowItem } from "components/row-item/row-item";
import useIsOpen from "hooks/is-open.hook";
import ArrowIcon from "media/arrow-up.svg";
import WalletWithdrawPopup from "modules/wallet-withdraw/wallet-withdraw-popup";
import { walletsSelector } from "pages/wallet/reducers/wallet.reducers";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { safeGetElemFromArray } from "utils/helpers";
import { Clickable, CurrencyEnum } from "utils/types";

import styles from "./wallet-withdraw.button.module.scss";

const _WalletWithdrawButton: React.FC<Props> = ({
  type,
  disabled,
  currency
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const wallets = useSelector(walletsSelector);
  const Button =
    type === WALLET_DEPOSIT_BUTTON_TYPE.SMALL ? SmallButton : FullButton;
  return (
    <>
      <Button disabled={disabled} onClick={setOpenPopup} />
      <WalletWithdrawPopup
        currentWallet={safeGetElemFromArray(
          wallets,
          wallet => wallet.currency === currency
        )}
        open={isOpenPopup}
        onClose={setClosePopup}
      />
    </>
  );
};

interface IFullButtonProps extends Clickable {
  disabled?: boolean;
}
const FullButton: React.FC<IFullButtonProps> = React.memo(
  ({ disabled, onClick }) => {
    const [t] = useTranslation();
    const label = t("wallet-page:withdraw");
    return (
      <Button
        className={label}
        size={"large"}
        color="secondary"
        variant="outlined"
        disabled={disabled}
        onClick={onClick}
      >
        <Center>
          <RowItem size={"small"}>
            <ImageBaseElement
              className={styles["wallet-withdraw-button__full-button-icon"]}
              src={ArrowIcon}
              alt={t("wallet-page:buttons.withdraw")}
            />
          </RowItem>
          <RowItem>{label}</RowItem>
        </Center>
      </Button>
    );
  }
);

const SmallButton: React.FC<Clickable> = React.memo(({ onClick }) => {
  const [t] = useTranslation();
  const label = t("wallet-page:withdraw");
  return (
    <ChipButton
      className={label}
      onClick={onClick}
      size={"small"}
      chipLabel={<ImageBaseElement src={ArrowIcon} alt={label} />}
    />
  );
});

interface Props {
  currency: CurrencyEnum;
  disabled?: boolean;
  type?: WALLET_DEPOSIT_BUTTON_TYPE;
}

export enum WALLET_DEPOSIT_BUTTON_TYPE {
  SMALL = "SMALL",
  FULL = "FULL"
}

const WalletWithdrawButton = React.memo(_WalletWithdrawButton);
export default WalletWithdrawButton;
