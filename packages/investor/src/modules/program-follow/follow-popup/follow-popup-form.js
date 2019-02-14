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

class FollowForm extends Component {
  render() {
    const {
      walletsAddresses,
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
      handleSubmit,
      errorMessage*/
    } = this.props;

    return (
      <div>
        <FollowCreateAccount
          walletsAddresses={walletsAddresses}
          currency={currency}
          /*investor
      program
      entryFee
      submitInfo={submitInfo}
      currency={currency}
      info={info.data}
      id={id}
      fetchInfo={service.getDepositProgramInfoById}
      invest={handleFollow}*/
        />
      </div>
    );
  }
}

export default compose(
  translate(),
  withFormik({
    displayName: "invest-form",
    mapPropsToValues: () => ({
      amount: ""
    }),
    validationSchema: ({ t, info }) =>
      object().shape({
        amount: number()
          .min(
            info.minInvestmentAmount,
            t("deposit-asset.validation.amount-min-value", {
              min: info.minInvestmentAmount
            })
          )
          .max(
            info.availableInWallet,
            t("deposit-asset.validation.amount-more-than-available")
          )
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.amount);
    }
  })
)(FollowForm);
