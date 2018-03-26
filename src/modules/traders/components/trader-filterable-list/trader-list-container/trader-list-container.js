import { connect } from "react-redux";
import React, { Component } from "react";

import popupActions from "../../../../popup/actions/popup-actions";
import TraderList from "./trader-list/trader-list";
import tradersActions from "../../../actions/traders-actions";
import tradersService from "../../../service/traders-service";
import withQueryParams from "../../../../../shared/hoc/with-query-params/with-query-params";

import { TRADER_DEPOSIT_POPUP } from "../../../../popup/actions/popup-actions.constants";

class TraderListContainer extends Component {
  fetchTraders = () => {
    const { fetchTradersIfNeeded } = this.props;
    fetchTradersIfNeeded();
  };

  componentWillMount() {
    this.fetchTraders();
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
  const { isPending, data } = state.tradersData.traders.items;
  return { isPending, traders: data, isAuthenticated };
};

const mapDispatchToProps = dispatch => ({
  fetchTradersIfNeeded: () => {
    dispatch(tradersActions.fetchTradersIfNeeded());
  },
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch, ...otherDispatchProps } = dispatchProps;
  const closeInvestPopup = () => {
    return tradersService.updateAfterInvestment();
  };
  return {
    ...stateProps,
    ...otherDispatchProps,
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
