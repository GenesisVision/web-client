import Dialog from "components/dialog/dialog";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

const WalletAddFundsContainer = dynamic(() =>
  import("./components/wallet-add-funds-container")
);

const _WalletAddFundsPopup: React.FC<Props> = ({
  onClose,
  currentCurrency,
  open
}) => (
  <Dialog open={open} onClose={onClose}>
    <WalletAddFundsContainer currentCurrency={currentCurrency} />
  </Dialog>
);

interface Props {
  currentCurrency: CurrencyEnum;
  open: boolean;
  onClose: VoidFunction;
}

const WalletAddFundsPopup = React.memo(_WalletAddFundsPopup);
export default WalletAddFundsPopup;
