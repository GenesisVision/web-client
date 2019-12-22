import { GV_BTN_SIZE } from "components/gv-button";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { AssetTypeExt, PrivateTradingAccountType } from "gv-api-web";
import TransferButton from "modules/transfer/transfer-button";
import { TRANSFER_CONTAINER } from "modules/transfer/transfer.types";
import React from "react";
import { useTranslation } from "react-i18next";

const _WithdrawTransferButton: React.FC<Props> = props => {
  const { accountType } = props;
  const [t] = useTranslation();
  return (
    <TransferButton
      {...props}
      size={GV_BTN_SIZE.MIDDLE}
      label={t("buttons.withdraw")}
      title={t("transfer.withdraw-from", {
        title: t(`dashboard-page.trading.asset-types.${accountType}`)
      })}
      currentItemContainer={TRANSFER_CONTAINER.SOURCE}
      sourceType={"PrivateTradingAccount"}
      destinationType={"Wallet"}
    />
  );
};

interface Props {
  currentItem: WalletItemType;
  onApply?: VoidFunction;
  accountType?: PrivateTradingAccountType | AssetTypeExt;
}

export const WithdrawTransferButton = React.memo(_WithdrawTransferButton);
