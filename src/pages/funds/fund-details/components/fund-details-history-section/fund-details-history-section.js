import "./fund-details-history.scss";

import Surface from "components/surface/surface";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import FundRebalancing from "./fund-rebalancing/fund-rebalancing";

const TRADES_TAB = "trades";
class FundDetailsHistorySection extends PureComponent {
  state = {
    tab: TRADES_TAB,
    tradesData: { data: null, isPending: true },
    prevProps: null
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    if (state.prevProps !== props) {
      newState.prevProps = props;
      newState.tradesData = props.tradesData;
    }
    return newState;
  }

  render() {
    const { t, fundId, currency, rebalancingData } = this.props;
    if (!rebalancingData) return null;
    return (
      <Surface className="fund-details-history">
        <div className="fund-details-history__heading">
          {t("fund-details-page.history.heading")}
        </div>

        <div className="fund-details-history__subheading">
          {t("fund-details-page.history.subheading")}
        </div>
        <div>
          <FundRebalancing
            rebalancing={rebalancingData.data}
            programId={fundId}
            currency={currency}
          />
        </div>
      </Surface>
    );
  }
}

export default translate()(FundDetailsHistorySection);
