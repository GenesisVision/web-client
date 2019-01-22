import "./wallet-info.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
// import WalletList from "wallet-info"
import Surface from "shared/components/surface/surface";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";

import WalletTransactionsTotal from "../wallet-transactions/wallet-transactions-total";

const WALLETS_TAB = "wallets";
const TRANSACTIONS_TAB = "transactions";
const EVENTS_FILTERING = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE,
  type: EVENT_TYPE_FILTER_DEFAULT_VALUE
};

class WalletInfo extends PureComponent {
  state = {
    tab: TRANSACTIONS_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    return (
      <Surface className="wallet-info">
        <div className="wallet-info__header">
          <div className="wallet-info__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab value={WALLETS_TAB} label={"My wallets"} />
              <GVTab value={TRANSACTIONS_TAB} label={"All transactions"} />
            </GVTabs>
          </div>
        </div>
        <div>
          {/*{tab === WALLETS_TAB && (*/}
          {/*<WalletList />*/}
          {/*)}*/}
          {tab === TRANSACTIONS_TAB && <WalletTransactionsTotal />}
        </div>
      </Surface>
    );
  }
}

export default translate()(WalletInfo);
