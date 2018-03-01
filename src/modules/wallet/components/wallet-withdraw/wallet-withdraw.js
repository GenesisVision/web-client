import { connect } from "react-redux";
import React from "react";

import walletActions from "../../actions/wallet-actions";
import WalletWithdrawForm from "./wallet-withdraw-form/wallet-withdraw-form";

const WalletWithdraw = ({ errorMessage, withdraw }) => {
  const handleWithdraw = (withdrawFormData, setSubmitting) => {
    var data = {
      amount: withdrawFormData.amount,
      blockchainAddress: withdrawFormData.address
    };
    withdraw(data, setSubmitting);
  };
  return <WalletWithdrawForm onSubmit={handleWithdraw} error={errorMessage} />;
};

const mapStateToProps = state => {
  const { errorMessage } = state.walletData.withdraw;
  return { errorMessage };
};

const mapDispatchToProps = dispatch => ({
  withdraw: (withdrawFormData, setSubmitting) => {
    dispatch(walletActions.walletWithdraw(withdrawFormData)).catch(() => {
      setSubmitting(false);
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletWithdraw);
