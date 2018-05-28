import { connect } from "react-redux";
import React, { PureComponent } from "react";

import { alertMessageActions } from "../../../../shared/modules/alert-message/actions/alert-message-actions";
import ProgramDeposit from "./program-deposit/program-deposit";
import programDepositActions from "../../actions/program-deposit-actions";

class TraderDepositContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchDeposit(this.props.programId);
  }

  render() {
    const {
      isPending,
      programId,
      programDeposit,
      errorMessage,
      submitDeposit,
      closePopup
    } = this.props;

    const handleDepositSubmit = ({ amount }, setSubmitting) => {
      return submitDeposit(programId, amount, setSubmitting);
    };

    if (isPending || programDeposit === undefined) {
      return null;
    }

    return (
      <ProgramDeposit
        programDeposit={programDeposit}
        submitPopup={handleDepositSubmit}
        closePopup={closePopup}
        error={errorMessage}
      />
    );
  }
}

const mapStateToProps = state => {
  const {
    isPending,
    errorMessage: errorMessageRequest,
    data
  } = state.programDepositData.requestData;
  const {
    errorMessage: errorMessageSubmit
  } = state.programDepositData.submitData;

  const errorMessage = errorMessageRequest || errorMessageSubmit;
  let programDeposit;
  if (data) {
    programDeposit = data;
  }
  return {
    isPending,
    programDeposit,
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDeposit: programId => {
    dispatch(programDepositActions.fetchProgramDeposit(programId));
  },
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch, ...otherDispatchProps } = dispatchProps;
  return {
    ...stateProps,
    ...otherDispatchProps,
    ...ownProps,
    submitDeposit: (programId, amount, setSubmitting) =>
      dispatch(programDepositActions.submitProgramDeposit(programId, amount))
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(TraderDepositContainer);
