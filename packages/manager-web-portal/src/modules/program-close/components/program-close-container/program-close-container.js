import { connect } from "react-redux";
import React from "react";

import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import ProgramClose from "./program-close/program-close";
import programCloseActions from "../../actions/program-close-actions";

const ProgramCloseContainer = ({
  programId,
  errorMessage,
  closeProgram,
  closePopup
}) => {
  const handleCloseProgramSubmit = setSubmitting => {
    closeProgram(setSubmitting);
  };
  return (
    <ProgramClose
      error={errorMessage}
      submitPopup={handleCloseProgramSubmit}
      closePopup={closePopup}
    />
  );
};

const mapStateToProps = state => {
  const { errorMessage } = state.programCloseData;

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
    closeProgram: () =>
      dispatch(programCloseActions.programClose(ownProps.programId))
        .then(() => ownProps.submitPopup())
        .then(() => {
          dispatch(
            alertMessageActions.success(
              "Request to Close program sent successfully"
            )
          );
          return Promise.resolve();
        })
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  ProgramCloseContainer
);
