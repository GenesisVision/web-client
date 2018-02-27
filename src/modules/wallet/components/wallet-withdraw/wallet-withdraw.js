import { connect } from "react-redux";
import React from "react";

import walletActions from "../../actions/wallet-actions";
import WalletWithdrawForm from "./wallet-withdraw-form/wallet-withdraw-form";

const WalletWithdraw = ({ withdraw }) => {
  const handleWithdraw = (withdrawFormData, setSubmitting) => {
    withdraw(withdrawFormData, setSubmitting);
  };
  return <WalletWithdrawForm onSubmit={handleWithdraw} />;
};

const mapDispatchToProps = dispatch => ({
  withdraw: (withdrawFormData, setSubmitting) => {
    const { address, amount } = withdrawFormData;
    dispatch(walletActions.walletWithdraw(address, amount)).catch(() => {
      setSubmitting(false);
    });
  }
});

export default connect(null, mapDispatchToProps)(WalletWithdraw);
