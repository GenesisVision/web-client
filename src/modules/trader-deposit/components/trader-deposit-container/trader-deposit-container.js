import { connect } from "react-redux";
import React, { PureComponent } from "react";

import { alertMessageActions } from "../../../../shared/modules/alert-message/actions/alert-message-actions";
import TraderDeposit from "./trader-deposit/trader-deposit";
import traderDepositActions from "../../actions/trader-deposit-actions";

class TraderDepositContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchDeposit(this.props.traderId);
  }

  render() {
    const {
      isPending,
      traderId,
      traderDeposit,
      errorMessage,
      submitDeposit,
      closePopup
    } = this.props;

    const handleDepositSubmit = ({ amount }, setSubmitting) => {
      return submitDeposit(traderId, amount, setSubmitting);
    };

    if (isPending || traderDeposit === undefined) {
      return null;
    }

    return (
      <TraderDeposit
        traderDeposit={traderDeposit}
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
  } = state.traderDepositData.requestData;
  const {
    errorMessage: errorMessageSubmit
  } = state.traderDepositData.submitData;

  const errorMessage = errorMessageRequest || errorMessageSubmit;
  let traderDeposit;
  if (data) {
    traderDeposit = data;
  }
  return {
    isPending,
    traderDeposit,
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDeposit: traderId => {
    dispatch(traderDepositActions.fetchTraderDeposit(traderId));
  },
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch, ...otherDispatchProps } = dispatchProps;
  return {
    ...stateProps,
    ...otherDispatchProps,
    ...ownProps,
    submitDeposit: (traderId, amount, setSubmitting) =>
      dispatch(traderDepositActions.submitTraderDeposit(traderId, amount))
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
  TraderDepositContainer
);
