import WalletImage from "components/avatar/wallet-image/wallet-image";
import Page from "components/page/page";
import { withBlurLoader } from "decorators/with-blur-loader";
import { WalletData } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import TransferPopup from "modules/transfer/transfer-popup";
import WalletWithdrawPopup from "modules/wallet-withdraw/wallet-withdraw-popup";
import * as React from "react";
import { useTranslation } from "react-i18next";

import WalletBalanceButtons from "./wallet-balance/wallet-balance-buttons";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletTables from "./wallet-tables/wallet-tables";

const _WalletCurrency: React.FC<Props> = ({ data: info }) => {
  const [t] = useTranslation();
  const [
    isOpenWithdrawPopup,
    setOpenWithdrawPopup,
    setCloseWithdrawPopup
  ] = useIsOpen();
  const [
    isOpenTransferPopup,
    setOpenTransferPopup,
    setCloseTransferPopup
  ] = useIsOpen();
  return (
    <Page title={info.title}>
      <div className="wallet-balance">
        <div className="wallet-balance__wrapper">
          <h1 className="wallet-balance__title">
            {info.title}
            <span>&nbsp;{t("wallet-page.wallet")}</span>
            <WalletImage
              url={info.logo}
              imageClassName="wallet-balance__title-icon"
              alt={info.currency}
            />
          </h1>
          <WalletBalanceButtons
            handleWithdraw={setOpenWithdrawPopup}
            handleTransfer={setOpenTransferPopup}
            isDepositEnabled={info.isDepositEnabled}
            isWithdrawalEnabled={info.isWithdrawalEnabled}
          />
        </div>
        <WalletBalanceElements
          available={info.available}
          pending={info.trading}
          total={info.total}
          invested={info.invested}
          currency={info.currency}
        />
      </div>
      <WalletTables currency={info.currency} />
      <WalletWithdrawPopup
        currentWallet={info}
        open={isOpenWithdrawPopup}
        onClose={setCloseWithdrawPopup}
      />
      <TransferPopup
        currentItem={info}
        open={isOpenTransferPopup}
        onClose={setCloseTransferPopup}
      />
    </Page>
  );
};

interface Props {
  data: WalletData;
}

const WalletCurrency = withBlurLoader(React.memo(_WalletCurrency));
export default WalletCurrency;
