import { connect } from "react-redux";
import React from "react";

import PagingContainer from "../../../../../paging/components/paging/paging";
import traderActions from "../../../../actions/trader-actions";

const TraderRequestListPagingContainer = ({
  paging,
  updatePaging,
  updatePagingAndFetch
}) => (
  <PagingContainer
    paging={paging}
    updatePaging={updatePaging}
    updatePagingAndFetch={updatePagingAndFetch}
  />
);

const mapStateToProps = state => {
  const { paging } = state.traderData.requests;
  return { paging };
};

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { traderId } = ownProps;
  return {
    ...stateProps,
    updatePaging: paging => {
      dispatch(traderActions.updateTraderRequestListPaging(traderId, paging));
    },
    updatePagingAndFetch: paging => {
      dispatch(
        traderActions.updateTraderRequestListPagingAndFetch(traderId, paging)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
    TraderRequestListPagingContainer
);
