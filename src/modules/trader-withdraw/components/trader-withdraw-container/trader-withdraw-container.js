import { connect } from "react-redux";
import React, { PureComponent } from "react";

import { alertMessageActions } from "../../../../shared/modules/alert-message/actions/alert-message-actions";
import TraderWithdraw from "./trader-withdraw/trader-withdraw";
import traderWithdrawActions from "../../actions/trader-withdraw-actions";

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
      <TraderWithdraw
        traderWithdraw={traderWithdraw}
        error={errorMessage}
        submitPopup={handleWithdrawSubmit}
        closePopup={closePopup}
      />
    );
  }
}

const mapStateToProps = state => {
  const { errorMessage } = state.traderWithdrawData.submitData;

  return {
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchWithdraw: traderId => {
    dispatch(traderWithdrawActions.fetchTraderWithdraw(traderId));
  },
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch, ...otherDispathProps } = dispatchProps;
  return {
    ...stateProps,
    ...otherDispathProps,
    ...ownProps,
    submitWithdraw: (traderId, amount, setSubmitting) =>
      dispatch(traderWithdrawActions.submitTraderWithdraw(traderId, amount))
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
