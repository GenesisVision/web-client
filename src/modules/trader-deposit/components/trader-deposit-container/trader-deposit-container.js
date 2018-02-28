import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import React from "react";

import traderDepositActions from "../../actions/trader-deposit-actions";
import TraderDepositModal from "./trader-deposit-modal/trader-deposit-modal";

const TraderDepositContainer = ({
  location,
  match,
  isPending,
  deposit,
  fetchDeposit,
  submitDeposit,
  closeModal
}) => {
  if (isPending) {
    return null;
  }
  if (deposit === undefined) {
    fetchDeposit();
    return null;
  }
  const { from } = location.state || { from: { pathname: "/" } };
  const handleCloseModal = () => {
    closeModal(from);
  };
  const handleDepositSubmit = ({ amount }, setSubmitting) => {
    submitDeposit(deposit.traderId, amount, from, setSubmitting);
  };

  return (
    <div>
      <TraderDepositModal
        isOpen={true}
        onSubmit={handleDepositSubmit}
        closeModal={handleCloseModal}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.traderDepositData;

  let deposit;
  if (data) {
    deposit = data;
  }
  if (errorMessage !== "") {
    deposit = {};
  }
  return { isPending, deposit, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  fetchDeposit: traderId => {
    dispatch(traderDepositActions.fetchTraderDeposit(traderId));
  },
  submitDeposit: (traderId, amount, from, setSubmitting) => {
    dispatch(traderDepositActions.submitTraderDeposit(traderId, amount))
      .then(() => traderDepositActions.closeTraderDepositModal(from))
      .catch(() => {
        setSubmitting(false);
      });
  },
  closeModal: from => {
    traderDepositActions.closeTraderDepositModal(from);
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TraderDepositContainer)
);
