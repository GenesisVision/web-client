import { connect } from "react-redux";
import React from "react";

import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import PeriodClose from "./program-close-period/program-close-period";
import programClosePeriodActions from "../actions/program-close-period-actions";

const ProgramClosePeriodContainer = ({
  programId,
  errorMessage,
  closePeriod,
  closePopup
}) => {
  const handleClosePeriodSubmit = setSubmitting => {
    closePeriod(setSubmitting);
  };
  return (
    <PeriodClose
      error={errorMessage}
      submitPopup={handleClosePeriodSubmit}
      closePopup={closePopup}
    />
  );
};

const mapStateToProps = state => {
  const { errorMessage } = state.programClosePeriodData;

  return {
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch, ...otherDispatchProps } = dispatchProps;
  return {
    ...stateProps,
    ...otherDispatchProps,
    ...ownProps,
    closePeriod: () =>
      dispatch(programClosePeriodActions.programClosePeriod(ownProps.programId))
        .then(() => ownProps.submitPopup())
        .then(() => {
          dispatch(
            alertMessageActions.success(
              "Request to Restart period sent successfully"
            )
          );
          return Promise.resolve();
        })
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  ProgramClosePeriodContainer
);
