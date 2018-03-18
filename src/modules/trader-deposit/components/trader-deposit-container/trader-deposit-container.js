import { connect } from "react-redux";
import React, { PureComponent } from "react";

import TraderDeposit from "./trader-deposit/trader-deposit";
import traderDepositActions from "../../actions/trader-deposit-actions";
import popupActions from "../../../popup/actions/popup-actions";
import { alertMessageActions } from "../../../../shared/modules/alert-message/actions/alert-message-actions";

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
      closeModal
    } = this.props;

    const handleDepositSubmit = ({ amount }, setSubmitting) => {
      submitDeposit(traderId, amount, setSubmitting);
    };

    if (isPending || traderDeposit === undefined) {
      return null;
    }

    return (
      <TraderDeposit
        traderDeposit={traderDeposit}
        onSubmit={handleDepositSubmit}
        closeModal={closeModal}
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
  submitDeposit: (traderId, amount, setSubmitting) => {
    dispatch(traderDepositActions.submitTraderDeposit(traderId, amount))
      .then(() => dispatch(popupActions.closePopup()))
      .then(() =>
        dispatch(
          alertMessageActions.success("Request to buy tokens sent successfully")
        )
      )
      .catch(() => {
        setSubmitting(false);
      });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderDepositContainer
);
