import { connect } from "react-redux";
import React, { PureComponent } from "react";

import { alertMessageActions } from "../../../../shared/modules/alert-message/actions/alert-message-actions";
import popupActions from "../../../popup/actions/popup-actions";
import TraderWithdraw from "./trader-withdraw/trader-withdraw";
import traderWithdrawActions from "../../actions/trader-withdraw-actions";

class TraderWithdrawContainer extends PureComponent {
  render() {
    const {
      traderWithdraw,
      errorMessage,
      submitWithdraw,
      closeModal
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
        onSubmit={handleWithdrawSubmit}
        closeModal={closeModal}
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
  submitWithdraw: (traderId, amount, setSubmitting) => {
    dispatch(traderWithdrawActions.submitTraderWithdraw(traderId, amount))
      .then(() => dispatch(popupActions.closePopup()))
      .then(() =>
        dispatch(
          alertMessageActions.success(
            "Request to sell tokens sent successfully"
          )
        )
      )
      .catch(() => {
        setSubmitting(false);
      });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderWithdrawContainer
);
