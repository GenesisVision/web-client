import { connect } from "react-redux";
import React, { PureComponent } from "react";

import { alertMessageActions } from "../../../../shared/modules/alert-message/actions/alert-message-actions";
import ProgramWithdraw from "./program-withdraw/program-withdraw";
import programWithdrawActions from "../../actions/program-withdraw-actions";

class TraderWithdrawContainer extends PureComponent {
  render() {
    const {
      traderWithdraw,
      errorMessage,
      submitWithdraw,
      closePopup
    } = this.props;

    if (traderWithdraw === undefined) {
      return null;
    }

    const handleWithdrawSubmit = ({ amount }, setSubmitting) => {
      submitWithdraw(traderWithdraw.id, amount, setSubmitting);
    };

    return (
      <ProgramWithdraw
        programWithdraw={traderWithdraw}
        error={errorMessage}
        submitPopup={handleWithdrawSubmit}
        closePopup={closePopup}
      />
    );
  }
}

const mapStateToProps = state => {
  const { errorMessage } = state.programWithdrawData.submitData;

  return {
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchWithdraw: programId => {
    dispatch(programWithdrawActions.fetchTraderWithdraw(programId));
  },
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch, ...otherDispatchProps } = dispatchProps;
  return {
    ...stateProps,
    ...otherDispatchProps,
    ...ownProps,
    submitWithdraw: (programId, amount, setSubmitting) =>

      dispatch(programWithdrawActions.submitProgramWithdraw(programId, amount))
        .then(() => ownProps.submitPopup())
        .then(() => {
          dispatch(
            alertMessageActions.success(
              "Request to buy tokens sent successfully"
            )
          );
          return Promise.resolve();
        })
        .catch(() => {
          setSubmitting(false);
        })
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  TraderWithdrawContainer
);
