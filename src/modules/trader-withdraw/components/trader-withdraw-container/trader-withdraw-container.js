import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import React from "react";

import traderWithdrawActions from "../../actions/trader-withdraw-actions";
import TraderWithdrawModal from "./trader-withdraw-modal/trader-withdraw-modal";

import { HOME_ROUTE } from "../../../../components/app.constants";

const TraderWithdrawContainer = ({
  location,
  match,
  isPending,
  traderWithdraw,
  errorMessage,
  fetchWithdraw,
  submitWithdraw,
  closeModal
}) => {
  if (isPending) {
    return null;
  }
  if (traderWithdraw === undefined) {
    fetchWithdraw();
    return null;
  }
  const { traderId } = match.params;
  const { from } = location.state || { from: { pathname: HOME_ROUTE } };
  const handleCloseModal = () => {
    closeModal(from);
  };
  const handleWithdrawSubmit = ({ amount }, setSubmitting) => {
    submitWithdraw(traderId, amount, from, setSubmitting);
  };

  return (
    <TraderWithdrawModal
      isOpen={true}
      traderWithdraw={traderWithdraw}
      error={errorMessage}
      onSubmit={handleWithdrawSubmit}
      closeModal={handleCloseModal}
    />
  );
};

const mapStateToProps = state => {
  const {
    isPending,
    errorMessage,
    data
  } = state.traderWithdrawData.traderWithdraw;
  const errorMessageSubmit =
    state.traderWithdrawData.traderWithdrawSubmit.errorMessage;
  let traderWithdraw;
  if (data) {
    traderWithdraw = data;
  }
  if (errorMessage !== "") {
    traderWithdraw = {};
  }
  return {
    isPending,
    traderWithdraw,
    errorMessage: errorMessage || errorMessageSubmit
  };
};

const mapDispatchToProps = dispatch => ({
  fetchWithdraw: traderId => {
    dispatch(traderWithdrawActions.fetchTraderWithdraw(traderId));
  },
  submitWithdraw: (traderId, amount, from, setSubmitting) => {
    dispatch(traderWithdrawActions.submitTraderWithdraw(traderId, amount))
      .then(() => traderWithdrawActions.closeTraderWithdrawModal(from))
      .catch(() => {
        setSubmitting(false);
      });
  },
  closeModal: from => {
    traderWithdrawActions.closeTraderWithdrawModal(from);
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TraderWithdrawContainer)
);
