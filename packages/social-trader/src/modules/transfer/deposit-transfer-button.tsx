import { GV_BTN_SIZE } from "components/gv-button";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { PrivateTradingAccountType } from "gv-api-web";
import TransferButton from "modules/transfer/transfer-button";
import { TRANSFER_CONTAINER } from "modules/transfer/transfer.types";
import React from "react";
import { useTranslation } from "react-i18next";

const _DepositTransferButton: React.FC<Props> = props => {
  const { accountType } = props;
  const [t] = useTranslation();
  return (
    <TransferButton
      {...props}
      size={GV_BTN_SIZE.MIDDLE}
      color={"primary"}
      variant={"contained"}
      label={t("buttons.deposit")}
      currentItemContainer={TRANSFER_CONTAINER.DESTINATION}
      sourceType={"Wallet"}
      destinationType={"PrivateTradingAccount"}
      title={t("transfer.deposit-to", {
        title: t(`dashboard-page.trading.asset-types.${accountType}`)
      })}
    />
  );
};

interface Props {
  currentItem: WalletItemType;
  onApply?: VoidFunction;
  accountType: PrivateTradingAccountType;
}

export const DepositTransferButton = React.memo(_DepositTransferButton);
