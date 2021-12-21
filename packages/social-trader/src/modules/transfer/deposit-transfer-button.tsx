import { WalletItemType } from "components/wallet-select/wallet-select";
import {
  AssetTypeExt,
  Currency,
  InternalTransferRequestType,
  PrivateTradingAccountType
} from "gv-api-web";
import { TRANSFER_CONTAINER } from "modules/transfer/transfer.types";
import TransferButton, {
  TRANSFER_TYPE
} from "modules/transfer/transfer-button";
import React from "react";
import { useTranslation } from "react-i18next";
import { Sizeable } from "utils/types";

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
      transferType={TRANSFER_TYPE.DEPOSIT}
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

interface Props extends Sizeable {
  accountId?: string;
  outerCurrentItemContainerItems?: WalletItemType[];
  supportedCurrencies?: Currency[];
  isExchangeAccount?: boolean;
  currentItem: WalletItemType;
  onApply: VoidFunction;
  accountType?: PrivateTradingAccountType | AssetTypeExt;
}

export const DepositTransferButton = React.memo(_DepositTransferButton);
