import { CopyTradingAccountInfo } from "gv-api-web";
import CopytradingTablesSection from "modules/copytrading-tables/components/copytrading-tables-section";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import DetailsBlock from "shared/components/details/details-block";
import Page from "shared/components/page/page";
import WalletBalanceButtons from "shared/components/wallet/components/wallet-balance/wallet-balance-buttons";
import WalletBalanceElements from "shared/components/wallet/components/wallet-balance/wallet-balance-elements";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useIsOpen from "shared/hooks/is-open.hook";
import TransferPopup from "shared/modules/transfer/transfer-popup";
import {
  TRANSFER_CONTAINER,
  TRANSFER_DIRECTION
} from "shared/modules/transfer/transfer.types";

const _WalletCopytradingAccount: React.FC<Props> = ({ t, account }) => {
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
  return (
    <Page title={t("wallet-copytrading-page.title")}>
      <div className="wallet-balance">
        <div className="wallet-balance__wrapper">
          <h1 className="wallet-balance__title">
            {account.currency}
            <span>&nbsp;{t("wallet-copytrading-page.title")}&nbsp;</span>
            <WalletImage
              url={account.logo}
              imageClassName="wallet-transactions__icon"
              alt={account.currency}
            />
          </h1>
          <WalletBalanceButtons
            handleAddFunds={setOpenAddFundsPopup}
            handleWithdraw={setOpenWithdrawPopup}
            isDepositEnabled={true}
            isWithdrawalEnabled={true}
          />
        </div>
        <WalletBalanceElements
          available={account.available}
          total={account.balance}
          currency={account.currency}
        />
      </div>
      <DetailsBlock>
        <CopytradingTablesSection
          title={t("wallet-copytrading-page.title")}
          currency={account.currency}
        />
      </DetailsBlock>
      <TransferPopup
        title={t("wallet-withdraw.title")}
        sourceType={TRANSFER_DIRECTION.COPYTRADING_ACCOUNT}
        currentItem={account}
        open={isOpenWithdrawPopup}
        onClose={setCloseWithdrawPopup}
      />
      <TransferPopup
        title={t("wallet-deposit.title")}
        currentItemContainer={TRANSFER_CONTAINER.DESTINATION}
        destinationType={TRANSFER_DIRECTION.COPYTRADING_ACCOUNT}
        currentItem={account}
        open={isOpenAddFundsPopup}
        onClose={setCloseAddFundsPopup}
      />
    </Page>
  );
};

interface OwnProps {
  account: CopyTradingAccountInfo;
}

interface Props extends OwnProps, WithTranslation {}

const WalletCopytradingAccount = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  React.memo
)(_WalletCopytradingAccount);
export default WalletCopytradingAccount;
