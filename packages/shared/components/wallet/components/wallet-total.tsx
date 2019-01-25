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
  render() {
    const { t } = this.props;
    if (!this.props.info) return null;
    return (
      <React.Fragment>
        <h1>{t("wallet-page.title")}</h1>
        <div className="wallet-balance">
          <WalletBalanceElements
            walletBalanceData={this.props.info.grandTotal}
            currentCurrency={this.props.currency}
          />
        </div>
        <WalletContainerTotal
          wallets={this.props.info.wallets}
          eventTypeFilterValues={INVESTOR_EVENT_TYPE_FILTER_VALUES}
        />
      </React.Fragment>
    );
  }
}

export default compose(translate())(WalletTotal);
