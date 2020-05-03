import Dialog from "components/dialog/dialog";
import WalletAddFundsContainer from "modules/wallet-add-funds/components/wallet-add-funds-container";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

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
