import { withFormik } from "formik";
import { GVButton } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import {
  calculateValueOfEntryFee,
  convertFromCurrency
} from "shared/utils/currency-converter";
import {
  formatCurrencyValue,
  formatValue,
  validateFraction
} from "shared/utils/formatter";
import { number, object } from "yup";
import FollowCreateAccount from "./follow-popup-create-account";
const CREATE_ACCOUNT = "CREATE_ACCOUNT";
const FORM = "FORM";

class FollowForm extends Component {
  state = {
    step: CREATE_ACCOUNT
  };
  createdCopytradingAccount = () => {
    this.setState({ step: FORM });
  };
  render() {
    const {
      wallets,
      walletsAddresses,
      handleSubmit,
      currency
      /*t,
      program,
      entryFee,
      values,
      info,
      currency,
      disabled,
      isValid,
      dirty,
      errorMessage*/
    } = this.props;

    return (
      <form
        className="dialog__bottom"
        id="withdraw-form"
        onSubmit={handleSubmit}
      >
        {this.state.step === CREATE_ACCOUNT && (
          <FollowCreateAccount
            wallets={wallets}
            walletsAddresses={walletsAddresses}
            currency={currency}
            onClick={this.createdCopytradingAccount}
          />
        )}
      </form>
    );
  }
}

export default compose(
  translate(),
  withFormik({
    displayName: "follow-program",
    mapPropsToValues: props => {
      const { walletsAddresses, currency } = props;
      if (!walletsAddresses === undefined || walletsAddresses.length <= 1)
        return null;
      let walletFrom = currency || "GVT";
      if (!walletsAddresses.find(wallet => wallet.currency === walletFrom)) {
        walletFrom = walletsAddresses[0].currency;
      }
      return { walletFrom };
    },
    validationSchema: ({ t, info }) =>
      object().shape({
        amount: number().min(
          0,
          t("deposit-asset.validation.amount-min-value", {
            min: info.minInvestmentAmount
          })
        )
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.amount);
    }
  })
)(FollowForm);
