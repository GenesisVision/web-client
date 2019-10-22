import { WalletData } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Page from "shared/components/page/page";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import useIsOpen from "shared/hooks/is-open.hook";
import TransferPopup from "shared/modules/transfer/transfer-popup";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import WalletWithdrawPopup from "shared/modules/wallet-withdraw/wallet-withdraw-popup";

import WalletBalanceButtons from "./wallet-balance/wallet-balance-buttons";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletTables from "./wallet-tables/wallet-tables";

const _WalletCurrency: React.FC<Props> = ({ data: info }) => {
  const [t] = useTranslation();
  const [
    isOpenAddFundsPopup,
    setOpenAddFundsPopup,
    setCloseAddFundsPopup
  ] = useIsOpen();
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
            handleAddFunds={setOpenAddFundsPopup}
            handleWithdraw={setOpenWithdrawPopup}
            handleTransfer={setOpenTransferPopup}
            isDepositEnabled={info.isDepositEnabled}
            isWithdrawalEnabled={info.isWithdrawalEnabled}
          />
        </div>
        <WalletBalanceElements
          available={info.available}
          pending={info.pending}
          total={info.total}
          invested={info.invested}
          currency={info.currency}
        />
      </div>
      <WalletTables currency={info.currency} />
      <WalletAddFundsPopup
        currentWallet={info}
        open={isOpenAddFundsPopup}
        onClose={setCloseAddFundsPopup}
      />
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
