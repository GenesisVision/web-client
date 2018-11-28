import "shared/components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import Surface from "shared/components/surface/surface";

import FundStructure from "./fund-structure/fund-structure";
import * as PropTypes from "prop-types";

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
    const { t, id, fetchFundStructure } = this.props;
    return (
      <Surface className="details-history">
        <h3 className="details-history__heading">
          {t("fund-details-page.history.structure.title")}
        </h3>
        <div>
          <FundStructure id={id} fetchStructure={fetchFundStructure} />
        </div>
      </Surface>
    );
  }
}

FundDetailsHistorySection.propTypes = {
  id: PropTypes.string.isRequired,
  fetchFundStructure: PropTypes.func.isRequired
};

export default translate()(FundDetailsHistorySection);
