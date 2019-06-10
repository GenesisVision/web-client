import { MultiWalletFilters, WalletData } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Page from "shared/components/page/page";
import withLoader from "shared/decorators/with-loader";
import TransferPopup from "shared/modules/transfer/transfer-popup";
import { CurrentWallet } from "shared/modules/wallet-add-funds/components/wallet-add-funds-form";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import WalletWithdrawPopup from "shared/modules/wallet-withdraw/wallet-withdraw-popup";

import WalletBalanceButtons from "./wallet-balance/wallet-balance-buttons";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletContainer from "./wallet-container/wallet-container";

class _WalletCurrency extends React.PureComponent<Props, State> {
  state = {
    isOpenAddFundsPopup: false,
    isOpenWithdrawPopup: false,
    isOpenTransferPopup: false
  };

  handleOpenAddFundsPopup = () => this.setState({ isOpenAddFundsPopup: true });

  handleCloseAddFundsPopup = () =>
    this.setState({ isOpenAddFundsPopup: false });

  handleOpenWithdrawPopup = () => this.setState({ isOpenWithdrawPopup: true });

  handleCloseWithdrawPopup = () =>
    this.setState({ isOpenWithdrawPopup: false });

  handleOpenTransferPopup = () => this.setState({ isOpenTransferPopup: true });

  handleCloseTransferPopup = () =>
    this.setState({ isOpenTransferPopup: false });

  render() {
    const { t, info } = this.props;
    const currentWallet: CurrentWallet = {
      currency: info.currency,
      available: info.available
    };
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
              handleAddFunds={this.handleOpenAddFundsPopup}
              handleWithdraw={this.handleOpenWithdrawPopup}
              handleTransfer={this.handleOpenTransferPopup}
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
        <WalletContainer currency={info.currency} />
        <WalletAddFundsPopup
          currentWallet={currentWallet}
          open={this.state.isOpenAddFundsPopup}
          onClose={this.handleCloseAddFundsPopup}
        />
        <WalletWithdrawPopup
          currentWallet={info}
          open={this.state.isOpenWithdrawPopup}
          onClose={this.handleCloseWithdrawPopup}
        />
        <TransferPopup
          currentItem={info}
          open={this.state.isOpenTransferPopup}
          onClose={this.handleCloseTransferPopup}
        />
      </Page>
    );
  }
}
interface Props extends InjectedTranslateProps, OwnProps {}

interface OwnProps {
  info: WalletData;
}

interface State {
  isOpenAddFundsPopup: boolean;
  isOpenWithdrawPopup: boolean;
  isOpenTransferPopup: boolean;
}

const WalletCurrency = withLoader(translate()(_WalletCurrency));
export default WalletCurrency;
