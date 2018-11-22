import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { calculateValueOfEntryFee } from "shared/utils/currency-converter";
import { formatValue } from "shared/utils/formatter";
import { number, object } from "yup";

const ProgramDepositForm = ({
  t,
  entryFee,
  values,
  info,
  currency,
  disabled,
  handleSubmit,
  errorMessage
}) => {
  const fee = calculateValueOfEntryFee(values.amount, info.entryFee);
  const gvFee = calculateValueOfEntryFee(values.amount, info.gvCommission);

  const investAmount =
    parseFloat(values.amount || 0) -
    parseFloat(gvFee) -
    (entryFee ? parseFloat(fee) : 0);

  const isAllow = values => {
    const { floatValue, formattedValue } = values;
    const { availableInWallet, availableToInvest } = info;
    const fee = calculateValueOfEntryFee(floatValue, info.entryFee);
    const gvFee = calculateValueOfEntryFee(floatValue, info.gvCommission);
    const validateAvailableToInvest = () => floatValue <= availableToInvest;
    return (
      formattedValue === "" ||
      (floatValue <=
        parseFloat(availableInWallet - gvFee - (entryFee ? fee : 0)) &&
        validateAvailableToInvest())
    );
  };

  return (
    <form className="dialog__bottom" id="invest-form" onSubmit={handleSubmit}>
      <GVFormikField
        className="invest-field"
        name="amount"
        label={t("deposit-program.amount")}
        component={GVTextField}
        adornment="GVT"
        autoComplete="off"
        InputComponent={NumberFormat}
        allowNegative={false}
        isAllowed={isAllow}
      />
      <ul className="dialog-list">
        {entryFee && (
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {t("deposit-program.entry-fee")}
            </span>
            <span className="dialog-list__value">
              {info.entryFee} %{" "}
              <NumberFormat
                value={formatValue(fee)}
                prefix="("
                suffix={` GVT)`}
                displayType="text"
              />
            </span>
          </li>
        )}
        <li className="dialog-list__item">
          <span className="dialog-list__title">
            {t("deposit-program.gv-commission")}
          </span>
          <span className="dialog-list__value">
            {info.gvCommission} %{" "}
            <NumberFormat
              value={formatValue(gvFee)}
              prefix="("
              suffix={` GVT)`}
              displayType="text"
            />
          </span>
        </li>
        <li className="dialog-list__item">
          <span className="dialog-list__title">
            {t("deposit-program.investment-amount")}
          </span>
          <span className="dialog-list__value">
            <NumberFormat
              value={formatValue(investAmount)}
              suffix={` GVT`}
              displayType="text"
            />
          </span>
        </li>
      </ul>
      <div className="form-error">{errorMessage}</div>
      <div className="dialog__buttons">
        <GVButton
          type="submit"
          id="signUpFormSubmit"
          className="invest-form__submit-button"
          disabled={disabled}
        >
          {t("deposit-program.confirm")}
        </GVButton>
      </div>
      {currency !== "GVT" &&
        currency !== null && (
        <div className="dialog__info">{t("deposit-program.disclaimer", { currency })}</div>
      )}
    </form>
  );
};

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
            t("deposit-program.validation.amount-min-value", {
              min: info.minInvestmentAmount
            })
          )
          .max(
            info.availableInWallet,
            t("deposit-program.validation.amount-more-than-available")
          )
          .required(t("deposit-program.validation.amount-is-required"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.amount);
    }
  })
)(ProgramDepositForm);
