import { connect } from "react-redux";
import React, { Component } from "react";

import popupActions from "../../../../popup/actions/popup-actions";
import TraderList from "./trader-list/trader-list";
import tradersActions from "../../../actions/traders-actions";
import withQueryParams from "../../../../../shared/hoc/with-query-params/with-query-params";

import { TRADER_DEPOSIT_POPUP } from "../../../../popup/actions/popup-actions.constants";

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
    const { isPending, traders, isAuthenticated, openInvestPopup } = this.props;
    if (isPending || !traders) return null;
    return (
      <TraderList
        traders={traders.investmentPrograms}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  const { isPending, data } = state.tradersData;
  return { isPending, traders: data, isAuthenticated };
};

const mapDispatchToProps = dispatch => ({
  fetchTradersIfNeeded: queryParams => {
    dispatch(tradersActions.fetchTradersIfNeeded(queryParams));
  },
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch, ...otherDispathProps } = dispatchProps;
  const closeInvestPopup = () => {
    dispatch(tradersActions.fetchTradersIfNeeded({}));
  };
  return {
    ...stateProps,
    ...otherDispathProps,
    ...ownProps,
    openInvestPopup: traderId => () => {
      dispatch(
        popupActions.openPopup(
          TRADER_DEPOSIT_POPUP,
          {
            traderId
          },
          closeInvestPopup
        )
      );
    }
  };
};

export default withQueryParams(
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(TraderListContainer)
);
