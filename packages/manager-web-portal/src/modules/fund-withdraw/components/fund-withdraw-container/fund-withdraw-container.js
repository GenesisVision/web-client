import { connect } from "react-redux";
import React, { PureComponent } from "react";

import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import FundWithdraw from "./fund-withdraw/fund-withdraw";
import fundWithdrawActions from "../../actions/fund-withdraw-actions";

class FundWithdrawContainer extends PureComponent {
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

    const handleWithdrawSubmit = ({ percent }, setSubmitting) => {
      submitWithdraw(traderWithdraw.id, percent, setSubmitting);
    };

    return (
      <FundWithdraw
        fundWithdraw={traderWithdraw}
        error={errorMessage}
        submitPopup={handleWithdrawSubmit}
        closePopup={closePopup}
      />
    );
  }
}

const mapStateToProps = state => {
  const { errorMessage } = state.fundWithdrawData.submitData;

  return {
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchWithdraw: fundId => {
    dispatch(fundWithdrawActions.fetchTraderWithdraw(fundId));
  },
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch, ...otherDispatchProps } = dispatchProps;
  return {
    ...stateProps,
    ...otherDispatchProps,
    ...ownProps,
    submitWithdraw: (fundId, percent, setSubmitting) =>
      dispatch(fundWithdrawActions.submitFundWithdraw(fundId, percent))
        .then(() => ownProps.submitPopup())
        .then(() => {
          dispatch(
            alertMessageActions.success(
              "Request to withdrawal sent successfully"
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
  FundWithdrawContainer
);
