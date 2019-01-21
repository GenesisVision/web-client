import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import ProgramTrades from "shared/components/programs/program-details/program-trades/program-trades";
// import WalletList from "wallet-container"
import Surface from "shared/components/surface/surface";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";

import WalletTransactions from "../wallet-transactions/wallet-transactions";

const WALLETS_TAB = "wallets";
const TRANSACTIONS_TAB = "transactions";
const EVENTS_FILTERING = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE,
  type: EVENT_TYPE_FILTER_DEFAULT_VALUE
};

class WalletsContainer extends PureComponent {
  state = {
    tab: TRANSACTIONS_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    // const {
    //   t,
    //   programId,
    //   currency,
    //   isAuthenticated,
    //   isInvested,
    //   eventTypeFilterValues
    // } = this.props;
    return (
      <Surface className="wallet-container">
        <div className="wallet-container__header">
          <div className="wallet-container__tabs">
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
          {tab === TRANSACTIONS_TAB && <WalletTransactions />}
        </div>
      </Surface>
    );
  }
}

export default translate()(WalletsContainer);
