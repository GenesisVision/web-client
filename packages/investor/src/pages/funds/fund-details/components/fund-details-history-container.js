import "shared/components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import Surface from "shared/components/surface/surface";

import { fetchFundStructure } from "../services/fund-details.service";
import FundStructure from "shared/components/funds/fund-details/fund-details-history-section/fund-structure/fund-structure";

class FundDetailsHistorySection extends PureComponent {
  state = {
    prevProps: null
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
    const { t, fundId, currency } = this.props;
    return (
      <Surface className="details-history">
        <h3 className="details-history__heading">
          {t("fund-details-page.history.structure.title")}
        </h3>
        <div>
          <FundStructure
            fundId={fundId}
            currency={currency}
            fetchFundStructure={fetchFundStructure}
          />
        </div>
      </Surface>
    );
  }
}

export default translate()(FundDetailsHistorySection);
