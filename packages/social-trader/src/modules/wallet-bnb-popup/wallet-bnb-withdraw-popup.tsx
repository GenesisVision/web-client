import Dialog from "components/dialog/dialog";
import { WalletData } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import dynamic from "next/dist/next-server/lib/dynamic";
import React from "react";
import { useTranslation } from "react-i18next";

import WalletBnbPopup from "./wallet-bnb-popup";

const WalletWithdrawContainer = dynamic(
  () => import("modules/wallet-withdraw/components/wallet-withdraw-container")
);

const _WalletBnbWithdrawPopup: React.FC<Props> = ({
  open,
  onClose,
  currentWallet
}) => {
  const [confirmed, setConfirmed] = useIsOpen();
  const [t] = useTranslation();
  return (
    <Dialog open={open} onClose={onClose}>
      {confirmed ? (
        <WalletWithdrawContainer currentWallet={currentWallet} />
      ) : (
          <WalletBnbPopup
            text={t("wallet-page:bnb-popup-text.withdrawal")}
            title={t("wallet-page:withdrawal")}
            changePopup={setConfirmed}
          />
        )}
    </Dialog>
  );
};

interface Props {
  currentWallet: WalletData;
  open: boolean;
  onClose(): void;
}

const WalletBnbWithdrawPopup = React.memo(_WalletBnbWithdrawPopup);
export default WalletBnbWithdrawPopup;
