import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import React from "react";

import traderWithdrawActions from "../../actions/trader-withdraw-actions";
import TraderWithdrawModal from "./trader-withdraw-modal/trader-withdraw-modal";

import { DASHBOARD_ROUTE } from "../../../dashboard/dashboard.constants";

const TraderWithdrawContainer = ({
  location,
  match,
  isPending,
  traderWithdraw,
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
  const { from } = location.state || { from: { pathname: DASHBOARD_ROUTE } };
  const handleCloseModal = () => {
    closeModal(from);
  };
  const handleWithdrawSubmit = ({ amount }, setSubmitting) => {
    submitWithdraw(traderWithdraw.id, amount, from, setSubmitting);
  };

  return (
    <div>
      <TraderWithdrawModal
        isOpen={true}
        traderWithdraw={traderWithdraw}
        onSubmit={handleWithdrawSubmit}
        closeModal={handleCloseModal}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.traderWithdrawData;

  let traderWithdraw;
  if (data) {
    traderWithdraw = data;
  }
  if (errorMessage !== "") {
    traderWithdraw = {};
  }
  return { isPending, traderWithdraw, errorMessage };
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
