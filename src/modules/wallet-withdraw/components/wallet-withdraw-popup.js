import "./wallet-withdraw-popup.scss";

import { withFormik } from "formik";
import WalletWithdrawTop from "modules/wallet-withdraw/components/wallet-withdraw-top";
import WalletWithdrawBottom from "modules/wallet-withdraw/components/wallet-withdraw=bottom";
import PropTypes from "prop-types";
import React from "react";

const WalletWithdrawPopup = ({ values, currencies }) => {
  return (
    <form id="wallet-withdraw" className="wallet-withdraw-popup">
      <WalletWithdrawTop
        currency={values.currency}
        currencies={currencies}
        amount={values.amount}
        rate={2}
        available={100}
      />
      <WalletWithdrawBottom />
    </form>
  );
};

WalletWithdrawPopup.propTypes = {};

export default withFormik({
  displayName: "wallet-withdraw",
  mapPropsToValues: () => ({
    amount: "",
    currency: "BTC",
    address: ""
  }),
  onSubmit: values => console.info(values)
})(WalletWithdrawPopup);
