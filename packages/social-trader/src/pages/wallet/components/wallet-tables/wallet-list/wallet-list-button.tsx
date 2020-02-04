import { WalletData } from "gv-api-web";
import LineTransferButton from "pages/wallet/components/wallet-tables/buttons/line-transfer-button";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import LineDepositButton from "../buttons/line-deposit-button";
import LineWithdrawButton from "../buttons/line-withdraw-button";

const _WalletListButton: React.FC<IWalletListButton> = ({ wallet }) => {
  const {
    currency,
    isWithdrawalEnabled,
    isDepositEnabled,
    depositUrlCoindirect
  } = wallet;
  const [t] = useTranslation();
  const [location, setLocation] = useState();
  useEffect(() => {
    if (typeof window !== "undefined" && window.location)
      setLocation(window.location.href);
  }, [window]);
  return (
    <div className="wallet-list__buttons">
      {depositUrlCoindirect && (
        <div className="wallet-list__button">
          <a
            title={t("wallet-page.list.buy-with-card")}
            href={`${depositUrlCoindirect}&url=${location}`}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            {t("wallet-page.list.buy-with-card")}
          </a>
        </div>
      )}
      <LineTransferButton wallet={wallet} />
      <LineWithdrawButton currency={currency} disabled={!isWithdrawalEnabled} />
      <LineDepositButton currency={currency} disabled={!isDepositEnabled} />
    </div>
  );
};

interface IWalletListButton {
  wallet: WalletData;
}

const WalletListButton = React.memo(_WalletListButton);
export default WalletListButton;
