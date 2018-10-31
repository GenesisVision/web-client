import "./fund-details-history.scss";

import Surface from "components/surface/surface";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";

import FundStructure from "./fund-structure/fund-structure";

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
    const { t, fundId, currency, structure } = this.props;
    if (!structure) return null;
    return (
      <Surface className="fund-details-history">
        <div className="fund-details-history__heading">
          {t("fund-details-page.history.heading")}
        </div>
        <div>
          <FundStructure
            structure={structure}
            fundId={fundId}
            currency={currency}
          />
        </div>
      </Surface>
    );
  }
}

export default translate()(FundDetailsHistorySection);
