import "./wallet-convert-form.scss";

import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { getWalletIcon } from "shared/components/wallet/components/wallet-currency";
import ArrowIcon from "shared/media/arrow-down.svg";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { formatValue, validateFraction } from "shared/utils/formatter";
import { ethWalletValidator } from "shared/utils/validators/validators";
import { number, object, string } from "yup";

const WalletConvertForm = ({
  t,
  twoFactorEnabled,
  handleSubmit,
  availableToWithdrawal,
  wallets,
  currentWallet,
  values,
  disabled,
  isValid,
  dirty,
  errorMessage,
  setFieldValue
}) => {
  const { currency, amount } = values;
  const selected =
    wallets.find(wallet => wallet.currency === currency) || {};

  const { commission = null, rateToGvt = null } = selected;

  const willGet = Math.max(
    convertFromCurrency(amount, rateToGvt) - commission,
    0
  );

  const isAllow = values => {
    const { floatValue, formattedValue, value } = values;
    return (
      formattedValue === "" ||
      (validateFraction(value, "GVT") &&
        floatValue <= parseFloat(availableToWithdrawal))
    );
  };

  const setMaxAmount = () => {
    setFieldValue("amount", formatCurrencyValue(availableToWithdrawal, "GVT"));
  };

  return (
    <form
      id="wallet-convert"
      className="wallet-convert-popup"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("wallet-convert.title")}</h2>
        </div>
        <GVFormikField
          name="currency"
          component={GVTextField}
          label={t("wallet-convert.from")}
          InputComponent={Select}
        >
          {wallets.map(wallet => {
            return (
              <option value={wallet.currency} key={wallet.currency}>{`${
                wallet.description
                } | ${wallet.currency}`}</option>
            );
          })}
        </GVFormikField>
      </div>
      <div className="dialog__bottom">
        <GVFormikField
          name="currency"
          component={GVTextField}
          label={t("wallet-convert.to")}
          InputComponent={Select}
        >
          {wallets.map(wallet => {
            return (
              <option value={wallet.currency} key={wallet.currency}>{`${
                wallet.description
                } | ${wallet.currency}`}</option>
            );
          })}
        </GVFormikField>
        <GVFormikField
          name="amount"
          adornment=""
          label={t("wallet-convert.amount")}
          isAllow={isAllow}
          component={GVTextField}
          InputComponent={NumberFormat}
        />
        <div className="form-error">{errorMessage}</div>
        <div className="dialog__buttons">
          <GVButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={disabled || !isValid || !dirty}
          >
            {t("buttons.confirm")}
          </GVButton>
        </div>
      </div>
    </form>
  );
};

WalletConvertForm.propTypes = {
  availableToWithdrawal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      commission: PropTypes.number,
      currency: PropTypes.string,
      description: PropTypes.string,
      logo: PropTypes.string,
      rateToGvt: PropTypes.number
    })
  ),
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func
};

const twoFactorvalidator = (t, twoFactorEnabled) => {
  return twoFactorEnabled
    ? string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-convert.validation.two-factor-6digits"))
        .required(t("wallet-convert.validation.two-factor-required"))
    : string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-convert.validation.two-factor-6digits"));
};

export default compose(
  translate(),
  withFormik({
    displayName: "wallet-convert",
    mapPropsToValues: (props) => {
      let currency = props.currentWallet ? props.currentWallet.currency : "GVT";
      if (!props.wallets.find(wallet => wallet.currency === currency)) {
        currency = props.wallets[0] ? props.wallets[0].currency : "";
      }
      return { currency, amount: "", address: "", twoFactorCode: "" };
    },
    validationSchema: ({ t, availableToWithdrawal, twoFactorEnabled }) =>
      object().shape({
        amount: number().max(
          availableToWithdrawal,
          t("wallet-convert.validation.amount-more-than-available")
        ),
        address: ethWalletValidator.required(
          t("wallet-convert.validation.address-is-required")
        ),
        twoFactorCode: twoFactorvalidator(t, twoFactorEnabled)
      }),
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(WalletConvertForm);
