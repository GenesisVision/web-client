import { connect } from "react-redux";
import React from "react";

import Paging from "../../../../../paging/components/paging/paging";
import programService from "../../../../service/program-service";

const ProgramDealListPagingContainer = ({ paging, updatePaging }) => (
  <Paging paging={paging} updatePaging={updatePaging} />
);

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
  ProgramDealListPagingContainer
);
