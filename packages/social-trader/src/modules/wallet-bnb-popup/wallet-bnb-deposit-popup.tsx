import Dialog from "components/dialog/dialog";
import useIsOpen from "hooks/is-open.hook";
import WalletAddFundsContainer from "modules/wallet-add-funds/components/wallet-add-funds-container";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import WalletBnbPopup from "./wallet-bnb-popup";

const _WalletBnbDepositPopup: React.FC<Props> = ({
  onClose,
  currentCurrency,
  open
}) => {
  const [confirmed, setConfirmed] = useIsOpen();
  const [t] = useTranslation();
  return (
    <Dialog open={open} onClose={onClose}>
      {confirmed ? (
        <WalletAddFundsContainer currentCurrency={currentCurrency} />
      ) : (
          <WalletBnbPopup
            text={t("wallet-page:bnb-popup-text.deposit")}
            title={t("wallet-page:deposit")}
            changePopup={setConfirmed}
          />
        )}
    </Dialog>
  );
};

interface Props {
  currentCurrency: CurrencyEnum;
  open: boolean;
  onClose: VoidFunction;
}

const WalletBnbDepositPopup = React.memo(_WalletBnbDepositPopup);
export default WalletBnbDepositPopup;
