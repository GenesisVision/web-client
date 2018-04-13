import { connect } from "react-redux";
import React from "react";

import PagingContainer from "../../../../../paging/components/paging/paging";
import programService from "../../../../service/program-service";

const TraderDealListPagingContainer = ({
  paging,
  updatePaging,
  updatePagingAndFetch
}) => <PagingContainer paging={paging} updatePaging={updatePaging} />;

const mapStateToProps = state => {
  const { paging } = state.programData.deals;
  return { paging };
};

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { programId } = ownProps;
  return {
    ...stateProps,
    updatePaging: paging => {
      dispatch(programService.changeProgramDealsPage(programId, paging));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  TraderDealListPagingContainer
);
