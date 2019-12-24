import { WalletData } from "gv-api-web";
import TransferButton, {
  WALLET_BUTTON_TYPE
} from "modules/transfer/transfer-button";
import { TRANSFER_CONTAINER } from "modules/transfer/transfer.types";
import * as React from "react";
import { useTranslation } from "react-i18next";

import LineWalletButton from "./line-wallet-button";

export const _LineTransferButton: React.FC<Props> = ({ wallet }) => {
  const [t] = useTranslation();
  return (
    <LineWalletButton title={t("wallet-page.buttons.internal-transfer")}>
      <TransferButton
        type={WALLET_BUTTON_TYPE.SMALL}
        withIcon
        currentItem={wallet}
        currentItemContainer={TRANSFER_CONTAINER.SOURCE}
        sourceType={"Wallet"}
        destinationType={"Wallet"}
      />
    </LineWalletButton>
  );
};

interface Props {
  wallet: WalletData;
}

const LineTransferButton = React.memo(_LineTransferButton);
export default LineTransferButton;
