import { connect } from "react-redux";
import React, { Component } from "react";

import {
  composeFilter,
  filterCompare
} from "../../../../../shared/services/filter-service";
import FilterContainer from "../../../../filter/components/filter-container";
import TraderList from "./trader-list/trader-list";
import tradersActions from "../../../actions/traders-actions";

class TraderListContainer extends Component {
  defaultFilterValues = {
    levelMin: 0,
    levelMax: 10,
    profiAvg: 0
  };

  componentWillMount() {
    const filter = composeFilter(
      this.props.queryParams,
      this.defaultFilterValues
    );
    this.props.fetchTraders(filter);
  }

  componentWillUpdate(nextProps) {
    const prevFilter = composeFilter(
      this.props.queryParams,
      this.defaultFilterValues
    );
    const nextFilter = composeFilter(
      nextProps.queryParams,
      this.defaultFilterValues
    );
    if (!filterCompare(prevFilter, nextFilter)) {
      this.props.fetchTraders(nextFilter);
    }
  }

  render() {
    const { isPending, traders, queryParams } = this.props;
    if (isPending || !traders) return null;
    return (
      <div>
        <TraderList traders={traders.investmentPrograms} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.tradersData;
  return { isPending, traders: data };
};

const mapDispatchToProps = dispatch => ({
  fetchTraders: queryParams => {
    dispatch(tradersActions.fetchTraders(queryParams));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderListContainer
);
