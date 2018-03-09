import { connect } from "react-redux";
import React, { Component } from "react";

import {
  composeFilter,
  filterCompare
} from "../../../../../shared/services/filter-service";
import TraderList from "./trader-list/trader-list";
import tradersActions from "../../../actions/traders-actions";

class TraderListContainer extends Component {
  componentWillMount() {
    this.props.fetchTraders(this.props.queryParams);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.isNewFilter) {
      this.props.fetchTraders(nextProps.queryParams);
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
