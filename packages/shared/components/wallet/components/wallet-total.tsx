import { WalletMultiSummary } from "gv-api-web";
import { IState } from "investor-web-portal/src/reducers";
import * as React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { walletApi } from "shared/services/api-client/wallet-api";

import authService from "../../../services/auth-service";
import { INVESTOR_EVENT_TYPE_FILTER_VALUES } from "../../table/components/filtering/event-type-filter/event-type-filter.constants";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletBalanceTotal from "./wallet-balance/wallet-balance-total";
import WalletContainerTotal from "./wallet-container/wallet-container-total";

interface IWalletProps {
  currency: string;
  t(str: string): string;
}

interface IWalletState {
  info?: WalletMultiSummary;
}

class WalletTotal extends React.Component<IWalletProps, IWalletState> {
  componentDidMount() {
    const currency = this.props.currency;
    walletApi
      .v10WalletMultiByCurrencyGet(currency, authService.getAuthArg())
      .then(
        (info: WalletMultiSummary): any => {
          this.setState({ info });
        }
      );
  }

  render() {
    const { t } = this.props;
    if (!this.state || !this.state.info) return null;
    return (
      <React.Fragment>
        <h1>{t("wallet-page.title")}</h1>
        <div className="wallet-balance">
          <WalletBalanceElements
            walletBalanceData={this.state.info.grandTotal}
            currentCurrency={this.props.currency}
          />
        </div>
        <WalletContainerTotal
          wallets={this.state.info.wallets}
          eventTypeFilterValues={INVESTOR_EVENT_TYPE_FILTER_VALUES}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  currency: state.accountSettings.currency
});

export default compose(
  connect(mapStateToProps),
  translate()
)(WalletTotal);
