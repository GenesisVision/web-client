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
import FollowParams from "./follow-popup-params";

const CREATE_ACCOUNT = "CREATE_ACCOUNT";
const PARAMS = "PARAMS";

class FollowForm extends Component {
  state = {
    step: CREATE_ACCOUNT
  };
  createdCopytradingAccount = () => {
    this.setState({ step: PARAMS });
  };
  submit = () => {};
  render() {
    const {
      setFieldValue,
      values,
      wallets,
      walletsAddresses,
      handleSubmit,
      currency
    } = this.props;

    return (
      <div>
        {this.state.step === CREATE_ACCOUNT && (
          <FollowCreateAccount
            values={values}
            setFieldValue={setFieldValue}
            wallets={wallets}
            walletsAddresses={walletsAddresses}
            currency={currency}
            onClick={this.createdCopytradingAccount}
          />
        )}
        {this.state.step === PARAMS && (
          <FollowParams
            values={values}
            setFieldValue={setFieldValue}
            onClick={this.submit}
          />
        )}
      </div>
    );
  }
}

export default compose(translate())(FollowForm);
