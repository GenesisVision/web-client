import { GV_BTN_SIZE } from "components/gv-button";
import { WalletItemType } from "components/wallet-select/wallet-select";
import {
  AssetTypeExt,
  InternalTransferRequestType,
  PrivateTradingAccountType
} from "gv-api-web";
import TransferButton from "modules/transfer/transfer-button";
import { TRANSFER_CONTAINER } from "modules/transfer/transfer.types";
import React from "react";
import { useTranslation } from "react-i18next";

const _DepositTransferButton: React.FC<Props> = props => {
  const { accountType, size = GV_BTN_SIZE.MIDDLE } = props;
  const [t] = useTranslation();
  return (
    <TransferButton
      {...props}
      successMessage={"transfer.confirmation.deposit-success"}
      singleCurrentItemContainer
      size={size}
      color={"primary"}
      variant={"contained"}
      label={t("buttons.deposit")}
      currentItemContainer={TRANSFER_CONTAINER.DESTINATION}
      sourceType={"Wallet"}
      destinationType={accountType as InternalTransferRequestType}
      title={t("transfer.deposit-to", {
        title: t(`dashboard-page.trading.asset-types.${accountType}`)
      })}
    />
  );
};

interface Props {
  size?: GV_BTN_SIZE;
  currentItem: WalletItemType;
  onApply: VoidFunction;
  accountType?: PrivateTradingAccountType | AssetTypeExt;
}

export const DepositTransferButton = React.memo(_DepositTransferButton);
