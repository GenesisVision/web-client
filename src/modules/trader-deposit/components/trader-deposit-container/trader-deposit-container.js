import { connect } from "react-redux";
import React, { PureComponent } from "react";

import TraderDeposit from "./trader-deposit/trader-deposit";
import traderDepositActions from "../../actions/trader-deposit-actions";

class TraderDepositContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchDeposit();
  }

  render() {
    const { isPending, traderDeposit, submitDeposit, closeModal } = this.props;

    const handleDepositSubmit = ({ amount }, setSubmitting) => {
      submitDeposit(amount, setSubmitting);
    };

    if (isPending || traderDeposit === undefined) {
      return null;
    }

    return (
      <TraderDeposit
        traderDeposit={traderDeposit}
        onSubmit={handleDepositSubmit}
        closeModal={closeModal}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.traderDepositData;

  let traderDeposit;
  if (data) {
    traderDeposit = data;
  }
  if (errorMessage !== "") {
    traderDeposit = {};
  }
  return { isPending, traderDeposit, errorMessage };
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderDepositContainer
);
