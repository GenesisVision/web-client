import { CopyTradingAccountInfo } from "gv-api-web";
import CopytradingTablesSection from "modules/copytrading-tables/components/copytrading-tables-section";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Page from "shared/components/page/page";
import WalletBalanceButtons from "shared/components/wallet/components/wallet-balance/wallet-balance-buttons";
import WalletBalanceElements from "shared/components/wallet/components/wallet-balance/wallet-balance-elements";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import TransferPopup from "shared/modules/transfer/transfer-popup";
import {
  TRANSFER_CONTAINER,
  TRANSFER_DIRECTION
} from "shared/modules/transfer/transfer.types";

class _WalletCopytradingAccount extends React.PureComponent<Props, State> {
  state = { isOpenAddFundsPopup: false, isOpenWithdrawPopup: false };
  handleOpenAddFundsPopup = () =>
    this.setState({
      isOpenAddFundsPopup: true
    });

  handleCloseAddFundsPopup = () =>
    this.setState({ isOpenAddFundsPopup: false });

  handleOpenWithdrawPopup = () => this.setState({ isOpenWithdrawPopup: true });

  handleCloseWithdrawPopup = () =>
    this.setState({ isOpenWithdrawPopup: false });

  render() {
    const { t, account } = this.props;
    const { isOpenAddFundsPopup, isOpenWithdrawPopup } = this.state;
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
              handleAddFunds={this.handleOpenAddFundsPopup}
              handleWithdraw={this.handleOpenWithdrawPopup}
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
        <CopytradingTablesSection
          title={t("wallet-copytrading-page.title")}
          currency={account.currency}
        />
        <TransferPopup
          title={t("wallet-withdraw.title")}
          sourceType={TRANSFER_DIRECTION.COPYTRADING_ACCOUNT}
          currentItem={account}
          open={isOpenWithdrawPopup}
          onClose={this.handleCloseWithdrawPopup}
        />
        <TransferPopup
          title={t("wallet-deposit.title")}
          currentItemContainer={TRANSFER_CONTAINER.DESTINATION}
          destinationType={TRANSFER_DIRECTION.COPYTRADING_ACCOUNT}
          currentItem={account}
          open={isOpenAddFundsPopup}
          onClose={this.handleCloseAddFundsPopup}
        />
      </Page>
    );
  }
}

interface OwnProps {
  account: CopyTradingAccountInfo;
}

interface Props extends OwnProps, InjectedTranslateProps {}
interface State {
  isOpenAddFundsPopup: boolean;
  isOpenWithdrawPopup: boolean;
}

const WalletCopytradingAccount = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate()
)(_WalletCopytradingAccount);
export default WalletCopytradingAccount;
