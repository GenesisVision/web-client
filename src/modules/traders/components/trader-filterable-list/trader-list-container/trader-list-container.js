import { connect } from "react-redux";
import React, { Component } from "react";

import {
  composeFilter,
  filterCompare
} from "../../../../../shared/services/filter-service";
import TraderList from "./trader-list/trader-list";
import tradersActions from "../../../actions/traders-actions";
import withQueryParams from "../../../../../shared/hoc/with-query-params/with-query-params";

class TraderListContainer extends Component {
  fetchTraders = () => {
    const { queryParams, fetchTradersIfNeeded } = this.props;
    fetchTradersIfNeeded(queryParams);
  };

  componentWillMount() {
    this.fetchTraders();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.queryParams !== this.props.queryParams) {
      this.fetchTraders();
    }
  }

  render() {
    const { isPending, traders, queryParams } = this.props;
    if (isPending || !traders) return null;
    return <TraderList traders={traders.investmentPrograms} />;
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.tradersData;
  return { isPending, traders: data };
};

const mapDispatchToProps = dispatch => ({
  fetchTradersIfNeeded: queryParams => {
    dispatch(tradersActions.fetchTradersIfNeeded(queryParams));
  }
});

export default withQueryParams(
  connect(mapStateToProps, mapDispatchToProps)(TraderListContainer)
);
