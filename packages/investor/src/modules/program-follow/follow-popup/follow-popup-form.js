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

class FollowForm extends Component {
  composeEntryFee = fee => {
    const { entryFee } = this.props;
    return entryFee ? fee : 0;
  };

  entryFee = amount => {
    const { info } = this.props;
    return this.composeEntryFee(
      calculateValueOfEntryFee(amount, info.entryFee)
    );
  };

  gvFee = amount => {
    const { info } = this.props;
    return calculateValueOfEntryFee(amount, info.gvCommission);
  };

  investAmount = amount => {
    return (amount || 0) - this.gvFee(amount) - this.entryFee(amount);
  };

  isAllow = values => {
    const { investor, info } = this.props;
    const { floatValue, formattedValue, value } = values;
    const { availableToInvest, availableInWallet } = info;

    const isValidateFraction = validateFraction(value, "GVT");

    const isAvailableInWallet =
      availableInWallet >= this.investAmount(floatValue);

    const isAvailableToInvest =
      !investor ||
      availableToInvest === undefined ||
      floatValue <= parseFloat(availableToInvest);

    return (
      formattedValue === "" ||
      (isValidateFraction && isAvailableInWallet && isAvailableToInvest)
    );
  };

  setMaxAmount = () => {
    const { setFieldValue, info } = this.props;
    const { availableToInvest, availableInWallet } = info;
    const maxFromWallet = availableInWallet;

    let maxAvailable = Number.MAX_SAFE_INTEGER;
    if (availableToInvest !== undefined)
      maxAvailable =
        (availableToInvest /
          (100 - info.gvCommission - this.composeEntryFee(info.entryFee))) *
        100;

    const maxInvest = formatCurrencyValue(
      Math.min(maxFromWallet, maxAvailable),
      "GVT"
    );

    setFieldValue("amount", maxInvest);
  };

  render() {
    const {
      t,
      program,
      entryFee,
      values,
      info,
      currency,
      disabled,
      isValid,
      dirty,
      handleSubmit,
      errorMessage
    } = this.props;

    return (
      <form className="follow__bottom" id="invest-form" onSubmit={handleSubmit}>
        <InputAmountField
          name="amount"
          label={
            program ? t("deposit-asset.amount") : t("deposit-asset.amount")
          }
          currency={"GVT"}
          isAllow={this.isAllow}
          setMax={this.setMaxAmount}
        />

        <div className="follow-popup__currency">
          <NumberFormat
            value={formatCurrencyValue(
              convertFromCurrency(values.amount, info.rate),
              currency
            )}
            prefix="= "
            suffix={` ${currency}`}
            displayType="text"
          />
        </div>
        <ul className="dialog-form">
          {entryFee && (
            <li className="dialog-form__item">
              <span className="dialog-form__title">
                {program
                  ? t("deposit-asset.entry-fee")
                  : t("deposit-asset.entry-fee")}
              </span>
              <span className="dialog-form__value">
                {info.entryFee} %{" "}
                <NumberFormat
                  value={formatValue(this.entryFee(values.amount))}
                  prefix=" ("
                  suffix={" GVT)"}
                  displayType="text"
                />
              </span>
            </li>
          )}
          <li className="dialog-form__item">
            <span className="dialog-form__title">
              {program
                ? t("deposit-asset.gv-commission")
                : t("deposit-asset.gv-commission")}
            </span>
            <span className="dialog-form__value">
              {info.gvCommission} %
              <NumberFormat
                value={formatCurrencyValue(this.gvFee(values.amount), "GVT")}
                prefix={" ("}
                suffix={" GVT)"}
                displayType="text"
              />
            </span>
          </li>
          <li className="dialog-form__item">
            <span className="dialog-form__title">
              {program
                ? t("deposit-asset.investment-amount")
                : t("deposit-asset.investment-amount")}
            </span>
            <span className="dialog-form__value">
              <NumberFormat
                value={formatCurrencyValue(
                  this.investAmount(values.amount),
                  "GVT"
                )}
                suffix={" GVT"}
                displayType="text"
              />
            </span>
          </li>
        </ul>
        <div className="form-error">
          <FormError error={errorMessage} />
        </div>
        <div className="follow__buttons">
          <GVButton
            type="submit"
            id="signUpFormSubmit"
            className="invest-form__submit-button"
            disabled={disabled || !isValid || !dirty}
          >
            {program ? t("deposit-asset.confirm") : t("deposit-asset.confirm")}
          </GVButton>
        </div>
      </form>
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
