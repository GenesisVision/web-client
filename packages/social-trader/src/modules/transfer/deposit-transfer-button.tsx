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
import { SizesType } from "utils/types";

const _DepositTransferButton: React.FC<Props> = props => {
  const {
    outerCurrentItemContainerItems,
    accountType,
    size = "middle"
  } = props;
  const [t] = useTranslation();
  return (
    <TransferButton
      {...props}
      successMessage={"transfer:confirmation.deposit-success"}
      singleCurrentItemContainer={!outerCurrentItemContainerItems}
      size={size}
      color={"primary"}
      variant={"contained"}
      label={t("buttons.deposit")}
      currentItemContainer={TRANSFER_CONTAINER.DESTINATION}
      sourceType={"Wallet"}
      destinationType={accountType as InternalTransferRequestType}
      title={t("transfer:deposit-to", {
        title: t(`dashboard-page:trading.asset-types.${accountType}`)
      })}
    />
  );
};

interface Props {
  fixedSelects?: boolean;
  accountId?: string;
  outerCurrentItemContainerItems?: WalletItemType[];
  size?: SizesType;
  currentItem: WalletItemType;
  onApply: VoidFunction;
  accountType?: PrivateTradingAccountType | AssetTypeExt;
}

export const DepositTransferButton = React.memo(_DepositTransferButton);
